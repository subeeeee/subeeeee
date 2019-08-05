<template>
  <div :class="'ownershipNoModule' + index">

  </div>
</template>

<script>

  const ownershipNoModule = {
    name: "ownership-no",
    data(){
      return{
        ownershipNo:'',
      }
    },
    props:{
      ownershipType:{
        type:String,
        default:'?'
      },
      index:{
        type:Number,
        default:0
      },
      ownershipList:Array,
      ownershipNo:String,
      changeValue:{
        type:Boolean,
        default:false
      }
    },
    methods: {

      //房产证类型改变
      initOwnershipNo(ownershipType) {
        console.log('ownershipType:',this.ownershipType)
        console.log('index:' , this.index)
        console.log('ownershipList:', this.ownershipList)
        console.log('ownershipNo:' , this.ownershipNo)
        console.log('changeValue:' ,this.changeValue)
        let bol = false;
        if(ownershipType){
          bol = true;
        }
        let _ownershipType = ownershipType||this.ownershipType;
        if(_ownershipType === '?'){
          setTimeout(()=>{
            this.initOwnershipNo()
          },500);
          return
        }

        let ownershipNo = this.ownershipNo;
        for(let i = 0;i < this.ownershipList.length;i++){
          if(_ownershipType === this.ownershipList[i].ownershipCode){
            let ownershipString = this.ownershipList[i].houseOwnership;
            let showOwnershipString = ownershipString.replace(/\$/g,`<input type="text" class="houseCardNum${this.index} houseCardInput${this.index} houseCardNum houseCardInput" maxlength="50">`);

            $('.ownershipNoModule' + this.index).html(showOwnershipString);
            $('.houseCardInput' + this.index).on('keyup',function () {
              $(this).val($(this).val().replace(/\s/g,''))
            });
            $('.houseCardInput' + this.index).on('blur', ()=> {
              this.finish()
            })
            //判断值改变且输入框中值均不为空触发
            if(!this.changeValue){
              let ownershipNoStr = '';
              $('.houseCardInput' + this.index).change(()=>{
                let ownershipNoBol = false;
                this.ownershipList.map((obj,index)=>{
                  if(obj.ownershipCode == this.ownershipType){
                    ownershipNoStr = obj.houseOwnership.split('$');
                    $('.houseCardInput' + this.index).map((index,dom) => {
                      ownershipNoStr[index] = ownershipNoStr[index] + dom.value;
                      if(!dom.value){
                        ownershipNoBol = true
                      }
                    })
                  }
                });
                if(ownershipNoStr){
                  ownershipNoStr = ownershipNoStr.join('');
                }else{
                  ownershipNoStr = ''
                }
                if(!ownershipNoBol){
                  this.$emit('valueChange',{ownershipNoStr:ownershipNoStr})
                }
              });
            }
            if(bol){
              return
            }
            ownershipString = ownershipString.replace(/\s/g,'');
            let ownershipDataList = ownershipString.replace(/\$/g,',').split(',');
            if(ownershipDataList[0] === ''){
              ownershipDataList.shift();
            }
            if(ownershipDataList[ownershipDataList.length-1] === ''){
              ownershipDataList.pop()
            }

            ownershipDataList.map((option,index,arr) =>{
              ownershipNo = ownershipNo.replace(option,',');
            });
            let showOwnershipDataList = ownershipNo.split(',');
            if(showOwnershipDataList[0] === ''){
              showOwnershipDataList.shift()
            }
            if(showOwnershipDataList[showOwnershipDataList.length-1] === ''){
              showOwnershipDataList.pop()
            }
            $('.houseCardInput' + this.index).map((index,dom) => {
              dom.value = showOwnershipDataList[index];
            });
          }
        }
      },
      finish(){
        let ownershipNo = '';
        let ownershipNoBol = false;
        this.ownershipList.map((obj,index)=>{
          if(obj.ownershipCode == this.ownershipType){
            ownershipNo = obj.houseOwnership.replace(/\$/g,',').split(',');
            $('.houseCardInput' + this.index).map((index,dom) => {
              ownershipNo[index] = ownershipNo[index] + dom.value;
              if(!dom.value){
                ownershipNoBol = true
              }
            })
          }
        });
        if(ownershipNo){
          ownershipNo = ownershipNo.join('');
        }else{
          ownershipNo = ''
        }

        this.$emit('finish',{ownershipNo,ownershipNoBol,ownershipType:this.ownershipType});
      }
    },
    mounted(){
      this.initOwnershipNo()
    },
    created() {

    }
  };
  export default ownershipNoModule
</script>

<style scoped>

</style>
