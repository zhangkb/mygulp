$(function(){




    function processError(ret) {
        var msg;
        switch (ret) {
            case 4:
                msg = '稍后重试';
                break;
            case 6:
                msg = '活动已结束';
                break;
            case 5:
                msg = '活动未开始';
                break;
            case 10:
                msg = '请输入正确的手机号';
                break;
            case 21:
                msg = '验证码有误';
                break;
            case 22:
                msg = '您暂时还不能参加此次活动';
                break;
            case 23:
                msg = '礼品已抢光';
                break;
            default:
                msg = '粗错咯,待会儿再试试';
        }
        return msg;
    }


    /**
     * 初始化top图
     */

    function initBanner() {
        var config = {
            url: "http://static.api.le.com/cmsdata/block/7731.json",
            data: {
                vipcsrf: $.cookie('vipcsrf'),
            },
            callback: 'callback',
            load: false,
            success: function(data) {
                if (data.blockContent && data.blockContent.length) {
                    var bannerLink = "",
                        bannerStr = "",
                        data = data.blockContent[0];
                    if (data.pic1) {
                        $("#bannerWrap").append('<img src=' + data.pic1 + ' alt="" />');
                        if (data.remark) {
                            $(".preview-banner-wrap").css("backgroundColor", data.remark);
                        }
                        $("#bannerWrap").show();
                    } else {
                        $("#bannerWrap").hide();
                    }
                }
            }
        }
        ajaxRequestJsonP(config)
    }

    //数据按照权重排序
    function sortByKey(array, key) {
        return array.sort(function(a, b) {
            var x = parseFloat(a[key]);
            var y = parseFloat(b[key]);
            return y - x;
        });
    }

    /**
     * 获取时间轴数据
     * album 判断是否是pid所包含的参数
     * sortByKey 权重从大到小排序
     * url 即将上线/正在热播 的ajax地址
     * num ：0 说明即将上线的ajax , 1说明是正在热播的ajax 
     */
    function initTimeLine(url, num) {
        var config = {
            url: url,
            data: {
                vipcsrf: $.cookie('vipcsrf'),
            },
            callback: 'callback',
            load: false,
            success: function(data) {
                if (data.blockContent && data.blockContent.length) {
                    sortByKey(data.blockContent, 'priority');
                    stringConcat(data.blockContent, num);
                }
            }
        }
        ajaxRequestJsonP(config)
    }

    /**
     * 时间轴字符串拼接，data值分别两种：正在热播、即将上线
     * num ：0 说明即将上线的ajax , 1说明是正在热播的ajax 
     */
    function stringConcat(data, num) {
        var codeHtml = "",
            btnText = "",
            classNameBtn = "",
            classNameWrap = "",
            urlVid = "";
        $("#previewCon").html("");
        if (num == "0") {
            classNameBtn = "preview-notice-btn";
            btnText = "抢先预告";
        } else if (num == "1") {
            btnText = "立即播放";
            classNameBtn = "preview-now-btn";
        }
        for (var i = 0; i < data.length; i++) {
            if (!(i % 2 == 0)) {
                classNameWrap = 'preview-timeline-wrap-even';
            } else {
                classNameWrap = "";
            }
            codeHtml += '<div class="preview-timeline-wrap ' + classNameWrap + '">';
            codeHtml += ' <div class="preview-timeline-top">';
            codeHtml += ' <i class="preview-timeline-dot"></i>';
            if (data[i].remark && data[i].remark.split("=")[0]) {
                codeHtml += '<span>' + data[i].remark.split("=")[0] + '</span>';
            }
            codeHtml += '</div>';
            codeHtml += '<div class="preview-timeline-con">';
            codeHtml += ' <div class="preview-timeline-pic">';
            if (data[i].url) {
                codeHtml += '<a href=' + data[i].url + ' target="_blank">  <i class="preview-hover"></i>';
                urlVid = data[i].url;
            } else {
                codeHtml += '<a href="javascript:void(0)">';
                urlVid = 'javascript:void(0)';
            }
            if (data[i].pic1) {
                codeHtml += '<img src=' + data[i].pic1 + '>';
            } else {
                codeHtml += '<img src="http://i3.letvimg.com/lc07_iscms/201607/28/16/53/d4f324d471c548de9bf543b92387c21e.png">';
            }
            codeHtml += '</a>';
            codeHtml += ' </div>';
            codeHtml += ' <div class="preview-timeline-video-con">';
            codeHtml += '     <i class="preview-up-arrow"></i>';
            if (data[i].title) {
                codeHtml += '<h2>' + data[i].title + '';
            }
            if (data[i].remark && data[i].remark.split("=")[1]) {
                codeHtml += '<span>' + data[i].remark.split("=")[1] + '</span><br />';
            }
            if (data[i].position) {
                codeHtml += '  <p class="preview-color-gay">' + data[i].position + '</p>';
            }
            codeHtml += '</h2>';
            if (data[i].album) {
                var starring = data[i].album.starring,
                    subCategory = data[i].album.subCategory,
                    starArr = [],
                    subArr = [],
                    stars = "",
                    subArrs = "";
                if (starring) {
                    for (var k in starring) {
                        starArr.push(starring[k]);
                        stars = starArr.join("/")
                    }
                    codeHtml += '<p class="preview-starring"><span class="preview-color-gay">主演：</span>' + stars + '</p>';
                }
                if (subCategory) {
                    for (var k in subCategory) {
                        subArr.push(subCategory[k]);
                        subArrs = subArr.join("/");
                    }
                    codeHtml += '  <p class = "preview-type" > <span class = "preview-color-gay" > 类型： </span>' + subArrs + '</p > ';
                }
                if (data[i].shorDesc) {
                    codeHtml += '     <p class="preview-color-gay">' + data[i].shorDesc + '</p>';
                }
            } else {
                if (data[i].shorDesc && data[i].shorDesc.split("=")[0]) {
                    codeHtml += '<p class="preview-starring"><span class="preview-color-gay">主演：</span>' + data[i].shorDesc.split("=")[0] + '</p>';
                }
                if (data[i].subTitle) {
                    codeHtml += ' <p class="preview-type"><span class="preview-color-gay">类型：</span>' + data[i].subTitle.split(",").join("/") + '</p>';

                }
                if (data[i].shorDesc && data[i].shorDesc.split("=")[1]) {
                    codeHtml += '<p class="preview-color-gay preview-description">' + data[i].shorDesc.split("=")[1] + '</p>';
                }
            }
            codeHtml += '<a href=' + urlVid + ' class=' + classNameBtn + ' target="_blank">' + btnText + '</a>';
            codeHtml += '</div>';
            codeHtml += '</div>';
            codeHtml += '</div>';
        }
        $("#previewCon").append(codeHtml);
    }

    /**
     * tab切换，切换的同时发送请求0：即将上线，1正在热播
     */
    function tabNav() {
        if ($(this).index() == 0) {
            initTimeLine('http://static.api.le.com/cmsdata/block/7628.json', "0");
        } else {
            initTimeLine('http://static.api.le.com/cmsdata/block/7639.json', "1");
        }
        $(this).addClass("preview-nav-cur").siblings().removeClass("preview-nav-cur");
    }

    /**
     * 验证用户是否开通会员
     * @return {[type]} [description]
     */
    function openMember() {
        if (LEPass && LEPass.isLogin()) {
            var config = {
                url: 'http://api.membership.levp.go.le.com/backend-act-user-info/act/user/membership/info',
                data: {
                    vipcsrf: $.cookie('vipcsrf'),
                    term: '141001'
                },
                load: false,
                success: function(data) {
                    if (data.head.ret == "0") {
                        var userType = data.body.membershipInfo;
                        if (userType.membershipType == "pro") {
                            console.log('超级会员又有可能是双会员')
                            $(".preview-open-member").attr("href", "http://zhifu.le.com/tobuy/pro?ref=dpnrtg_pc?fronturl=" + encodeURIComponent(window.location.href)).text("续费影视会员");
                        } else if (userType.membershipType == "normal") {
                            $(".preview-open-member").attr("href", "http://zhifu.le.com/tobuy/regular?ref=hyygktan_pc&fronturl=" + encodeURIComponent(window.location.href)).text("续费影视会员");
                            console.log('乐次元')
                        } else if (userType.membershipType == "user") {
                            $(".preview-open-member").attr("href", "http://zhifu.le.com/tobuy/regular?ref=hyygktan_pc&fronturl=" + encodeURIComponent(window.location.href)).text("开通影视会员");
                            console.log("非会员")
                        }
                    } else {
                        $(".preview-open-member").attr("href", "javascript:void(0)").text("请稍后重试");
                    }
                }
            }
            ajaxRequestJsonP(config);
        }
    }


    function ininPage() {

        openMember();
        initBanner(); //初始化banner图   
        initTimeLine('http://static.api.le.com/cmsdata/block/7628.json', 0); //页面默认加载即将上线内容
    }

    window.onload=function(){
         //监测用户登录/退出状态
        LEPass.onStatusChange(function(type, userInfo) {
            window.location.href=window.location.href+"?"+ new Date().getTime();
        });
    }
    ininPage();
        //导航切换
    $(".preview-nav-wrap li").bind("click", tabNav);
    $(".preview-open-member").bind("click", verifyUserLoginStatus);

    //移入图片时候显示播放按钮反之不显示
    $(document).on("mouseover", ".preview-timeline-pic a", function() {
        $(this).children().eq(0).show();
    })
    $(document).on("mouseout", ".preview-timeline-pic a", function() {
        $(this).children().eq(0).hide();
    })
})