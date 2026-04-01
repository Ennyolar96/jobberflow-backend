import { ALGO_KEY } from "@/config";
import {
  scrypt as _scrypt,
  createCipheriv,
  createDecipheriv,
  createHmac,
  randomBytes,
  timingSafeEqual,
} from "crypto";
import { ForbiddenError } from "routing-controllers";
import { Service } from "typedi";
import { promisify } from "util";

const scrypt = promisify(_scrypt) as (
  password: string | Buffer,
  salt: string | Buffer,
  keylen: number,
) => Promise<Buffer>;

@Service()
export class SecurityService {
  private async deriveKeys(salt: Buffer, password: string) {
    const keyMaterial = await scrypt(password, salt, 64);
    return {
      encKey: keyMaterial.subarray(0, 32),
      macKey: keyMaterial.subarray(32, 64),
    };
  }

  async encrypt(plaintext: string, password: string): Promise<string> {
    const salt = randomBytes(16);
    const iv = randomBytes(16);
    const { encKey, macKey } = await this.deriveKeys(salt, password);

    const cipher = createCipheriv(ALGO_KEY, encKey, iv);
    const ciphertext = Buffer.concat([
      cipher.update(plaintext, "utf8"),
      cipher.final(),
    ]);

    const mac = createHmac("sha256", macKey)
      .update(salt)
      .update(iv)
      .update(ciphertext)
      .digest();

    return Buffer.concat([salt, iv, ciphertext, mac]).toString("hex");
  }

  async decrypt(payloadHex: string, password: string): Promise<string> {
    const buf = Buffer.from(payloadHex, "hex");
    if (buf.length < 16 + 16 + 32) {
      throw new ForbiddenError("Ciphertext too short");
    }

    const salt = buf.subarray(0, 16);
    const iv = buf.subarray(16, 32);
    const mac = buf.subarray(buf.length - 32);
    const ciphertext = buf.subarray(32, buf.length - 32);

    const { encKey, macKey } = await this.deriveKeys(salt, password);

    // Verify MAC first (constant-time)
    const expectedMac = createHmac("sha256", macKey)
      .update(salt)
      .update(iv)
      .update(ciphertext)
      .digest();
    if (
      expectedMac.length !== mac.length ||
      !timingSafeEqual(expectedMac, mac)
    ) {
      throw new ForbiddenError("Authentication failed (MAC mismatch)");
    }

    const decipher = createDecipheriv(ALGO_KEY, encKey, iv);
    const plaintext = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]);

    return plaintext.toString("utf8");
  }
}
