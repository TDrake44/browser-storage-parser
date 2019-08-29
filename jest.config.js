module.exports = {
  testPathIgnorePatterns: [`node_modules`, `.cache`],
  coverageReporters: ['json-summary', 'html', 'text'],
  reporters: [ 'default', 'jest-junit' ]
}
