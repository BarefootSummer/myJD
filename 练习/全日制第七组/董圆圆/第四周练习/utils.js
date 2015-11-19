var utils = {
    listToArray: function (likeArray) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeArray, 0);
        } catch (e) {
            for (var i = 0; i < likeArray.length; i++) {
                ary[ary.length] = likeArray[i]
            }
            return ary;
        }
    },
    toJSON: function (str) {
        try {
            return JSON.parse(str);
        } catch (e) {
            return eval("(" + str + ")");
        }
    },
    offset: function (curEle) {
        var l = curEle.offsetLeft;
        var t = curEle.offsetTop;
        var offsetP = curEle.offsetParent;
        if (navigator.userAgent.indexOf("MSIE 8.0") < 0) {
            l += offsetP.clientLeft;
            t += offsetP.clientTop;
        }
        l += offsetP.offsetLeft;
        t += offsetP.offsetTop;
        offsetP = offsetP.offsetParent;
        return {
            left: l,
            top: t
        }
    },
    getIndex: function getIndex(ele) {
        var p = ele.previousSibling;
        var index = 0;
        while (p) {
            if (p.nodeType === 1) {
                index++;
            }
            p = p.previousSibling;
        }
        return index;
    },
    siblings: function (ele) {
        var a = [];
        var p = ele.previousSibling;
        while (p) {
            if (p.nodeType === 1) {
                a.unshift(p);
            }
            p = p.previousSibling;
        }
        var next = ele.nextSibling;
        while (next) {
            if (next.nodeType === 1) {
                a.push(next);
            }
            next = next.nextSibling;
        }
        return a;
    },
    next: function next(ele) {//nextElementSibling
        /* if(ele.nextElementSibling){
         return ele.nextElementSibling;
         }*/
        if (typeof ele.nextElementSibling == "object") {
            return ele.nextElementSibling;
        } else {
            var next = ele.nextSibling;
            while (next) {
                if (next.nodeType === 1) {
                    return next;
                }
                next = next.nextSibling;
            }
            return null;
        }
    },
    pre:function pre(ele){

    },
    children:function children(ele,tagName){//���eleԪ��ָ����ǩ������Ԫ��  tagName�������ַ���
        var childNodes=ele.childNodes;
        var a=[];
        tagName=tagName.toUpperCase();
        if(typeof tagName=="string"){
            var reg=new RegExp("^"+tagName+"$");
        }else if(typeof tagName=="undefined"){
            var reg=/^[A-Z][A-Z0-9_]*$/;
        }else{
            throw new Error("����");
        }
        for(var i=0;i<childNodes.length;i++){
            var child=childNodes[i];
            if(reg.test(child.nodeName)){
                a.push(child);
            }
        }
        return a;

    },
    //
    getElesByClass:function getElesByClass(strClass,eles){
        var reg=new regExp("(^| )"+strClass+"( |$)");
       // var eles=document.getElementsByTagName("*");
        var a=[];
        for(var i=0;i<eles.length;i++){
            var ele=eles[i];
            if(reg.test(ele.className)){
                a.push(ele);
            }
        }
        return a;
    }
//
};
