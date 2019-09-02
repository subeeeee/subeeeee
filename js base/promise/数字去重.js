
// set对象去重
let arr= [1,2,3,4,2,3,45,54,6,73,2,5,7,34,342,765,536,312,45,657,43,2,4];
let s = new Set(arr)
console.log([...s].sort((a,b)=>a-b));


// for循环去重  时间复杂度是O(n)
let new_arr = [];
for(let i = 0,j = arr.length;i<j;i++){
    new_arr.indexOf(arr[i]) == -1 && new_arr.push(arr[i])
}
console.log(new_arr.sort((a,b)=>a-b))