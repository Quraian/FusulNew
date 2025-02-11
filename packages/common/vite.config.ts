import { defineConfig } from 'vitest/config';

process.env.TZ = 'Asia/Riyadh';

export default defineConfig({
  build: {
    lib: {
      //   entry: resolve(__dirname, "src/lib/main.js"),
      entry: 'src/index.ts',
      name: 'Common',
      // the proper extensions will be added
      fileName: 'fusul-common',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['react', 'zod'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          zod: 'Zod',
        },
      },
    },
  },
  test: {
    globals: true, // Enables global test functions like `test`, `describe`, and `it`
  },
});
