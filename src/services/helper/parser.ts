import { tryCatch } from "@/src/utils/tryCatch";
import z from "zod";
import { NoliteoResult } from "./type";

export async function parseResponse<Z extends z.ZodSchema>(
  resPromise: Promise<Response>,
  schema: Z
): NoliteoResult<z.infer<Z>> {
  const res = await tryCatch(resPromise);
  if (res.error) return { error: res.error };
  if (!res.data.ok) return { error: new Error((await res.data.text())?.trim()) };
  const jsonParsed = await tryCatch(res.data.json());
  if (jsonParsed.error) return { error: jsonParsed.error };
  const parsed = schema.safeParse(jsonParsed.data);
  if (parsed.error) return { error: parsed.error };
  return { data: parsed.data };
}
