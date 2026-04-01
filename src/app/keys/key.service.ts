import { CacheService, SecurityService } from "@/global/services";
import { Service } from "typedi";
import { IKeysCreate } from "./input";
import { Repository, TypeORMError } from "typeorm";
import { BadRequestError, InternalServerError } from "routing-controllers";
import { Keys } from "./entities";
import { AppDataSource, ENCRYPTION_KEY } from "@/config";

@Service()
export class KeyService {
  private readonly keyRepository: Repository<Keys>;
  constructor(
    private readonly securityService: SecurityService,
    private readonly cacheService: CacheService,
  ) {
    this.keyRepository = AppDataSource.getRepository(Keys);
  }

  async createkey(payload: IKeysCreate): Promise<Keys> {
    try {
      const cacheKey = this.cacheService.generateKey("keys", {
        userId: payload.userId,
      });

      const existingKey = await this.keyRepository.findOne({
        where: { userId: payload.userId },
      });

      this.cacheService.delQuery(cacheKey);

      if (existingKey) {
        const password = await this.securityService.decrypt(
          existingKey.password,
          ENCRYPTION_KEY,
        );
        if (password !== payload.password) {
          throw new BadRequestError("incorrect credientials");
        }
      }

      const aiProviders: (keyof IKeysCreate)[] = ["openai", "gemini"];

      const encryptionTasks = aiProviders.map(async (field) => {
        const value = payload[field];
        if (value && typeof value === "string") {
          payload[field] = await this.securityService.encrypt(
            value,
            payload.password,
          );
        }
      });

      const [encryptedPassword] = await Promise.all([
        this.securityService.encrypt(payload.password, ENCRYPTION_KEY),
        ...encryptionTasks,
      ]);

      const key = this.keyRepository.create({
        ...(existingKey || {}),
        ...payload,
        password: encryptedPassword,
      });

      return this.keyRepository.save(key);
    } catch (error) {
      if (error instanceof TypeORMError) {
        throw new InternalServerError(
          "Database error occurred while saving keys",
        );
      }
      throw error;
    }
  }

  async getKeys(
    userId: string,
  ): Promise<{ openai: string | null; gemini: string | null }> {
    try {
      const cacheKey = this.cacheService.generateKey("keys", { userId });
      const cachedKeys = this.cacheService.getQuery<{
        openai: string | null;
        gemini: string | null;
      }>(cacheKey);
      if (cachedKeys) return cachedKeys;

      const key = await this.keyRepository.findOne({
        where: { userId },
      });
      if (!key) return { openai: null, gemini: null };

      const password = await this.securityService.decrypt(
        key.password,
        ENCRYPTION_KEY,
      );

      const [openai, gemini] = await Promise.all([
        key.openai
          ? this.securityService.decrypt(key.openai, password)
          : Promise.resolve(null),
        key.gemini
          ? this.securityService.decrypt(key.gemini, password)
          : Promise.resolve(null),
      ]);

      this.cacheService.setQuery(cacheKey, { openai, gemini });
      return { openai, gemini };
    } catch (error) {
      if (error instanceof TypeORMError) {
        throw new InternalServerError(
          "Database error occurred while fetching keys",
        );
      }
      throw error;
    }
  }

  async verifyPassword(userId: string, password: string): Promise<boolean> {
    try {
      const key = await this.keyRepository.findOne({
        where: { userId },
      });
      if (!key) return false;

      const decryptedPassword = await this.securityService.decrypt(
        key.password,
        ENCRYPTION_KEY,
      );
      return decryptedPassword === password;
    } catch (error) {
      if (error instanceof TypeORMError) {
        throw new InternalServerError(
          "Database error occurred while verifying password",
        );
      }
      throw error;
    }
  }
}
