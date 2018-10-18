module.exports = {
  plugins: [
    '@babel/plugin-transform-async-to-generator',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining'
  ],
  presets: [
    [
      '@babel/env',
      {
        targets: {
          browsers: [
            '>0.25%',
            'not ie 11',
            'not op_mini all'
          ]
        },
        // useBuiltIns: 'entry',
        // loose: true,
        // modules: false
      }
    ],
    '@babel/react'
  ],
  env: {
    production: {
      plugins: [
        '@babel/transform-react-constant-elements',
        '@babel/transform-react-inline-elements'
      ]
    },
    development: {
      plugins: [
        'react-hot-loader/babel'
      ]
    }
  }
}
