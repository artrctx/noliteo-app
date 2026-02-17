import { parseResponse } from "../helper/parser";
import { NoliteoResult } from "../helper/type";
import { healthSchema, type Health } from "./schema/health";

export class Noliteo {
  baseUrl: string;
  constructor() {
    this.baseUrl = process.env.EXPO_PUBLIC_SERVER_API_URL;
    if (!this.baseUrl) throw new Error("'SERVER_API_URL' env is missing");
  }

  //#region HEALTH
  async health(): NoliteoResult<Health> {
    return parseResponse(fetch(`${this.baseUrl}/health`), healthSchema);
  }
  //#endregion
}
