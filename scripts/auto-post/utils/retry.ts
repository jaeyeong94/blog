function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries: number;
    delay: number;
    operationName: string;
  }
): Promise<T> {
  let lastError: Error | undefined;

  for (let attempt = 1; attempt <= options.maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      console.error(
        `${options.operationName} failed (attempt ${attempt}/${options.maxRetries}):`,
        error
      );

      if (attempt < options.maxRetries) {
        console.log(`Retrying in ${options.delay}ms...`);
        await sleep(options.delay);
      }
    }
  }

  throw new Error(
    `${options.operationName} failed after ${options.maxRetries} attempts: ${lastError!.message}`
  );
}
