(function () {
    listToArray:function listToArray(likeArray) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeArray, 0);
        } catch (e) {
            for (var i = 0; i < likeArray.length; i++) {
                ary[ary.length] = likeArray[i];
            }
        }
        return ary;
    }
    ,
    toJSON:function toJSON(str) {
        "JSON"in window ? JSON.parse(str) : eval("(" + str + ")");
    }
    ,
    /*
     * Num.1 : Methods for obtaining DOM elements
     */
    getElementByClass:function getElementByClass(strClass, context) {
        context = context || document;
        var strAry = strClass.replace(/(^\s+)|(\s+$)/g, "").split(/\s+/), tagList = context.getElementsByTagName("*"), ary = [];
        for (var i = 0; i < tagList.length; i++) {
            var curTag = tagList[i];
            curTag.flag = true;
            for (var j = 0; j < strAry.length; j++) {
                var reg = new RegExp("(^|\s+)" + strAry[j] + "(\s+|$)");
                if (!reg.test(curTag.className)) {
                    curTag.flag = false;
                    break;
                }
            }
            curTag.flag ? ary[ary.length] = curTag : null;
        }
        return ary;
    }
    ,
    getElementByClass:function getElementByClass(strClass, context) {
        context = context || document;
        var strAry = strClass.replace(/(^\s+)|(\s+$)/g, ""), tagList = context.getElementsByTagName("*"), ary = [];
        for (var i = 0; i < tagList.length; i++) {
            var curTag = tagList[i];
            curTag.frag = true;
            for (var j = 0; j < strAry.length; j++) {
                var reg = new RegExp("(^|\s+)" + strAry[j] + "(\s+|$)");
                if (!reg.test(curTag.className)) {
                    curTag.frag = false;
                    break;
                }
            }
            curTag.frag ? ary[ary.length] = curTag : null;
        }
        return ary;
    }
    ,
    children:function children(curEle, tagName) {
        var nodeList = curEle.childNodes, ary = [];
        for (var i = 0; i < nodeList.length; i++) {
            var curNode = nodeList[i];
            if (curNode.nodeType === 1) {
                if (!typeof curNode === "undefined") {
                    var curNodeLow = curNode.className.toLowerCase(),
                        tagNameLow = tagName.toLowerCase();
                    if (curNodeLow === tagNameLow) {
                        ary[ary.length] = curNode;
                    }
                    continue;
                }
                ary[ary.length] = curNode;
            }
        }
        return ary;
    },
    prev:function prev(curEle){
        if("previousElementSibling"in window){
            return curEle.previousElementSibling;
        }
        var pre=curEle.previousSibling;
        while(pre&&pre.nodeType!==1){
            pre=pre.previousSibling;
        }
        return pre;
    },
    prevAll:function prevAll(curEle){
        var pre=this.prev(curEle),ary=[];
        while(pre){
            ary.unshift(pre);
            pre=this.prev(pre);
        }
        return ary;
    },
    getIndex:function getIndex(curEle){
        return this.prevAll(curEle).length;
    },
    next:function next(curEle){
        if("nextSibling"in window){
            return curEle.nextElementSibling;
        }
        var nex=curEle.nextSibling;
        if(nex&&nex.nodeType!==1){
            next=nex.nextSibling;
        }
        return nex;
    },
    nextAll:function nextAll(curEle){
        var nex=this.next(curEle),ary=[];
        while(nex){
            ary[ary.length]=nex;
            nex=this.next(nex);
        }
        return ary;
    }
    sibling:function sibling(curEle){
        var pre=this.prev(curEle),nex=this.next(curEle),ary=[];
        pre?ary[ary.length]=pre:null;
        nex?ary[ary.length]=nex:null;
        return ary;
    }
    siblings:function siblings(curEle){
        var preA=this.prevAll(curEle),nexA=this.nextAll(curEle),ary=[];
        return preA.concat(nexA);
    }
    first:function first(curEle,tagName){
        return this.children(curEle,tagName)[0];
    }
    last:function last(curEle,tagName){
        return this.children(curEle,tagName)[ary.length-1];
    }
    listToArray:function listToArray(likeArray){
        var ary=[];
        try{
            return Array.prototype.slice.call(likeArray,0);
        }catch(e){
            for(var i=0;i<likeArry.length;i++){
                ary[ary.length]=likeArray[i];
            }
        }
        return ary;

    }
    toJSON:function toJSON(str){
        return "JSON"in windoew?JSON.parse(str):eval("("+str+")");
    }
    getElementsByClass:function getElementsByClass(strClass,context){
        var strAry=strClass.replace(/(^\s+)|(\s+$)/g,"").split(/\s+/);
        var tagList=contex.getElementsByTagName("*");

    }

})();

