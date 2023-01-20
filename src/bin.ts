#!/usr/bin/env node
import { ConfigReader } from './core/classes/ConfigReader.js'
import { EntityNameScanner } from './core/classes/EntityNameScanner.js'
import { VscConfigWritter } from './core/classes/VscConfigWritter.js'

import { cli } from './helpers/cli.js'
import { consoleInterface } from './helpers/consoleInterface.js'

// TODO Write class to validate readed config and CLI args

;( async (): Promise<void> => {
  try {
    consoleInterface.logStep( 'Customization process is running on..' )
    const args = cli.getCliArgs()

    const reader = new ConfigReader( args.config )
    const config = await reader.read()
    consoleInterface.logStep( 'Config have been read' )

    const scanner = new EntityNameScanner( config )
    const associatedEntities = await scanner.getNames()
    consoleInterface.logStep( 'Entities was successfully associated with icons' )

    const writter = new VscConfigWritter( config.root )
    await writter.writeIconThemeConfig( associatedEntities )
    consoleInterface.logStep( 'The config additional data written' )

    process.exit( 0 )
  } catch ( err ) {
    consoleInterface.logError( err.message )
    process.exit( 1 )
  }
} )()
