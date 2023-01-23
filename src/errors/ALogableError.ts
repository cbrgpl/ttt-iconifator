import { formatting } from '../helpers/formatting.js'

export abstract class ALogableError extends Error {
  protected formatting = formatting

  protected getRectContent( content: string ): string {
    const rows: string[] = content.split( '\n' )

    let maxRowLegth = 0

    rows.forEach( row => {
      if ( row.length > maxRowLegth ) {
        maxRowLegth = row.length
      }
    } )

    const padding = 2
    const rectRowLength: number = maxRowLegth + 2 * padding
    let resultContent = ''

    resultContent += ' '.repeat( rectRowLength )
    rows.forEach( row => {
      const appendWhitespaceQnt: number = maxRowLegth + padding - row.length
      resultContent += `\n${ ' '.repeat( padding ) }${ row }${ ' '.repeat( appendWhitespaceQnt ) }`
    } )

    return resultContent
  }

  abstract logSelf( textLogger: ( text: string ) => void, codeLogger: ( text: string ) => void ): void;
}
