# 重建家園腳本

覺得打蛇打便利要手動很坐牢嗎? 覺得要拿個腳本還要進QQ群問太麻煩嗎? 重建家園的開源土炮腳本來拉XD~

請注意，這些腳本僅供非商業用途 (不要拿來賣精力賺錢)

# 執行環境
- [雷電模擬器9.0.59](https://www.ldplayer.tw/)
    - 螢幕解析度請設為「手機板-900x1600」，以免腳本出錯!
![如圖]("https://github.com/Laxiflora/afterDoom_script/blob/main/environment.png")


## 目前有的腳本

### 便利店自動搜索 (convience_store_sevant)

> 使用腳本之前，請將主號與童號加入同一隊伍並讓童站在便利店並讓童號執行腳本。

這個腳本可以讓童號自動搜索並避開不是便利店副本門的所有東西，並且在打便利店時童號只會打第一場戰鬥
- 支援深夜停搜
- 碰怪會回家而非逃跑
- 戰鬥失敗時，會自動停止腳本
- 請不要在執行腳本的時候進行任何動作，包括打開聊天視窗

### 蛇車自動搜索 (pythons)

> 使用腳本之前，請將主號與童號加入同一隊伍並讓童站在娛樂中心。

這個腳本可以讓童號自動搜索並避開不是路牌的所有東西
- 支援深夜停搜
- 碰怪會回家而非逃跑
- 戰鬥失敗時，會自動停止腳本，若啟動並給定床的座標，可以自動躺上床睡覺
- 請不要在執行腳本的時候進行任何動作，包括打開聊天視窗

## 使用方法

1. 下載並安裝 [Autox.js](https://github.com/kkevsekk1/AutoX/releases) 到手機裡。
2. 下載所需的腳本整個資料夾到**"/mnt/shared/Pictures/"中(這是雷電模擬器與電腦的預設共享路徑)**(比如想要便利店腳本就下載convenience_store.js)或是輸入
```git clone https://github.com/Laxiflora/afterDoom_script```
3. 在 Auto.js 應用程式中導入剛剛下載的腳本文件。
4. 回到遊戲中運行腳本。


## 未來待補
1. 精力條追蹤，用於更好的決定甚麼時候要停腳本
2. 更多元的腳本停止條件
3. 自動踢人換童的腳本
4. 自動開背包補精力 (或是打開掛機觸發補精再馬上關掉)

## 貢獻

如果對於改進腳本有任何想法或建議，歡迎發Issue或PR，共同改善腳本的品質。

---

**免責聲明：** 請確保在使用這些腳本時遵循相應的法律法規和遊戲的使用條款，並嚴禁用於商業用途。