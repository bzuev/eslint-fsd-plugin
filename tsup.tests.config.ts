import { defineConfig } from 'tsup';
import pkg from './package.json';

export default defineConfig({
	entry: ['tests/**/*.test.ts'],
	format: ['cjs'],
	outDir: 'dist-tests',
	dts: false,
	sourcemap: false,
	clean: true,
	external: [
		...Object.keys(pkg.devDependencies || {}),
		...Object.keys(pkg.peerDependencies || {}),
	],
});
