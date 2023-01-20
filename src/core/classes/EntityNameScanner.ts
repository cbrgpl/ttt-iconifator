import glob from 'glob'
import { IConfig, IPatternGroup, type PatternGroups } from '../../types/Config.js'
import { IBindedEntity } from '../../types/IBindedEntity.js'

import { getDirsByPattern } from '../../helpers/getDirsByPattern.js'

interface IScanOptions {
  root: string;
  ignore: string | string[];
}

type IScanStrategy = {
  ( patterns: IPatternGroup, options: IScanOptions ): Promise<IBindedEntity[][]>;
}

const dirScanner: IScanStrategy = async ( patterns, options ) => {
  const promises: Promise<IBindedEntity[]>[] = []

  for ( const regexp in patterns ) {
    promises.push( ( async (): Promise<IBindedEntity[]> => {
      const icon: string  = patterns[ regexp ]
      const foundDirs: string[] = await getDirsByPattern( regexp, options )

      return foundDirs.map( ( dir ): IBindedEntity => ( { name: dir, icon } ) )
    } )() )
  }

  const settledResults: PromiseSettledResult<IBindedEntity[]>[] = await Promise.allSettled( promises )
  const bindedDirs: IBindedEntity[][] = settledResults.filter( result => result.status === 'fulfilled' )
    .map( ( result: PromiseFulfilledResult<IBindedEntity[]> ) => result.value )

  return bindedDirs
}

const globScanner: IScanStrategy = async ( patterns, options ) => {
  const promises: Promise<IBindedEntity[]>[] = []

  for ( const globPattern in patterns ) {
    promises.push( new Promise(
      ( resolve, reject ) => glob( globPattern, options, ( err, mathches: string[] ) => {
        if ( err ) {
          reject( err )
        }

        const extractFileNameRegexp = /[a-zA-Z.]+(?<=$)/
        resolve( mathches.map( ( match ): IBindedEntity => ( { name: match.match( extractFileNameRegexp )![ 0 ], icon: patterns[ globPattern ] } ) ) )
      } )
    ) )
  }

  const settledResults: PromiseSettledResult<IBindedEntity[]>[] = await Promise.allSettled( promises )
  const results: IBindedEntity[][] = settledResults.filter( ( settledResult ) => settledResult.status === 'fulfilled' )
    .map( ( result: PromiseFulfilledResult<IBindedEntity[]> ) => result.value )

  return results
}

export class EntityNameScanner {
  private config: IConfig
  private scanStrategy: IScanStrategy

  constructor( config: IConfig ) {
    this.config = config
  }

  private get scanOptions(): IScanOptions {
    return {
      root: this.config.root,
      ignore: 'node_modules/**/*',
    }
  }

  async getNames(): Promise<Record<PatternGroups, IBindedEntity[]>>  {
    const bindedEntities: { 'files': IBindedEntity[]; 'folders': IBindedEntity[] } = { 'files': [], 'folders': [] }

    let patternGroupName: PatternGroups

    for ( patternGroupName in this.config.patterns ) {
      const patternGroup: IPatternGroup = this.config.patterns[ patternGroupName ]
      const scanOptions = this.scanOptions

      this.setStrategy( patternGroupName )
      const scanedEntities: IBindedEntity[][] = await this.scanStrategy( patternGroup, scanOptions )

      const uniqueListOfBindedEntities: IBindedEntity[] = this.deduplicateEntities( scanedEntities )
      bindedEntities[ patternGroupName ] = uniqueListOfBindedEntities
    }

    return bindedEntities
  }

  private setStrategy( patternGroup: PatternGroups ): void {
    switch ( patternGroup ) {
      case 'files':
        this.scanStrategy = globScanner
        return
      case 'folders':
        this.scanStrategy = dirScanner
        return
    }
  }

  private deduplicateEntities( entities: IBindedEntity[][] ) {
    const uniqueList: IBindedEntity[] = []

    for ( const patternEntities of entities ) {
      for ( const entity of patternEntities ) {
        const entityAlreadyInList = ( entity: IBindedEntity ) => uniqueList.find( listEntity => listEntity.name === entity.name ) !== undefined
        if ( !entityAlreadyInList( entity ) ) {
          uniqueList.push( entity )
        }
      }
    }

    return uniqueList
  }
}
