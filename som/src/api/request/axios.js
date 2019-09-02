import { get } from '@/utils/request'


get('/sss').then(res=>{
  console.log(res)
}).catch(err=>{
  cosnole.log(err)
});
