/**
 * 通用JS库
 */


/********************************************  
*  Layer弹层 Start
********************************************/
var _index_loading; //加载中层

/*
    title	标题
    url		请求的url
*/
function OpenWin(title, url) {
    var param = ParseQuery(url);
    if (title == null || title == '') {
        title = Request.QueryString('t', url); //param['t'];
    };
    if (title == "")
        title = "请取一个页面标题";
    if (url == null || url == '') {
        url = "404.html";
    };

    var w = Request.QueryString('w', url);
    var h = Request.QueryString('h', url);
    var id = Request.QueryString('frameid', url);// param['frameid'];
    var isMaxMin = Request.QueryString('maxmin', url);//param['maxmin'];

    if (w == null || w == '') {
        w = 800;
    };
    if (h == null || h == '') {
        h = ($(window).height() - 50);
    };
    if (id == null) {
        id = '';
    }
    if (isMaxMin == null) {
        isMaxMin = false;
    }
    layer.open({
        type: 2,
        id: id,
        area: [w + 'px', h + 'px'],
        fix: true, //不固定
        maxmin: isMaxMin,
        shade: 0.4,
        title: title,
        anim: -1,
        content: [url, 'yes'],
        scrollbar: true,
        shadeClose: true//是否点击遮罩关闭
    });
}

/**关闭弹窗
*默认关闭最新弹出的窗体
**/
function CloseWin() {
    layer.close(layer.index);
}

function CloseWinSelf() {
    var index = parent.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    parent.layer.close(index);
}

function TopCloseWinSelf() {
    var index = top.layer.getFrameIndex(window.name); //先得到当前iframe层的索引
    top.layer.close(index);
}

function LoadingFunc(bool) {
    if (bool) {
        ShowLoading();
    } else {
        setTimeout(HidenLoading, 800);
    }
}
/**
 * 隐藏加载图片
*/
function HidenLoading() {
    layer.close(_index_loading);
}

/**显示加载
*/
function ShowLoading() {
    _index_loading = layer.load(1);
}

/**关闭并重新加载页面
**/
function ReloadAndClose() {
    CloseWinSelf();
    parent.location.reload();
}

function ReloadSelf() {
    window.location.reload();
}

function ReloadParent() {
    parent.location.reload();
}


/**
 * 显示系统提示,需要点击确认按钮才能关闭
 * @param [String]   msg         提示内容
*/
function MessageAlertBtn(msg, callBack) {
    layer.alert(msg, function (index) {
        (callBack && typeof (callBack) === "function") && callBack();
        layer.close(index);
    });
}

/**
提示内容
 * icon 0警告1成功2错误3疑问4锁定
 两秒后消失
 */
function MessageAlert(msg, title, icon, callBack) {
    layer.msg(msg, {
        title: title,
        icon: icon,
        time: 3000, //2秒关闭（如果不配置，默认是3秒）
        btn: ["确定"],
        btnAlign: "r"
    }, function (index) {
        (callBack && typeof (callBack) === "function") && callBack();
        layer.close(index);
    });
}

/**警告提示 */
function MessageWarn(msg, callBack) {
    MessageAlert(msg, '警告', 0, callBack);
}

function TopMessageWarn(msg, callBack) {
    if (window != top) {
        top.MessageWarn(msg, '警告', 0, callBack);
    } else {
        MessageWarn(msg, '警告', 0, callBack);
    }
}

function MessageSuccess(msg, callBack) {
    MessageAlert(msg, '成功', 1, callBack);
}

function TopMessageSuccess(msg, callBack) {
    if (window != top) {
        top.MessageAlert(msg, '成功', 1, callBack);
    } else {
        MessageAlert(msg, '成功', 1, callBack);
    }
}

function MessageFailed(msg, callBack) {
    MessageAlert(msg, '失败', 2, callBack);
}

function TopMessageFailed(msg, callBack) {
    if (window != top) {
        top.MessageFailed(msg, '失败', 2, callBack);
    } else {
        MessageFailed(msg, '失败', 2, callBack);
    }
}

function MessageShow(msg, callBack) {
    MessageAlert(msg, '', 1, callBack);
}

function TopMessageShow(msg, callBack) {
    if (window != top) {
        top.MessageShow(msg, '', 1, callBack);
    } else {
        MessageShow(msg, '', 1, callBack);
    }
}


/**
 * 弹出确认提示框
 * @param [String]   msg         确认内容
 * @param [function]   confirmCallback 确认后要执行的方法
*/
var MessageConfirm = function (msg, confirmCallback) {
    layer.confirm(msg, { title: '提示' }, function (index) {
        //do something
        if ((confirmCallback && typeof (confirmCallback) === "function")) {
            confirmCallback();
        }
        layer.close(index);
    });
};

/**
 * 弹出确认提示框
 * @param {any} msg   确认内容
 * @param {any} confirmCallback 确认后要执行的方法
 */
var TopMessageConfirm = function (msg, confirmCallback) {
    if (window != top) {
        top.MessageConfirm(msg, confirmCallback);
    } else {
        MessageConfirm(msg, confirmCallback);
    }
};

/********************************************  
*  Layer弹层 END 
********************************************/

//请求方法
var Request = {
    //获取请求参数指
    QueryString: function (val, url) {
        var re = new RegExp("" + val + "=([^&?]*)", "ig");
        return ((url.match(re)) ? (decodeURI(url.match(re)[0].substr(val.length + 1))) : '');
    }
}
/* 将地址参数转为字典
 */
