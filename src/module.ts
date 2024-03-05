import {
  defineNuxtModule,
  addPlugin,
  createResolver,
  addTemplate,
} from "@nuxt/kit";
import { installModule, addComponentsDir } from "@nuxt/kit";

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "ui-v3",
    configKey: "ui",
  },

  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url);

    nuxt.hook("tailwindcss:resolvedConfig", async function (tailwindConfig) {
      tailwindConfig.content.files.push(
        createResolver(".").resolve(".nuxt/ui/*.ts"),
        // TODO: Resolve nuxt app directory to remove this
        createResolver("./playground").resolve(".nuxt/ui/*.ts"),
      );
    });

    nuxt.hook("tailwindcss:resolvedConfig", async function (tailwindConfig) {
      // Importing variant templates
      const variants = await import("./variants");

      // Builds variant templates and injects them to #build/ui
      Object.entries(variants).forEach(([name, variant]) => {
        addTemplate({
          filename: `ui/${name}.ts`,
          getContents() {
            console.log(`UI >> Computing ${name} variants`);
            return (
              "import { tv } from 'tailwind-variants'\n" +
              `export default tv(${JSON.stringify(variant(tailwindConfig), null, 2)})`
            );
          },
          write: true,
        });
      });
    });

    // Install TailwindCSS module
    await installModule("@nuxtjs/tailwindcss", {
      exposeConfig: true,
      config: {
        darkMode: "class",
      },
    });

    const runtimeDir = resolver.resolve("./runtime");

    addComponentsDir({
      path: resolver.resolve(runtimeDir, "components"),
      watch: false,
    });

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve("./runtime/ui"));
  },
});
