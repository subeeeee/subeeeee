<template>
	<div class="params businesssummary">
		<template v-if="Report_num == 'SAAS_BI_2016_38'">
			<QueryDatatime :DateTimeId="'DateTime'"></QueryDatatime>
			<MultiTree :StoreId="'StoreId'"></MultiTree>
			<QueryType @QueryTypeChange="QueryTypeChange"></QueryType>
		</template>
		<template v-if="Report_num == 'SAAS_BI_2016_25'">
			<QueryDatatime :DateTimeId="'DateTime'"></QueryDatatime>
			<MultiTree :StoreId="'StoreId'"></MultiTree>
			<SelectRpt :selectId="'BusinessArea'" :multiple="true" :placeholder="'请选择营业区域'"></SelectRpt>
		</template>
		<template v-if="Report_num == 'SAAS_BI_2016_28'">
			<QueryDatatime :DateTimeId="'DateTime'"></QueryDatatime>
			<MultiTree :StoreId="'StoreId'"></MultiTree>
			<QueryType @QueryTypeChange="QueryTypeChange"></QueryType>
		</template>
		<template v-if="Report_num == 'SAAS_BI_2017_02'">
			<QueryDatatime :DateTimeId="'DateTime'"></QueryDatatime>
			<MultiTree :StoreId="'StoreId'"></MultiTree>
			<QueryType @QueryTypeChange="QueryTypeChange"></QueryType>
		</template>
		<template v-if="Report_num == 'SAAS_BI_2016_29'">
			<QueryDatatime :DateTimeId="'DateTime'"></QueryDatatime>
			<MultiTree :StoreId="'StoreId'"></MultiTree>
			<MultiTree :StoreId="'ContrastId'"></MultiTree>
		</template>
		<template v-if="Report_num == 'SAAS_BI_2016_37'">
			<QueryDatatime :DateTimeId="'DateTime'"></QueryDatatime>
			<MultiTree :StoreId="'StoreId'"></MultiTree>
			<QueryType @QueryTypeChange="QueryTypeChange"></QueryType>
		</template>
		<template v-if="Report_num == 'SAAS_BI_2016_13'">
			<QueryDatatime :DateTimeId="'DateTime'"></QueryDatatime>
			<MultiTree :StoreId="'StoreId'"></MultiTree>
			<QueryType @QueryTypeChange="QueryTypeChange"></QueryType>
		</template>
		<template v-if="Report_num == 'SAAS_BI_2016_07'">
			<QueryDatatime :DateTimeId="'DateTime'"></QueryDatatime>
			<MultiTree :StoreId="'StoreId'"></MultiTree>
			<MultiTree :StoreId="'RegisterId'"></MultiTree>
		</template>
		<template v-if="Report_num == 'SAAS_BI_2016_01'">
			<QueryDatatime :DateTimeId="'DateTime'"></QueryDatatime>
			<MultiTree :StoreId="'StoreId'"></MultiTree>
			<QueryType @QueryTypeChange="QueryTypeChange"></QueryType>
		</template>
		<template v-if="Report_num == 'SAAS_BI_2016_27'">
			<QueryDatatime :DateTimeId="'DateTime'"></QueryDatatime>
			<MultiTree :StoreId="'StoreId'"></MultiTree>
			<QueryType @QueryTypeChange="QueryTypeChange"></QueryType>
		</template>
		<template v-if="Report_num == 'SAAS_BI_2017_125'">
			<QueryDatatime1></QueryDatatime1>
			<QueryStore :StoreId="'StoreId'"></QueryStore>
			<QueryType @QueryTypeChange="QueryTypeChange"></QueryType>
		</template>
		<template v-if="Report_num == 'SAAS_BI_2017_122'">
			<QueryDatatime1></QueryDatatime1>
			<QueryStore :StoreId="'StoreId'"></QueryStore>
		</template>

		<SeniorQuery v-if="seniorquery" @SeniorQueryFun="SeniorQueryFun"></SeniorQuery>
		<QueryBtn @BtnClick="BtnClick" ref="QueryBtn"></QueryBtn>
		<customRpt :report_num="Report_num" :CustomVisible="CustomVisible" @GetReportCustomFun="GetReportCustomFun" ref="customRpt"></customRpt>
	</div>
</template>

<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	import QueryDatatime from '@/components/public/QueryDatatime'
	import QueryDatatime1 from '@/components/public/QueryDatatime1'
	import QueryType from '@/components/public/QueryType'
	import QueryBtn from '@/components/public/QueryBtn'
	import SelectRpt from '@/components/public/SelectRpt'
	import MultiTree from '@/components/public/MultiTree'
	import QueryStore from '@/components/public/QueryStore'
	import SeniorQuery from '@/components/businesssummary/SeniorQuery1'
	import customRpt from './../custom/custom.vue'

	export default {
		name: 'paramsbusiness',
		names: '高级查询',
		components: {
			QueryDatatime,
			MultiTree,
			QueryType,
			QueryBtn,
			SeniorQuery,
			customRpt,
			SelectRpt,
			QueryDatatime1,
			QueryStore,
		},
		data() {
			return {
				CustomVisible: false,
			};
		},
		computed: {
			...mapGetters(['pageid']),
			Report_num: {
				get: function() {
					let ids = this.pageid + "/Report_num";
					return this.$store.getters[ids];
				}
			},
			query_type: {
				get: function() {
					let ids = this.pageid + "/query_type";
					return this.$store.getters[ids];
				}
			},
			seniorquery: {
				get: function() {
					let ids = this.pageid + "/seniorquery";
					return this.$store.getters[ids];
				}
			},
		},
		created() {

		},
		methods: {
			GetReportCustomFun(headerArr) {
				this.CustomVisible = false;
				if(headerArr != 'close') {
					this.$emit('SetCustomData', headerArr);
				}
			},
			QueryTypeChange(value, text) {
				//查询方式改变后的回调
				try {
					this.$refs.customRpt.StartPage(this.query_type);
				} catch(e) {

				}
			},
			SeniorQueryFun(type) {
				//高级查询
				if(type == 'custom') {
					this.$refs.customRpt.StartPage();
				} else {
					this.$emit('ParamsBusinessFun', type);
				}
			},
			BtnClick(type) {
				//按钮点击
				if(type == 'custom') {
					this.CustomVisible = true;
					//this.$emit('ParamsBusinessFun','custom');
				} else if(type == 'export') {
					this.$emit('ParamsBusinessFun', 'export');
				} else if(type == 'queryfind') {
					this.$emit('ParamsBusinessFun', 'query');
				}
			}
		},

	}
</script>

<style>
	.params>.SelectQuery {
		display: inline-block;
		width: 100%;
		margin-bottom: 10px;
	}
</style>