export interface IConfig {
  root: string;
  patterns: Record<PatternGroups, IPatternGroup>;
  ignore: string[];
}

export type PatternGroups = 'folders' | 'files'

export interface IPatternGroup {
  [key: string]: string;
}
