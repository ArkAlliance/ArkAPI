module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  tabWidth: 2,
  semi: false,
  arrowParens: 'always',
  importOrder: [
    '^@(.*)/(.*)$',
    '^(path|url|http)$', // node builtins
    '<THIRD_PARTY_MODULES>',
    '^(app|resources|tests|config|storage|public)',
    '^\\./.*/(.*)$',
  ],
  importOrderParserPlugins: [
    'typescript',
    'jsx',
    'classProperties',
    'decorators-legacy',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
}
