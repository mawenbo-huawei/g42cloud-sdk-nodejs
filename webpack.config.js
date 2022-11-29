const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

// the path(s) that should be cleaned
let pathsToClean = ['dist'];

// the clean options to use
let cleanOptions = {
    root: path.resolve(__dirname),
    // exclude: ['shared.js'],
    verbose: true,
    dry: false,
};

module.exports = {
    resolve: {
        extensions: ['.js', '.ts', '.json'],
    },
    entry: './core/httpClient/index.ts',
    target: 'async-node',
    devtool: 'source-map',
    mode: 'production',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs'
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: path.resolve(__dirname, './tsconfig.json'),
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [new CleanWebpackPlugin(pathsToClean, cleanOptions)]
};