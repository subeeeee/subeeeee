<template>
    <div>
      <div class="show_list_title">
        <h3><img src="./../../../assets/msg.png" class="listTitleImg"><span> 风控打回记录</span></h3>
      </div>
      <el-table :data="tableData" border stripe style="width: 100%" class="module_margin_bottom">
        <el-table-column header-align="center" align="center" prop="fromType" label="打回节点" width="180"> </el-table-column>
        <el-table-column header-align="center" align="center" prop="fromName" label="操作任务员" width="180"> </el-table-column>
        <el-table-column header-align="center" align="center" prop="fromTime" label="操作时间" min-width="180"> </el-table-column>
        <el-table-column header-align="center" align="center" prop="fromOpinion" label="打回意见" min-width="200"> </el-table-column>
        <el-table-column header-align="center" align="center" prop="previousTime" label="资料核查提交时间" min-width="180"> </el-table-column>
        <el-table-column header-align="center" align="center" prop="previousName" label="资料核查任务员" width="180"> </el-table-column>
      </el-table>
      <div class="show_list_title">
        <h3><img src="./../../../assets/msg.png" class="listTitleImg"><span> 核查结论</span></h3>
      </div>
      <el-row class="module_margin_bottom tableInfo">
        <el-col :span="24" class="table_tr">
          <el-col :span="4" class="table_td">是否需要打回补充材料<span class="importent">*</span></el-col>
          <el-col :span="14" class="table_td">
            <el-col :span="14" :offset="1">
              <el-radio-group size="small"   v-model="isMaterial">
                <el-radio label="1">是</el-radio>
                <el-radio label="0">否</el-radio>
              </el-radio-group>
            </el-col>
          </el-col>
        </el-col>
      </el-row>
      <el-row class="module_margin_bottom tableInfo table_height" v-if="isMaterial == '1'">
        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">模块 <span class="importent">*</span> </el-col>
          <el-col :span="21" class="table_td">
            需补充材料 <span class="importent">*</span>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">借款信息</el-col>
          <el-col :span="6" class="table_td table_td_pure">
            <el-select v-model="borrowList" placeholder="请选择" class=""  size='small' multiple @change="imageChange('borrowImageList','borrowList','borrowShowTagList')">
              <el-option v-for="item in borrowImageList" :label="item.name" :value="item.imageType"></el-option>
            </el-select>
          </el-col>
          <el-col :span="15" class="table_td">
            <el-tag class="tag" v-for="(item,index) in borrowShowTagList" type="primary" @close="delImageList('borrowList',item,index)" :closable="true">{{item.name}}</el-tag>
          </el-col>
        </el-col>

        <el-col :span="24" class="table_tr" v-for="(cust,custIndex) in custList">
          <el-col :span="3" class="table_td">{{cust.custName}}信息</el-col>
          <el-col :span="6" class="table_td table_td_pure">
            <el-select v-model="cust.borrowerList" placeholder="请选择" class=""  size='small' multiple @change="borrowerImageChange(custIndex)">
              <el-option v-for="borrowerImage in borrowerImageList" :label="borrowerImage.name" :value="borrowerImage.imageType"></el-option>
            </el-select>
          </el-col>
          <el-col :span="15" class="table_td">
            <el-tag class="tag" v-for="(borrowerShowTag,borrowerShowTagIndex) in cust.borrowerShowTagList" type="primary" @close="DelBorrowerImageList(borrowerShowTag,borrowerShowTagIndex,custIndex)" :closable="true">{{borrowerShowTag.name}}</el-tag>
          </el-col>
        </el-col>

        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">抵押物基本信息</el-col>
          <el-col :span="6" class="table_td table_td_pure">
            <el-select v-model="guaBaseList" placeholder="请选择" class=""  size='small' multiple @change="imageChange('guaBaseImageList','guaBaseList','guaBaseShowTagList')">
              <el-option v-for="item in guaBaseImageList" :label="item.name" :value="item.imageType"></el-option>
            </el-select>
          </el-col>
          <el-col :span="15" class="table_td">
            <el-tag class="tag" v-for="(item,index) in guaBaseShowTagList" type="primary" @close="delImageList('guaBaseList',item,index)" :closable="true">{{item.name}}</el-tag>
          </el-col>
        </el-col>

        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">抵押物勘察信息</el-col>
          <el-col :span="6" class="table_td table_td_pure">
            <el-select v-model="guaAroundList" placeholder="请选择" class=""  size='small' multiple @change="imageChange('guaAroundImageList','guaAroundList','guaAroundShowTagList')">
              <el-option v-for="item in guaAroundImageList" :label="item.name" :value="item.imageType"></el-option>
            </el-select>
          </el-col>
          <el-col :span="15" class="table_td">
            <el-tag class="tag" v-for="(item,index) in guaAroundShowTagList" type="primary" @close="delImageList('guaAroundList',item,index)" :closable="true">{{item.name}}</el-tag>
          </el-col>
        </el-col>

        <el-col :span="24" class="table_tr">
          <el-col :span="3" class="table_td">有利于贷款审批的额外信息</el-col>
          <el-col :span="6" class="table_td table_td_pure">
            <el-select v-model="proveList" placeholder="请选择" class=""  size='small' multiple @change="imageChange('proveImageList','proveList','proveShowTagList')">
              <el-option v-for="item in proveImageList" :label="item.name" :value="item.imageType"></el-option>
            </el-select>
          </el-col>
          <el-col :span="15" class="table_td">
            <el-tag class="tag" v-for="(item,index) in proveShowTagList" type="primary" @close="delImageList('proveList',item,index)" :closable="true">{{item.name}}</el-tag>
          </el-col>
        </el-col>
        <el-col :span="24" class="table_tr textarea_module">
          <el-col :span="3" class="table_td textarea_title">打回说明<span class="importent">*</span></el-col>
          <el-col :span="17 " class="textareawrap"><div class="textarea"><textarea :rows="6" placeholder="请输入打回说明。" v-model="returnMsg" @blur="verificationFn('returnMsg')" maxlength="2000"></textarea></div>
          </el-col>
          <el-col :span="4" class="table_td textarea_title" v-if="returnMsgBol"> <p class="error_title" >请输入打回说明！</p></el-col>
        </el-col>
      </el-row>
      <p class='mustWriteTips' v-if="upliadItem" style="color:red">{{upliadItem}}</p>
      <el-col :span="24" class="buttom_btn_warp">
        <el-col :span="6" :offset="6"><el-button @click="btnClick('save')" size="small" class="buttom_btn">保存</el-button></el-col>
        <el-col :span="6" ><el-button @click="btnClick('submit')" size="small"  class="buttom_btn">{{isMaterial == '1'?"打回资料上传补充":"提交风控"}} </el-button></el-col>
      </el-col>
    </div>
