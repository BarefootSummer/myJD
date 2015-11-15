//珠峰培训 2015年11月15日
var DOM = {};//实现：根据某个特定的对象实例来管理一组方法，起一个分类的作用，避免把以下这些方法再暴露成全局方法。单例模式：把一些方法组只在一个实例（对象）上进行管理。不要过度解读,不要过度理解
DOM.getIndex = function (ele) {//就是用来得到ele的索引值
    var index = 0;
    var p = ele.previousSibling;
    while (p) {
        if (p.nodeType === 1) {
            index++;
        }
        p = p.previousSibling;
    }
    return index;

}
DOM.listToArray = function (list) {
    try {
        return [].slice.call(list, 0)
    } catch (e) {
        var a = [];
        for (var i = 0; i < list.length; i++) {
            a.push(list[i]);
        }
        return a;
    }
}

DOM.offset = function (ele) {
    var l = ele.offsetLeft, t = ele.offsetTop, p = ele.offsetParent;
    while (p) {
        if (window.navigator.userAgent.indexOf("MSIE 8") > -1) {
            l += p.offsetLeft;
            t += p.offsetTop;
        } else {
            l += p.offsetLeft + p.clientLeft;
            t += p.offsetTop + p.clientTop;
        }
        p = p.offsetParent;

    }
    return {l: l, t: t}
}

//把一个元素添加为这个元素第一个子节点
DOM.prepend = function (ele, child) {//把child添加成ele的第一个元素
    ele.insertBefore(child, ele.firstChild);
}
DOM.insertAfter = function (nodeBefore, nodeNext) {
    //把nodeNext添加到nodeBefore的后边,实现的逻辑是添加到nodeBefore的弟弟的前边
    nodeBefore.parentNode.insertBefore(nodeNext, nodeBefore.nextSibling);
    //如果insertBefore没有第二个参数没有或是null，则它相当于appendChild
}

DOM.siblings = function (ele) {
    var a = [];//先定义数组，用来保存哥哥们或弟弟们
    var p = ele.previousSibling;
    while (p) {
        if (p.nodeType === 1) {
            a.unshift(p);//按顺序保存在数组里
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
};
DOM.next = function (ele) {
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
};
DOM.prev = function (ele) {
    if (typeof ele.previousElementSibling == "object") {
        return ele.previousSibling;
    } else {
        var p = ele.previousSibling;

        while (p) {
            if (p.nodeType === 1) {
                return p;
            }
            p = next.previousSibling;
        }
        return null;
    }
    //DOM.child=
};

//通过下面这个方法，把握null和undefined一些细节
DOM.next=function(ele){//nextElementSibling
	//if(ele.nextElementSibling){//这是用来检测是否支持这个属性
		//这个属性不一定有值，可能是null，如果是null，这个判断为false，但是并非是不支持这个属性。也就是说这样的判断不严谨
	if(typeof ele.nextElementSibling ==　"object"){
		//这就是为什么JS作者把null归到object类型中，而undefined就是undefined。
		//只要这个运算结果为object,无论这个这个属性有没有值，一定支持这个属性
		return ele.nextElementSibling;	
	}else{
		var next=ele.nextSibling;
		while(next){
			if(next.nodeType===1){
				return next;
			}
			next=next.nextSibling;
		}
		return null;//这方法本来应该有返回值，但是找不到，则主动的返回一个null。如果不写这句，则这个方法运行的结果是undefined，违反原则
		
	}
}
//null表示在已有的属性中没有值，则是null
//如果根本就没有这个属性，则是undefined
//在一个方法里，如果规定有返回值，但是不能找到结果，则返回null
//如果方法本身就不需要有返回值，则这个方法运行结束留下一个undefined
//课下再看一下免费课第一天教材中，关于null和undefined的区别的部分
//比如：var eles=document.getElementsByTagName("p");
//eles.item(100)是null，但eles[100]是undefined，因为前者是方法的返回值，而后者是得达一个未知的属性的值
var a=[3,4,5]
a[0];
a[100]


DOM.prev=function(ele){//previousElementSibling
	if(typeof ele.previousElementSibling == "object"){
		return ele.previousElementSibling;	
	}else{
		var p=ele.previousSibling;
		while(p){
			if(p.nodeType===1){
				return p;	
			}
			p=p.previousSibling;
		}
		return null;
	}
}


DOM.children=function(ele,tagName){//获得ele元素指定标签名的子元素
	var childNodes=ele.childNodes;
	var a=[];
	//tagName=tagName.toUpperCase();
	
	
	/*
	//获得任意元素子节点
	for(var i=0;i<childNodes.length;i++){
		var child=childNodes[i];
		if(child.nodeType===1){
			a.push(child);	
		}
	}*/
	
	/*//获得指定标签名的子元素，使用nodeName的特征
	for(var i=0;i<childNodes.length;i++){
		var child=childNodes[i];
		if(child.nodeName==tagName){//tagName是传进来的参数
			a.push(child);	
		}
	}*/
	
	//iPhone  nimeia123
	//第三种方式：第二个参数tagName是可选的，如果第二个参数不传表示获得所有的子元素。
	if(typeof tagName=="string"){
		tagName=tagName.toUpperCase();
		var reg=new RegExp("^"+tagName+"$");	
	}else if(typeof tagName=="undefined"){//如果第二个参数或传错了，则只需写一个能够匹配任意标签名的正则既可
		var reg=/^[A-Z][A-Z0-9_]*$/;//匹配一个合法的标签名，因为nodeName中的字符只有大写，所以是[A-Z];
	}else{
		throw new Error("大哥，参数整错了！！");//主动抛出异常
	}
	
	for(var i=0;i<childNodes.length;i++){
		var child=childNodes[i];
		if(reg.test(child.nodeName)){//tagName是传进来的参数
			a.push(child);	
		}
	}
	return a;		
}

//以下操作都和类样式有关：都是通过类名来操作元素的

//通过类名获得元素
DOM.getElesByClass=function getElesByClass(strClass,context){//context是上下文
	context=context||document;
	var eles=context.getElementsByTagName("*");
	if(strClass.trim){
		strClass=strClass.trim();//不但去掉了首尾空格，还把中间多余的空格也去掉了。	
	}else{
		var regTrim=/^ +| +$/g;
		strClass=strClass.replace(regTrim,"");
	}
	var aClass=strClass.split(/ +/);
	
	for(var i=0;i<aClass.length;i++){
		//eles=byClass(aClass[i],eles);
		//在下面，要把byClass实现的逻辑在这里再实现一遍
		//aClass[i]里面放的是具体每一个类名，通过这个类名生成正则，然后去匹配元素就可以了
		
		var reg=new RegExp("(^| )"+aClass[i]+"( |$)");
		var a=[];//要把筛选的结果保存下来
		for(var j=0;j<eles.length;j++){
			var ele=eles[j];
			if(reg.test(ele.className)){
				a.push(ele);	
			}
		}
		eles=a;//相当于return a之后，更新eles
			
	}
	return eles;	
}


//给指定的元素ele增加一个类名
DOM.addClass=function(ele,strClass){
	var reg=new RegExp("(^| )"+strClass+"( |$)");
	if(!reg.test(ele.className)){
		ele.className+=" "+strClass;
	}
}

//
DOM.removeClass=function(ele,strClass){
	var reg=new RegExp("(^| )"+strClass+"( |$)","g");
	ele.className=ele.className.replace(reg," ");//这儿是空格，不是空字符串
	
	//"a b c";如果是去掉b，用正则匹配捕获到的是" b ",如果用空字符串替换，a和c就粘在一起了
	
}





