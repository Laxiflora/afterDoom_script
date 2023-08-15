config = {
    "TIME" : 1000, // 搜索次數 (TODO: energy-based search round counter)
    "BASE_WAIT_TIME" : 700,  // 每次操作之間的基本間隔毫秒數
    "QUICk_WAIT_TIME" : 400, // 切換場景之間的基本間隔毫秒數 (比如撞路牌後的互動、回家再出門)
    "SEARCH_GAP_TIME" : 1500, // 按下搜索到對事件做出回應的間隔毫秒數
    "CALL_FOR_HELP_TIME" : 10000,  // 呼叫隊友增援以後等待幾毫秒
    "POLLING_GAP_TIME" : 3000, // 每幾毫秒重新擷取一次畫面 (不用動)
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
    click(64, 1364.3);
    sleep(config["QUICk_WAIT_TIME"]);
    click(620, 1347.3);
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

function start_battle(){
    var battle_time_counter = 0;
    click(573, 1057);  // attack enemy
    sleep(config["QUICk_WAIT_TIME"]);

    var context = get_screen_context();
    if(context.includes("勇者無畏") || context.includes("看看再說")){
        sleep(config["QUICk_WAIT_TIME"]);
        click(232, 997);
    }
    sleep(config["QUICk_WAIT_TIME"]);
    click(728, 1409);  // call for help
    sleep(config["CALL_FOR_HELP_TIME"]);
    click(173, 1388);   // enter the battle
    do{  //wait for the battle to finish
        toast("戰鬥中");
        var context = get_screen_context();
        sleep(config["POLLING_GAP_TIME"]);
        battle_time_counter+=config["POLLING_GAP_TIME"];
    }
    while(!context.includes("承受傷害") && !context.includes("治療量")  && battle_time_counter < config["BATTLE_TIME"]);

    if(exceed_battle_time_limit(battle_time_counter)){
        toast("戰鬥時長過久, 認定為角色死亡, 腳本結束");
        if(config["BACK_TO_BED_AFTER_DEATH"]){
            click(456, 1193);
            click(460, 1197);  //battle done
            click(460, 1216);
            click(460, 1236);
            click(460, 1256);
            click(460, 1276);
            click(460, 1296);
            click(460, 1316);
            click(460, 1336);
            click(460, 1356);
            click(460, 1376); 
            sleep(config["BASE_WAIT_TIME"]);
            click(config["BED_COORDINATE_X"], config["BED_COORDINATE_Y"]);
            sleep(config["BASE_WAIT_TIME"]);
            click(456, 707);
        }
        exit();
    }

    toast("戰鬥完成");
    click(460, 1197);  //battle done
    click(460, 1216);
    click(460, 1236);
    click(460, 1256);
    click(460, 1276);
    click(460, 1296);
    click(460, 1316);
    click(460, 1336);
    click(460, 1356);
    click(460, 1376);  
    sleep(config["BASE_WAIT_TIME"]);
}

function start_kill_python(){
    click(573, 1057); //turn left
    sleep(config["QUICk_WAIT_TIME"]);
    click(566, 954); // forward
    sleep(config["QUICk_WAIT_TIME"]);
    click(573, 1057); //open door
    sleep(config["QUICk_WAIT_TIME"]);
    click(573, 1057); //enter room
    sleep(config["QUICk_WAIT_TIME"]);
    click(573, 1057); //search area
    sleep(config["QUICk_WAIT_TIME"]);
    start_battle();
}


var remain_search_round = config["TIME"];
for(;remain_search_round > 0; remain_search_round--){
    toast("剩餘"+remain_search_round+"次搜索");
    var context = get_screen_context();
    if(context.includes("深夜"))
        wait_for_daytime();

    click(450, 1327);
    sleep(config["SEARCH_GAP_TIME"]);

    context = get_screen_context();
    if(context.includes("分別有一條道路,不知道通向什麼地方")){ //bingo
        start_kill_python();
    }
   else{
    back_to_home_then_out();
   }
}
// "前方傅來一絲異常的響聲,你順著聲音找去,發現了一隻喪屍"
// "黑暗中出现了幾隻喪屍,你還沒來得及做出反應,它就己經撲了過來"
// "你發现了一扇門,門里停出陣陣暗鬧聲,裡面應該有很多人"
// "你剛剛打開門,就有個蒙面人把你包图了,他們一言不發,直接向你發起了攻擊"