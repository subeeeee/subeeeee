<template>
	<div class="updateLog">
		<p>更新日志</p>
		<div class="bigBox">
			<ul class="steps" v-for="item in updateLogArr">
				<li class="empty"></li>
				<li class="versionNumber">{{item.versiontitle}}</li>
				<li class="exactDate">{{item.updatetime}}</li>
				<li v-html="item.noticeinfo"></li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'updateLog',
		data() {
			return {
				updateLogArr:[],
			}
		},
		created(){
			this.updateLogs();
//			console.log('uuuu',this.carouselDataArr[0]);
		},
		methods:{
			updateLogs(){
			//日志页面的数据调取
			  let _this = this;
				this.getResult.getResult('report/UserReportRest/loadNoticeInfoForHomePage', {},function(results){
					if(results){
						results.rows.forEach((item, index) => {
							let obj = {};
							obj.updatetime = item.last_updatetime;
							obj.noticeinfo = item.notice_info;
							obj.versiontitle = item.notice_title;
				        _this.updateLogArr.push(obj);
					   });
					}
				});
			},
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
	
	.updateLog {
		width: 100%;
		height: 100%;
		margin-top: -60px;
	}
	
	.updateLog p {
		font-family: PingFangSC-Regular;
		font-size: 16px;
		color: #34495E;
		letter-spacing: 0;
		line-height: 16px;
		text-align: left;
		border-bottom: 1px solid #EAF1F6;
		margin-left: 30px;
		margin-top: 83px;
		padding-bottom: 12px;
	}
	
	.updateLog header .header-left .header-left1 p {
		font-family: PingFangSC-Semibold;
		font-size: 18px;
		color: #FFFFFF;
		font-weight: 530;
		margin-left: 39px;
		margin-top: -35px;
		overflow: hidden;
	}
	
	.updateLog header .header-left .header-left1 .column {
		width: 20px;
		height: 20px;
		margin-left: 109px;
		margin-top: -40px;
		position: absolute;
		left: 17px;
		top: 40px;
	}
	
	.bigBox {
		margin-top: 50px;
		;
	}
	
	.bigBox .steps {
		border-left: 1px solid #EAF1F6;
		margin-left: 50px;
		margin-top: 20px;
	}
	
	.bigBox ul .empty {
		width: 20px;
		height: 20px;
		list-style-image: url(../../static/assets/empty.png);
		list-style-position: inside;
		margin-top: -21px;
		margin-left: -7px;
	}
	
	.bigBox ul .versionNumber {
		font-size: 20px;
		color: #34495E;
		margin-left: 30px;
		margin-top: -20px;
	}
	
	.bigBox ul li:nth-child(3) {
		width: 85px;
		height: 23px;
		border-radius: 3px;
		background: #F7F9FB;
		border: 1px solid #E4ECF1;
		margin-left: 34px;
		margin-top: 15px;
		line-height: 23px;
		text-align: center;
	}
	
	.bigBox ul li:nth-child(4) {
		text-align: left;
		margin-left: 34px;
		font-size: 14px;
		color: #34495E;
		line-height: 30px;
	}
	
	.bigBox ul li:nth-child(5) {
		text-align: left;
		margin-left: 34px;
		font-size: 14px;
		color: #34495E;
		line-height: 30px;
	}
	
	.bigBox ul li:nth-child(6) {
		text-align: left;
		margin-left: 34px;
		font-size: 14px;
		color: #34495E;
		line-height: 30px;
		padding-bottom: 20px;
	}
	
	.bigBox ul li:nth-child(7) {
		text-align: left;
		margin-left: 34px;
		font-size: 14px;
		color: #34495E;
		line-height: 30px;
		margin-top: -20px;
		padding-bottom: 20px;
	}
</style>