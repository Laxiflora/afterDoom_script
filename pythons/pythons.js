config = {
    "TIME" : 1000, // 搜索次數 (TODO: energy-based search round counter)
    "BASE_WAIT_TIME" : 700,  // 每次操作之間的基本間隔毫秒數
    "QUICk_WAIT_TIME" : 400, // 切換場景之間的基本間隔毫秒數 (比如撞路牌後的互動、回家再出門)
    "SEARCH_GAP_TIME" : 2500, // 按下搜索到對事件做出回應的間隔毫秒數
    "CALL_FOR_HELP_TIME" : 10000,  // 呼叫隊友增援以後等待幾毫秒
    "POLLING_GAP_TIME" : 3000, // 每幾毫秒重新擷取一次畫面 (不用動)
    "BATTLE_TIME" : 180000, // 預期戰鬥應該在幾毫秒內結束(超過會認定為角色死亡)，最低為POLLING_GAP_TIME秒
    "BACK_TO_BED_AFTER_DEATH" : false, // 角色判定死亡後是否回床上休息, 每人床的位置不同容易失效
    "BED_COORDINATE_X" : 587, // 角色床的位置
    "BED_COORDINATE_Y" : 1086,
    "folder_path": "/mnt/shared/Pictures/images/"
}


importClass(com.googlecode.tesseract.android.TessBaseAPI)
requestScreenCapture(false);

var path = config["folder_path"];
var door_img = images.read(path+"gray_python_door.jpg");
var midnight_img = images.read(path+"gray_midnight.jpg");


const {
    back_to_home_then_out,
    wait_for_daytime,
    get_screenshot,
    exceed_battle_time_limit,
    start_battle,
    generalized_click,
    search_for_target
    } = require('/mnt/shared/Pictures/utils.js');



function start_kill_python(){
    generalized_click(573, 1057); //turn left
    sleep(config["QUICk_WAIT_TIME"]);
    generalized_click(566, 954); // forward
    sleep(config["QUICk_WAIT_TIME"]);
    generalized_click(573, 1057); //open door
    sleep(config["QUICk_WAIT_TIME"]);
    generalized_click(573, 1057); //enter room
    sleep(config["QUICk_WAIT_TIME"]);
    generalized_click(573, 1057); //search area
    sleep(config["QUICk_WAIT_TIME"]);
    start_battle();
}

function main(){
    var remain_search_round = config["TIME"];
    for(remain_search_round = config["TIME"];remain_search_round > 0; remain_search_round--){
        if(search_for_target()){
            start_kill_python();
        }
        else{
            back_to_home_then_out();
        }
    }


}
var width = device.width>device.height?device.height:device.width;
var height = device.width>device.height?device.width:device.height;
main();
// "前方傅來一絲異常的響聲,你順著聲音找去,發現了一隻喪屍"
// "黑暗中出现了幾隻喪屍,你還沒來得及做出反應,它就己經撲了過來"
// "你發现了一扇門,門里停出陣陣暗鬧聲,裡面應該有很多人"
// "你剛剛打開門,就有個蒙面人把你包图了,他們一言不發,直接向你發起了攻擊"
// lose: (356, 456), 189, 46
// time: 110, 178, 80, 35
// door: 125, 743, 190, 300