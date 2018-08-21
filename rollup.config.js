import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";

import simplevars from "postcss-simple-vars";
import nested from "postcss-nested";
import cssnext from "postcss-cssnext";
import autoprefixer from 'autoprefixer';

import pkg from "./package.json";

export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    postcss({
      plugins: [
        autoprefixer(),
        simplevars(),
        nested(),
        cssnext({ warnForDuplicates: false }),
      ],
      minimize: true,
      modules: true,
      extensions: [".scss"]
    }),
    url(),
    babel({
      exclude: "node_modules/**"
    }),
    resolve(),
    commonjs()
  ]
};
