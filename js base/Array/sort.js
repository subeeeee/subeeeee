let arr = [1,2,3,4,4,5,43,5,6,5,7,8,9,5,6,74,45,5,95,64];

console.log('排序');
function sort(arr) {
    let exampleArr = JSON.parse(JSON.stringify(arr))
    let a = 0;
    for(let i = 0;i < exampleArr.length;i++){
        for(let j = i;j < exampleArr.length;j++){
            if(exampleArr[i] > exampleArr[j]){
                a = exampleArr[i];
                exampleArr[i] = exampleArr[j];
                exampleArr[j] = a
            }
        }
    }
    return exampleArr
}
console.log(sort(arr));
console.log(arr)
console.log('去重')
function replaceSame(arr) {
    let resultArr = [];
    for(let i = 0;i < arr.length;i++){
        if(resultArr.indexOf(arr[i]) == -1){
            resultArr.push(arr[i])
        }
    }
    return resultArr
}
console.log(replaceSame(arr))