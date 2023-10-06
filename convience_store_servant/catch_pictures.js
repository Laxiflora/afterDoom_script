importClass(com.googlecode.tesseract.android.TessBaseAPI);
requestScreenCapture(false);
function get_screenshot(){
    var img = captureScreen();
    return img;
}


var path = "/mnt/shared/Pictures/convience_store_servant/";
var img = get_screenshot();
img = images.clip(img, 305, 96, 291, 896);
images.save(img, path+"why.jpg", "jpg", 100);