exports.get_screenshot = function(x_axis, y_axis, cut_x, cut_y){
    var img = captureScreen();
    img = images.grayscale(img);
    if(x_axis==-1 || y_axis == -1){
        return img;
    }
    else{
        return images.clip(img, x_axis, y_axis, cut_x, cut_y);
    }
}


exports.back_to_home_then_out = function(){
    generalized_click(64, 1364.3);
    sleep(config["QUICk_WAIT_TIME"]);
    generalized_click(620, 1347.3);
    sleep(config["BASE_WAIT_TIME"]);
}

exports.wait_for_daytime = function(){
    do{
        var img = get_screenshot(118, 180, 65, 31);
        sleep(5000);
    }
    while(images.findImage(midnight_img, img)); // !context.includes("[系統]天亮了,喪屍開始躲到陰影處,變得不那麼活躍了")
}

exports.exceed_battle_time_limit = function(time){
    return time >= config["BATTLE_TIME"];
}

exports.start_battle = function(){
    var battle_success_img = images.read(path+"gray_win.jpg"); //
    var battle_lose_img = images.read(path+"gray_lose.jpg");
    var battle_time_counter = 0;
    generalized_click(573, 1057);  // attack enemy
    sleep(config["QUICk_WAIT_TIME"]);
    generalized_click(232, 997); // press '勇者無畏' no matter the button shows up or not


    sleep(config["QUICk_WAIT_TIME"]);
    generalized_click(728, 1409);  // call for help
    sleep(config["CALL_FOR_HELP_TIME"]);
    generalized_click(173, 1388);   // enter the battle
    do{  //wait for the battle to finish
        toast("戰鬥中");
        var img = get_screenshot(305, 96, 291, 896);
        sleep(config["POLLING_GAP_TIME"]);
        battle_time_counter+=config["POLLING_GAP_TIME"];
    }
    while(!images.findImage(img, battle_success_img) && !images.findImage(img, battle_lose_img));
    if(exceed_battle_time_limit(battle_time_counter) || images.findImage(img, battle_lose_img)){
        toast("角色死亡, 腳本結束");
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
    battle_success_img.recycle();
    battle_lose_img.recycle();
    toast("戰鬥完成");
    generalized_click(460, 1127);  //battle done
    generalized_click(460, 1147);
    generalized_click(460, 1167);
    generalized_click(460, 1197);
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

exports.generalized_click = function(wid, hig){
    click((wid/900*width), (hig/1600*height));
}

exports.search_for_target = function(){
    var img = get_screenshot(118, 180, 65, 31);  // get current time
    if(images.findImage(midnight_img, img) && config["ALLOW_SEARCH_IN_MIDNIGHT"] == false){
        wait_for_daytime();
    }
    generalized_click(450, 1327);
    sleep(config["SEARCH_GAP_TIME"]);

    img = get_screenshot(150, 793, 100, 200);   // get searched POI image
    if(images.findImage(door_img, img)){ //bingo
        return true;
    }
    else{
        return false;
    }
}