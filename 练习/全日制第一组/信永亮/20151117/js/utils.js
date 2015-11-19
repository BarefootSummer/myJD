/**
 * Created by myfir on 2015/11/17.
 */
/*
 * utils(v1.0): Which contains the common method of operating DOM
 * by Team on 2015/11/17
 */
var utils = {
    listToArray: function listToArray(likeAry) {
        var ary = [];
        try {
            ary = Array.prototype.slice.call(likeAry, 0);
        } catch (e) {
            for (var i = 0; i < likeAry.length; i++) {
                ary[ary.length] = likeAry[i];
            }
        }
        return ary;
    },
    toJSON: function toJSON(str) {
        return "JSON" in window ? JSON.parse(str) : eval("(" + str + ")");
    }
};
var _utils = utils;

/*
 * Num.1 : Methods for obtaining DOM elements
 */
_utils.getElementsByClass = function getElementsByClass(strClass, context) {
    //this->_utils
    context = context || document;

    //To determine whether the current browser is compatible with our getElementsByClassName approach, we can use this method directly, in the context of the implementation of context
    if ("getElementsByClassName" in document) {
        return this.listToArray(context.getElementsByClassName(strClass));
    }

    //In case of not compatible with this method we have to write code to handle compatible
    var strAry = strClass.replace(/(^ +)|( +$)/g, "").split(/\s+/), tagList = context.getElementsByTagName("*"), ary = [];
    for (var i = 0; i < tagList.length; i++) {
        var curTag = tagList[i];
        curTag.flag = true;
        for (var k = 0; k < strAry.length; k++) {
            var reg = new RegExp("(^| +)" + strAry[k] + "( +|$)");
            if (!reg.test(curTag.className)) {
                curTag.flag = false;
                break;
            }
        }
        curTag.flag ? ary[ary.length] = curTag : null;
    }
    return ary;
};

_utils.children = function children(curEle, tagName) {
    var nodeList = curEle.childNodes, ary = [];
    for (var i = 0; i < nodeList.length; i++) {
        var curNode = nodeList[i];
        if (curNode.nodeType === 1) {
            if (typeof tagName === "string") {
                var curNodeLow = curNode.nodeName.toLowerCase();
                var tagNameLow = tagName.toLowerCase();
                if (curNodeLow === tagNameLow) {
                    ary[ary.length] = curNode;
                }
                continue;
            }
            ary[ary.length] = curNode;
        }
    }
    return ary;
};

 hasOwnProperty(key);





























