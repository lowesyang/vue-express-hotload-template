var webpack=require("webpack");
var path=require("path");
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports={
    entry: {
        index:[path.resolve(__dirname,'..','src/client/index'),hotMiddlewareScript]
    },
    output:{
        path:path.resolve(__dirname,'..','dist'),
        publicPath:'/dist/',
        filename:'[name].js',
    },
    module:{
        rules:[
            {
                test:/\.js[x]?$/,
                loader:'babel-loader',
                exclude:/node_modules/
            },
            {
                test:/\.vue$/,
                loader:'vue-loader'
            },
            {
                test:/\.css$/,
                loader:['style-loader','css-loader']
            },
            {
                test:/\.(eot|svg|ttf|woff|woff2)(\?\S*)$/,
                loader:'url-loader',
                query:{
                    name:'fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test:/\.(png|jpe?g|svg|gif)(\?\S*)?$/,
                loader:'url-loader',
                query:{
                    limit:8192,
                    name:'img/[name].[hash:7].[ext]'
                }
            },
        ]
    },
    resolve:{
        extensions:['.js','.jsx'],
        alias:{
            'vue$':'vue/dist/vue.min.js'
        }
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
    ]

}