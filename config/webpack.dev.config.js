var webpack=require("webpack");
var path=require("path");
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';
var webpackBasicConfig=require("./webpack.basic.config");
var merge=require("webpack-merge");

module.exports=merge.smart({},webpackBasicConfig,{
    entry: {
        index:[path.resolve(__dirname,'..','src/client/index'),hotMiddlewareScript]
    },
    output:{
        path:path.resolve(__dirname,'..','dist'),
        publicPath:'/dist/',
        filename:'[name].js',
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
    ]
})