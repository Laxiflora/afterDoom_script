importClass(com.googlecode.tesseract.android.TessBaseAPI);
requestScreenCapture(false);
function get_screenshot(  ){
    var img = captureScreen();
    return img;
}


var path = "/mnt/shared/Pictures/convience_store_servant/";
var cap = get_screenshot();
var _true = images.read(path+"why.jpg");
var _orig = images.read(path+"lose.jpg");

_true = images.grayscale(_true);
_orig = images.grayscale(_orig);
images.save(_true, path+"gray_why.jpg", "jpg", 100);

if(images.findImage(_true, _orig)){
    toast("A");
}
else{
    toast("F");
}