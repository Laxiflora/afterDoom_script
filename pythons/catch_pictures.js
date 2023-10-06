importClass(com.googlecode.tesseract.android.TessBaseAPI);
requestScreenCapture(false);
function get_screenshot(){
    var img = captureScreen();
    return img;
}


var path = "/mnt/shared/Pictures/pythons/";
var img = get_screenshot();
img = images.clip(img, 125, 743, 190, 300);
images.save(img, path+"door.jpg", "jpg", 100);