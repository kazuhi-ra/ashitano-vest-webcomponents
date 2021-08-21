import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default {
  entry: {
    'ashitano-vest': './src/index',
  },
  output: {
    path: path.resolve(__dirname, 'dist/browser'),
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.(js|ts)$/,
        use: {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx', '.json', '.mjs', '.wasm'],
  },
}
