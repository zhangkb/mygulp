$(function(){function e(){var e={url:"http://static.api.le.com/cmsdata/block/7731.json",data:{vipcsrf:$.cookie("vipcsrf")},callback:"callback",load:!1,success:function(e){if(e.blockContent&&e.blockContent.length){var e=e.blockContent[0];e.pic1?($("#bannerWrap").append("<img src="+e.pic1+' alt="" />'),e.remark&&$(".preview-banner-wrap").css("backgroundColor",e.remark),$("#bannerWrap").show()):$("#bannerWrap").hide()}}};ajaxRequestJsonP(e)}function i(e,i){return e.sort(function(e,r){var o=parseFloat(e[i]),a=parseFloat(r[i]);return a-o})}function r(e,r){var a={url:e,data:{vipcsrf:$.cookie("vipcsrf")},callback:"callback",load:!1,success:function(e){e.blockContent&&e.blockContent.length&&(i(e.blockContent,"priority"),o(e.blockContent,r))}};ajaxRequestJsonP(a)}function o(e,i){var r="",o="",a="",t="",s="";$("#previewCon").html(""),"0"==i?(a="preview-notice-btn",o="抢先预告"):"1"==i&&(o="立即播放",a="preview-now-btn");for(var n=0;n<e.length;n++){if(t=n%2!=0?"preview-timeline-wrap-even":"",r+='<div class="preview-timeline-wrap '+t+'">',r+=' <div class="preview-timeline-top">',r+=' <i class="preview-timeline-dot"></i>',e[n].remark&&e[n].remark.split("=")[0]&&(r+="<span>"+e[n].remark.split("=")[0]+"</span>"),r+="</div>",r+='<div class="preview-timeline-con">',r+=' <div class="preview-timeline-pic">',e[n].url?(r+="<a href="+e[n].url+' target="_blank">  <i class="preview-hover"></i>',s=e[n].url):(r+='<a href="javascript:void(0)">',s="javascript:void(0)"),r+=e[n].pic1?"<img src="+e[n].pic1+">":'<img src="http://i3.letvimg.com/lc07_iscms/201607/28/16/53/d4f324d471c548de9bf543b92387c21e.png">',r+="</a>",r+=" </div>",r+=' <div class="preview-timeline-video-con">',r+='     <i class="preview-up-arrow"></i>',e[n].title&&(r+="<h2>"+e[n].title),e[n].remark&&e[n].remark.split("=")[1]&&(r+="<span>"+e[n].remark.split("=")[1]+"</span><br />"),e[n].position&&(r+='  <p class="preview-color-gay">'+e[n].position+"</p>"),r+="</h2>",e[n].album){var c=e[n].album.starring,p=e[n].album.subCategory,l=[],v=[],m="",u="";if(c){for(var h in c)l.push(c[h]),m=l.join("/");r+='<p class="preview-starring"><span class="preview-color-gay">主演：</span>'+m+"</p>"}if(p){for(var h in p)v.push(p[h]),u=v.join("/");r+='  <p class = "preview-type" > <span class = "preview-color-gay" > 类型： </span>'+u+"</p > "}e[n].shorDesc&&(r+='     <p class="preview-color-gay">'+e[n].shorDesc+"</p>")}else e[n].shorDesc&&e[n].shorDesc.split("=")[0]&&(r+='<p class="preview-starring"><span class="preview-color-gay">主演：</span>'+e[n].shorDesc.split("=")[0]+"</p>"),e[n].subTitle&&(r+=' <p class="preview-type"><span class="preview-color-gay">类型：</span>'+e[n].subTitle.split(",").join("/")+"</p>"),e[n].shorDesc&&e[n].shorDesc.split("=")[1]&&(r+='<p class="preview-color-gay preview-description">'+e[n].shorDesc.split("=")[1]+"</p>");r+="<a href="+s+" class="+a+' target="_blank">'+o+"</a>",r+="</div>",r+="</div>",r+="</div>"}$("#previewCon").append(r)}function a(){0==$(this).index()?r("http://static.api.le.com/cmsdata/block/7628.json","0"):r("http://static.api.le.com/cmsdata/block/7639.json","1"),$(this).addClass("preview-nav-cur").siblings().removeClass("preview-nav-cur")}function t(){if(LEPass&&LEPass.isLogin()){var e={url:"http://api.membership.levp.go.le.com/backend-act-user-info/act/user/membership/info",data:{vipcsrf:$.cookie("vipcsrf"),term:"141001"},load:!1,success:function(e){if("0"==e.head.ret){var i=e.body.membershipInfo;"pro"==i.membershipType?(console.log("超级会员又有可能是双会员"),$(".preview-open-member").attr("href","http://zhifu.le.com/tobuy/pro?ref=dpnrtg_pc?fronturl="+encodeURIComponent(window.location.href)).text("续费影视会员")):"normal"==i.membershipType?($(".preview-open-member").attr("href","http://zhifu.le.com/tobuy/regular?ref=hyygktan_pc&fronturl="+encodeURIComponent(window.location.href)).text("续费影视会员"),console.log("乐次元")):"user"==i.membershipType&&($(".preview-open-member").attr("href","http://zhifu.le.com/tobuy/regular?ref=hyygktan_pc&fronturl="+encodeURIComponent(window.location.href)).text("开通影视会员"),console.log("非会员"))}else $(".preview-open-member").attr("href","javascript:void(0)").text("请稍后重试")}};ajaxRequestJsonP(e)}}function s(){t(),e(),r("http://static.api.le.com/cmsdata/block/7628.json",0)}window.onload=function(){LEPass.onStatusChange(function(e,i){window.location.href=window.location.href+"?"+(new Date).getTime()})},s(),$(".preview-nav-wrap li").bind("click",a),$(".preview-open-member").bind("click",verifyUserLoginStatus),$(document).on("mouseover",".preview-timeline-pic a",function(){$(this).children().eq(0).show()}),$(document).on("mouseout",".preview-timeline-pic a",function(){$(this).children().eq(0).hide()})});