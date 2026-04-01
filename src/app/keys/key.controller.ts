import { Body, Controller, Get, Param, Post } from "routing-controllers";
import { Service } from "typedi";
import { CreateKey, VerifyPassword } from "./input";
import { KeyService } from "./key.service";

@Controller("/")
@Service()
export class KeyController {
  constructor(private readonly keyService: KeyService) {}

  @Post("key")
  async createKey(@Body() input: CreateKey) {
    return this.keyService.createkey(input);
  }

  @Get("key/:userId")
  async getKeys(@Param("userId") userId: string) {
    return this.keyService.getKeys(userId);
  }

  @Post("key/verify")
  async verifyPassword(@Body() input: VerifyPassword) {
    return this.keyService.verifyPassword(input.userId, input.password);
  }
}
