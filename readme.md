# Iconifator

The package used to generate the config for the VSC plugin "[PKief.material-icon-theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)" bypassing the lack of globs support.

## Config



## Usage 

1. `npm i -D ttt-iconifator`

2. Write config

```json
{
  "root": "./frontend/src",
  "patterns": {
    "files": {
      "index.js": "Livescript",
      "**/d.*.js": "Lerna"
    },
    "folders": {
      "FolderPrefix[A-Za-z]+": "Resolver",
      "The[A-Za-z]+": "Vercel"
    }
  },
  "ignore": [ "node_modules", "dist" ]
}
```
3. `npx ttt-iconifator`
