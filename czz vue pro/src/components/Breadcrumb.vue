<template>
	<div class="body-nav">
		<a class="nav-opt nav-back" @click="PrveNav">
			<i class="leftpagenotPoint"></i>
		</a>
		<div>		
			<div class="breadItem">				
				<router-link 
					v-for="tabItem in tabList1"  
					v-if="tabItem.title != '首页'"
					:key='tabItem.name' 
					 class="nav-item" 
					 :class="[(activeTab == tabItem.name) ? 'active' : '', (tabItem.name != 'Index') ? 'nav-no-index' : '']" 
					 :to="tabItem.router">
					 <span @click="ClickFun(tabItem.name)" :id="'tabItem_'+tabItem.name">
					 	{{tabItem.title}}
					 	<a href="javascript:" class="close-tab" 
					 		@click.stop="removeTabs(tabItem)">
					 		<i class="el-icon-close"></i>
					 	</a>
					 </span>
				</router-link>
			</div>
		</div>
		<a href="javascript:" class="nav-opt nav-next" @click="NextNav">
			<i class="pagingPoint"></i>
		</a>
		<a href="javascript:" class="nav-opt nav-other">
			<el-dropdown @command="commandFun">
				<i class="el-icon-caret-bottom"></i>
				<el-dropdown-menu slot="dropdown">
				   <!-- <el-dropdown-item command="refresh">
				    	<a class="el-icon-refresh">刷新</a>
				    </el-dropdown-item>-->
				    <el-dropdown-item command="close">
				    	<a class="el-icon-close">关闭其他页面</a>
				    </el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</a>
	</div>
</template>
<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	export default {
		name: 'ecsc-breadcrumb',
		data() {
			return {

			}
		},
		created(){
		},
		computed: {
			...mapGetters(['tabList', 'activeTab']),
			tabList1:{
				get:function(){
					//this.SetBreadItem();
					return this.tabList;
				}
			}
		},
		updated(){
			this.SetBreadItem();
		},
		methods: {
			...mapMutations(['setActiveTab', 'removeTab','removeAllTab']),
			...mapMutations(['setexcludeArr']),
			removeTabs(item){
				this.removeTab(item.name);
				
				let uri = item.router;
				uri = uri.split('/');
				uri = uri[uri.length - 1];
				uri = uri.replace(':','');
				this.setexcludeArr(uri);
			},
			SetBreadItem(){
				setTimeout(() => {		
					try{
						let arrA = $('.breadItem>a');
						let widthA = 0;
						$(arrA).each(function(indexA, itemA){
							let width = $(itemA).width();
							widthA += (width || 0) + 34;
						});
						let left = $('.body-nav-item>div').scrollLeft()||0;
						$('.breadItem').css('width',widthA+'px');
						let obj = $('.router-link-active.active.nav-no-index');
						let offset = obj.offset();
						//自动滚动到最后
						$('.body-nav-item>div').scrollLeft(left + offset.left - 300);
					}catch(e){
						//TODO handle the exception
					}
					
				},200);
			},
			ClickFun(objId){
				let objA = $('#tabItem_'+objId);
				let objP= objA.parent();
				let offset = objP.offset();
				if($('.breadItem').width() > $('.body-nav-item>div').width()){
					//当前点击的标签距离左侧的位置
					let widthA = offset.left + $(objP).width();
				}
			},
			NextNav(){
				let leftA = $('.body-nav-item>div').scrollLeft();
				$('.body-nav-item>div').scrollLeft(leftA + 200);
			},
			PrveNav(){
				let leftA = $('.body-nav-item>div').scrollLeft();
				$('.body-nav-item>div').scrollLeft(leftA - 200);
			},
			commandFun(type){
				if(type == 'refresh'){
					//this.$route.path = this.$route.path;
					this.$router.push(this.$route.path);
					//刷新
				}else if(type == 'close'){
					this.removeAllTab(this.activeTab);
				}
				console.log(type);
			}
		},

	}
</script>

<style lang="less" scoped>
	.body-nav {
		text-align: left;
		line-height: 32px;
		height: 32px;
		a {
			color: #34495E;
			font-size: 12px;
		}
	}
	
	.close-tab {
		display: none;
		color: #565757;
		vertical-align: top;
	}
	
	.leftpagenotPoint,
	.pagingPoint {
		width: 20px;
		height: 32px;
		margin: 0px 5px!important;
		background-position: center center;
		background-repeat: no-repeat;
		background-image: url(../../static/assets/leftpagenotPoint.png);
	}
	
	.pagingPoint {
		background-image: url(../../static/assets/pagingPoint.png);
	}
	
	.nav-item {
		display: inline-block;
		padding: 0 16px;
		height: 100%;
		position: relative;
		vertical-align: top;
		&::after {
			content: '';
			border-right: 2px solid #EDF0F4;
			;
			margin-left: 10px;
			height: 12px;
			display: inline-block;
			position: absolute;
			right: 0;
			top: 10px;
		}
	}
	
	.nav-item {
		line-height: 32px;
	}
	
	.close-tab {
		display: inline-block;
		font-size: 12px;
		height: 32px;
		line-height: 32px;
		vertical-align: middle;
	}
	
	.active {
		background-color: #f4f9fc;
		&::after {
			content: '';
			border-right: 2px solid #f4f9fc;
			margin-left: 10px;
			height: 12px;
			display: inline-block;
			position: absolute;
			right: 0;
			top: 10px;
		}
		&::before {
			content: '';
			border-left: 2px solid #fff;
			margin-left: 10px;
			height: 12px;
			display: inline-block;
			position: absolute;
			left: -12px;
			top: 10px;
		}
		a {
			display: inline-block;
		}
	}
	
	.nav-opt {
		width: 30px;
		display: inline-block;
		i {
			font-size: 12px;
			color: #939CA2;
			transform: scale(0.8);
			margin-top: 4px;
			display: inline-block;
		}
	}
	
	.nav-back {
		cursor: pointer;
		i {
			margin-left: 10px;
		}
	}
	
	.nav-next{
		float: right;
		cursor: pointer;
		i {
			margin-right: 10px;
		}
	}
	.el-dropdown{
		float: right;
		cursor: pointer;
		text-align: center;
	}
	.nav-other{
		float: right;
		cursor: pointer;
		text-align: center;
	}
	.body-nav-item{
		position: relative;
	}
	.body-nav-item>div{
		position: absolute;
		left: 30px;
		right: 60px;
		top: 0px;
		height: 35px;
		overflow: hidden;
	}
	.body-nav-item>div>div{
		width: auto;
		display: inline-block;
	}
	.body-nav-item>div>div>a{
		float: left;
	}
</style>