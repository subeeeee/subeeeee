//reverse

let arr1 = [1,2,3,4,5];
arr1.reverse();
console.log(arr1);

//sort

let arr2 = [1,12,23,2,0,15];
arr2.sort();
console.log('arr2:',arr2);
let arr3 = [1,12,23,2,0,15];

arr3.sort(function(a,b){
    return a - b;
});

console.log('arr3:',arr3);

// slice
let arr4 = [1,2,3,2,2,4,5,64,5,5];
let arr5 = arr4.slice(2,5);
console.log(arr4,' \r\n ',arr5);

// concat

// splice;

//every
let arr6 = [1,2,3,4,5,6,7,8,9];
console.log(arr6.every(item=>item > 0));

//some
let arr7 = [1,2,3,4,5,6,7,8,9];
console.log(arr7.some(item=>item > 8));


//forEach
let arr8 = [1,2,3,4,5,6,7];
arr8.forEach(function (item) {
    item = item * 3
    // forEach不能改变原数组的每个元素  只能通过数组的index去改变

});
// map
console.log(arr8);
let arr9 = [1,2,3,4,5,6,7];
let arr10 = arr9.map(function (item) {
    return item * 3

});
console.log(arr10);
// filter
let arr11 = [1,2,3,4,5,6,7];
let arr12 = arr11.filter(item=>item%2!=0);
console.log(arr12)
