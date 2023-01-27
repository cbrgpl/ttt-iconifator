export const cliValidation = {
  '$schema': 'https://json-schema.org/draft/2020-12/schema',
  type: 'object',
  required: [ 'config' ],
  properties: {
    config: {
      type: 'string',
    },
  },
}
