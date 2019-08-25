<template>
	<div>
		<!--主要部分开始banner部分开始-->
		<div class="lunbobox">
			<el-carousel height="606px" width="100%" arrow="never" >
				<el-carousel-item v-for="item in carouselDataArr">
					<p class="title">{{item.title}}</p>
					<p class="text">{{item.text}}</p>
					<div class="ulsbox">
						<ul>
							<li>{{item.data1.value}}</li>
							<li>
								<p>{{item.data1.name}}</p>
							</li>
						</ul>
						<ul>
							<li>{{item.data2.value}}</li>
							<li>
								<p>{{item.data2.name}}</p>
							</li>
						</ul>
						<ul>
							<li>{{item.data3.value}}</li>
							<li>
								<p>{{item.data3.name}}</p>
							</li>
						</ul>
						<ul>
							<li>{{item.data4.value}}</li>
							<li>
								<p>{{item.data4.name}}</p>
							</li>
						</ul>
					</div>
					<!--外面的大图片-->
					<div class="animateBox">
						<!--第一张八卦底-->
						<div class="diagrams1"></div>
						<!--第二张八卦底-->
						<div class="diagrams2"></div>
						<!--第三张八卦底-->
						<div class="diagrams3"></div>
						<!--第四张八卦底-->
						<div class="diagrams4"></div>
						<!--四个小人-->
						<div class="fourMen"></div>
						<!--左边第一人-->
						<div class="blackCurve"></div>
						<!--右边人拿的图1-->
						<div class="curveDialogBox1"></div>
						<!--右边人拿的图2-->
						<div class="curveDialogBox2"></div>
						<!--八卦中心1-->
						<div class="gossipCenter1"></div>
						<!--八卦中心2-->
						<div class="gossipCenter2"></div>
						<!--八卦中心3-->
						<div class="gossipCenter3"></div>
						<!--八卦中心4-->
						<div class="gossipCenter4"></div>
						<!--曲线1-->
						<div class="curve1"></div>
						<!--饼图1-->
						<div class="pieChart1"></div>
						<!--饼图2-->
						<div class="pieChart2"></div>
						<!--曲线2-->
						<div class="curve2"></div>
						<!--一堆细线-->
						<div class="lines"></div>
					</div>
					
					<!--第二张动图-->
					<div class="secondPic">
						<!--流星图-->
						<div class="meteor2"></div>
						<!--中间电脑部分-->
						<div class="group2"></div>
						<!--电脑2-->
						<div class="rectangle30"></div>
						<!--电脑3-->
						<div class="rectangleCopy4"></div>
						<!--电脑4-->
						<div class="curve8"></div>
						<!--一根线-->
						<div class="bottoms"></div>
						<!--电脑左1-->
						<div class="diagram1"></div> 
						<!--电脑左2-->
						<div class="diagram"></div> 
						<!--手机1-->
						<div class="group11"></div>
						<!--手机2-->
						<div class="rectangle34"></div>
						<!--手机3-->
						<div class="rectangle"></div>
						<!--手机4-->
						<div class="path"></div>
						<!--第一根柱子-->
						<div class="copy1"></div>
						<!--第二根柱子-->
						<div class="copy3"></div>
						<!--第三根柱子-->
						<div class="copy2"></div>
						<!--第一根线-->
						<div class="group4"></div>
						<!--第二根线-->
						<div class="group5"></div>
						<!--第三根线-->
						<div class="group6"></div>
						<!--曲线-->
						<div class="group10"></div>
						<!--箭头-->
						<div class="group12"></div>
					</div>
				</el-carousel-item>
			</el-carousel>
		</div>
		<!--banner部分结束  -->
		<article>
		 <div class="largeContainer">
		 	<div class="middleContent">
		 		<h3>智能报表 随心所欲</h3>
			<p>天子星17年专注餐饮，提供一站式数据分析解决方案，祝您实现数据化智慧运营</p>
			<div class="dynamic">
				<dl>
					<dt><img src="../../static/assets/3.png" alt=""></dt>
					<dd>
						<h4>自定义配置</h4></dd>
					<dd class="reportForm">报表自定义 | 指标自定义</dd>
					<dd class="reportForm">模板自定义 | 模块自定义</dd>
				</dl>
				<dl>
					<dt><img src="../../static/assets/1.png" alt=""></dt>
					<dd>
						<h4>多维分析</h4></dd>
					<dd class="reportForm">指标多维 | 报表多维</dd>
					<dd class="reportForm">数据钻取 | 分层展示</dd>
				</dl>
				<dl>
					<dt><img src="../../static/assets/2.png" alt=""></dt>
					<dd>
						<h4>多元展示</h4></dd>
					<dd class="reportForm">PC端 | 大屏端 | APP端</dd>
					<dd class="reportForm">图表 | 报表 | 混合表</dd>
				</dl>
			</div>
		 	</div>
			
		</div>
		</article>
		<footer>
			<h3>新闻资讯</h3>
			<p>天子星17年专注餐饮，提供一站式数据分析解决方案，祝您实现数据化智慧运营</p>
			<div class="foots">
				<!--<template v-for="indexA in 3">
					<NewsInformation :index="indexA"></NewsInformation>
				</template>-->
				<NewsInformation :index="0" ></NewsInformation>
				<NewsInformation :index="1" ></NewsInformation>
				<NewsInformation :index="2"></NewsInformation>
			</div>
		</footer>
	</div>
