// Eleventy does not empty its output directory. Without this, a file from a previous
// build survives even after the template that produced it stops emitting — which is
// exactly how a flag-gated page leaks into a deploy. Always clean before building.
import fs from "node:fs";
fs.rmSync("_site", { recursive: true, force: true });
