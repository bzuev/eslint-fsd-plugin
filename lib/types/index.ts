export type FsdLayer =
	| 'entities'
	| 'features'
	| 'widgets'
	| 'pages'
	| 'shared'
	| 'app';

export type FsdImportLayer = Exclude<FsdLayer, 'app'>;
export type FsdPublicApiLayer = Exclude<FsdLayer, 'shared' | 'app'>;

export type PluginOptions = {
	alias?: string;
	ignoreImportsPatters?: string[];
	testFilesPatterns?: string[];
	allowedDepthByLayer?: Record<FsdLayer, number>;
};
