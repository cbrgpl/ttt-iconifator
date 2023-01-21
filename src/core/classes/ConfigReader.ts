import { readFile } from 'node:fs/promises'
import { resolve } from 'path'

import isValidGlob from 'is-valid-glob'
import { IConfig, IPatternGroup, PatternGroups } from '../../types/Config.js'
import { JSON } from './../../helpers/JSON.js'
import { isStringValidRegExp } from '../../helpers/isStringValidRegExp.js'

interface PatternGroupValidation {
  groupName: PatternGroups;
  isPatternValid: ( pattern: string ) => boolean;
  getErrorMessage: ( pattern: string ) => string;
}

const patternValidations: PatternGroupValidation[] = [
  {
    groupName: 'files',
    isPatternValid: isValidGlob,
    getErrorMessage: ( pattern: string ) => `Value ${ pattern } is not valid glob`,
  },
  {
    groupName: 'folders',
    isPatternValid: isStringValidRegExp,
    getErrorMessage: ( pattern ) => `Value ${ pattern } is not valid regular expression`,
  },
]

export class ConfigReader {
  private configPath: string

  constructor( configPath: string ) {
    this.configPath = configPath
  }

  async read(): Promise<IConfig> {
    const filePath: URL = new URL( this.configPath, import.meta.url )
    const configStr: string = await readFile( filePath, { encoding: 'utf-8' } )

    const config: IConfig = JSON.parse( configStr ) as IConfig

    const configValidationError: AggregateError | null = this.validateConfig( config )
    if ( configValidationError !== null ) {
      throw configValidationError
    }

    this.fillConfigWithDefaultValues( config )

    config.root = resolve( config.root )

    return config
  }

  private validateConfig( config: IConfig ): AggregateError | null {
    const errors: Error[] = []

    if ( !config.patterns ) {
      return new AggregateError( [ new Error( 'Config.patterns property was not defined' ) ] )
    }

    if ( !config.patterns.files && !config.patterns.folders ) {
      return null
    }

    for ( const patternGroupValidation of patternValidations ) {
      const patternGroupName: PatternGroups = patternGroupValidation.groupName
      const patternGroup: IPatternGroup = config.patterns[ patternGroupName ]
      errors.push(
        ...this.validateConfigPatternPropety( patternGroup, patternGroupValidation )
      )
    }

    return errors.length !== 0 ? new AggregateError( errors ) : null
  }

  private validateConfigPatternPropety( patternGroup: IPatternGroup, groupValidation: PatternGroupValidation ): Error[]  {
    if ( !patternGroup ) {
      return []
    }

    const errors: Error[] = []

    for ( const pattern in patternGroup ) {
      if ( !groupValidation.isPatternValid( pattern ) ) {
        const errorMessage = groupValidation.getErrorMessage( pattern )
        errors.push( new Error( errorMessage ) )
      }
    }

    return errors
  }

  private fillConfigWithDefaultValues( config: IConfig ): IConfig {
    if ( !config.root ) {
      config.root = './'
    }

    return config
  }
}
