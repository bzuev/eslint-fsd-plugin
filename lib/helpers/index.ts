import path from 'path';
import { fsdImportLayers, fsdLayers, fsdPublicApiLayers } from '../consts';

export function isPathRelative(currentPath: string) {
	return (
		currentPath === '.' ||
		currentPath.startsWith('./') ||
		currentPath.startsWith('../')
	);
}

export function removeAlias(value: string, alias: string) {
	return alias ? value.replace(`${alias}/`, '') : value;
}

export function getNormalizedCurrentFilePath(currentFilePath: string) {
	const normalizedPath = path.toNamespacedPath(currentFilePath);
	const projectFrom = normalizedPath.split('src')[1] || '';

	return projectFrom.split('\\').join('/');
}

export function isFsdLayer(layer: string) {
	return layer in fsdLayers;
}

export function isFsdImportLayer(layer: string) {
	return layer in fsdImportLayers;
}

export function isFsdPublicApiLayer(layer: string) {
	return layer in fsdPublicApiLayers;
}

export function docsUrl(name: string) {
	return `https://github.com/bzuev/eslint-fsd-plugin/blob/main/docs/rules/${name}.md`;
}
