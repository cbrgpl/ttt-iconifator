#!/usr/bin/env node
import { ConfigReader } from './core/classes/ConfigReader.js'
import { EntityNameScanner } from './core/classes/EntityNameScanner.js'
import { VscConfigWritter } from './core/classes/VscConfigWritter.js'

import { cli } from './helpers/cli.js'
import { CI } from './helpers/CI.js'

// TODO Write class to validate readed config and CLI args

import { ALogableError } from './errors/ALogableError.js';
( async (): Promise<void> => {
  try {
    CI.step( 'Customization process is running on..' )
    const args = cli.getCliArgs()

    const reader = new ConfigReader( args.config )
    const config = await reader.read()
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
      null
    }

    process.exit( 1 )
  }
} )()
