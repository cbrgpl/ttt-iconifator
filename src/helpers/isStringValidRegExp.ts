export const isStringValidRegExp = ( string: string ) => {
  if ( string.length === 0 ) {
    return false
  }

  let isValid = true
  try {
    new RegExp( string )
  } catch ( err ) {
    isValid = false
  }

  return isValid
}
