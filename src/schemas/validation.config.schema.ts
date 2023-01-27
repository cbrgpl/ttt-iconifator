export const configValidation = {
  '$schema': 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  $defs: {
    patternGroup: {
      type: 'object',
      unevaluatedProperties: {
        type: 'string',
      },
    },
  },
  required: [ 'root', 'patterns', 'ignore' ],
  properties: {
    root: {
      type: 'string',
    },
    patterns: {
      type: 'object',
      required: [ 'files', 'folders' ],
      properties: {
        files: {
          $ref: '#/$defs/patternGroup',
        },
        folders: {
          $ref: '#/$defs/patternGroup',
        },
      },
    },
    ignore: {
      anyOf: [
        {
          type: 'string',
        },
        {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      ],
    },
  },
}
