var str = '\
<div id="newone" class="container">\
    <div class="row">\
        <div class="col-sm-12">\
            <textarea id="initial" class="form-control" rows="3" placeholder="在此输入引用，建议不要超过20，以免触发谷歌学术的人机身份验证"></textarea>\
        </div>\
    </div>\
    <div class="row">\
        <div id="pass" class="col-sm-12">\
            <div id="fail" class="alert alert-danger" style="display:none;" role="alert">\
                <strong>失败数量过多!</strong>\
                <a id="failurl" target="_blank" class="alert-link">点我进行人机身份验证</a>\
                若未触发验证，说明该文章大量引用未收录\
            </div>\
            <div class="progress">\
                <div id="progress" class="progress-bar progress-bar-warning progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 0%">\
                    0/0\
                </div>\
            </div>\
            <div id="start" class="btn btn-info">开始</div>\
            <div id="start2" class="btn btn-default" disabled="disabled" style="display:none;">开始</div>\
            <div id="clean" class="btn btn-info">清空</div>\
            <div id="back" class="btn btn-default">返回学术搜索</div>\
            <div id="answers"></div>\
        </div>\
    </div>\
</div>\
'

var references;
var allajax;
var finishajax;

function init() {
    references = new Array();
    allajax = 0;
    finishajax = 0;
    $("head").empty();
    $("body").empty().append(str);
}

function update() {
    var percent = finishajax / allajax * 100;
    $("#progress").css("width", percent + "%");
    $("#progress").text(finishajax + " / " + allajax);
    if (finishajax == allajax) {
        $("#progress").removeClass("progress-bar-striped");
        $("#progress").removeClass("progress-bar-warning");
        $("#progress").addClass("progress-bar-success");
        showResult();
    }
}

function addAll() {
    allajax++;
    update();
}

function addFinish() {
    finishajax++;
    update();
}

function showResult() {
    var searchFail = 0;
    for (x in references) {
        if (typeof references[x].answer == "undefined") {
            searchFail++;
            $("#answers").append($("<p></p>").text(references[x].original).addClass("text-danger"));
        } else {
            $("#answers").append($("<p></p>").text(references[x].answer));
        }
        if (searchFail / references.length > 0.8) {
            $("#failurl").attr("href", testurl);
            $("#fail").show();
        }
    }
}

function searchAll() {
    for (x in references) {
        search(x);
    }
}

$(document).ready(function () {
    $('body').on('click', '#world', function() {
        init();
    });

    $('body').on('click', '#clean', function() {
        init();
    });

    $('body').on('click', '#back', function() {
        window.location.reload();
    });

    $('body').on('click', '#start', function() {
        $(this).hide();
        $("#start2").show();
        var initial = $("#initial").val();
        var strs = initial.split("\n");
        for (x in strs) {
            references[x] = new Object();
            references[x].original = strs[x];
        }
        searchAll();
    });

});
