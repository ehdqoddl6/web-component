const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

// console.log('mode', process.env.mode)
module.exports = {
    entry: './src/web-component.ts',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: './js/[name].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    plugins: [
        new HtmlPlugin({
            template: './public/index.html',
        })
    ],
    devServer: {
        host: 'localhost'
    }
};