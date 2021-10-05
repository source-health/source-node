const { join } = require('path')

function generateConfig(name) {
  const compress = name.indexOf('min') > -1;
  const target = name.indexOf('node') > -1 ? 'node' : 'web';
  
  return {
    mode: compress ? 'production' : 'development',
    target,
    entry: './src/index.ts',
    output: {
      path: join(__dirname, 'dist'),
      filename: name + '.js',
      sourceMapFilename: name + '.map',
      library: 'source-client',
      libraryTarget: 'umd',
      globalObject: 'this'
    },
    devtool: 'source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      fallback: {
        http: false,
        https: false,
      },
      alias: target === 'node' ? {} : {
        'jose/jwt/sign': false,
      },
    },
    module: {
      rules: [{
        test: /\.ts$/,
        use: 'ts-loader',
      }]
    },
  };
}

module.exports = ['source-client', 'source-client.min', 'source-client.node'].map((key) => generateConfig(key))