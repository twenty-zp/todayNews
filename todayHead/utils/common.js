function getTagContent(htmlStr,tagName,property) {
    
 	tagName = "<"+tagName+property+">([\\s\\S]*?)<\\/"+tagName+">";
 	// /<head>([\s\S]*?)<\/head>/
 	var reg = new RegExp(tagName);
 	// console.log(reg);
    return  reg.exec(htmlStr);
}

function replaceTagContent(htmlStr,originTagName,toTagName) {
	while(htmlStr.indexOf(originTagName) >= 0) {
		htmlStr =  htmlStr.replace(originTagName,toTagName)
	}
	return  htmlStr
}

module.exports.getTagContent = getTagContent
exports.replaceTagContent = replaceTagContent
