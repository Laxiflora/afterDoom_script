importClass(com.googlecode.tesseract.android.TessBaseAPI);
requestScreenCapture(false);
function get_screenshot(  ){
    var img = captureScreen();
    return img;
}


var path = "/mnt/shared/Pictures/convience_store_servant/";
var cap = get_screenshot();
var _true = images.read(path+"sssss.jpg");
var _orig = images.read(path+"win.jpg");


if(images.findImage(_true, _orig)){
    toast("A");
}
else{
    toast("F");
}