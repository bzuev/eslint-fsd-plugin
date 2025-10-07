import { defineConfig } from 'tsup';
import pkg from './package.json';

export default defineConfig({
	entry: ['lib/index.ts'],
	format: ['cjs'],
	outDir: 'dist',
	dts: true,
	sourcemap: true,
	clean: true,
	external: [
		...Object.keys(pkg.devDependencies || {}),
		...Object.keys(pkg.peerDependencies || {}),
	],
});
