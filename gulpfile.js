const { src, dest, series, parallel } = require("gulp");
const ts = require("gulp-typescript");

function clean(cb) {
  cb();
}

function javascript(cb) {
  cb();
  return src("./src/*.ts")
    .pipe(ts())
    .pipe(dest("./dist/"));
}

function css(cb) {
  cb();
}

function build(cb) {
  cb();
}

exports.build = build;
exports.default = series(clean, parallel(javascript, css)); 