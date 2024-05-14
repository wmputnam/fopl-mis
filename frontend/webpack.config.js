import path from 'path';

const config = {
  mode: "development",
  entry: './compiler-output/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(path.dirname('./dist')),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  }
};

export default config
