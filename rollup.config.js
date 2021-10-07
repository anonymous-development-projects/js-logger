import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/index.ts",
    output: {
      name: "JSLogger",
      exports: 'named',
      file: "bundle/js-logger.umd.js",
      format: "umd",
      sourcemap: true
    },
    plugins: [
      json(),
      resolve({ browser: true }),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.esm.json", declaration: false })
    ]
  },
  {
    input: "src/index.ts",
    output: {
      name: "JSLogger",
      exports: 'named',
      file: "bundle/js-logger.umd.min.js",
      format: "umd",
      sourcemap: true
    },
    plugins: [
      json(),
      resolve({ browser: true }),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.esm.json", declaration: false }),
      terser({
        output: {
          comments: false
        }
      })
    ]
  },
  {
    input: "src/index.ts",
    output: {
      exports: 'named',
      file: "bundle/js-logger.mjs",
      format: "es",
      sourcemap: true
    },
    plugins: [
      json(),
      resolve({ browser: true }),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.esm.json", declaration: false })
    ]
  },
  {
    input: "src/index.ts",
    output: {
      exports: 'named',
      file: "bundle/js-logger.min.mjs",
      format: "es",
      sourcemap: true
    },
    plugins: [
      json(),
      resolve({ browser: true }),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.esm.json", declaration: false }),
      terser({
        output: {
          comments: false
        }
      })
    ]
  }
];
