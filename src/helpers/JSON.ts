import { ParseError } from './../errors/ParseError.js'
import { IJSONObject } from './../types/IJsonObject.js'

const parse = ( json: string ): IJSONObject => {
  try {
    return JSON.parse( json )
  } catch ( err ) {
    throw new ParseError( json, 'JSON', err.message )
  }
}

interface IJSON {
  stringify: JSON['stringify'];
  parse( json: string ): IJSONObject;
}

const customJSON: IJSON = {
  parse,
  stringify: JSON.stringify,
}

export {
  customJSON as JSON,
}
