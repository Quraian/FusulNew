import { defineConfig } from 'vitest/config';

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
      external: ['react', '@prisma/client', 'zod'],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: 'React',
          '@prisma/client': 'Prisma Client',
          zod: 'Zod',
        },
      },
    },
  },
  test: {
    globals: true, // Enables global test functions like `test`, `describe`, and `it`
  },
});
