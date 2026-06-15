// Runs once on server startup (Node + Edge runtimes). Polyfills URL.canParse,
// which Next 15 uses internally but Node 19.8.1 (this machine) does not provide.
export async function register() {
  const U = URL as unknown as {
    canParse?: (url: string, base?: string) => boolean;
  };
  if (typeof U.canParse !== "function") {
    U.canParse = (url: string, base?: string) => {
      try {
        new URL(url, base);
        return true;
      } catch {
        return false;
      }
    };
  }
}
