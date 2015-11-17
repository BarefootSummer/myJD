/**
 * Created by zhangyonglan on 2015/11/15.
 */
var DOM={}
DOM.getIndex=function getIndex(ele){//获取当前元素的索引
    var index=0;
    var p=ele.previousSibling;
    while(p){
        if(p.nodeType==1){
            index++;  //元素前边有几个元素，则次元素的索引就是几
        }
        p= p.previousSibling;
    }
    return index;

    /*var index=0;
    var p=ele.parentNode.firstChild;
    while(p){
        if(p==this)break;
        if(p.nodeType==1){
            index++;
        }
        p= p.nextSibling;
    }*/
};
DOM.prepend=function(ele,child){//为ele添加第一个子元素
    ele.insertBefore(child,ele.firstChild);
};
DOM.insertAfter=function (ele,eleAfter){
     ele.parentNode.insertBefore(eleAfter,ele.nextSibling);
};
DOM.siblings=function(ele){
    var a=[];
    var p=ele.previousSibling;
    while(p){
        if(p.nodeType==1){
            a.unshift(p);
        }
        p= p.previousSibling;
    }
    var n=ele.nextSibling;
    while(n){
        if(n.nodeType==1){
            a.push(n);
        }
        n= n.nextSibling;
    }
    return a;
};
DOM.next=function(ele){//返回ele的下一个元素节点
    if(typeof ele.nextElementSibling=="Object"){
        return ele.nextElementSibling;
    }else{
        var next=ele.nextSibling;
        while(next){
            if(next.nodeType==1){
                return next;
            }
            next=next.nextSibling;
        }
        return null;
    }

};
DOM.pre=function(ele){
    if(typeof ele.previousElementSibling=="Object"){
        return ele.previousElementSibling;
    }else{
        var pre=ele.previousSibling;
        while(pre){
            if(pre.nodeType==1){
                return pre;
            }
            pre=pre.previousSibling;
        }
        return null;
    }
};
DOM.children=function(ele,tagName){
   /* var children=ele.children;
    var a=[];
    for(var i=0;i<children.length;i++){
        var child=children[i];
        if(child.nodeName==tagName){
            a.push(child);
        }
    }
    return a;*/
    var children=ele.children;
    var a=[];
    if(typeof tagName=="string"){
        tagName=tagName.toUpperCase();
        var reg=new RegExp("^"+tagName+"$");
    }else if(typeof tagName=="undefined"){
        var reg=/^[A-Z][A-Z0-9_]*$/;

    }else{
        throw new Error("参数错误");
    }
    for(var i=0;i<children.length;i++){
        var child=children[i];
        if(reg.test(tagName)){
            a.push(child);
        }
    }
    return a;

};
DOM.getElesByClass=function(){

};
DOM.addClass=function(ele,strClass){
    var reg=new RegExp("(^| )"+strClass+"( |$)","g");
    if(!reg.test(strClass)){
        ele.className+=strClass;
    }
};
DOM.removeClass=function(ele,strClass){
    var reg=new RegExp("(^| )"+strClass+"( |$)","g");
    /*if(reg.test(strClass)){
        //strClass="";
    }*/
    ele.className=ele.className.replace(reg,"");
};