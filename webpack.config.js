const path = require('path');
const process = require('process');

const isDevelopment = process.env.NODE_ENV === 'development';

module.exports = {
    mode: isDevelopment ? 'development' : 'production',

    // context: path.resolve(__dirname, 'src'),

    entry: {
        index: path.resolve(__dirname, './src/index.js'),
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },

    devServer: {
        historyApiFallback: true,
        static: path.resolve(__dirname, './dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8080,
    },

    plugins: [

    ],

    module: {
        rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ],
    }
};