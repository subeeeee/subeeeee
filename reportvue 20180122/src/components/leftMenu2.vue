<template>
	<!-- 左侧栏开始 -->
	<div class="leftColumn">
		<!--<el-menu default-active="defaultActive"
			:menu-trigger="'click'"
			:unique-opened="true"
			:collapse="isCollapse">
			<el-submenu :index="item.id+'_id'" v-for="item in MenuData">
				<template slot="title">
					<i :class="item.iconClass"></i>
					<span slot="title">{{item.module_name}}</span>
				</template>
				<el-menu-item-group v-for="itemA in item.childs">
					<span slot="title">{{itemA.module_name}}</span>
					<template v-for="itemB in itemA.childs">
						<el-menu-item :index="itemA.id+'_id'" @click="SetLeftMenuState">
							<router-link :to="itemB.new_url">{{itemB.module_name}}</router-link>
						</el-menu-item>
					</template>
				</el-menu-item-group>
			</el-submenu>
		</el-menu>-->
		<el-menu 
			default-active="defaultActive" 
			menu-trigger="click"
			background-color="#1D2742"
			text-color="#D0DCF4"
			:router="true"
			:class="GetClass" 
			:collapse="isCollapse">
			<el-submenu :index="item.new_url" class="NavMenuA" v-for="item in MenuData">
				<template slot="title">
					<i :class="item.iconClass"></i>
					<span slot="title">{{item.module_name}}</span>
				</template>
				<el-submenu :index="itemA.new_url" class="NavMenuB" v-for="itemA in item.childs">
					<span slot="title">{{itemA.module_name}}</span>
					<el-menu-item :index="itemB.new_url" class="NavMenuC" @click="SetLeftMenuState" v-for="itemB in itemA.childs">
						{{itemB.module_name}}
					</el-menu-item>
				</el-submenu>
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
			...mapGetters(['ShowLeftMenu', 'isCollapse', 'ShowMian', 'ShowLeftTree']),
			...mapGetters('layout', ['MenuData']),
			GetClass:{
				get:function(){
					if(this.ShowLeftMenu && this.isCollapse && this.ShowMian){
						return 'NavMenuIndex';//首页
					}
				}
			}
		},
		created() {
			console.log(this.ShowLeftMenu, this.isCollapse, this.ShowMian);
		},
		methods: {
			...mapMutations(['setShowMian', 'setCollapse']),
			SetLeftMenuState() {
				if(this.isCollapse && this.ShowLeftMenu) {
					this.setShowMian(!this.ShowLeftMenu);
					this.setCollapse(!this.isCollapse);
				}
			}
		}
	}
</script>
<style>
	.NavMenuIndex>.NavMenuA>.el-submenu__title{
		height: 39px;
		line-height: 39px;
		padding: 0px 5px!important;
	}
	.NavMenuIndex>.NavMenuA>.el-submenu__title>span{
		width: auto;
		height: 39px;
		font-size: 13px;
		color: #D0DCF4;
		line-height: 39px;
		visibility:visible ;
	}
	.NavMenuIndex>.NavMenuA>.el-submenu__title>.el-submenu__icon-arrow{
		display: block;
	}
	.NavMenuIndex>.NavMenuA>.el-menu{
		width: 950px;
	    height: 520px;
	    opacity: .9;
	    margin-left: 0px;
	    background: #202b44;
	}
	.NavMenuIndex>.NavMenuA>.el-menu>.NavMenuB{
		min-width: 0px;
		width: 120px;
	}
	.NavMenuIndex>.NavMenuA>.el-menu>.NavMenuB>.el-submenu__title{
		padding: 0px 5px!important;
		height: 30px!important;
		line-height: 30px!important;
	}
	.NavMenuIndex>.NavMenuA>.el-menu>.NavMenuB>.el-menu{
		display: block!important;
		left: 0px!important;
		transform: none!important;
		transition: none!important;
		margin-left: 0px;
		box-shadow:none;
	}
</style>