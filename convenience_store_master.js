config = {
    "TIME" : 1000, // 搜索次數 (TODO: energy-based search round counter)
    "BASE_WAIT_TIME" : 700,  // 每次操作之間的基本間隔毫秒數
    "QUICk_WAIT_TIME" : 400, // 切換場景之間的基本間隔毫秒數 (比如撞路牌後的互動、回家再出門)
    "SEARCH_GAP_TIME" : 1500, // 按下搜索到對事件做出回應的間隔毫秒數
    "CALL_FOR_HELP_TIME" : 5000,  // 呼叫隊友增援以後等待幾毫秒
    "POLLING_GAP_TIME" : 3000, // 每幾毫秒重新擷取一次畫面 (不用動)P
    "BATTLE_TIME" : 180000, // 預期戰鬥應該在幾毫秒內結束(超過會認定為角色死亡)，最低為POLLING_GAP_TIME秒
    "BACK_TO_BED_AFTER_DEATH" : false, // 角色判定死亡後是否回床上休息, 每人床的位置不同容易失效
    "BED_COORDINATE_X" : 587, // 角色床的位置
    "BED_COORDINATE_Y" : 1086
}


importClass(com.googlecode.tesseract.android.TessBaseAPI)
requestScreenCapture(false);

function get_screen_context(){
    var img = captureScreen();
    return gmlkit.ocr(img, "zh").text;;
}


function back_to_home_then_out(){
    generalized_click(64, 1364.3);
    sleep(config["QUICk_WAIT_TIME"]);
    generalized_click(620, 1347.3);
    sleep(config["BASE_WAIT_TIME"]);
}

function wait_for_daytime(){
    do{
        toast("深夜停搜")
        var context = get_screen_context();
        sleep(5000);
    }
    while(context.includes("深夜")) // !context.includes("[系統]天亮了,喪屍開始躲到陰影處,變得不那麼活躍了")
}

function exceed_battle_time_limit(time){
    return time >= config["BATTLE_TIME"];
}

function detect_battle_status_and_leave(){
    do{  //wait for the battle to finish
        toast("戰鬥中");
        var context = get_screen_context();
        sleep(config["POLLING_GAP_TIME"]);
        battle_time_counter+=config["POLLING_GAP_TIME"];
    }
    while(!context.includes("承受傷害") && !context.includes("治療量") && !context.includes("戰鬥勝利")  && battle_time_counter < config["BATTLE_TIME"]);

    if(exceed_battle_time_limit(battle_time_counter)){
        toast("戰鬥時長過久, 認定為角色死亡, 腳本結束");
        if(config["BACK_TO_BED_AFTER_DEATH"]){
            generalized_click(456, 1193);
            generalized_click(460, 1197);  //battle done
            generalized_click(460, 1216);
            generalized_click(460, 1236);
            generalized_click(460, 1256);
            generalized_click(460, 1276);
            generalized_click(460, 1296);
            generalized_click(460, 1316);
            generalized_click(460, 1336);
            generalized_click(460, 1356);
            generalized_click(460, 1376); 
            sleep(config["BASE_WAIT_TIME"]);
            generalized_click(config["BED_COORDINATE_X"], config["BED_COORDINATE_Y"]);
            sleep(config["BASE_WAIT_TIME"]);
            generalized_click(456, 707);
        }
        exit();
    }

    toast("戰鬥完成");
    generalized_click(460, 1197);  //battle done
    generalized_click(460, 1216);
    generalized_click(460, 1236);
    generalized_click(460, 1256);
    generalized_click(460, 1276);
    generalized_click(460, 1296);
    generalized_click(460, 1316);
    generalized_click(460, 1336);
    generalized_click(460, 1356);
    generalized_click(460, 1376);  
    sleep(config["BASE_WAIT_TIME"]);
}

function start_battle(){
    var battle_time_counter = 0;
    generalized_click(573, 1057);  // attack enemy
    sleep(config["QUICk_WAIT_TIME"]);
    var context = get_screen_context();
    if(context.includes("勇者無畏") || context.includes("看看再說")){
        sleep(config["QUICk_WAIT_TIME"]);
        generalized_click(232, 997);
    }

    sleep(config["QUICk_WAIT_TIME"]);
    generalized_click(728, 1409);  // call for help
    sleep(config["CALL_FOR_HELP_TIME"]);
    generalized_click(173, 1388);   // enter the battle
    detect_battle_status_and_leave();
}

function start_convience_store(){
    generalized_click(573, 1057);  //open the door
    sleep(config["QUICk_WAIT_TIME"]);
    for(var i=0; i<2; i++){
        start_battle();
    }
    back_to_home_then_out();
}

function generalized_click(wid, hig){
    click((wid/900*width), (hig/1600*hight));
}

function accept_help_invitation(){
    generalized_click(228, 653);
    generalized_click(354, 653);
    generalized_click(488, 653);
    generalized_click(604, 653);
    sleep(config['QUICk_WAIT_TIME']);
    generalized_click(756, 1404);
    generalized_click(245, 928);
}

function start_new_convenience_round(){
    // 加入隊伍-確認-等待戰鬥完成
    accept_help_invitation();
    detect_battle_status_and_leave();
    sleep(config["QUICk_WAIT_TIME"]);
    //後續行為應該一樣
    start_convience_store();
}

function main(){
    var remain_search_round = config["TIME"];
    for(;;){
        var context = get_screen_context();
        if(context.includes("向你發起") && context.includes("隊友")){ // accept the invitation
            start_new_convenience_round();
        }
        else{
            toast("等待呼叫中");
            sleep(config["POLLING_GAP_TIME"]);
        }
    }
}

var width = device.height;
var hight = device.width;
main();

// "前方傅來一絲異常的響聲,你順著聲音找去,發現了一隻喪屍"
// "黑暗中出现了幾隻喪屍,你還沒來得及做出反應,它就己經撲了過來"
// "你發现了一扇門,門里停出陣陣暗鬧聲,裡面應該有很多人"
// "你剛剛打開門,就有個蒙面人把你包图了,他們一言不發,直接向你發起了攻擊"

// 他們的裝備比之前的蒙面人看起來更加的精良
// [系統]隊友超級浣熊向你發起戳門協助申請,位置C市郊外小鎮-使利店
// 隊友 _ 向你發起