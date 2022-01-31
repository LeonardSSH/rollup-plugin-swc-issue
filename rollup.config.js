import tsPaths from "rollup-plugin-tsconfig-paths";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { swc } from "rollup-plugin-swc3";
import path from "path";

const tsconfig = path.resolve("./packages/server/tsconfig.json");
const serverPath = path.resolve("./packages/server/src/index.ts");

export default {
  input: serverPath,
  output: {
    file: "dist/server.js",
    format: "cjs",
  },
  plugins: [
    tsPaths({ tsConfigPath: tsconfig }),
    nodeResolve({ extensions: [".ts"] }),
    commonjs(),
    swc({
      tsconfig: tsconfig,
      jsc: {
        target: "es2020",
        parser: {
          syntax: "typescript",
          dynamicImport: true,
          decorators: true,
        },
        transform: {
          legacyDecorator: true,
          decoratorMetadata: true,
        },
        externalHelpers: true,
        keepClassNames: true,
        loose: true,
      },
    }),
  ],
};
