
//+++++++++++++++++++++++++++++++++++++++++++++++
/**
 * 已知 fn 为一个预定义函数，实现函数 curryIt，调用之后满足如下条件：
1、返回一个函数 a，a 的 length 属性值为 1（即显式声明 a 接收一个参数）
2、调用 a 之后，返回一个函数 b, b 的 length 属性值为 1
3、调用 b 之后，返回一个函数 c, c 的 length 属性值为 1
4、调用 c 之后，返回的结果与调用 fn 的返回值一致
5、fn 的参数依次为函数 a, b, c 的调用参数
 */
//+++++++++++++++++++++++++++++++++++++++++++++++

var fn = function (a, b, c) {
    return a + b + c
}; 

function curryIt(fn) {
   var length = fn.length;
   args=[];
   var result = function(arg){
       args.push( arg);
       length-- ;
       if( length <= 0){
           return fn.apply(this,args);
       }else{
           return result;
       }
   }

   return result;
}

var result = curryIt(fn)(1)(2)(3);


// 加权排序和赋值技术



//+++++++++++++++++++++++++++++++++++++++++++++++
/*
给定字符串 str，检查其是否符合美元书写格式
1、以 $ 开始
2、整数部分，从个位起，满 3 个数字用 , 分隔
3、如果为小数，则小数部分长度为 2
4、正确的格式如：$1,023,032.03 或者 $2.03，错误的格式如：$3,432,12.12 或者 $34,344.3
*/
//+++++++++++++++++++++++++++++++++++++++++++++++


//我的答案（一） 100%通过测试
function isUSD(str) {
    //检查开头
    if(str.charAt(0) !=='$'){ return false};
    //检查小数点
    var p ; //记录小数点位置
    if( ( p = str.indexOf('.') ) > 0 ){
        var tail = str.slice(p+1,str.length );
        if(  !(tail.length === 2 && !isNaN(tail)) ){
            return false;
        }
    }else{
        p = str.length;
    }
    //检查整数部分

    var integerArr = str.slice(1,p).split(',');
    for(var j = 0 ; j< integerArr.length ; j++){
        var _ =  integerArr[j] ;
        if( _ ==='' || _ === null){ //整数有部分为空值
            return false;
        }
        if( j ===0 && _[0] === '0'){
            return false;
        }
        if( j!== 0 && _.length !== 3 ){ // 除第一组分组，每组的长度都为3字符 
            return false;
        }
        if( j=== 0 && _.length > 3 ){ // 除第一组分组，每组的长度都为3字符 
            return false;
        }
        if( isNaN( _ )){
            return false;
        }
    }
    return true;
}

// 答案二： 通过正则表达式测试
function isUSD_2(str) {
    var reg = /^\$[1-9]\d{0,2}(,\d{3})*(\.\d{2})?$/
    console.log( reg.test(str) )
   
}




//+++++++++++++++++++++++++++++++++++++++++++++++
/**
 实现一个打点计时器，要求
1、从 start 到 end（包含 start 和 end），每隔 100 毫秒 console.log 一个数字，每次数字增幅为 1
2、返回的对象中需要包含一个 cancel 方法，用于停止定时操作
3、第一个数需要立即输出
*/
//+++++++++++++++++++++++++++++++++++++++++++++++
function count(start, end) {
    if( end <= start ){
        console.log("输入的参数有误");
        return;
    }
    var _start = start ;
    var ins;
    console.log( start );
    var clock = function(){
        if(_start < end ){
            ins = setTimeout( ()=>{
                console.log( ++start);
                if( start < end){
                    clock()
                }
            },1000)
        }
    }
    clock();
    return{
        cancel: function(){
            clearTimeout( ins )
        }
    } 

}



//+++++++++++++++++++++++++++++++++++++++++++++++
/**
实现 fizzBuzz 函数，参数 num 与返回值的关系如下：
1、如果 num 能同时被 3 和 5 整除，返回字符串 fizzbuzz
2、如果 num 能被 3 整除，返回字符串 fizz
3、如果 num 能被 5 整除，返回字符串 buzz
4、如果参数为空或者不是 Number 类型，返回 false
5、其余情况，返回参数 num
*/
//+++++++++++++++++++++++++++++++++++++++++++++++
function fizzBuzz(num) {
     if( num == "" || num == undefined || isNaN(num)){
         return false;
     }
     if( num % 3 === 0 && num % 5 === 0 ){
         return "fizzbuzz";
     }

     if( num %3 === 0){
        return "fizz";
     }

     if( num %5 === 0){
        return "buzz";
     }

     return num;

}

