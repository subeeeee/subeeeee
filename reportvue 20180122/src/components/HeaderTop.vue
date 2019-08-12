header .header-right ul li a<template>
	<!-- 头部开始 -->
	<header :class="isCollapse?'isCollapse headerTop':'headerTop'">
		<div class="header-left">
			<div class="header-left1">
				<el-button size="small" type="text">
					<img src="../../static/assets/logo.png" alt="" class="logo">
				</el-button>
				<el-button size="small" type="text">
					e报表
				</el-button>
				<el-button @click="SetLeftMenu" size="small" type="text">
					<template v-if="ShowMian">
						<img v-if="isCollapse" src="../../static/assets/column1.png" class="pic z1">
						<img v-if="!isCollapse" src="../../static/assets/column.png" class="pic z2">
					</template>
					<template v-if="!ShowMian">
						<img v-if="!isCollapse" src="../../static/assets/column1.png" class="pic z3">
						<img v-if="isCollapse" src="../../static/assets/column.png" class="pic z4">
					</template>
				</el-button>

		</div>
		<div class="header-right">
			<ul>
				<li>
					<router-link to="/">首页</router-link>
				</li>
				<li v-if="ConfigItem['modulName']">
						<a target="_blank"
							:href="'../../..'+ConfigItem.oldLinkUrl">{{ConfigItem.module_name}}</a>

				</li>
			</ul>
		</div>
		<div class="header-user">
			<div class="moreBrand">
				<el-dropdown
				split-button
				type="primary"
				class="BrandDropdown"
				@command="OpenBrandCenter">
				  {{BrandName}}
				  <el-dropdown-menu slot="dropdown">
				  	<template v-for="item in BrandData">
				  		 <el-dropdown-item :command="item">
				  		 	{{item.orgFullName}}
				  		 </el-dropdown-item>
				  	</template>
				  </el-dropdown-menu>
				</el-dropdown>
			</div>
			<el-tooltip popper-class="HeaderUser" effect="dark" content="更新日志" placement="bottom">
				<router-link to="/updateLog" class="updateLogHedaer">
					<el-button size="small" type="text" class="my-el-icon-gengxinrizhi configCenter">
					</el-button>
				</router-link>
			</el-tooltip>
			<el-dropdown placement="bottom">
				<div>
					<el-button size="small" type="text"
						class="my-el-icon-shezhi configCenter"></el-button>
				</div>
				<el-dropdown-menu slot="dropdown" class="configCenterBtn">
					<template v-for="item in ConfigData">
						<el-dropdown-item>
							<template v-if="item.module_name == '多终端配置'">
								<a target="_blank"  :href="'../../..'+item.oldLinkUrl">
								{{item.module_name}}
								</a>
							</template>
							<template v-if="item.module_name != '多终端配置'">
								<router-link :to="item.new_url">
									{{item.module_name}}
								</router-link>
							</template>

						</el-dropdown-item>
					</template>

				</el-dropdown-menu>
			</el-dropdown>
			<el-dropdown placement="bottom">
				<div class="useradmin">
					<el-button size="small" type="text" class="my-el-icon-guanliyuan configCenter"></el-button>
					<el-button size="small" type="text">
						{{UserName}}
						<i class="el-icon-caret-bottom el-icon--right"></i>
					</el-button>
				</div>
				<el-dropdown-menu slot="dropdown" class="operationDown">
					<el-dropdown-item>返回引导页</el-dropdown-item>
					<el-dropdown-item>修改密码</el-dropdown-item>
					<el-dropdown-item>退出系统</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</header>
	<!-- 头部结束 -->
</template>
<script>

	import { mapGetters, mapMutations, mapActions } from 'vuex'
	export default {
		name: 'HeaderTop',
		components: {

		},
		computed: {
			...mapGetters(['ShowLeftMenu', 'isCollapse', 'ShowMian']),
			... mapGetters('layout',['ConfigData','BrandData','BrandName','UserName','ConfigItem']),
		},
		data() {
			return {
				activeName: 'first'
			}
		},
		created(){
			if(sessionStorage.getItem('type') == 'debugger'){
				console.log('【配置】',this.ConfigData);
				console.log('【多终端查看】',this.ConfigItem);
			}
		},
		methods: {
			...mapMutations(['setShowMian','setShowLeftMenu', 'setCollapse','setShowBrandCenter','setShowFooter','setisCollapse']),
			...mapMutations('layout',['setBrandName','setBrandItem','setBrandId','setMultiStore']),
			...mapActions('layout',['GetBrandData']),
			SetLeftMenu() {
				if($('[contexttype="newsDetail"]')[0] == undefined) {
					this.setShowLeftMenu(!this.ShowLeftMenu);

					if(this.ShowMian == false) {
						this.setCollapse(!this.isCollapse);

					}
					if(this.isCollapse && !this.ShowMian) {
						document.body.setAttribute('ShowMian', 'ContextBody');
					} else {
						document.body.removeAttribute('ShowMian');
					}
				}
			},
			ToHome() {

			},
			OpenBrandCenter(item) {
				//打开品牌
				console.log(item);
				this.setBrandItem(item);
				this.setBrandId(item.id);
				this.setBrandName(item.orgFullName);
				this.GetBrandData(item.id);
			}
		}
	}
