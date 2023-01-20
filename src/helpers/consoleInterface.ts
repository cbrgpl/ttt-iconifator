/* eslint-disable no-console */

export const consoleInterface = new class ConsoleInterface {
  logStep( details: string ): void {
    console.log( details )
  }

  logError( message: string | string[] ) {
    if ( typeof message === 'string' ) {
      console.log( message )
    } else {
      console.log( ...message )
    }
  }
}
