const  path = require('path')

module.exports = {
    // config to concatenate, transpile and minify scritps
    entry: {
        'main.min.js': [
            /*
            path.resolve(__dirname, 'src/assets/js/libs/') + '/jquery.min.js',
            path.resolve(__dirname, 'src/assets/js/libs/') + '/lazyload.js',
            path.resolve(__dirname, 'src/assets/js/libs/') + '/swiper.min.js',
            */
            path.resolve(__dirname, 'src/assets/js/') + '/main.js',
        ],
    },
    output: {
        path: path.resolve(__dirname, 'build') + '/assets/js',
        filename: '[name]',
    },

    //Providing the mode configuration option tells webpack to use its built-in optimizations accordingly.
    mode: 'none',
    performance: {
        hints: false
    },
    optimization: {
        flagIncludedChunks: false,
        occurrenceOrder: false,
        sideEffects: false,
        usedExports: false,
        concatenateModules: false,
        splitChunks: {
            hidePathInfo: false,
            minSize: 10000,
            maxAsyncRequests: Infinity,
            maxInitialRequests: Infinity,
        },
        noEmitOnErrors: false,
        checkWasmTypes: false,
        minimize: true,
    },
    plugins: []
}
