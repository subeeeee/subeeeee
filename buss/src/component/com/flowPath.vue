<template>
    <div>
      <el-row>
        <el-col :span="18" :offset="6">
          <div v-for="(item,index) in linkList">
            <div :class="link == item.value?'kua kua_color':'kua'"> {{item.name}} </div>
            <div class="downArrow" v-if="index != linkList.length-1">
              <img src="./../../assets/downArrow.png" />
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<script>
    export default {
        name: "flow-path",
        data(){
          return {
            link:'',
            linkList:[
              {name:"报单",value:'0'},
              {name:"初评询值",value:'1'},
              {name:"资料上传",value:'2'},
              {name:"风控审批",value:'3'},
              {name:"合同准备",value:'4'},
              {name:"公证登记",value:'6'},
              {name:"进抵登记",value:'7'},
              {name:"放款审批",value:'8'},
              {name:"放款",value:'9'},
              ]
          }
        },
        props:{
          linkNum:String,
        },
        mounted(){
          switch (this.linkNum){
            case '新增订单':
            case '初评完善':
            case '准入询值':
              this.link = '1';
              break;
            case '资料上传':
            case '下户预约':
            case '上传下户费凭证':
            case '下户费凭证审批':
              this.link = '2';
              break;
            case '资料核查':
            case '风控审批':
              this.link = '3';
              break;
            case '合同准备':
            case '面签-资料核查':
            case '面审':
              this.link = '4';
              break;
            case '公证登记':
              this.link = '6';
              break;
            case '进抵登记':
              this.link = '7';
              break;
            case '放款初审':
            case '放款终审':
            case '放款申请':
              this.link = '8';
              break;
            case '放款':
            case '放款确认':
              this.link = '9';
              break;
          }
          console.log(this.link)
        }
    }
</script>

<style scoped>
  .kua{
    width: 60%;
    height: 40px;
    line-height: 40px;
    border: 1px solid #000000;
    text-align: center;
    padding: 5px 10px;
  }
  .downArrow{
    width: 60%;
    padding: 5px 10px;
  }
  .downArrow img{
    display: block;
    margin: auto;
  }
  .kua_color{
    background: rgba(104, 202, 203, 1);
  }
</style>
