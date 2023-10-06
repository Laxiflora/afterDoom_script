importClass(com.googlecode.tesseract.android.TessBaseAPI);
requestScreenCapture(false);
function get_screenshot(){
    var img = captureScreen();
    return img;
}


var path = "/mnt/shared/Pictures/convience_store_servant/";
var img = get_screenshot();
img = images.clip(img, 387, 330, 119, 14);
images.save(img, path+"win.jpg", "jpg", 100);