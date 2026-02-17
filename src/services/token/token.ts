import { parseResponse } from "../helper/parser";
import { NoliteoResult } from "../helper/type";
import { Noliteo } from "../noliteo/noliteo";
import { tokenSchema, ValidatedToken, validatedTokenSchema, type Token } from "./schema/token";

class TokenService extends Noliteo {
  //#region TOKEN
  async validate(tkn: string): NoliteoResult<ValidatedToken> {
    return parseResponse(
      fetch(`${this.baseUrl}/token`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tkn}`,
        },
      }),
      validatedTokenSchema
    );
  }
  async generate(tkn: string): NoliteoResult<Token> {
    return parseResponse(
      fetch(`${this.baseUrl}/token`, {
        method: "POST",
        body: JSON.stringify({ token: tkn }),
      }),
      tokenSchema
    );
  }
  //#endregion TOKEN
}

export const tokenService = new TokenService();
