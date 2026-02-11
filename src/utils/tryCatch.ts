export type TryCatchResult<T> = { data: T; error?: never } | { data?: never; error: Error };
export async function tryCatch<T>(cb: Promise<T>): Promise<TryCatchResult<T>> {
  try {
    return { data: await cb };
  } catch (error) {
    const err = error instanceof Error ? error : new Error("Unknown Error", { cause: error });
    return { error: err };
  }
}