</script>
<style>
	/* 头部导航 */
	[showmian="ContextBody"] .report .el-header{
		background: #327AFF!important;
	    opacity: 1;

	}
	header.el-header {
		width: 100%;
		height: 46px;
		opacity: 0.9;
		background: rgba(0, 0, 0, 0.1);
		overflow: hidden;
		position: absolute;
		left: 0;
		top: 0px;
		z-index: 7;
	}

	header.el-header:hover {
		opacity: 1!important;
		background: #327AFF!important;
		height: 46px;
	}

	header.el-header .header-left {
		float: left;
	}

	header .isCollapse .header-left .header-left1 {
		background: rgba(0, 0, 0, 0.1);
		opacity: 0.9;
	}

	header .header-left .header-left1 .el-button {
		min-width: 0px!important;
		padding: 0px!important;
	}

	header .header-left .header-left1 .el-button:first-child {
		margin-left: 12px!important;
	}

	header .header-left .header-left1 .el-button .logo {
		margin-top: 3px;
	}

	header .header-left .header-left1 .el-button .pic {
		margin-top: 5px;
		margin-right: 7px;
	}

	.header-left1>.el-button {
		float: left;
		height: 46px;
	}

	.header-left1>.el-button:first-child {
		margin-left: 12px;
	}

	.header-left1>.el-button:nth-child(2)>span {
		font-size: 18px;
		color: #FFFFFF;
		line-height: 46px;
	}

	.header-left1>.el-button:nth-child(3) {
		float: right;
		margin-right: 8px;
	}

	header .header-left .header-left2 {
		float: left;
	}

	header .header-left .header-left2 ul li {
		float: left;
		line-height: 46px;
	}

	header .header-left .header-left2 ul li a {
		font-size: 14px;
		color: #FFFFFF;
		/*margin-left: 20px;*/
	}
	.operationDown>li.el-dropdown-menu__item{
		font-size: 12px;
	}
	header .header-right ul li a {
		text-align: center;
		line-height: 46px;
	}

	header .header-right,
	.header-right>.el-tabs {
		float: left;
		height: 100%;
	}

	.header-right .el-tabs__content {
		display: none;
	}

	.header-right .el-tabs__nav-wrap::after {
		height: 0px!important;
	}

	.header-right .el-tabs__header,
	.header-right .el-tabs__nav-wrap {
		margin: 0px;
		height: 100%;
	}

	.header-right .el-tabs__nav-wrap .el-tabs__item {
		font-size: 14px;
		color: #C1D7FF;
	}

	.header-right .el-tabs__active-bar {
		background-color: white;
	}

	.header-right .el-tabs__nav-wrap .el-tabs__item:first-child {
		margin-left: 0px;
	}

	header .header-right ul li {
		float: left;
		line-height: 46px;
	}
	header .header-right ul li a:hover {
		font-weight:600 ;
		border-bottom: 2px solid #FFFFFF;
		padding-bottom: 12px;
	}
	header .header-right ul li a {
		padding: 0px 20px;
		line-height: 48px;
		font-size: 14px;
		color: #FFFFFF;
	}
	header .header-right ul li .letter {
		margin-top: -15px;
		line-height: inherit;
	}

	header .header-right ul li a #unselectedPull {
		margin-right: 25px;
	}

	.header-user {
		float: right;
		width: 240px;
	}
	.header-user>.moreBrand,
	.header-user>.moreBrand>.BrandDropdown{
		float: left;
		height: 20px;

	}
	.header-user>.moreBrand{
		margin-top: 10px;
	}
	.header-user>.moreBrand .el-button-group{
		height: 20px;
		background: rgba(255,255,255,0.10);
    	border: 1px solid rgba(255,255,255,0.50);
   	 	border-radius: 100px;
	}
	.header-user>.moreBrand .el-button-group>.el-button .el-icon-arrow-down::before{
		content: "\E60B";
	}
	.header-user>.moreBrand .el-button{
		height: 20px;
	}
	.header-user .el-dropdown,
	.header-user .el-dropdown>div {
		height: 46px;
		float: left;
	}

	.header-user .el-button:hover>span {
		color: white;
	}

	.header-user .el-button {
		margin: 0px;
		height: 46px;
		float: left;
		min-width: 0!important;
	}

	.header-user>.el-button:nth-child(2) {
		margin: 0px 10px;
	}

	.header-user .el-button>span {
		font-size: 12px;
		color: #C1D7FF;
		letter-spacing: 0;
		line-height: 14px;
	}

	.headerTop {
		width: 100%;
		height: 100%;
	}

	.header-left1 {
		height: 46px;
	}
	.BrandCenterBtn{
		margin-right: 10px!important;
	}
	[showmian="ContextBody"] .configCenter,
	.configCenter:hover{
		font-size: 17px;
	    padding: 0px 5px;
	    color: white!important;
	}
	.configCenterBtn>.el-dropdown-menu__item>a{
	    list-style: none;
	    margin: 0;
	    font-size: 12px;
	    color: #606266;
	    cursor: pointer;
	    outline: 0;
	}
	.el-button.configCenter{
		width: 36px;
    	font-size: 16px;
	}
	.BrandDropdown{
		margin-left: 10px;
	}
	.BrandDropdown .el-button{
		background-color: transparent!important;
		border: 0px!important;
	}
	.BrandDropdown.el-dropdown .el-dropdown__caret-button::before{
		width: 0px;
	}
	.HeaderTop>.headerTop>.header-right .BrandDropdown>.el-button-group{
		display: inline-block;
	    border: 1px solid #6b9af1;
	    height: 20px;
	    line-height: 20px;
	    border-radius: 20px;
	}
	.HeaderTop>.headerTop>.header-right .BrandDropdown>.el-button-group>.el-button{
		height: 20px;
		margin-right: 0px;
	}
	.updateLogHedaer{
		display: inline-block;
		float: left;
	}
	.useradmin>.el-button:nth-child(2){
		padding-left: 0px;
	}
	.useradmin .el-icon-caret-bottom{
		margin-left: 1px;
	}
	/*头部结束*/
</style>