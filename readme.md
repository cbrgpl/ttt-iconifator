# Iconifator

The package used to generate the config for the VSC plugin "[PKief.material-icon-theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)" bypassing the lack of globs support.

## Config

Search patterns:

**Files:**

- [x] Valid Globs

**Directories:**

- [x] Valid Regular expressions

There is no need to include / at the beginning and end of the regular expression.<br>
"/The[A-Za-z]+Component/" ----> "The[A-Za-z]+Component"


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
3. Use command `npx iconifator` anywhere. On my projects, I bind it to npm prepare and predev;

My *package-json.script* with husky as addition

```json
{
  "scripts": {
    "predev": "npx ttt-iconifator",
    "dev": "vite",
    "prepare": "husky install && npx ttt-iconifator"
  }
}
```
