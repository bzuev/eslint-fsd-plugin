import { FsdImportLayer, FsdLayer, FsdPublicApiLayer } from '../types';

export const fsdImportLayers: Record<FsdImportLayer, string> = {
	entities: 'entities',
	features: 'features',
	widgets: 'widgets',
	pages: 'pages',
	shared: 'shared',
};

export const fsdPublicApiLayers: Record<FsdPublicApiLayer, string> = {
	entities: 'entities',
	features: 'features',
	widgets: 'widgets',
	pages: 'pages',
};

export const fsdLayers: Record<FsdLayer, string> = {
	app: 'app',
	...fsdImportLayers,
};

export const fsdLayerImportMap: Record<FsdLayer, FsdLayer[]> = {
	app: ['pages', 'widgets', 'features', 'entities', 'shared'],
	pages: ['widgets', 'features', 'entities', 'shared'],
	widgets: ['features', 'entities', 'shared'],
	features: ['entities', 'shared'],
	entities: ['entities', 'shared'],
	shared: ['shared'],
};
