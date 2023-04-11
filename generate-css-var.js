const {
  transformColorObjectOfDarkmode,
  generateCSSByVar,
} = require('./transform')

const [, cssVar, cssVarDark] = transformColorObjectOfDarkmode()

const normalCSS = generateCSSByVar(cssVar)
const darkCSS = generateCSSByVar(cssVarDark)

const cssString = `
:root {
${normalCSS}
}

html.dark {
${darkCSS}
}

html.light {
${normalCSS}
}

@media (prefers-color-scheme: dark) {
  html:not(.dark):not(.light) {
  ${darkCSS}
  }
}

@media (prefers-color-scheme: light) {
  html:not(.dark):not(.light) {
  ${normalCSS}
  }
}
`

const fs = require('fs')
const path = require('path')
fs.writeFileSync(path.resolve(__dirname, './css-var.css'), cssString, {
  encoding: 'utf-8',
})
