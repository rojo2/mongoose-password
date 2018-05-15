import babel from "rollup-plugin-babel";
import pkg from "./package.json";

export default {
  input: "src/password.js",
  external: ["@rojo2/password", "@rojo2/is-string"],
  output: [
    { file: pkg.main, format: "cjs" },
    { file: pkg.module, format: "es" }
  ],
  plugins: [
    babel({
      exclude: ["node_modules/**"]
    })
  ]
};
