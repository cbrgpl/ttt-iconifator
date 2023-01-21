export class ParseError extends Error {
  private content: string

  constructor( content: string ) {
    super( `Error due to parsing content\nContent: ${ content }` )
    this.content = content
  }
}
