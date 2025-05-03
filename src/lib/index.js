// The only reason this file exists is to appease Vite's optimizeDeps feature which requires a root-level import.

export default new Proxy(
  {},
  {
    get: (_, property) => {
      if (property === "__esModule") {
        return {};
      }

      throw new Error(
        `Importing from \`@sidekickicons/svelte\` directly is not supported. Please import from either \`@sidekickicons/svelte/16/solid\`, \`@sidekickicons/svelte/20/solid\`, \`@sidekickicons/svelte/24/solid\`, or \`@sidekickicons/svelte/24/outline\` instead.`
      );
    },
  }
);
