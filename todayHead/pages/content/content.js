// pages/content/content.js
var common = require("../../utils/common.js")
var app = getApp()
Page({
  data:{
    content:{
      title : null,
      src: null,
      textArrs: [],
    }
  },
  checkImageTag: function(str){
      if (str.indexOf("img") > 0) 
      {
        return true
      }
       if (str.indexOf("img") < 0) 
      {
        return false
      }
      
  },
  checkTagName: function(str){
  if (str.indexOf("img") < 0) return str;
     if (str.indexOf("img") > 0) {
         var start = str.indexOf("href=\"")+6; 
         var end1 = str.indexOf("png")+3;
         var end2 = str.indexOf("jpeg")+4;
         
         var end = end1 > end2 ? end1 : end2;
         console.log(str.slice(start,end));
         return  str.slice(start,end);
     };
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    console.log(options.contenturl);
    var url = "http://mini.eastday.com/"+options.contenturl+".html";
    const that = this;
    const sepration = "-----"
    wx.request({
      url: url,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        var c = res.data;
        //获取head 中title 内容
        var title = common.getTagContent(c,"head","")[1];
        title = common.getTagContent(title,"title","")[1];
        //获取body内容数据
        var body = common.getTagContent(c,"body","")[1];
        //来源内容
        var src = common.getTagContent(body,"span"," class=\"src\"")[1]
        src = common.replaceTagContent(src,"&nbsp;&nbsp;&nbsp;&nbsp;","   ")
        // 获取body中的article得到div标签>然后获取 p标签
        var article = common.getTagContent(body,"article"," id=\"J_article\" class=\"J-article article\"")[1];
        var p = common.getTagContent(article,"div"," id=\"content\" class=\"J-article-content article-content\"")[1];
        //代替
        var text  = common.replaceTagContent(p,"<p class=\"section txt\">","");
        text = common.replaceTagContent(text,"<\/p>",sepration);

        text = common.replaceTagContent(text,"<figure class=\"section img\">","");
        text = common.replaceTagContent(text,"<\/figure>",sepration);
        
        var textArrs = text.split(sepration);
        var realArrs = []
        //保存时是否是图片标签
        for (var i =  0; i < textArrs.length; i++) {
           var textAndIndexObj  = {}
            var str = textArrs[i];
            var isImage = that.checkImageTag(str);
            if (isImage) {
                str = that.checkTagName(str);
            }
            textAndIndexObj.isImage = isImage;
            textAndIndexObj.str = str;
            realArrs.push(textAndIndexObj);
        };
        console.log(src);

        that.setData({
          content:  {
             title : title,
             src: src,
             textArrs: realArrs
          }
        })
      }
    })
  },
})