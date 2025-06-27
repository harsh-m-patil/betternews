/* eslint-disable @typescript-eslint/no-explicit-any */
export function isPgErrorWithCode(
  error: unknown,
): error is { code: string; cause: { code: string } } {
  return (
    typeof error === "object" &&
    error !== null &&
    "cause" in error &&
    typeof (error as any).cause === "object" &&
    (error as any).cause !== null &&
    "code" in (error as any).cause &&
    typeof (error as any).cause.code === "string"
  );
}