//+++++++++++++++++++++++++++++++++++++++++++++++
/**
   将数组 arr 中的元素作为调用函数 fn 的参数
*/
//+++++++++++++++++++++++++++++++++++++++++++++++
function argsAsArray(fn, arr) {
    console.log( fn.apply(this, arr )) ;
}

//应用
// argsAsArray( 
//     function (greeting, name, punctuation) {return greeting + ', ' + name + (punctuation || '!');}, 

//     ['Hello', 'Ellie', '!'] 
// )


//+++++++++++++++++++++++++++++++++++++++++++++++
/*
实现函数 functionFunction，调用之后满足如下条件：
1、返回值为一个函数 f
2、调用返回的函数 f，返回值为按照调用顺序的参数拼接，拼接字符为英文逗号加一个空格，即 ', '
3、所有函数的参数数量为 1，且均为 String 类型

测试：
functionFunction('Hello')('world')  =》 Hello, world
*/
//+++++++++++++++++++++++++++++++++++++++++++++++

//核心是要通过闭包来保留参数
function functionFunction(str){
    var _str = str ;
    var f = function( a ){
         return functionFunction.call(this, _str +','+ a );
    }
    
    f.getValue=function(){
        return _str ;
    }

    return f;

}

// var rtn = functionFunction(1)(2)(3)(4);
// console.log( rtn.getValue() ) 




//+++++++++++++++++++++++++++++++++++++++++++++++
/*
实现函数 makeClosures，调用之后满足如下条件：
1、返回一个函数数组 result，长度与 arr 相同
2、运行 result 中第 i 个函数，即 result[i]()，结果与 fn(arr[i]) 相同
*/
//+++++++++++++++++++++++++++++++++++++++++++++++


//重点是利用闭包，bind方式最为简便，立即执行函数会比较繁琐些。

function makeClosures(arr, fn) {
    var result = [];
    for( var i = 0 ; i<arr.length ;i++){
      //result.push( fn.bind( null,arr[i] ));
      //result[i] = fn.bind( null,arr[i]);
      result[i] = function(num){
            return function(){
                return fn(num);
                 
            }
         }(arr[i]);
      }
    return result;
}


// console.log( result[0]() )
// console.log( result[1]() )
// console.log( result[2]() )



//+++++++++++++++++++++++++++++++++++++++++++++++
/*
已知函数 fn 执行需要 3 个参数。请实现函数 partial，调用之后满足如下条件：
1、返回一个函数 result，该函数接受一个参数
2、执行 result(str3) ，返回的结果与 fn(str1, str2, str3) 一致

测试：
var sayIt = function(greeting, name, punctuation) {    
     return greeting + ', ' + name + (punctuation || '!'); };  
partial(sayIt, 'Hello', 'Ellie')('!!!');
*/
//+++++++++++++++++++++++++++++++++++++++++++++++

//其实这是一个柯里化的典型例子

function partial(fn, str1, str2) {
      return function( str3 ){
          return fn.call(this,str1,str2,str3);
      }
}

var sayIt = function(greeting, name, punctuation) {    
    return greeting + ', ' + name + (punctuation || '!'); 
};  
//console.log( partial(sayIt, 'Hello', 'Ellie')('!!!') );







//+++++++++++++++++++++++++++++++++++++++++++++++
/*
函数 useArguments 可以接收 1 个及以上的参数。
请实现函数 useArguments，返回所有调用参数相加后的结果。
本题的测试参数全部为 Number 类型，不需考虑参数转换。
*/
//+++++++++++++++++++++++++++++++++++++++++++++++


function useArguments() {
    var args = Array.prototype.slice.apply( arguments );
    return  args.reduce( function(a,b){
        return a+b;
    })

}

//console.log( useArguments(1,2,3,4));







//+++++++++++++++++++++++++++++++++++++++++++++++
/*
实现函数 callIt，调用之后满足如下条件
1、返回的结果为调用 fn 之后的结果
2、fn 的调用参数为 callIt 的第一个参数之后的全部参数
*/
//+++++++++++++++++++++++++++++++++++++++++++++++

function callIt(fn) {
    return fn.apply( this, Array.prototype.slice.apply(arguments).slice(1,arguments.length));
}





