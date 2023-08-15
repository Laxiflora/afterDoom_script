//导包
importClass(com.googlecode.tesseract.android.TessBaseAPI)
//新建OCR实例
var tessocr = new TessBaseAPI()
//请求截图权限
requestScreenCapture(false);
//3秒后开始
toastLog("3秒后截图")
sleep(1000)
toastLog("开始截图")
//截图 
var img = captureScreen();
let result = gmlkit.ocr(img, "zh");
var context = result.text;
log(typeof context);
log(context)
log(context.includes("深夜"))
