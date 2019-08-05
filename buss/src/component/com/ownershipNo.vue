<template>
  <div class="ownershipNoModule">

  </div>
</template>

<script>

   const ownershipNoModule = {
    name: "ownershipNo",
    data(){
      return{
        ownershipNo:'',
      }
    },
    props:{
      ownershipType:String,
      ownershipList:Array,
      ownershipNo:String,
      changeValue:Boolean
    },
    methods: {
      //房产证类型改变
      initOwnershipNo(ownershipType) {
        let bol = false;
        if(ownershipType){
          bol = true;
        }
        let _ownershipType = ownershipType?ownershipType:this.ownershipType;
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
            let showOwnershipString = ownershipString.replace(/\$/g,`<input type="text" class="houseCardNum houseCardInput" >`);
            $('.ownershipNoModule').html(showOwnershipString);
            //判断值改变且输入框中值均不为空触发
            if(!this.changeValue){
              let ownershipNoStr = '';
              $('.houseCardInput').change(()=>{
                let ownershipNoBol = false
                this.ownershipList.map((obj,index)=>{
                  if(obj.ownershipCode == this.ownershipType){
                    ownershipNoStr = obj.houseOwnership.replace(/\$/g,',').split(',');
                    $('.houseCardInput').map((index,dom) => {
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
            $('.houseCardInput').map((index,dom) => {
              dom.value = showOwnershipDataList[index];
            });
          }
        }
      },
      finish(){
        let ownershipNo = '';
        let ownershipNoBol = false
            this.ownershipList.map((obj,index)=>{
              if(obj.ownershipCode == this.ownershipType){
                ownershipNo = obj.houseOwnership.replace(/\$/g,',').split(',');
                $('.houseCardInput').map((index,dom) => {
                  ownershipNo[index] = ownershipNo[index] + dom.value
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
        this.$emit('finish',{ownershipNo:ownershipNo,ownershipNoBol:ownershipNoBol});
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
