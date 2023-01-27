#!/usr/bin/env node
import { ConfigReader } from './core/classes/ConfigReader.js'
import { EntityNameScanner } from './core/classes/EntityNameScanner.js'
import { VscConfigWritter } from './core/classes/VscConfigWritter.js'

import { cli } from './helpers/cli.js'
import { CI } from './helpers/CI.js'

import { validate } from './helpers/validate.js'
import { configValidation } from './schemas/validation.config.schema.js'
import { cliValidation } from './schemas/validation.cli.schema.js'

import { InternalError } from './errors/InternalError.js'

import { ALogableError } from './errors/ALogableError.js';
( async (): Promise<void> => {
  try {
    CI.step( 'Customization process is running on..' )
    const args = cli.getCliArgs()
    validate( 'cli-args', args, cliValidation )

    const reader = new ConfigReader( args.config )
    const config = await reader.read()
    validate( args.config, config, configValidation )

    CI.step( 'Config have been read' )

    const scanner = new EntityNameScanner( config )
    const associatedEntities = await scanner.getNames()
    CI.step( 'Entities was successfully associated with icons' )

    const writter = new VscConfigWritter( config.root )
    await writter.writeIconThemeConfig( associatedEntities )
    CI.finish( 'Additional config data was sucesfully written!' )

    process.exit( 0 )
  } catch ( err ) {
    if ( err instanceof ALogableError ) {
      CI.error( err )
    } else {
      CI.error( new InternalError( err.message, err.stack ) )
    }

    process.exit( 1 )
  }
} )()
