<template>
	<div class="footer">
		<footer class="com-footer">
			<div class="foter-content">
				<ul class="fn-clear">
					<li class="biaoshi">
						<!-- <img src="../../../static/image/index/1-8.png"/>
						<img src="../../../static/image/index/comment.png" style="position: relative;top: -20px;"/> -->
					</li>
					<li class="address">
						<p><span>版权所有：天津市粮食和物资储备局</span></p>
						<p>技术支持电话：022-27128207&nbsp;&nbsp;&nbsp;&nbsp;传真：022-27128209</p>
					</li>
					<!-- <li class="government"> -->
						<!-- <a target="_blank" href="http://121.43.68.40/exposure/jiucuo.html?site_code=6100000031&url=http%3A%2F%2Fshaanxigrain.gov.cn%2Fzscyh%2Findex.jhtml"><img src="../../../static/image/index/comment-2.png"/></a>
						<a target="_blank" href="http://www.shaanxi.gov.cn:8090/"><img src="../../../static/image/index/comment-3.png"/></a> -->
					<!-- </li> -->
				</ul>
			</div>
		</footer>
	</div>
</template>

<script>

  function setHome(obj,vrl){
    try{
      obj.style.behavior='url(#default#homepage)';obj.Page(vrl);
    }
    catch(e){
      if(window.netscape) {
        try {
          netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        }
        catch (e) {
          alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
        }

      }
    }
  }

  export default{
    methods:{
      toContact(){
        this.$router.push({path:'/contact'})
      },
      setHome(){
        alert('设为首页')
        var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
        prefs.setCharPref('browser.startup.homepage',window.location.href);
      },
      collect(){
        var url = window.location;
        var title = document.title;
        var ua = navigator.userAgent.toLowerCase();
        if (ua.indexOf("msie 8") > -1) {
          external.AddToFavoritesBar(url, '山西粮食局', '');//IE8
        } else {
          try {
            window.external.addFavorite(url, title);
          } catch (e) {
            try {
              window.sidebar.addPanel(title, url, "");//firefox
            } catch (e) {
              alert("加入收藏失败，请使用Ctrl+D进行添加");
            }
          }
        }
      }
    }

  }
</script>

<style scoped>
	.com-footer {
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		/* Firefox */
		-webkit-box-sizing: border-box;
		/* Safari */
		padding-top: 20px;
		width: 100%;
		height: 93px;
		background-color: #1b68c0;
		overflow: hidden;
	}

	.foter-content {
		width: 1200px;
		margin: 0 auto;
	}

	.foter-content {
		width: 1200px;
		margin: 0 auto;
	}

	.foter-content ul {
		width: 100%;
		color: #FFF;
	}

	.foter-content ul li {
		float: left;
	}

	.foter-content ul li.biaoshi {
		height: 85px;
		width: 215px;
		padding-left: 90px;
	}
	.foter-content ul li.address {
		width: 615px;
		text-align: center;
		cursor: pointer;
	}
	.foter-content ul li.address p{
		padding-bottom: 26px;
	}
	.foter-content ul li.address span{
		padding:0 16px;
	}
	.foter-content ul li.government {
		height:100%;
		width: 280px;
		padding-top: 10px;
	}
	.foter-content ul li.government img:nth-of-type(2){
		position: relative;
		left: 10px;
		top: -2px;
	}
</style>
