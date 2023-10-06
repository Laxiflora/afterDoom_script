importClass(com.googlecode.tesseract.android.TessBaseAPI);
requestScreenCapture(false);
function get_screenshot(  ){
    var img = captureScreen();
    return img;
}


var path = "/mnt/shared/Pictures/convience_store_servant/";
var door_img = images.read(path+"convience_door.png");
var battle_success_img = images.read(path+"battle_victory.png"); //
var battle_lose_img = images.read(path+"battle_lose.png");
var midnight_img = images.read(path+"midnight.png");


if(images.findImage(midnight_img, midnight_img)){
    toast("A")
}
else{
    toast("T")
}