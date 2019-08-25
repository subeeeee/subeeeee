/**
 *简单的promise对象
 * */
let random = (min,max) => {
    return Math.random() *(max - min) + min
}
function test(resolve, reject) {
    var randomNo = random(0,10);
    console.log('--------------'+randomNo);
    setTimeout(function () {
        if (randomNo < 5) {
            console.log('call resolve()...');
            resolve('200 OK');
        }
        else {
            console.log('call reject()...');
            reject('timeout in ' + randomNo + ' seconds.');
        }
    }, randomNo * 1000);
}

var p1 = new Promise(test);
var p2 = p1.then(function (result) {
    console.log('成功：' + result);
});
var p3 = p2.catch(function (reason) {
    console.log('失败：' + reason);
});