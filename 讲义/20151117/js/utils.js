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

//getElementsByClass：We get the elements through the style class, solve the getElementsByClassName not compatible in IE6~8
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

//children：Gets all the elements of the element under the current specified element (which can specify a specific tag).
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

//prev：Gets the last element node of the current element
_utils.prev = function prev(curEle) {
    if ("previousElementSibling" in curEle) {
        return curEle.previousElementSibling;
    }
    var pre = curEle.previousSibling;
    while (pre && pre.nodeType !== 1) {
        pre = pre.previousSibling;
    }
    return pre;
};

//prevAll：Gets all of the elements of the current element for the node
_utils.prevAll = function prevAll(curEle) {
    var pre = this.prev(curEle), ary = [];
    while (pre) {
        ary.unshift(pre);
        pre = this.prev(pre);
    }
    return ary;
};

//getIndex：Gets the index of the current element
_utils.getIndex = function getIndex(curEle) {
    return this.prevAll(curEle).length;
};

//next：Gets the next younger brother element node of the current element
_utils.next = function next(curEle) {
    if ("nextElementSibling" in curEle) {
        return curEle.nextElementSibling;
    }
    var nex = curEle.nextSibling;
    while (nex && nex.nodeType !== 1) {
        nex = nex.nextSibling;
    }
    return nex;
};

//nextAll：Gets all elements of the elements of the current element
_utils.nextAll = function nextAll(curEle) {
    var nex = this.next(curEle), ary = [];
    while (nex) {
        ary[ary.length] = nex;
        nex = this.next(nex);
    }
    return ary;
};

//sibling：Gets the neighboring elements of the current element
_utils.sibling = function sibling(curEle) {
    var pre = this.prev(curEle), nex = this.next(curEle), ary = [];
    pre ? ary[ary.length] = pre : null;
    nex ? ary[ary.length] = nex : null;
    return ary;
};

//siblings：Gets all elements of the elements of the current element
_utils.siblings = function siblings(curEle) {
    var preA = this.prevAll(curEle), nexA = this.nextAll(curEle);
    return preA.concat(nexA);
};

//first：Gets the first element child node of the current element (you can specify the name of the tag)
_utils.first = function first(curEle, tagName) {
    return this.children(curEle, tagName)[0];
};

//last：Gets the last element of the current element and the child node (which can specify the name of the tag)
_utils.last = function last(curEle, tagName) {
    var child = this.children(curEle, tagName);
    return child[child.length - 1];
};


/*
 * Num.2 : Methods for obtaining DOM style
 */

//css：Gets or sets the style of the current element (third value values are obtained, and the value is set).
_utils.css = function css(curEle, attr, value) {
    //get style
    var reg = /^[+-]?(\d|([1-9]\d+))(\.\d+)?(px|pt|em|rem)$/;
    if (typeof value === "undefined") {
        var val = "getComputedStyle" in window ? window.getComputedStyle(curEle, null)[attr] : curEle.currentStyle[attr];
        return reg.test(val) ? parseFloat(val) : val;
    }
    
    //set style
    reg = /^(width|height|top|left|right|bottom|((margin|padding)(Left|Top|Right|Bottom)?))$/;
    if (attr === "opacity") {
        if (value >= 0 && value <= 1) {
            curEle["style"]["opacity"] = value;
            curEle["style"]["filter"] = "alpha(opacity=" + value * 100 + ")";
        }
    } else if (attr === "float") {
        curEle["style"]["cssFloat"] = value;
        curEle["style"]["styleFloat"] = value;
    } else if (reg.test(attr)) {
        curEle["style"][attr] = isNaN(value) ? value : value + "px";
    } else {
        curEle["style"][attr] = value;
    }
};
















































