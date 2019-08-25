<template>
	<div class="report">
		<keep-alive>
			<el-container :class="PageState == true ? '':'page404'">
				<el-header :class="!ShowMian?'HeaderTop':''">
					<HeaderTop></HeaderTop>
				</el-header>
				<el-container 
					:class="ShowMian?'centerBody':(isCollapse?'isCollapse nocenterBody':'nocenterBody')">
					<el-aside v-if="!ShowMian || ShowLeftMenu" :class="!ShowMian?'showHeight-a':''">
						<LeftMenu></LeftMenu>
					</el-aside>
					<el-container class="main-item">
						<Breadcrumb v-if="!ShowMian" class="body-nav-item"></Breadcrumb>
						<el-main :class="!ShowMian?'noFooterBar el-mainBody':'el-mainBody'">
							<transition>
								<keep-alive 
									:include="includeArr1" 
									:exclude="excludeArr1">
									<router-view :keu="GetKey"></router-view>
								</keep-alive>
							</transition>
							
						</el-main>
						<el-footer v-if="ShowFooter">
							<FooterBar></FooterBar>
						</el-footer>
					</el-container>
				</el-container>
			</el-container>
		</keep-alive>

	</div>
</template>

<script>
	import { genUrlSuffix } from '../common/token.js'
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	import HeaderTop from './HeaderTop'
	import LeftMenu from './leftMenu'
	import FooterBar from './Footerbar'
	import Breadcrumb from './Breadcrumb'
	export default {
		components: {
			HeaderTop,
			LeftMenu,
			FooterBar,
			Breadcrumb,

		},
		computed: {
			...mapGetters(['ShowMian', 'ShowLeftMenu', 'isCollapse','Token','ShowFooter','PageState','BrowseMode']),
			...mapGetters(['includeArr', 'excludeArr','activeTabItem']),
			GetKey() {
				return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date();
			},
			includeArr1:{
				get:function(){
					let includeArr = this.includeArr;
					if(sessionStorage.getItem('type') == 'debugger'){						
						console.log('需要缓存的:' + includeArr);
					}
					return includeArr;
				}
			},
			excludeArr1:{
				get:function(){
					let excludeArr = this.excludeArr;//不缓存
					let includeArr = this.includeArr;//缓存
					let item = this.activeTabItem;//当前路由
					if(excludeArr.length == 0 && includeArr.length == 0){
						if(item){
							let uri = item.router;
							if(uri){								
								uri = uri.split('/');
								uri = uri[uri.length - 1];
								uri = uri.replace(':','');
								this.setexcludeArr(uri);
							}
						}
					}
					if(sessionStorage.getItem('type') == 'debugger'){						
						console.log('不需要缓存的:' + excludeArr);
					}
					return excludeArr;
				}
			}
		},
		created(){
			this.GetNewsData();
			setTimeout(() => {
				let elmain = document.getElementsByClassName('el-main');
				let main = elmain[0];
				if(main && $('[pagetype="home"]')[0]){
					//标识首页滚动
					main.onscroll = function(touch){
						let scrollTop = $(this).scrollTop();//滚动的高度
						let height = $(this).height();//界面高度
						let hA = scrollTop - 50;
						if(scrollTop < 250){
							hA = hA / 2;
							hA = hA > 100 ? 1 : (hA < 10 ? 0.1 : hA * 0.01);
							$('.el-header').css({
								'background':'rgba(50, 122, 255, '+hA+')'
							},10);
						
						}else if(scrollTop > 150){
							//颜色是固定
						
						}
					}
				}
			},0);
			let urlSuffix = sessionStorage.getItem('urlSuffix');
			if(!urlSuffix){
				urlSuffix = genUrlSuffix();
				let _urlSuffix = urlSuffix.split('=')[1];
				sessionStorage.setItem('urlSuffix',urlSuffix);
				this.setToken(_urlSuffix);
			};
		},
		data() {
			return {

			}
		},
		
		methods: {
			...mapActions('newsinfo',['GetNewsData']),
			...mapMutations(['setShowMian','setToken','setexcludeArr']),
			...mapActions('layout',['GetMenuData']),
			IsincludeFun(){
				debugger;
				return true;
			},
			IsexcludeFun(){
				debugger;
				return true;
			},
			GetToken(){
				/*var reg = new RegExp("(^|&)" + "_s" + "=([^&]*)(&|$)", "i");
				var search = window.location.search;
				var r = search.substr(1).match(reg);
				let token = r ? unescape(r[2]) : "";*/
				/*var reg = new RegExp("(^|&)" + "_s" + "=([^&]*)(&|$)", "i");
				var search = window.location.href.split('?')[1];
				search = '?'+search;
				var r = search.substr(1).match(reg);
				let token = r ? unescape(r[2]) : "";
				token = token.split('#')[0];
				token = token || '';
				if(sessionStorage.getItem('urlSuffix') == null && token != ''){
					sessionStorage.setItem('urlSuffix','?_s='+token);
				}else if(sessionStorage.getItem('urlSuffix') != null && token != ''){
					let tk = sessionStorage.getItem('urlSuffix');
					token = tk.split('=')[1];
				}
				this.setToken(token);*/
				

			}
		}
	}
</script>

<style>
	.main-item {}
	
	.el-menu-item * {
		vertical-align: middle;
		color: #FFFFFF;
		font-size: 12px;
	}
	
	.showHeight-a {
		height: 100% !important;
		bottom: 0!important;
		top: 0!important;
	}
	
	.report .el-submenu__title * {
		vertical-align: middle;
		color: #FFFFFF;
		font-size: 13px;
	}
	.report .el-submenu__title *>span{
		padding-left: 25px;
	}
	.report .el-header{
		background-color: #327aff08;
	}
	.report .el-submenu .el-menu-item {
		width: 120px;
		height: 35px;
		line-height: 35px;
		padding: 0 45px;
		font-size: 13px;
		color: #FFFFFF;
		min-width: 160px;
	}
	
	.report .el-submenu .el-menu-item:hover {
		background: #0F234F;
		color: #FFFFFF;
	}
	
	.report .el-container .is-vertical .el-container .el-container .el-footer {
		text-align: center;
		z-index: 3;
	}
	
	.report .el-submenu .el-menu-item {
		width: 120px;
	}
	.body-nav-item{
		width: 100%;
		float: left;
	}
	.el-mainBody{
		float: left;
	}
	.el-mainBody>div{
		width: 100%;
		height: 100%;
	}
	.el-mainBody>div>iframe{
		width: 100%;
		height: 100%;
	}
	.report .noFooterBar{
		bottom: 15px!important;
		top: 40px;
		left: 8px;
		right: 8px;
		bottom: 8px;
		position: absolute;
		overflow: hidden!important;
	}
	.el-mainBody>div>iframe::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 0px transparent;
		background-color: white;
		border: 0px;
		border-radius: 5px;
	}
	.el-mainBody>div>iframe::-webkit-scrollbar {
		width: 8px;
		height: 8px;
		background: rgba(0, 0, 0, 0.30);
		border-radius: 100px;
	}
	.el-mainBody>div>iframe::-webkit-scrollbar-thumb {
		border-radius: 10px;
		background-color: #c5c3c3;
	
	}
</style>