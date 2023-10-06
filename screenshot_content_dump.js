//导包
importClass(com.googlecode.tesseract.android.TessBaseAPI)
//新建OCR实例
var tessocr = new TessBaseAPI()
//请求截图权限
requestScreenCapture(false);
//3秒后开始
toastLog("1秒后截图")
sleep(1000)
toastLog("开始截图")
//截图 
var img = captureScreen();
if (img) {
    let start = new Date()
    let result = paddle.ocr(img);
    log('OCR识别耗时：' + (new Date() - start) + 'ms')

    if (result && result.length > 0) {
        for (let i = 0; i < result.length; i++) {
            let ocrResult = result[i]
            log("文本：" + ocrResult.words, "相似度：" + ocrResult.confidence.toFixed(2), "范围：" + ocrResult.bounds, "左边：" + ocrResult.bounds.left, "顶边：" + ocrResult.bounds.top, "右边：" + ocrResult.bounds.right, "底边：" + ocrResult.bounds.bottom)
        }
    }

    // 回收图片
    img.recycle();
} else {
    log("截图失败");
}
// let result = gmlkit.ocr(img, "zh");
// var context = result.text;
 //dialogs.alert(context);
// log(typeof context);
// log(context)
// log(context.includes("深夜"))

//可增強屬性的食物