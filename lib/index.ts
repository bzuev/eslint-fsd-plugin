import { layerImportsCheckerRule } from './rules/layer-imports-checker';
import { pathCheckerRule } from './rules/path-checker';
import { publicApiImportsCheckerRule } from './rules/public-api-imports-checker';

export const rules = {
	'path-checker': pathCheckerRule,
	'public-api-checker': publicApiImportsCheckerRule,
	'layer-imports-checker': layerImportsCheckerRule,
};
