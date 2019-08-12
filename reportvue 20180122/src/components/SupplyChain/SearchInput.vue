<template>
  <div class="search_input">
	<el-autocomplete
		  popper-class="my-autocomplete"
		  v-model="GoodsName1"
		  :fetch-suggestions="querySearch"
		  placeholder="请输入搜索内容"
		  @select="handleSelect">
		  <i
		    class="el-icon-search el-input__icon"
		    slot="suffix"
		    @click="handleIconClick">
		  </i>
		  <template slot-scope="props">
		    <div class="name">{{ props.item.value }}</div>
		  </template>
		</el-autocomplete>
	</div>
</template>

<script>
	import {mapGetters, mapMutations, mapActions} from 'vuex'
	export default {
		name:'SearchInput',
		data() {
			return {
				resultsList: [],
			};
		},
		created(){
			this.setGoodsName('');//搜索物品名称
		},
		computed:{
			...mapGetters(['Report_num']),
			...mapGetters('SupplyChain',['GoodsName']),
			GoodsName1:{//物品
				get:function(){
					return this.GoodsName;
				},
				set:function(value){
					this.setGoodsName(value);
				}
			},
		},
		methods: {
			...mapMutations('SupplyChain',['setGoodsName']),
			querySearch(queryString, cb) {
		        var resultsList = this.resultsList;
		        var results = queryString ? resultsList.filter(this.createFilter(queryString)) : resultsList;
		        // 调用 callback 返回建议列表的数据
		        cb(results);
		      },
		      createFilter(queryString) {
		        return (resultsLi) => {
		          return (resultsLi.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
		        };
		    },
			loadAll() {
				 if(this.Report_num=='SAAS_BI_2017_163'){
				 	return [
		          { "value": "133434343", "note": "物品名称11111" },
		          { "value": "13434234", "note": "物品名称22222" },
		          { "value": "2342342", "note": "物品名称33333" },
		          { "value": "54545454", "note": "物品名称44444" },
		        ];
				 }else if(this.Report_num=='SAAS_BI_2017_164'){
				 	return [
		          { "value": "物品名称1", "note": "物品名称11111" },
		          { "value": "物品名称2", "note": "物品名称22222" },
		          { "value": "物品名称3", "note": "物品名称33333" },
		          { "value": "物品名称4", "note": "物品名称44444" },
		        ];
				 }
		        
		      },
		      handleSelect(item) {
		        //console.log(item);
		      },
		      handleIconClick(ev) {
		        console.log(ev);
		      }
		},
	    mounted() {
	      this.resultsList = this.loadAll();
	    }

	}
</script>

<style>
.my-autocomplete .el-autocomplete-suggestion__list li div{
	line-height: 34px !important;
	width: 100px;
	overflow: hidden;
	text-overflow: ellipsis;
	}
.search_input .el-input__icon{
	line-height: 20px;
    }
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>