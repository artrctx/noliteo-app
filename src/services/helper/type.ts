export type NoliteoResult<T> = Promise<{ data: T; error?: never } | { data?: never; error: Error }>;
