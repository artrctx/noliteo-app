import { tryCatch } from "@/src/utils/tryCatch";
import z from "zod";
import { healthSchema, type Health } from "./schema/health";

type NoliteoResult<T> = Promise<{ data: T; error?: never } | { data?: never; error: Error }>;

class Noliteo {
  private baseUrl: string;
  constructor() {
    this.baseUrl = process.env.SERVER_API_URL;
    if (!this.baseUrl) throw new Error("'SERVER_API_URL' env is missing");
  }
  //#region HEALTH
  async healthCheck(): NoliteoResult<Health> {
    return this.parseResponse(fetch(`${this.baseUrl}/health`), healthSchema);
  }
  //#endregion
  //#region TOKEN
  //#endregion
  private async parseResponse<Z extends z.ZodSchema>(
    resPromise: Promise<Response>,
    schema: Z
  ): NoliteoResult<z.infer<Z>> {
    const res = await tryCatch(resPromise);
    if (res.error) return { error: res.error };
    const jsonParsed = await tryCatch(res.data.json());
    if (jsonParsed.error) return { error: jsonParsed.error };
    const parsed = schema.safeParse(jsonParsed.data);
    if (parsed.error) return { error: parsed.error };
    return { data: parsed.data };
  }
}

export const noliteo = new Noliteo();
