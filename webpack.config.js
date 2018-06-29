const path = require('path');

module.exports = {
    entry: './src/wave.ts',
    //devtool: 'inline-source-map',
    watch: true,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.wave' ]
    },
    output: {
        filename: 'wave.min.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'wave'
    }
};