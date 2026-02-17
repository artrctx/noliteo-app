import z from "zod";

export const tokenSchema = z.object({
  ident: z.string(),
  jwt: z.string(),
});

export type Token = z.infer<typeof tokenSchema>;

export const validatedTokenSchema = z.object({
  ident: z.string(),
});

export type ValidatedToken = z.infer<typeof validatedTokenSchema>;
