let express=require("express");
let path=require("path");
let fs=require("fs");
let isDev=process.env.NODE_ENV !== "production";
let app=express();
let port=3000;
let indexHtml;

if(isDev) {
    let webpack = require("webpack");
    let webpackDevConfig = require(path.resolve(__dirname, "config/webpack.dev.config.js"));
    let webpackDevMiddleware = require("webpack-dev-middleware");
    let compiler=webpack(webpackDevConfig);

    app.use(webpackDevMiddleware(compiler,{
        publicPath:webpackDevConfig.output.publicPath,
        noInfo:true,
        stats:{
            colors:true,
            progress:true
        }
    }));

    let hotMiddleware=require("webpack-hot-middleware")(compiler);
    app.use(hotMiddleware);

    // important!
    let devFilterHtml=require(path.resolve(__dirname,"src/server/utils")).devHtmlFilter;
    // append "reload.js" in the <body>
    indexHtml=devFilterHtml(fs.readFileSync(path.join(__dirname,"src/client/index/index.html"),"utf8"));

    let reload=require("reload");
    let http=require("http");

    let server=http.createServer(app);
    reload(server,app);
    server.listen(port,()=>{
        console.log("App(dev) is now running on port 3000!");
    });
}
else{
    indexHtml=fs.readFileSync(path.join(__dirname,"dist/index.html"),"utf8");
    app.use(express.static(path.resolve(__dirname,"dist")));
    app.listen(port,(err)=>{
        if(err){
            return console.log(err);
        }
    })
}
app.get('/',(req,res)=>{
    res.send(indexHtml);
});