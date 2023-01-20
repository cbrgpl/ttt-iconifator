import { Dirent } from 'node:fs'
import { readdir } from 'node:fs/promises'

const toRegExp = ( pattern: string ): RegExp => new RegExp( pattern )

const ignoreDir = ( dir: string, ignore: string | string[] ) => {
  if ( Array.isArray( ignore ) ) {
    return ignore.some( ignoring => dir.includes( ignoring ) )
  } else {
    return dir.includes( ignore )
  }
}

const recursivlyScanDirs = async ( root: string, ignore: string | string[], dirNames: string[] = [] ): Promise<string[]> => {
  const dirents: Dirent[] = await readdir( root, { withFileTypes: true } )
  const directories = dirents.filter( dirent  => dirent.isDirectory() )

  for ( const dir of directories ) {
    if ( !ignoreDir( dir.name, ignore ) ) {
      dirNames.push( dir.name )
      await recursivlyScanDirs( root + '/' + dir.name, ignore, dirNames )
    }
  }

  return dirNames
}

interface IDirScannerOptions {
  root: string;
  ignore: string | string[];
}

export const getDirsByPattern = async ( pattern: RegExp | string, params: IDirScannerOptions ) => {
  const regExpPattern = pattern instanceof RegExp ? pattern : toRegExp( pattern )

  const dirs: string[] = await recursivlyScanDirs( params.root, params.ignore )
  return dirs.filter( name => regExpPattern.test( name ) )
}
