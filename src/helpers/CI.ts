/* eslint-disable no-console */
import { formatting } from './formatting.js'
import { ALogableError } from '../errors/ALogableError.js'
import timestamp from 'time-stamp'

export const CI = new class CI {
  step( summary: string ) {
    this.timestampLog( formatting.message( formatting.title( summary ) ) )
  }

  error( error: ALogableError ) {
    error.logSelf( ( text: string ): void => this.timestampLog( text ), ( text?: string ): void => this.log( text ) )
  }

  finish( summary: string ) {
    this.timestampLog( formatting.sucess( formatting.title( summary ) ) )
  }

  private timestampLog( text: string ): void {
    console.log( `${ timestamp.utc( 'HH:mm:ss:ms' ) } ${ text }` )
  }

  private log( text?: string ): void {
    const paddingLeft = ' '.repeat( 13 )
    console.log( text ? text.split( '\n' ).map( row => paddingLeft + row ).join( '\n' ) : '' )
  }
}
