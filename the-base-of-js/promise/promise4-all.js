/**
 *Promise还可以做更多的事情，比如，有若干个异步任务，需要先做任务1，如果成功后再做任务2，任何任务失败则不再继续并执行错误处理函数。
 * 要串行执行这样的异步任务，不用Promise需要写一层一层的嵌套代码
 * */


let random = (min,max) => {
    return Math.random() *(max - min) + min
}
function test1(resolve, reject) {
    let randomNo = random(0,10);
    console.log('--------------'+randomNo);
    setTimeout(function () {
        if (randomNo < 5) {
            console.log('success');
            resolve('200 OK');
        }
        else {
            console.log('err');
            reject('err ' + randomNo);
        }
    }, 1000);
}
function test2() {
    return new Promise(
        function (resolve, reject) {
            let randomNo = random(0,10);
            console.log('--------------'+randomNo);
            setTimeout(function () {
                if (randomNo < 5) {
                    console.log('success');
                    resolve('200 OK');
                }
                else {
                    console.log('err');
                    reject('err ' + randomNo);
                }
            }, 1000);
        }
    )

}
function test3() {
    return new Promise( function (resolve, reject) {
        let randomNo = random(0,10);
        console.log('--------------'+randomNo);
        setTimeout(function () {
            if (randomNo < 5) {
                console.log('success');
                resolve('200 OK');
            }
            else {
                console.log('err');
                reject('err ' + randomNo);
            }
        }, 1000);
    })

}
let testP1 = new Promise(test1)
Promise.all([testP1,test2,test3]).then(res=>{
    console.log('all-res:' + res)
}).catch(res=>{
    console.log(res,1111)
})