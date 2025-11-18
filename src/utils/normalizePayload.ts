/* eslint-disable @typescript-eslint/no-explicit-any */
export const normalizePayload = <T extends Record<string, any>>(data: T): T =>
  Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      value === "" ? null : value,
    ])
  ) as T;
