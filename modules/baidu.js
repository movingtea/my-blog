function baiduAnalytics() {
    return {
        __html: `var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?33b5413645fd381f32f3792d67a80f9f";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();`
    }
}

export default function BaiduScript() {
    return <script dangerouslySetInnerHTML={baiduAnalytics()}/>
}