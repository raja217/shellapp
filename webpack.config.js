const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point of your shell application
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory
    publicPath: 'auto', // Allows dynamic public path for Module Federation
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080, // Change as necessary
    historyApiFallback: true, // Required for SPA routing
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader', // For transpiling ES6+
      },
      {
        test: /\.css$/,  // Matches .css files
        use: [
          'style-loader', // Injects CSS into the DOM
          'css-loader',   // Interprets @import and url() like import/require()
        ],
      },
    ],
  },
  plugins: [
     // HtmlWebpackPlugin to generate an HTML file that includes your bundled JS
     new HtmlWebpackPlugin({
      template: './public/index.html', // Path to your HTML template
      filename: 'index.html', // Output HTML file
    }),
    new ModuleFederationPlugin({
      name: 'shellApp',
      filename: 'remoteEntry.js',
      remotes: {
        loginApp: 'loginApp@http://localhost:8081/remoteEntry.js',
        dashboardApp: 'dashboardApp@http://localhost:8082/remoteEntry.js',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.0.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.0.0',
        },
      },
    }),
  ],
  mode: 'development',
};
