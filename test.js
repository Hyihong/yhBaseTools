


//柯里化
/*
   @param fn : 表示消化手段
*/
var currying = function( fn ){
    var args = [].slice.call( arguments, 1) ; //指第一个参数
    return function(){
         var newArgs = args.concat( [].slice.call(arguments)) ;
         return fn.call(this,newArgs);
    }

}

var means = function(){
    var allParam = [].slice.call( arguments ) ;//表示所有参数
    console.log( this )
    console.log( allParam.join(","));

}
var getWife = currying(means,"第一个");
getWife("第二个","第三个","第四个","第五个");
