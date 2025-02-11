import { build } from "esbuild";

await build({
	outdir: "../dist",
	bundle: false,
	target: "node",
});
