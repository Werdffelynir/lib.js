const fs = require('fs');
const path = require('path');
const process = require('process');

const isDevelopment = process.env.NODE_ENV === 'development';


module.exports = {
    entry: './src/index.js',
    devtool: isDevelopment ? 'source-map' : 'hidden-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: []
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    plugins: []
};
