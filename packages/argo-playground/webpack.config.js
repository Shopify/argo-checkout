const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');
const {WebWorkerPlugin} = require('@shopify/web-worker/webpack');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.tsx',
  output: {
    globalObject: 'self',
    filename: '[name].js',
    path: __dirname + '/dist',
  },
  plugins: isDevelopment
    ? [new WebWorkerPlugin(), new HtmlWebpackPlugin({title: 'Playground - App Extensions'})]
    : [
        new webpack.ProvidePlugin({
          React: 'react',
        }),
      ],
  devServer: {
    disableHostCheck: true,
    host: '0.0.0.0',
    hot: false,
    inline: false,
    port: 39355,
    historyApiFallback: {
      rewrites: [
        {
          from: /./,
          to: '/index.html',
        },
      ],
    },
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: isDevelopment ? 'source-map' : false,

  resolve: {
    extensions: ['.tsx', '.ts', 'jsx', '.js', '.json'],
    alias: {
      '@shopify/argo': resolve(__dirname, '../argo/src'),
      '@shopify/argo-host': resolve(__dirname, '../argo-host/src'),
      '@shopify/argo-react': resolve(__dirname, '../argo-react/src'),
    },
  },

  module: {
    rules: [
      {
        test: /\.[j|t]s(x?)$/,
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              [
                'babel-preset-shopify/web',
                {
                  modules: 'commonjs',
                  typescript: true,
                  browsers: [
                    'last 1 chrome version',
                    'last 1 firefox version',
                    'last 1 safari version',
                  ],
                },
              ],
              'babel-preset-shopify/react',
              [
                '@babel/preset-env',
                {
                  forceAllTransforms: true,
                },
              ],
            ],
            plugins: [
              '@babel/transform-runtime',
              '@shopify/react-i18n/babel',
              require.resolve('@shopify/web-worker/babel'),
            ],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
};