</template>

<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	import NewsInformation from '@/components/newsInformation'
	export default {
		name: 'index',
		components: {
			NewsInformation
		},
		data() {
			return {
				carouselDataArr: [{
						title: '智慧餐饮',
						text: '集成CRM,运营，供应链多业务功能，一表在手，决策都有',
						data1: {
							name: '营业实收',
							value: '￥0'
						},
						data2: {
							name: '账单数',
							value: '￥0'
						},
						data3: {
							name: '消费客数',
							value: '￥0'
						},
						data4: {
							name: '账单均值',
							value: '￥0'
						}
					},
					{
						title: '营业数据概览',
						text: '支持多业态：正餐，快餐，火锅，家常菜，通通式快餐，饮品',
						data1: {
							name: '会员消费实收',
							value: '￥0'
						},
						data2: {
							name: '会员消费单数占比',
							value: '￥0'
						},
						data3: {
							name: '会员充值金额',
							value: '￥0'
						},
						data4: {
							name: '新增会员数',
							value: '￥0'
						}
					},				
					//					{
					//						title: '智慧餐饮',
					//						text: '集成CRM,运营，供应链多业务功能，一表在手，决策都有',
					//						data1: {
					//							name: '营业实数',
					//							value: '￥0'
					//						},
					//						data2: {
					//							name: '账单数',
					//							value: '￥0'
					//						},
					//						data3: {
					//							name: '消费客数',
					//							value: '￥0'
					//						},
					//						data4: {
					//							name: '账单均值',
					//							value: '￥0'
					//						}
					//					}
				],
			}
		},
		created() {
			this.HomePage();
			//console.log('uuuu', this.carouselDataArr[0]);
		},
		computed: {
			
		},
		methods: {
			...mapActions('newsinfo',['GetNewsData']),
			HomePage() {
				//调取首页指标
				let _this = this;
				this.getResult.getResult('report/UserReportRest/indexTarget', {}, function(result) {
					//					console.log(result);
					if(result) {
						for(let i in result) {
							let obj = {};
							switch(i) {
								case 'real_amount':
									obj.name = '营业实收';
									obj.value = "￥" + result[i];
									_this.carouselDataArr[0].data1 = obj;
									break;
								case 'sale_billnum':
									obj.name = '消费账单';
									obj.value = "￥" + result[i];
									_this.carouselDataArr[0].data2 = obj;
									break;
								case 'sale_person_num':
									obj.name = '消费客数';
									obj.value = "￥" + result[i];
									_this.carouselDataArr[0].data3 = obj;
									break;
								case 'sale_billaverage':
									obj.name = '账单均值';
									obj.value = "￥" + result[i];
									_this.carouselDataArr[0].data4 = obj;
									break;
								case 'consume':
									obj.name = '会员消费实收';
									obj.value = "￥" + result[i];
									_this.carouselDataArr[1].data1 = obj;
									break;
								case 'order_cycle':
									obj.name = '会员消费单数占比';
									obj.value = "￥" + result[i];
									_this.carouselDataArr[1].data2 = obj;
									break;
								case 'recharge':
									obj.name = '会员充值金额';
									obj.value = "￥" + result[i];
									_this.carouselDataArr[1].data3 = obj;
									break;
								case 'new_members':
									obj.name = '新增会员数';
									obj.value = "￥" + result[i];
									_this.carouselDataArr[1].data4 = obj;
									break;
									//								case 'cash_cycle':
									//								obj.name = '现金';
									//								obj.value= "￥"+result[i];						
									//							   _this.carouselDataArr[2].data1=obj;
									//								break;
									//								case 'bank_card_cycle':
									//								obj.name = '银行卡';
									//								obj.value= "￥"+result[i];						
									//							   _this.carouselDataArr[2].data2=obj;
									//								break;
									//								case 'third_party_cycle':
									//								obj.name = '第三方';
									//								obj.value= "￥"+result[i];						
									//							   _this.carouselDataArr[2].data3=obj;
									//								break;
									//								case 'other_cycle':
									//								obj.name = '其他';
									//								obj.value= "￥"+result[i];						
									//							   _this.carouselDataArr[2].data4=obj;
									//								break;
							}

						}
					}
				});
			},

		},
		
	}
