export type TryCatchResult<T> = { data: T; error?: never } | { data?: never; error: unknown }
export async function tryCatch<T>(cb: Promise<T>): Promise<TryCatchResult<T>> {
  try {
    return { data: await cb }
  } catch (error) {
    return { error }
  }
}
