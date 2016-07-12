var testurl = "s?wd=test";

function findLongestStr(strs) {
    // 百度学术人名太长时无法搜索出文献
    // 筛选出句号间最长字符串，即为标题，再进行搜索
    var arr = strs.split('.');
    arr = arr.sort(function(a, b) {
        return a.length - b.length;
    });
    var longestString = arr.pop();
    return longestString;
}

function search(x) {
    urlObj = new Object();
    urlObj.wd = findLongestStr(references[x].original);
    url = "s?" + $.param(urlObj);
    addAll();
    $.get(url, function(data, status){
        $(data).find(".sc_q").each(function(){
            urlObj2 = new Object();
            urlObj2.url = $(this).attr("data-link");
            urlObj2.t = "cite";
            urlObj2.sign = $(this).attr("data-sign");
            url2 = "u/citation?" + $.param(urlObj2);
            addAll();
            $.get(url2, function(data, status){
                references[x].answer = data.sc_GBT7714;
                addFinish();
            });

            return false;
        });
        addFinish();
    });
}

$(document).ready(function () {
    $("#m").append("<p id='world'>站在程序员的肩膀上</p>");
});