</template>

<script>
    export default {
        name: "conclusion",
        data(){
          return {
            tableData:[],
            isMaterial:'0',

            borrowList:[],
            borrowImageList:[],
            borrowShowTagList:[],


            custList:[],
            borrowerImageList:[],

            guaBaseList:[],
            guaBaseImageList:[],
            guaBaseShowTagList:[],

            guaAroundList:[],
            guaAroundImageList:[],
            guaAroundShowTagList:[],

            proveList:[],
            proveImageList:[],
            proveShowTagList:[],

            returnMsg:'',
            returnMsgBol:false,
            upliadItem:"",
            isFullCust:"",
            isFullGua:"",
            isFullLoan:"",
            isFullSurvey:"",
          }
        },
        methods:{
          imageChange(allList,itemList,showList){
            let list = [];
            this[allList].forEach(image=>{
              this[itemList].forEach(img=>{
                if(image.imageType === img){
                  list.push(image);
                }
              })
            });
            this[showList] = list
          },
          delImageList(itemList,item,i){
            this[itemList].splice(i, 1);
          },
          borrowerImageChange(index){
            let list = [];
            this.borrowerImageList.forEach(image=>{
              this.custList[index].borrowerList.forEach(img=>{
                if(image.imageType === img){
                  list.push(image);
                }
              })
            })
            this.$set(this.custList[index],'borrowerShowTagList',list);
          },
          DelBorrowerImageList(item,i,custIndex){
            this.custList[custIndex].borrowerList.splice(i, 1);
          },
          verificationFn(str){
            !this[str]?this[str+'Bol'] = true:this[str+'Bol'] = false
          },
          queryRiskReturnImage(){
            if(!(this.borrowImageList.length&&this.borrowerImageList.length&&this.guaBaseImageList.length&&this.guaAroundImageList.length&&this.proveImageList.length)){
              return
            }
            this.$http({
              url:'/flowImage/getImageListByTaskTypeAndDataTypeFlowCheck',
              type:'get',
              data:{
                bussNo:this.$route.query.bussNo,
                taskType:'138'
              },
              callback:res=>{
                let imageTypeFlowList = res.data.imageTypeList;
                imageTypeFlowList.forEach((imageFlow,index)=>{
                  let flag = false
                  this.borrowImageList.forEach(borrow=>{
                    if(imageFlow.imageType === borrow.imageType){
                      this.borrowShowTagList.push(imageFlow);
                      this.borrowList.push(imageFlow.imageType);
                      flag = true
                    }
                  })
                  if(flag){
                    return
                  }
                  this.guaBaseImageList.forEach(guaBase=>{
                    if(imageFlow.imageType === guaBase.imageType){
                      this.guaBaseShowTagList.push(imageFlow);
                      this.guaBaseList.push(imageFlow.imageType);
                      flag = true
                    }
                  })
                  if(flag){
                    return
                  }
                  this.guaAroundImageList.forEach(guaAround=>{
                    if(imageFlow.imageType === guaAround.imageType){
                      this.guaAroundShowTagList.push(imageFlow);
                      this.guaAroundList.push(imageFlow.imageType);
                      flag = true
                    }
                  })
                  if(flag){
                    return
                  }
                  this.proveImageList.forEach(prove=>{
                    if(imageFlow.imageType === prove.imageType){
                      this.proveShowTagList.push(imageFlow);
                      this.proveList.push(imageFlow.imageType);
                      flag = true
                    }
                  })
                  if(flag){
                    return
                  }
                  this.custList.forEach(cust=>{
                    if(imageFlow.custId === cust.id){
                      this.borrowerImageList.forEach(borrower=>{
                        if(imageFlow.imageType === borrower.imageType){
                          cust.borrowerShowTagList.push(imageFlow);
                          cust.borrowerList.push(imageFlow.imageType);
                        }
                      })
                    }
                  })
                })
              }
            })
          },
          queryImageList(){
            this.$http({
              url:'/businessImage/getImageListByTaskTypeAndDataType',
              type:'get',
              data:{
                bussNo:this.$route.query.bussNo,
                taskType:'138',
                dataType:'1',
              },
              callback:res=>{
                this.borrowImageList = res.data.imageTypeList;
                this.queryRiskReturnImage()
              }
            })
            this.$http({
              url: "/custInfo/selectCustInfo",
              data: {
                bussNo: this.$route.query.bussNo
              },
              callback: response => {
                response.data.busLoanInfoVoList.forEach((cust,index)=>{
                  cust.borrowerList = [];
                  cust.borrowerShowTagList = [];
                  if(index){
                    return
                  }
                  this.$http({
                    url:'/businessImage/getImageListByTaskTypeAndDataType',
                    type:'get',
                    data:{
                      bussNo:this.$route.query.bussNo,
                      taskType:'138',
                      dataType:'2',
                    },
                    callback:res=>{
                      this.borrowerImageList = res.data.imageTypeList;
                      this.queryRiskReturnImage()
                    }
                  })
                })
                this.custList = response.data.busLoanInfoVoList;
              }
            })
            this.$http({
              url:'/businessImage/getImageListByTaskTypeAndDataType',
              type:'get',
              data:{
                bussNo:this.$route.query.bussNo,
                taskType:'138',
                dataType:'3',
              },
              callback:res=>{
                this.guaBaseImageList = res.data.imageTypeList;
                this.queryRiskReturnImage()
              }
            })
            this.$http({
              url:'/businessImage/getImageListByTaskTypeAndDataType',
              type:'get',
              data:{
                bussNo:this.$route.query.bussNo,
                taskType:'138',
                dataType:'4',
              },
              callback:res=>{
                this.guaAroundImageList = res.data.imageTypeList
                this.queryRiskReturnImage()
              }
            })
            this.$http({
              url:'/businessImage/getImageListByTaskTypeAndDataType',
              type:'get',
              data:{
                bussNo:this.$route.query.bussNo,
                taskType:'138',
                dataType:'5',
              },
              callback:res=>{
                this.proveImageList = res.data.imageTypeList
                this.queryRiskReturnImage()
              }
            })
          },
          btnClick(type,fn,str){
            let custImageType = []
            this.custList.forEach(cust=>{
              let id = cust.id;
              let name = cust.custName;
              let list = JSON.parse(JSON.stringify( cust.borrowerShowTagList));
              list.forEach(image=>{
                image.custId = id;
                image.custName = name;
                custImageType.push(image)
              })
            })
            let imageTypeVoList = custImageType.concat(this.borrowShowTagList,this.guaBaseShowTagList,this.proveShowTagList,this.guaAroundShowTagList)
            let toMaterials = '';
            let fromMaterialsList = [];
            imageTypeVoList.forEach((item,i)=>{
              if(item.custName){
                toMaterials += (i + 1) +'.' + item.custName + item.name + '\r\n';
                fromMaterialsList.push((i + 1) +'.' + item.custName + item.name)
              }else{
                fromMaterialsList.push((i + 1) +'.' + item.name);
                toMaterials += (i + 1) +'.' + item.name + '\r\n'
              }
            });
            let data = {
              isFullCust : this.isFullCust,
              isFullLoan : this.isFullLoan,
              isFullGua : this.isFullGua,
              isFullSurvey :this.isFullSurvey,
              returnMsg:this.returnMsg,
              bussNo:this.$route.query.bussNo,
              isMaterial:this.isMaterial,
              imageTypeVoList:JSON.stringify(imageTypeVoList),
              material:toMaterials
            };
           if(type == 'save'){
              data.isSaveOrSubmit = 'save';
             this.sub(data,type,fn,str)
           } else {
             if(this.isMaterial == '1'){
               data.isSaveOrSubmit = 'attach';
               this.verificationFn('returnMsg');
               if(this.returnMsgBol){
                 return
               }
               if(!imageTypeVoList.length){
                 this.upliadItem = '请选择需补充材料';
                 return
               }else{
                 this.upliadItem = ''
               }
               let  dataMessage;
               const h = this.$createElement;
               let list  = [h('p', null, `需补充材料如下:`),];
               fromMaterialsList.forEach((item)=>{
                 list.push(h('p', { style: 'color: red;text-indent:2em;' }, item));
               });
               list.push(h('p', null, `打回说明：`));
               list.push( h('p', { style: 'color: red' }, ` ${this.returnMsg}`));
               list.push( h('p', null, `是否确认打回至资料上传环节?`));
               dataMessage = h('div',{style:' height: 300px !important;overflow-y: auto'},list)
               this.$msgbox({
                 title: '请确认以下信息',
                 message: dataMessage,
                 showCancelButton: true,
                 confirmButtonText: '是',
                 cancelButtonText: '否',
                 beforeClose: (action, instance, done) => {
                   if (action === 'confirm') {
                     done();
                     this.sub(data,type,fn,str)
                   } else {
                     done();
                   }
                 }
               });
             }else{
               data.isSaveOrSubmit = 'submit';
                if(this.isFullCust == 0||this.isFullGua != 11||this.isFullLoan == 0||this.isFullSurvey == 0){
                  this.$message.error('请完善小红点页签下的必填信息');
                  return
                }
                this.$confirm("是否确认材料齐全且无误,提交至风控审核?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                }).then(()=>{
                  this.sub(data,type,fn,str)
                });
             }
           }
          },
          sub(data,type,fn,str){
            this.$http({
              url:'/dataCheck/insertCheckSaveOrSubmit',
              data:data,
              callback:res=>{
               if(type == 'submit'){
                 this.$message.success('提交成功');
                 this.$router.push({
                   path:'/infoInspectList'
                 })
               }else{
                 this.$message.success('保存成功');
               }
                if(!!fn && !!str){
                  fn(str)
                }
              }
            })
          }
        },
        created(){
          window.bus.$on('/infoInspect/inspectConclusion',(fn,str) => {
            this.btnClick('save',fn,str);
          });
          this.queryImageList();
          //查询信息
          this.$http({
            url:'/dataCheck/riskOpinionFlowList',
            data:{bussNo:this.$route.query.bussNo},
            callback:res=>{
             this.tableData  = res.data.riskOpinionFlowVoList
            }
          })
          this.$http({
            url:'/dataCheck/querySummaryInfo',
            data:{bussNo:this.$route.query.bussNo},
            callback:res=>{
              this.isFullCust= res.data.dataCheckSummaryInfo.isFullCust;
              this.isFullGua= res.data.dataCheckSummaryInfo.isFullGua;
              this.isFullLoan= res.data.dataCheckSummaryInfo.isFullLoan;
              this.isFullSurvey= res.data.dataCheckSummaryInfo.isFullSurvey;
              this.isMaterial= !res.data.dataCheckSummaryInfo.isMaterial?'0':res.data.dataCheckSummaryInfo.isMaterial

            }
          })
        },
        beforeDestroy () {
          window.bus.$off('/infoInspect/inspectConclusion');
        }
    }
</script>

<style scoped>

</style>
