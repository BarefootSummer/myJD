/**
 * Created by zhangyonglan on 2015/11/13.
 */
var utils={

    offset:function(curEle){
        var offsetP=curEle.offsetParent();
        var l=curEle.offsetLeft;
        var t=curEle.offsetTop;
        while(offsetP){
            if(navigator.userAgent.indexOf("MSIE 8.0")<0){
                l+=curEle.clientLeft;
                t+=curEle.clientTop;
            }
            l+=curEle.offsetLeft;
            t+=curEle.offsetTop;
        }
        return {top:t,left:l};
    }
};