function ParseQuery(url) {
    var query = url.replace(/^[^\?]+\??/, '');
    var Params = {};
    if (!query) { return Params; }// return empty object
    var Pairs = query.split(/[;&]/);
    for (var i = 0; i < Pairs.length; i++) {
        var KeyVal = Pairs[i].split('=');
        if (!KeyVal || KeyVal.length != 2) { continue; }
        var key = unescape(KeyVal[0]);
        var val = unescape(KeyVal[1]);
        val = val.replace(/\+/g, ' ');
        Params[key] = val;
    }
    return Params;
}


/********************************************  
*  通用方法 Start
********************************************/


/**
 * Ajax Post请求
 * @param {*} config          参数配置
 * @param {*} successCallBack 成功回调
 * @param {*} failedCallBack  失败回调
 */
function AjaxRequest(config, successCallBack, failedCallBack) {
    ShowLoading();
    $.ajax(config).done(function (result) {
        if (result.code == 1) {
            (successCallBack && typeof (successCallBack) === "function") && successCallBack(result);
        } else if (result.code == 1000) {
            TopMessageWarn("请先登录", function () {
                if (window != top) {
                    // top.OpenWin("登录", result.redirectUrl);
                    top.location.href = result.redirectUrl;
                } else {
                    //OpenWin("登录", result.redirectUrl);
                    location.href = result.redirectUrl;
                }
            });
        } else {
            if (result.message && result.message.trim() != "") {
                TopMessageWarn(result.message);
            }
            (failedCallBack && typeof (failedCallBack) === "function") && failedCallBack(result);
        }
        HidenLoading();
    }).fail(function (err) {
        console.log(err);
        HidenLoading();
        TopMessageWarn("请求服务失败");
    });
};

/********************************************  
*  通用方法 End
********************************************/

/* 对指定元素绑定打开ifram方法
*/
function InitDailog(document) {
    $(document).click(function (event) {
        event && event.stopPropagation();
        var t = this.title || this.name || null;
        var a = this.href || this.alt;
        if (window != top) { top.OpenWin(t, a); } else {
            OpenWin(t, a);
        }
        this.blur();
        return false;
    });
}
/**
 * 最上层打开弹窗
 */
var TopOpenwin = function (t, a) {
    if (window != top) { top.OpenWin(t, a); } else {
        OpenWin(t, a);
    }
};

$(function () {
    /*弹窗绑定
    *Url: *******&h=400&w=800&t=新增
    *参数h=高度 w=宽度  t=标题
    */
    InitDailog(".openwin");
    //InitPageMudule();
})



/**初始化页面中的设置操作权限的按钮状态**/
function setRoleButtonStatus(btnItems) {
    $("[data-authority]").hide();
    $("[data-authority]").each(function (il, item1) {
        var isHasObj = false;
        var authorityClass = $(item1).data("authority");
        $(btnItems).each(function (i2, itemClass) {
            isHasObj = authorityClass === itemClass;
            if (isHasObj) {
                $(item1).show();
                return false;
            }
        })
        if (!isHasObj) {
            $(item1).remove();
        }
        //console.log(il + "|" + isHasObj);
    })
}

/*
 * 加载权限按钮
 * @param {*} pageParam 参数名称‘|’分割
 */
function InitPageMudule(pageParam) {
    var config = {
        type: "Post",
        url: "/Permission/GetFrontPemission",
        data: { pageUrlParam: pageParam }
    }
    AjaxRequest(config, function (retData) {
        console.log("该页面前端权限：" + retData.Data);
        if (retData.Data == "-1") {
            console.log("前端权限跳过验证");
            return;
        }
        setRoleButtonStatus(retData.Data);
    }, function (failData) {

    });

}

/**
 * 绑定下拉框
 * @param {*请求对象} config 
 * @param {*绑定对象} obj 
 * @param {*值字段名称} objVal 
 * @param {*文本字段名称} objTxt
 * @param {*属性字段名称} objAttribute
 * @param {*当前选中值} currentVal 
 * @param {*选中回调方法} changeCallBack 
 * @param {*成功回调方法} sucessCallBack 
 * @param {*是否Select2} isSelect2 
 */
var BindSelectOption = function (config, obj, objVal, objTxt, objAttribute, currentVal, changeCallBack, sucessCallBack, isSelect2) {
    $(obj).html("");
    $("<option></option>").val("").text("-请选择-").appendTo($(obj));
    AjaxRequest(config, function (successData) {
        $.each(successData.Data, function (i, item) {
            var tmp = $("<option></option>");
            tmp.val(item[objVal]).text(item[objTxt]);
            if (currentVal !== null && currentVal !== undefined && currentVal !== "" && item[objVal].toString() === currentVal) {
                tmp.attr("selected", true);
            }
            if (objAttribute && objAttribute !== undefined) {
                tmp.attr("data-" + objAttribute, item[objAttribute]);
            }
            tmp.appendTo($(obj))
        });

        if (isSelect2 === true) {
            LoadCss("/Content/script/Select2/css/select2.min.css");
            $.getScript("/Content/script/Select2/js/select2.min.js", function () {
                console.log("select2 loaded");
                $(obj).select2({
                    closeOnSelect: true
                });
            });
        }
        if ((sucessCallBack && typeof (sucessCallBack) === "function")) {
                sucessCallBack();
        }
    });

    if ((changeCallBack && typeof (changeCallBack) === "function")) {
        $(obj).on("change", function () {
            changeCallBack();
        })
    }

};

/**
 * 加载css文件
 * @param {*路徑} cssPath 
 */
var LoadCss = function (cssPath) {
    var hasCss = $("head").children("link[href='" + cssPath + "']").length;
    if (hasCss === 0)
        $("<link>").attr({ rel: "stylesheet", type: "text/css", href: cssPath }).appendTo("head");
}