</script>

<style>
	* {
		margin: 0;
		padding: 0;
	}
	
	body {
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
	
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	/*banner部分开始*/
	.lunbobox {
		width: 100%;
		height: 606px;
		margin-top: -40px;
		}
	
	.lunbobox .el-carousel__item .title {
		font-family: PingFangSC-Thin;
		font-size: 44px;
		color: #FFFFFF;
		margin-top: 150px;
		text-align: left;
		padding-left: 200px;
	}
	
	.lunbobox .el-carousel__item .text {
		font-family: PingFangSC-Regular;
		font-size: 18px;
		color: #D7E1FF;
		margin-top: -16px;
		text-align: left;
		padding-left: 200px;
		padding-top: 30px;
	}
	
	.lunbobox .el-carousel__item .ulsbox {
		width: 580px;
		height: 200px;
		padding-left: 200px;
		margin-top: 50px;
	}
	
	.lunbobox .el-carousel__item .ulsbox ul {
		width: 290px;
		height: 120px;
		float: left;
	}
	
	.lunbobox .el-carousel__item .ulsbox ul li {
		float: left;
		font-size: 36px;
		color: #FFFFFF;
		line-height: 30px;
	}
	
	.lunbobox .el-carousel__item .ulsbox ul li p {
		width: 290px;
		font-size: 18px;
		color: #D7E1FF;
		line-height: 65px;
		text-align: left;
		margin-left: 10px;
	}
	
	.lunbobox .el-carousel__item:first-child {
		background-image: url(../../static/assets/1-bg.png);
		background-position: center 0;
		background-size: 100% 100%;
	}
	/*第一张动图右边盒子*/
	.lunbobox .el-carousel__item:first-child .animateBox {
		width: 850px;
		height: 520px;
		position: relative;
		background-image: url(../../static/assets/1-bgD.png);
		background-position: center 0;
		background-size: 100% 100%;
		margin-left: 50%;
		margin-top: -410px;
	}
	/*八卦阵1*/
	
	.lunbobox .el-carousel__item:first-child .animateBox .diagrams1 {
		width: 434px;
		height: 252px;
		background-image: url(../../static/assets/diagrams1.png);
		animation: Updown 1s infinite alternate;
		-webkit-animation: Updown 1s alternate infinite;
		position: absolute;
		left: 48px;
		top:215px;
		z-index: 10;
	}
	/*八卦阵2*/
	.lunbobox .el-carousel__item:first-child .animateBox .diagrams2 {
		width: 434px;
		height: 252px;
		background-image: url(../../static/assets/diagrams2.png);
		animation: Updown 1s infinite alternate;
		-webkit-animation: Updown 2.5s alternate infinite;
		position: absolute;
		left: 48px;
		top:200px;
		z-index: 11;
	}
	/*八卦阵3*/
	.lunbobox .el-carousel__item:first-child .animateBox .diagrams3 {
		width: 434px;
		height: 252px;
		background-image: url(../../static/assets/diagrams3.png);
		animation: Updown 1s infinite alternate;
		-webkit-animation: Updown 2s alternate infinite;
		position: absolute;
		left: 48px;
		top:185px;
		z-index: 12;
	}
	/*八卦线*/
	.lunbobox .el-carousel__item:first-child .animateBox .diagrams4 {
		width: 434px;
		height: 252px;
		background-image: url(../../static/assets/diagrams4.png);
		animation: Updown 1s infinite alternate;
		-webkit-animation: Updown 1.5s alternate infinite;
		position: absolute;
		left: 48px;
		top:160px;
		z-index: 13;
	}
	/*四个小人*/
	.lunbobox .el-carousel__item:first-child .animateBox .fourMen{
		width: 480px;
		height: 350px;
		background-image: url(../../static/assets/fourMen.png);
		position: absolute;
		left: 111px;
		top:121px;
		z-index: 24;
	}
	/*左边人*/
	.lunbobox .el-carousel__item:first-child .animateBox .blackCurve{
		width: 50px;
		height: 76px;
		background-image: url(../../static/assets/blackCurve.png);
		position: absolute;
		left: 105px;
		top:246px;
		z-index: 15;
	}
	/*右边人的图1*/
	.lunbobox .el-carousel__item:first-child .animateBox .curveDialogBox1{
		width: 75px;
		height: 88px;
		background-image: url(../../static/assets/curveDialogBox1.png);
		animation: Updown 1s infinite alternate;
		-webkit-animation: leftRightDirection 1.5s alternate infinite;
		position: absolute;
		left: 560px;
		top:192px;
		z-index: 17;
	}
	/*右边人的图2*/
	.lunbobox .el-carousel__item:first-child .animateBox .curveDialogBox2{
		width: 68px;
		height: 79px;
		background-image: url(../../static/assets/curveDialogBox2.png);
		position: absolute;
		left: 590px;
		top:192px;
		z-index: 16;
	}
	/*八卦中心1*/
	.lunbobox .el-carousel__item:first-child .animateBox .gossipCenter1{
		width: 177px;
		height: 103px;
		background-image: url(../../static/assets/gossipCenter1.png);
		animation: Updown 1s infinite alternate;
		-webkit-animation: Updown 1.5s alternate infinite;
		position: absolute;
		left: 179px;
		top:252px;
		z-index: 16;
	}
		/*八卦中心2*/
	.lunbobox .el-carousel__item:first-child .animateBox .gossipCenter2{
		width: 177px;
		height: 103px;
		background-image: url(../../static/assets/gossipCenter2.png);
		animation: Updown 1s infinite alternate;
		-webkit-animation: Updown 1.8s alternate infinite;
		position: absolute;
		left: 179px;
		top:235px;
		z-index: 18;
	}
		/*八卦中心3*/
	.lunbobox .el-carousel__item:first-child .animateBox .gossipCenter3{
		width: 177px;
		height: 103px;
		background-image: url(../../static/assets/gossipCenter3.png);
		animation: Updown 1s infinite alternate;
		-webkit-animation: Updown 1.8s alternate infinite;
		position: absolute;
		left: 179px;
		top:220px;
		z-index: 19;
	}
		/*八卦中心4*/
	.lunbobox .el-carousel__item:first-child .animateBox .gossipCenter4{
		width: 177px;
		height: 103px;
		background-image: url(../../static/assets/gossipCenter4.png);
		animation: Updown 1s infinite alternate;
		-webkit-animation: Updown 1.8s alternate infinite;
		position: absolute;
		left: 179px;
		top:210px;
		z-index: 19;
	}
	/*曲线1*/
	.lunbobox .el-carousel__item:first-child .animateBox .curve1{
		width: 298px;
		height: 210px;
		background-image: url(../../static/assets/curve1.png);
		position: absolute;
		left: 259px;
		top:-24px;
		z-index: 20;
	}
	/*饼图1*/
	.lunbobox .el-carousel__item:first-child .animateBox .pieChart1{
		width: 70px;
		height: 96px;
		background-image: url(../../static/assets/pieChart1.png);
		animation: leftRightDirection 1.8s infinite alternate;
		-webkit-animation: leftRightDirection 1.8s alternate infinite;
		position: absolute;
		left: 259px;
		top:90px;
		z-index: 21;
	}
	/*饼图2*/
	.lunbobox .el-carousel__item:first-child .animateBox .pieChart2{
		width: 70px;
		height: 96px;
		background-image: url(../../static/assets/pieChart2.png);
		animation: leftRightDirection 2s infinite alternate;
		-webkit-animation: leftRightDirection 2s alternate infinite;
		position: absolute;
		left: 398px;
		top:8px;
		z-index: 21;
	}
	/*曲线2*/
	.lunbobox .el-carousel__item:first-child .animateBox .curve2{
		width: 298px;
		height: 210px;
		background-image: url(../../static/assets/curve2.png);
		animation: leftRightDirection 1s infinite alternate;
		-webkit-animation: leftRightDirection 1.8s alternate infinite;
		position: absolute;
		left: 143px;
		top:-80px;
		z-index: 21;
	}
	/*一堆细线*/
	.lunbobox .el-carousel__item:first-child .animateBox .lines{
		width: 267px;
		height: 463px;
		background-image: url(../../static/assets/lines.png);
		animation: Updown 1s infinite alternate;
		-webkit-animation: Updown 2s alternate infinite;
		position: absolute;
		left: 47px;
		top:-121px;
		z-index: 18;
	}
	/*上下移动*/
	@keyframes Updown {
		from {
			margin-top: 20px;
		}
		to {
			margin-top: 10px;
		}
	}
	
	@-webkit-keyframes Updown {
		from {
			margin-top: 30px;
		}
		to {
			margin-top: 10px;
		}
	}
	/*左右移动*/
	
	@keyframes leftRightDirection {
		from {
			margin-left: 20px;
		}
		to {
			margin-left: 10px;
		}
	}
	
	@-webkit-keyframes leftRightDirection {
		from {
			margin-left: 30px;
		}
		to {
			margin-left: 10px;
		}
	}
	/*第二张动图*/
	
	.lunbobox .el-carousel__item:nth-child(2) {
		background: url(../../static/assets/bg.png);
		background-position: center 0;
		background-size: 100% 100%;
	}
	/*第二张动图的背景图*/
	.lunbobox .el-carousel__item:nth-child(2) .secondPic{
		width:1010px;
		height: 510px;
		position: relative;
		background-image: url(../../static/assets/oval.png);
		background-position: center 0;
		background-size: 100% 100%;
		margin-left: 50%;
		margin-top: -410px;
	}
	/*流星图*/
	.lunbobox .el-carousel__item:nth-child(2) .secondPic .meteor2{
		width:917px;
		height: 551px;
		background-image: url(../../static/assets/meteor2.png);
		background-position: center 0;
		background-size: 100% 100%;
		position: absolute;
		left: 0;
		top: 0;
	}	
	/*中间电脑部分1*/
	.lunbobox .el-carousel__item:nth-child(2) .secondPic .group2{
		width:363px;
		height: 410px;
		background-image: url(../../static/assets/group2.png);
		background-position: center 0;
		background-size: 100% 100%;
		position: absolute;
		left: 240px;
		top: 0;
	}
	/*电脑2*/
	.lunbobox .el-carousel__item:nth-child(2) .secondPic .rectangle30{
		width: 174px;
		height: 236px;
		background-image: url(../../static/assets/rectangle30.png);
		background-position: center 0;
		background-size: 100% 100%; 
		animation: leftRightDirection 1.5s infinite alternate;
		-webkit-animation: leftRightDirection 1.5s alternate infinite;
		position: absolute;
		left: 369px;
		top:55px;
		z-index: 10;
	}
	/*电脑3*/
	.lunbobox .el-carousel__item:nth-child(2) .secondPic .rectangleCopy4{
		width: 183px;
		height: 245px;
		background-image: url(../../static/assets/rectangleCopy4.png);
		background-position: center 0;
		background-size: 100% 100%;
		animation: leftRightDirection 2s infinite alternate;
		-webkit-animation: leftRightDirection 2s alternate infinite;
		position: absolute;
		left: 351px;
		top:66px;
		z-index: 11;
	}
	/*/电脑4*/
	
	.lunbobox .el-carousel__item:nth-child(2) .secondPic .curve8{
		width: 174px;
		height: 144px;
		background-image: url(../../static/assets/curve8.png);
		background-position: center 0;
		background-size: 100% 100%;
		animation: leftRightDirection 2s infinite alternate;
		-webkit-animation: leftRightDirection 2s alternate infinite;
		position: absolute;
		left: 356px;
		top:160px;
		z-index: 12;
	}
	/*一根线*/
	.lunbobox .el-carousel__item:nth-child(2) .secondPic .bottoms{
		width: 374px;
		height: 273px;
		background-image: url(../../static/assets/bottoms.png);
		background-position: center 0;
		background-size: 100% 100%;
		position: absolute;
		left: 170px;
		top:201px;
		z-index: 15;
	}
	/*电脑左1*/
	.lunbobox .el-carousel__item:nth-child(2) .secondPic .diagram1{
		width: 123px;
		height: 162px;
		background-image: url(../../static/assets/diagram1.png);
		background-position: center 0;
		background-size: 100% 100%;
		position: absolute;
		left: 172px;
		top:72px;
		z-index: 16;
	}
	/*电脑左2*/
	.lunbobox .el-carousel__item:nth-child(2) .secondPic .diagram{
		width: 123px;
		height: 162px;
		background-image: url(../../static/assets/diagram.png);
		background-position: center 0;
		background-size: 100% 100%;
		animation: leftRightDirection 1.5s infinite alternate;
		-webkit-animation: leftRightDirection 1.5s alternate infinite;
		position: absolute;
		left: 176px;
		top:73px;
		z-index: 17;
	}
	/*手机1*/
	.lunbobox .el-carousel__item:nth-child(2) .secondPic .group11{
		width: 182px;
		height: 113px;
		background-image: url(../../static/assets/group11.png);
		background-position: center 0;
		background-size: 100% 100%;
		position: absolute;
		left: 196px;
		top:310px;
		z-index: 17;
	}
	/*手机2*/
	.lunbobox .el-carousel__item:nth-child(2) .secondPic .rectangle34{
		width: 65px;
		height: 108px;
		background-image: url(../../static/assets/rectangle34.png);
		background-position: center 0;
		background-size: 100% 100%;
		position: absolute;
		left: 216px;
		top:257px;
		z-index: 17;
	}
	/*手机3*/
	.lunbobox .el-carousel__item:nth-child(2) .secondPic .rectangle{
		width: 65px;
		height: 108px;
		background-image: url(../../static/assets/rectangle.png);
		background-position: center 0;
		background-size: 100% 100%;
		animation: leftRightDirection 3s infinite alternate;
		-webkit-animation: leftRightDirection 3s alternate infinite;
		position: absolute;
		left: 216px;
		top:257px;
		z-index: 17;
	}
	/*手机4*/
	.lunbobox .el-carousel__item:nth-child(2) .secondPic .path{
		width: 49px;
		height: 58px;
		background-image: url(../../static/assets/path.png);
		background-position: center 0;
		background-size: 100% 100%;
		animation: leftRightDirection 3s infinite alternate;
		-webkit-animation: leftRightDirection 3s alternate infinite;
		position: absolute;
		left: 222px;
		top:270px;
		z-index: 17;
	}
	/*第一根柱子*/
	.lunbobox .el-carousel__item:nth-child(2) .secondPic .copy1{
		width: 51px;
		height: 78px;
		background-image: url(../../static/assets/copy1.png);
		background-position: center 0;
		background-size: 100% 100%;
		animation: Updown 2s infinite alternate;
		-webkit-animation: Updown 2s alternate infinite;
		position: absolute;
		left: 491px;
		top:371px;
		z-index: 17;
	}
	/*第二根柱子*/
	.lunbobox .el-carousel__item:nth-child(2) .secondPic .copy3{
		width: 51px;
		height: 115px;
		background-image: url(../../static/assets/copy3.png);
		background-position: center 0;
		background-size: 100% 100%;
		animation: Updown 3s infinite alternate;
		-webkit-animation: Updown 3s alternate infinite;
		position: absolute;
		left: 529px;
		top:314px;
		z-index: 15;
	}
	/*第三根柱子*/
	.lunbobox .el-carousel__item:nth-child(2) .secondPic .copy2{
		width: 51px;
		height: 78px;
		background-image: url(../../static/assets/copy2.png);
		background-position: center 0;
		background-size: 100% 100%;
		animation: Updown 1.5s infinite alternate;
		-webkit-animation: Updown 1.5s alternate infinite;
		position: absolute;
		left: 570px;
		top:314px;
		z-index: 13;
	}
	/*第一根线*/
	.lunbobox .el-carousel__item:nth-child(2) .secondPic .group4{
		width: 16px;
		height: 93px;
		background-image: url(../../static/assets/group4.png);
		background-position: center 0;
		background-size: 100% 100%;
		animation: Updown 2.5s infinite alternate;
		-webkit-animation: Updown 2.5s alternate infinite;
		position: absolute;
		left: 620px;
		top:180px;
		z-index: 13;
	}
	/*第二根线*/
	.lunbobox .el-carousel__item:nth-child(2) .secondPic .group6{
		width: 16px;
		height: 102px;
		background-image: url(../../static/assets/group6.png);
		background-position: center 0;
		background-size: 100% 100%;
		animation: Updown 2s infinite alternate;
		-webkit-animation: Updown 2s alternate infinite;
		position: absolute;
		left: 630px;
		top:163px;
		z-index: 13;
	}
	/*第三根线*/
	.lunbobox .el-carousel__item:nth-child(2) .secondPic .group5{
		width: 16px;
		height: 100px;
		background-image: url(../../static/assets/group5.png);
		background-position: center 0;
		background-size: 100% 100%;
		animation: Updown 1.5s infinite alternate;
		-webkit-animation: Updown 1.5s alternate infinite;
		position: absolute;
		left: 643px;
		top:176px;
		z-index: 13;
	}
	/*曲线*/
	.lunbobox .el-carousel__item:nth-child(2) .secondPic .group10{
		width: 110px;
		height: 84px;
		background-image: url(../../static/assets/group10.png);
		background-position: center 0;
		background-size: 100% 100%;
		animation: Updown 1.5s infinite alternate;
		-webkit-animation: Updown 1.5s alternate infinite;
		position: absolute;
		left: 617px;
		top:224px;
		z-index: 13;
	}
	/*箭头*/
	.lunbobox .el-carousel__item:nth-child(2) .secondPic .group12{
		width: 20px;
		height: 37px;
		background-image: url(../../static/assets/group12.png);
		background-position: center 0;
		background-size: 100% 100%;
		animation: Updown 1.5s infinite alternate;
		-webkit-animation: Updown 1.5s alternate infinite;
		position: absolute;
		left: 149px;
		top:155px;
		z-index: 13;
	}
	
	/*banner部分结束*/
	
	article {
		width: 100%;
		margin: 0 auto;
	}
	article .largeContainer{
		width: 100%;
		margin: 0 auto;
		background-image: url(../../static/assets/middlePic.png);
		background-repeat: no-repeat;
		background-position: center 0;
		background-size: 100% 100%;
		/*padding-bottom: 50px;*/
	}
	article .largeContainer .middleContent{
		width: 80%;
		margin: 0 auto;
	}
	
	article .largeContainer h3 {
		text-align: center;
		padding-top: 50px;
		font-size: 20px;
		line-height: 30px;
	}
	
	article .largeContainer p {
		font-size: 14px;
		color: #0D1A32;
		text-align: center;
		margin-top: 5px;
	}
	
	article .largeContainer .dynamic {
		width: 90%;
		height: auto;
		margin: 0 auto;
		margin-top: 30px;
		padding-bottom: 50px;
		display: flex;
		justify-content: space-between;
	}
	
	article .dynamic dl {
		width: 33%;
		text-align: center;
	}
	
	article .dynamic dl dt img {
		width: 120px;
		height: 120px;
		cursor: pointer;
		transition: all 0.6s;
	}
	
	article .dynamic dl dt img:hover {
		transform: scale(1.2);
	}
	
	article .dynamic dl .reportForm {
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #0D1A32;
		line-height: 14px;
		margin-top: 10px;
	}
	/*最下面部分开始*/
	
	.bottom {
		width: 100%;
		height: 50px;
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #FFFFFF;
		background: #121A2C;
		line-height: 50px;
		text-align: center;
	}
	/*最下面部分开始*/
</style>