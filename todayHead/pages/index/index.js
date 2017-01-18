//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
     dataArr:[],
  },
    //获取到图片的个数
  imageCount: function(obj) {
      if ("thumbnail_pic_s03" in obj) {
        return [obj.thumbnail_pic_s,obj.thumbnail_pic_s02,obj.thumbnail_pic_s03];  
      }
      if ("thumbnail_pic_s02" in obj) {
          return [obj.thumbnail_pic_s,obj.thumbnail_pic_s02];
      }
      if ("thumbnail_pic_s" in obj){
         return [obj.thumbnail_pic_s];
      }
  },
  onLoad: function () {
      this.onPullDownRefresh();
  },
  onPullDownRefresh: function(){
      this.requestHTTP();
  },
  array_contain: function(obj) {  
      var i = this.globalData.tempArrs.length;  
      while (i--) {  
          if (this.globalData.tempArrs[i].title === obj.title) { 
              console.log("true"); 
              return true;  
          }  
      }  
      console.log("false"); 
      return false;  
  },
  geturlPath: function (url) {
      var  index = url.indexOf("mobile/");
      if (index > 0) {
        url = url.substring(index);
        return   url.replace(".html","");
      }
  },
  requestHTTP: function() {
    var that = this
    console.log("requestHTTP");
    wx.request({
        url: 'https://v.juhe.cn/toutiao/index',
        data: {
          'type': "guonei",
          'key':"b507a3b73efeed900881032d1ed14e51"
        },
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        // header: {}, // 设置请求的 header
        success: function(res){
          // success
          const dataArrs = res.data.result.data
          for(var i = 0; i < dataArrs.length; i++) {
               console.log(i);
               var obj = dataArrs[i];
               obj.countArrs = that.imageCount(obj);
               obj.httpurl = that.geturlPath(obj.url);
               if (that.array_contain(obj)) {continue};
              that.globalData.tempArrs.push(obj);
          }
          that.setData({
             dataArr: that.globalData.tempArrs
          })
            wx.stopPullDownRefresh();
        },
        fail: function() {
          // fail
        },
        complete: function() {
          // complete
        }
    })
  },
  globalData: {
    tempArrs: []
  }
})
