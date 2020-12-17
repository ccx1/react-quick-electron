const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config.base');
const webpack = require('webpack');

module.exports = merge.merge(baseWebpackConfig, {
    mode: 'development',
    // devtool: 'eval-source-map',
    devServer: {
        contentBase: './dist',
        port: 8080,
        hot: true,
        historyApiFallback: true,
        host: '0.0.0.0',
        // open:true,
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            '/web/*': {
                target: 'http://127.0.0.1:8051',
                changeOrigin: true,
                secure: false,
                // 替换包含test的接口
                // pathRewrite: {
                //     '^/test/*': ''
                // }
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ]
});
