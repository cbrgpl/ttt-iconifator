import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { resolve } from 'path'

export interface ICliArgs {
  config: string;
}

interface IArgv extends ICliArgs {
  [x: string]: unknown;
  _: ( string | number )[];
  $0: string;
}

export const cli = new class Cli {
  private argv: IArgv

  constructor() {
    this.argv = yargs( hideBin( process.argv ) ).argv as IArgv
  }

  private get getCliConfig(): ICliArgs {
    return {
      config: resolve( process.cwd(), this.argv.config ),
    }
  }

  getCliArgs(): ICliArgs {
    const validationError: AggregateError | null = this.validateArgs()

    if ( validationError !== null ) {
      throw validationError
    }

    this.fillArgvWithDefaultValues()

    return this.getCliConfig
  }

  private validateArgs(): AggregateError | null {
    return null
  }

  private fillArgvWithDefaultValues() {
    if ( !this.argv.config ) {
      this.argv.config = 'prettyicons.config.json'
    }
  }
}
