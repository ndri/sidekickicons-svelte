# sidekickicons-svelte

Svelte package that combines [Heroicons](https://github.com/tailwindlabs/heroicons) and [Sidekickicons](https://github.com/ndri/sidekickicons).

Browse all icons at [sidekickicons.com](https://sidekickicons.com/).

This package requires Svelte 5.19.0 or later.

## Usage

First, install `@sidekickicons/svelte` from npm:

```bash
pnpm install @sidekickicons/svelte
```

Now each icon can be imported and used in Svelte components. Since there is no official Svelte package for Heroicons, the `@sidekickicons/svelte` package includes Heroicons as well.

```svelte
<script lang="ts">
  import { CrownIcon, BeakerIcon } from '@sidekickicons/svelte/24/solid'
</script>

<div>
  <CrownIcon class="text-blue-500" />
  <BeakerIcon class="text-green-500" />
</div>
```

Import the icons from their respective directory:

- 24x24 outline: `@sidekickicons/svelte/24/outline`
- 24x24 solid: `@sidekickicons/svelte/24/solid`
- 20x20 solid: `@sidekickicons/svelte/20/solid`
- 16x16 solid: `@sidekickicons/svelte/16/solid`

Icons use an upper camel case naming convention and are always suffixed with the word `Icon`.

[Browse the full list of icon names on UNPKG &rarr;](https://app.unpkg.com/@sidekickicons/svelte/files/dist/24/outline)

The imported components are simple Svelte components that accept the `class` prop. The component already includes the `size-6`, `size-5`, or `size-4` class, so the `class` adds any additional classes you want to apply.

## Building

If you want to build the library yourself, you can do so by running:

```bash
pnpm build
```

This downloads the latest versions of Heroicons and Sidekickicons into `optimized/`, converts them into Svelte components, and saves them in the `src/lib` directory.

## License

This library is MIT licensed along with both Heroicons and Sidekickicons. You can find license files for all projects in this repository:

- [LICENSE](LICENSE)
- [HEROICONS-LICENSE](HEROICONS-LICENSE)
- [SIDEKICKICONS-LICENSE](SIDEKICKICONS-LICENSE)
