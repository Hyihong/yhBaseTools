# FullScreen 全屏如何调用

## 前言
最近用echarts做了一个大数据看板，效果图如下
<img  src="./image/fullscreen/1.png">

在普通台式机屏幕表现还可以，但在14寸笔记本上看，不得不出现滚动条，以保证内容展示的美观性。所以，便加了一个全屏显示的功能。

## 坑

虽然大部分浏览器设置了全屏显示的快捷键，但此处要用JS调用window（document）的接口。因为各大浏览器对FullScreen API都是私有实现，所以有了些坑。
<img  src="./image/fullscreen/2.png">

* 坑一： 各大浏览器提供给JS调用的都是前缀版本，命名各不同，我还掉入了拼写的坑。
* 坑二： 请求全屏的方法requestFullscreen()需要通过Element调用，目前发现IE的document.documentElement上没有绑定该方法，其他浏览器则是支持通过document.documentElement的。IE我通过body元素来调用。
* 坑三：requestFullscreen方法只能由用户操作触发（如onclick事件），在onload事件中调用此方法将无效。所以别想一进页面就全屏。
* 坑四：通过API调用的全屏事件，与F11没有半毛钱关系;API是让某个Element全屏显示，而F11只是隐藏掉浏览器的工具栏。

## 上代码
```js

var fullScreen = {
    isEnable: (function () {
        return document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled;
    })(),
    requestFullscreen: (function () {
        var elem = document.documentElement;
        var requestMethod = elem.requestFullScreen || //W3C
                elem.webkitRequestFullScreen ||    //Chrome等
                elem.mozRequestFullScreen || //FireFox
                elem.msRequestFullscreen; //IE11
        if (requestMethod) {
            return function () {
                if (window.navigator.userAgent.indexOf("MSIE")) {
                     requestMethod.call(document.body); //IE的document上无法使用requestFullscreen事件，要用在body上
                } else {
                    requestMethod.call(elem);

                }
            }
        } else {
            //throw new Error("该浏览器不支持全屏事件");
        }
    })(),
    exitFullscreen: (function () {
        var exitMethod = document.exitFullscreen || //W3C
                document.mozCancelFullScreen ||    //Chrome等
                document.webkitExitFullscreen || //FireFox
                document.msExitFullscreen; //IE11
        if (exitMethod) {
            return function () {
                exitMethod.call( document );
            }
        }
    })(),
    fullscreenElement: function () {
        return document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement || document.fullscreenElement;
    },
    btnDom: document.getElementById('fullScreen-btn')
}
```


## 后续
本来以为完美地调用了api,后面经测试才发现，这里的全屏和F11的全屏会造成冲突。试了很多方法，觉得最经济的就是直接禁用掉F11的默认事件。 

因为在全屏状态下，JS无法监听 `keydown` 事件，查了资料解释原因是： 浏览器的特定行为，防止开发者恶意全屏。





https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API