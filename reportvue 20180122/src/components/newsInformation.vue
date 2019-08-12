<template>
	<div class="foots-first">
		<div class="foots1">
			<div class="foots1-1">
				<p>{{NewsData1['module_name']}}</p>
				<p class="slid1"></p>
			</div>
			<div class="newsimg">
				<img v-show="NewsData1['id']==1" width="380" height="130" src="../../static/assets/fot1.png" />
				<img v-show="NewsData1['id']==2" width="380" height="130" src="../../static/assets/foot2.png" />
				<img v-show="NewsData1['id']==3" width="380" height="130" src="../../static/assets/foot3.png" />

			</div>
			<p class="date" v-for="news in NewsData1['childs']">
				<router-link :to="{ path: '/newsDetail', query: { news_id: news.id }}">
					{{news.title}}
				</router-link>
				<span>{{news.last_updatetime}}</span>
			</p>

		</div>

	</div>
</template>
<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	export default {
		name: 'newsInfomation',
		data() {
			return {

			}
		},
		props: {
			index: {
				type: Number,
				default: 0
			}
		},
		created() {

		},
		computed: {
			...mapGetters('newsinfo', ['NewsData']),
			NewsData1: {
				get: function() {
					let obj = this.NewsData || {};
					let data = obj[this.index];
					return(data || {});
				}
			}
		},
		mounted() {

		},
		methods: {

		}
	}
</script>
<style>
	* {
		margin: 0;
		padding: 0;
	}
	/*底部开始*/
	
	footer {
		width: 100%;
		height: 440px;
		background: #F4F9FC;
	}
	
	footer h3 {
		text-align: center;
		font-family: PingFangSC-Semibold;
		font-size: 20px;
		color: #0D1A32;
		padding-top: 30px;
	}
	
	footer p {
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #0D1A32;
		line-height: 14px;
		text-align: center;
		padding-top: 9px;
	}
	
	footer .foots {
		width: 90%;
		height: 267px;
		margin: 0 auto;
		margin-top: 30px;
		display: flex;
		justify-content: space-between;
	}
	/*底部第一部分开始*/
	
	footer .foots .foots-first {
		width: 400px;
		height: 267px;
		background: #FFFFFF;
	}
	
	footer .foots .foots-first .foots1 {
		width: 400px;
		height: 267px;
		position: relative;
		/*background: url(../../static/assets/fot1.png) -10px 10px no-repeat;*/
	}
	
	footer .foots .foots-first .foots1 .newsimg {
		position: absolute;
		z-index: 1;
		top: 5px;
		right: 5px;
	}
	
	footer .foots .foots-first .foots1 .foots1-1 {
		width: 240px;
		height: 144px;
		position: relative;
		z-index: 2;
		background: url(../../static/assets/foot4.png);
	}
	
	footer .foots .foots-first .foots1 .foots1-1 p {
		font-family: PingFangSC-Regular;
		font-size: 24px;
		color: #FFFFFF;
		line-height: 144px;
	}
	/*footer .foots .foots-first .foots1 .foots1-1 .slid1 {
		width: 50px;
		height: 1px;
		background: #FFFFFF;
		margin-top: 83px;
		margin-left: 27px;
	}
	*/
	
	footer .foots .foots-first .foots1 .date {
		font-family: PingFangSC-Regular;
		font-size: 14px;
		text-align: left;
		margin-left: 20px;
		margin-top: 12px;
	}
	
	footer .foots .foots-first .foots1 .date a {
		width:260px ;
		color: #636778;
		overflow: hidden;
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	footer .foots .foots-first .foots1 .date span {
		float: right;
		margin-right: 30px;
		font-size: 12px;
		color: #A9B1BC;
		margin-top: -15px;
	}
	/*底部第一部分结束*/
</style>