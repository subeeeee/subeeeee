<template>
	<!-- 左侧栏开始 -->
	<div class="leftColumn">
		<el-menu default-active="defaultActive" :menu-trigger="'click'" :unique-opened="true" :collapse="isCollapse">
			<el-submenu :index="item.id+'_id'" v-for="item in MenuData" :class="item['childs'].length < 6?'norepeatfiex':''">
				<template slot="title">
					<i :class="item.iconClass"></i>
					<span slot="title">{{item.module_name}}</span>
				</template>
				<el-submenu :index="itemA.id+'_id'" v-for="itemA in item.childs" class="submenu-left">
					<span slot="title">{{itemA.module_name}}</span>
					<template v-for="itemB in itemA.childs">
						<el-menu-item :index="itemB.id+'_id'" @click="GetClickFun(itemB)">
							<router-link :to="itemB.new_url">
								{{itemB.module_name}}
							</router-link>
						</el-menu-item>
					</template>
				</el-submenu>
				</el-menu-item-group>
			</el-submenu>
		</el-menu>
	</div>
	<!-- 左侧栏结束 -->
</template>
<script>
	
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	export default {
		name: 'LeftMenu',
		data() {
			return {
				defaultActive: '',
			}
		},
		computed: {
			...mapGetters(['ShowLeftMenu', 'isCollapse','includeArr']),
			...mapGetters('layout', ['MenuData']),
		},
		methods: {
			...mapMutations(['setShowMian', 'setCollapse','setincludeArr']),
			...mapActions('layout', ['GetBtnPermission']),
			SetLeftMenuState() {
				if(this.isCollapse && this.ShowLeftMenu) {
					this.setShowMian(!this.ShowLeftMenu);
					this.setCollapse(!this.isCollapse);
				}
			},
			GetClickFun(item) {
				let param = {
					id: item.id
				};
				this.GetBtnPermission(param);
				let uri = item.new_url;
				uri = uri.split('/');
				uri = uri[uri.length - 1];
				uri = uri.replace(':','');
				this.setincludeArr(uri);
			}
		}
	}
</script>
<style>
	/*左边侧栏开始*/
	
	* {
		margin: 0;
		padding: 0;
	}
	
	ul,
	ol,
	li {
		list-style: none;
	}
	
	a {
		text-decoration: none;
	}
	
	.centerBody .leftColumn .el-submenu__title {
		text-align: left;
	}
	
	.leftColumn .el-submenu__title {
		width: 160px;
		height: 39px;
		text-align: center;
		line-height: 39px;
	}
	
	.nocenterBody .leftColumn .el-submenu>.el-submenu__title {
		padding-left: 2px!important;
		text-align: left;
	}
	
	.leftColumn .el-submenu__title:hover {
		background: #141D32 !important;
		height: 39px;
		border-left: 3px solid #327AFF;
		padding-left: 17px !important;
	}
	
	.leftColumn .el-submenu__title i {
		color: #909399;
		margin-left: -59px;
	}
	
	.leftColumn .el-aside .el-menu {
		background-color: #1D2742!important;
		box-shadow: none !important;
	}
	
	.leftColumn .el-submenu [class^=el-icon-] {
		font-size: 12px;
	}
	
	.leftColumn .el-menu-item-group {
		width: 150px;
		float: left;
	}
	
	.leftColumn .el-menu-item-group__title {
		font-size: 12px;
		color: #FFFFFF !important;
	}
	
	.el-aside .leftColumn .el-menu--collapse .el-submenu .el-menu-item {
		height: 30px;
		line-height: 30px;
		font-size: 12px;
	}
	
	.el-menu--collapse>.el-menu-item .el-submenu__icon-arrow,
	.el-menu--collapse>.el-submenu>.el-submenu__title .el-submenu__icon-arrow {
		display: block;
		line-height: 16px;
	}
	section[class='el-container centerBody'] .el-menu--collapse>.el-submenu>.el-submenu__title .el-submenu__icon-arrow{
		display: block !important;
	}
	.el-aside .leftColumn .el-menu--collapse .el-menu {
		display: flex;
		flex-flow: column wrap;
		overflow: hidden;
	}
	
	.el-aside .leftColumn .el-menu--collapse .el-menu>li {
		box-sizing: border-box;
		counter-increment: item-counter;
	}
	/*.el-aside .leftColumn .el-menu li.submenu-left.el-submenu>.el-submenu__title span {
		padding-left: 28px;
	}*/
	
	li.submenu-left.el-submenu {
		width: 150px!important;
	}
	
	li.submenu-left.el-submenu>.el-submenu__title {
		padding-left: 20px!important;
		text-align: left;
	}
	
	li.submenu-left.el-submenu>.el-menu>.el-menu-item {
		text-align: left;
		padding: 0px 33px!important;
	}
	
	.el-menu--collapse li.submenu-left.el-submenu {
		min-width: 0px;
		width: auto;
		display: inline-block;
		height: auto;
	}
	
	.el-menu--collapse li.submenu-left.el-submenu>.el-submenu__title {
		height: 30px;
		line-height: 30px;
		padding-left: 20px!important;
		padding-right: 0px!important;
	}
	
	.el-menu--collapse li.submenu-left.el-submenu>.el-submenu__title:hover {
		border-left: 3px solid transparent!important;
		background-color: transparent!important;
	}
	
	.el-menu--collapse li.submenu-left.el-submenu>.el-submenu__title>.el-submenu__icon-arrow {
		display: none;
	}
	.el-menu--collapse li.submenu-left.el-submenu>.el-submenu__title>span {
		display: block!important;
		line-height: 30px;
		margin-top: 20px;
	}
	
	.el-menu--collapse li.submenu-left.el-submenu>ul.el-menu {
		float: left;
		position: relative;
		left: auto;
		width: 130px;
		transform: none!important;
		margin-left: 20px;
		box-shadow: none!important;
	}
	
	.el-submenu__title {
		border-left: 3px solid #1D2742;
	}
	
	.el-menu--collapse>li>ul.el-menu {
		transform: none!important;
	}
	
	.el-menu--collapse li.submenu-left.el-submenu>.el-menu {
		display: block!important;
		width: auto;
		height: auto;
		margin-bottom: 10px;
		padding-bottom: 10px;
		border-bottom: 1px solid #384463;
	}
	
	.el-menu--collapse li.submenu-left.el-submenu>ul.el-menu>li {
		height: 25px!important;
		line-height: 25px!important;
		overflow: hidden;
	}
	
	.el-submenu__title {}
	
	li.submenu-left.el-submenu>ul.el-menu>li>a {
		color: #D0DCF4!important;
	}
	
	.el-menu--collapse li.submenu-left.el-submenu>ul.el-menu>li>a:hover {
		background: transparent;
	}
	
	.norepeatfiex>.el-menu {
		flex-flow: nowrap!important;
	}
</style>