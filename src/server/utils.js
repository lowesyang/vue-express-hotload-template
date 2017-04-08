// add reload.js in template for auto-reloading
function devHtmlFilter(html){
    var index=html.indexOf("</body>");
    return html.substring(0,index)+"<script src='/reload/reload.js'></script>"+html.substring(index,html.length);
}

module.exports={
    devHtmlFilter
}