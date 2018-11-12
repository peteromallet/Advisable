const { environment } = require('@rails/webpacker')
const webpack = require('webpack')
const dotenv = require('dotenv')

dotenv.config({ silent: true })

environment.plugins.prepend('Environment', new webpack.EnvironmentPlugin(JSON.parse(JSON.stringify(process.env))))

environment.loaders.append('graphql', {
  test: /\.(graphql|gql)$/,
  exclude: /node_modules/,
  loader: 'graphql-tag/loader',
})

module.exports = environment
