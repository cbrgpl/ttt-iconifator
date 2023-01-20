import { readFile, writeFile } from 'node:fs/promises'
import { Buffer } from 'node:buffer'

import { IBindedEntity } from '../../types/IBindedEntity.js'
import { type PatternGroups } from '../../types/Config.js'
import { IJSONObject } from '../../types/IJsonObject.js'

export abstract class AIconConfigWritter {
  protected workplaceRoot: string

  constructor( workplaceRoot: string ) {
    this.workplaceRoot = workplaceRoot
  }

  protected async getConfig( configPath: string ): Promise<IJSONObject> {
    const config: Buffer = await readFile( configPath )
    return JSON.parse( config.toString() )
  }

  protected async writeConfig( configPath: string, config: IJSONObject ) {
    await writeFile( configPath, JSON.stringify( config, null, 2 ), { flag: 'w' } )
  }

  abstract writeIconThemeConfig( accociatedIcons: Record<PatternGroups, IBindedEntity[]> ): void;

}
