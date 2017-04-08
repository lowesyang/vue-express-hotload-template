var webpack=require("webpack");
var path=require("path");
var HtmlWebpackPlugin=require("html-webpack-plugin")
var webpackDevConfig=require("./webpack.dev.config");
var merge=require("webpack-merge");

module.exports=merge.smart({},webpackDevConfig,{
    entry:{
        index:path.resolve(__dirname,'..','src/client/index'),
        vendor:['vue']
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin('vendor','commons.[chunkhash:5].js'),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false,
                drop_console:false
            },
            comments:false,
            minimize:false
        }),
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV:'"production"'
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname,'..','/src/client/index.html'),
            inject: true
        })
    ]
});