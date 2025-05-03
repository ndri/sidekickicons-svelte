// This file exists to handle incorrect imports from the root package.

// Create a proxy handler for ES modules
const handler = {
  get: (target: any, prop: string) => {
    if (prop === "default" || prop === "__esModule") {
      return target;
    }

    throw new Error(
      `Importing from '@sidekickicons/svelte' directly is not supported. Please import from '@sidekickicons/svelte/16/solid', '@sidekickicons/svelte/20/solid', '@sidekickicons/svelte/24/solid', or '@sidekickicons/svelte/24/outline' instead.`
    );
  },
};

// Create the proxy object
const proxy = new Proxy({}, handler);

// Export default and named exports through the proxy
export default proxy;

// Handle named exports using the same proxy
export const __useProxy = true;

// This will catch any attempt to import anything from this file
export function __catch() {
  throw new Error(
    `Importing from '@sidekickicons/svelte' directly is not supported. Please import from '@sidekickicons/svelte/16/solid', '@sidekickicons/svelte/20/solid', '@sidekickicons/svelte/24/solid', or '@sidekickicons/svelte/24/outline' instead.`
  );
}
