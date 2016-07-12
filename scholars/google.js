var testurl = "scholar?hl=zh-CN&q=test&btnG=&lr=";

function search(x) {
    urlObj = new Object();
    urlObj.q = references[x].original;
    urlObj.hl = "zh-CN";
    url = "scholar?" + $.param(urlObj);
    addAll();
    $.get(url, function(data, status){
        $(data).find("[aria-controls='gs_cit']").each(function(){
            var url2 = $(this).attr("onclick");
            url2 = url2.split("'")[1];
            url2 = "scholar?q=info:"+url2+":scholar.google.com/&output=cite&scirp=0&hl=zh-CN";
            addAll();
            $.get(url2, function(data, status){
                $(data).find("#gs_cit0").each(function(){
                    references[x].answer = $(this).text();
                });
                addFinish();
            });

            return false;
        });
        addFinish();
    });
}

$(document).ready(function () {
    $("#gs_hp_giants").append("<br><b id='world'>站在程序员的肩膀上</b>");
});