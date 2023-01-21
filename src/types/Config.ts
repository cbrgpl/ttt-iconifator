import { IJSONObject } from './IJsonObject.js'

export interface IConfig extends IJSONObject {
  root: string;
  patterns: Record<PatternGroups, IPatternGroup>;
  ignore: string[];
}

export type PatternGroups = 'folders' | 'files'

export interface IPatternGroup {
  [key: string]: string;
}