//+++++++++++++++++++++++++++++++++++++++++++++++
/*
实现函数 partialUsingArguments，调用之后满足如下条件：
1、返回一个函数 result
2、调用 result 之后，返回的结果与调用函数 fn 的结果一致
3、fn 的调用参数为 partialUsingArguments 的第一个参数之后的全部参数以及 result 的调用参数
*/
//+++++++++++++++++++++++++++++++++++++++++++++++


function partialUsingArguments(fn) {
   var _fn_args = Array.prototype.slice.apply(arguments).slice(1,arguments.length);
   return result = function(){
        return fn.apply(this, _fn_args.concat(  Array.prototype.slice.apply(arguments)  ) )
   }
   
}




//+++++++++++++++++++++++++++++++++++++++++++++++
/*
获取数字 num 二进制形式第 bit 位的值。注意：
1、bit 从 1 开始
2、返回 0 或 1
3、举例：2 的二进制为 10，第 1 位为 0，第 2 位为 1
*/
//+++++++++++++++++++++++++++++++++++++++++++++++

function valueAtBit(num, bit) {
    var buffer =[];
    if( num == 0){
        if( bit > 1){
            return false;
        }else{
            return 0;
        }
    }

    var divisor = num ;
    while( divisor / 2 > 0 ){
        buffer.push( divisor % 2 );
        divisor = Math.floor( divisor / 2 );
    }
    
    console.log( buffer )

    if( bit <= buffer.length){
        return buffer[bit-1];
    }else{
        return false;
    }
}

//思路二

function valueAtBit_2(num, bit) {
   var buffer = num.toString(2);
   return s[s.length - bit];
}

//思路三
function valueAtBit_3(num, bit) {
    console.log( (num >> (bit -1)) & 1  ) ;
}





//+++++++++++++++++++++++++++++++++++++++++++++++
/*
   给定二进制字符串，将其换算成对应的十进制数字
*/
//+++++++++++++++++++++++++++++++++++++++++++++++

function base10(str) {
    return parseInt(str,2);
}

//+++++++++++++++++++++++++++++++++++++++++++++++
/*
   将给定数字转换成二进制字符串。
   如果字符串长度不足 8 位，则在前面补 0 到满8位。
*/
//+++++++++++++++++++++++++++++++++++++++++++++++
function convertToBinary(num) {
     var bit7Max = parseInt("1111111",2); //7位二进制的最大值
     var buffer = num.toString(2);
     if( num > bit7Max ){
         return  buffer;
     }else{
         // '0'.repeat( 8 - buffer.length ) + '1'.repeat( buffer.length )  ES6 写法
         var pre = '' ;
         for( var i=0; i< 8-buffer.length; i++){
             pre+= '0';
         }
         //'00000000'.slice(8-buffer.length); 或者通过这样的方式来补 '0'; 
         return  pre + num.toString(2)
     }
     
}



//+++++++++++++++++++++++++++++++++++++++++++++++
/*
   给定一个构造函数 constructor，请完成 alterObjects 方法，
   将 constructor 的所有实例的 greeting 属性指向给定的 greeting 变量。

   测试：
   var C = function(name) {this.name = name; return this;}; 
   var obj1 = new C('Rebecca'); 
   alterObjects(C, 'What\'s up'); obj1.greeting;
*/
//+++++++++++++++++++++++++++++++++++++++++++++++

function alterObjects(constructor, greeting) {
    constructor.prototype.greeting = greeting;
}




   //+++++++++++++++++++++++++++++++++++++++++++++++
/*
    找出对象 obj 不在原型链上的属性(注意这题测试例子的冒号后面也有一个空格~)
    1、返回数组，格式为 key: value
    2、结果数组不要求顺序

    测试：
    var C = function() {this.foo = 'bar'; this.baz = 'bim';}; 
    C.prototype.bop = 'bip'; 
    iterate(new C());
*/
//+++++++++++++++++++++++++++++++++++++++++++++++

function iterate(obj) {
     var rtn = []
     Object.keys(obj).map(function(key){
        if( obj.hasOwnProperty(key) ){
            rtn.push( key+": "+ obj[key] );
        }
     })
     return rtn;
}



   //+++++++++++++++++++++++++++++++++++++++++++++++
/*
    给定字符串 str，检查其是否包含 连续3个数字 
    1、如果包含，返回最新出现的 3 个数字的字符串
    2、如果不包含，返回 false
*/
//+++++++++++++++++++++++++++++++++++++++++++++++


function matchesPattern(str) {
    return /^\d{3}\-\d{3}\-\d{4}$/.test(str);
}
console.log( matchesPattern('800-555-1212') )