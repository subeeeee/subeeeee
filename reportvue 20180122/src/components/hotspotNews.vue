<template>
<div>
	<p class="hotNews">热点新闻</p>
	<div v-for="hotnews in HotspotNews">
		<p class="interpretative" @click="GetNewsId(hotnews.id)">
			<a href="#">{{hotnews.title}}</a>
		</p>
		<p class="browingVolume"><span>浏览量:{{hotnews.click_count}} </span><span class="exactDate">{{hotnews.last_updatetime}}</span></p>
	</div>
</div>
</template>

<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	export default {
		name: "hotspotNews",
		data() {
			return {
			}
		},
		computed: {
			...mapGetters('newsinfo',['HotspotNews']),
			HotspotNews1:{
				get:function(){
					let data = this.HotspotNews;
					return ( data || {} );
				}
			}
		},
		created(){
			this.GetHotspotNews();
		},
		methods: {
			...mapActions('newsinfo',['GetHotspotNews']),
			GetNewsId(ids){
				this.$emit('GetNewsId',ids);
			}
		}
	}
</script>

<style>
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
	
	.newsDetail {
		width: 100%;
		background: #F4F9FC;
	}
	
	.newsDetail .bigBox {
		width: 1000px;
		height: auto;
		margin: 0 auto;
	}
	
	.newsDetail .bigBox .middleBox {
		width: 790px; 
		height: auto;
		background: #FFFFFF;
		border-radius: 2px;
		margin-left: -45px;
	}
	
	.newsDetail .middleBox .newsTitle {
		font-family: PingFangSC-Regular;
		font-size: 20px;
		color: #34495E;
		line-height: 20px;
		padding-top: 30px;
		font-weight: 550;
		text-align: center;
	}
	
	.newsDetail .bigBox .middleBox .contentBox {
		font-size: 12px;
		color: #9AABB8;
		text-align: center;
	}
	
	.newsDetail .bigBox .middleBox .contentBox span {
		display: inline-block;
		font-size: 12px;
		color: #9AABB8;
		margin-left: 20px;
		margin-top: 10px;
	}
	
	.newsDetail .bigBox .middleBox {
		float: left;
	}
	
	.newsDetail .bigBox .middleBox .diyi {
		width: 750px;
		font-size: 14px;
		color: #576D7A;
		line-height: 22px;
		margin: 20px auto;
	}
	
	.newsDetail .bigBox .rightBox {
		width: 260px;
		padding-bottom:20px;
		background: #FFFFFF;
		border-radius: 2px;
		margin-left: 755px;
	}
	
	.newsDetail .bigBox .rightBox .hotNews {
		font-size: 16px;
		color: #34495E;
		text-align: left;
		padding-left: 10px;
		padding-top: 20px;
		padding-bottom: 10px;
		border-bottom: 1px solid #EEF4FF;
		font-weight: 550;
	}
	
	.newsDetail .bigBox .rightBox .interpretative {
		font-size: 14px;
		color: #374C60;
		margin-top: 10px;
	}
	
	.newsDetail .bigBox .rightBox .interpretative a {
		width: 240px;
		height: 20px;
		font-size: 14px;
		color: #374C60;
		padding-left: 10px;
		overflow: hidden;
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.newsDetail .bigBox .rightBox .browingVolume {
		font-size: 12px;
		color: #9AABB8;
		text-align: left;
		padding-left: 10px;
		margin-top: 5px;
	}
	
	.newsDetail .bigBox .rightBox .exactDate {
		float: right;
		padding-right: 15px;
	}
	.report .el-main{
		background-color: none !important;
	}
</style>