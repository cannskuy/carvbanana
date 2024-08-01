import fetch from "node-fetch";
import delay from "delay";
import fs from "fs";
import { Twisters } from "twisters";
import moment from 'moment';
import { setTimeout } from 'timers/promises';


const userAgentGenerator = {
  edge: function () {
      const edgeVersion = Math.floor(Math.random() * 100) + 90;
      const chromeVersion = Math.floor(Math.random() * 100) + 96;
      const safariVersion = Math.floor(Math.random() * 100) + 10;
      const webkitVersion = Math.floor(Math.random() * 700) + 500;
      const osPlatform = os.platform() === 'win32' ? 'Windows NT 10.0; Win64; x64' : 'Macintosh; Intel Mac OS X 10_15_17';
      const userAgent = `Mozilla/5.0 (${osPlatform}) AppleWebKit/${webkitVersion}.36 (KHTML, like Gecko) Chrome/${chromeVersion}.0.0.0 Safari/${webkitVersion}.36 Edg/${edgeVersion}.0.1901.203`;
      return userAgent;
  },
  chrome: function () {
      const windowsNtVersion = Math.floor(Math.random() * 100) + 7;
      const chromeVersion = Math.floor(Math.random() * 100) + 96;
      const webkitVersion = Math.floor(Math.random() * 700) + 500;
      const osPlatform = os.platform() === 'win32' ? `Windows NT ${windowsNtVersion}.0; Win64; x64` : 'Macintosh; Intel Mac OS X 10_15_17';
      const userAgent = `Mozilla/5.0 (${osPlatform}) AppleWebKit/${webkitVersion}.36 (KHTML, like Gecko) Chrome/${chromeVersion}.0.3163.100 Safari/${webkitVersion}.36`;
      return userAgent;
  },
  firefox: function () {
      const windowsNtVersion = Math.floor(Math.random() * 100) + 7;
      const firefoxVersion = Math.floor(Math.random() * 26) + 95;
      const geckoVersion = Math.floor(Math.random() * 30) + 20100101;
      const osPlatform = os.platform() === 'win32' ? `Windows NT ${windowsNtVersion}.0; Win64; x64` : 'Macintosh; Intel Mac OS X 10_15_17';
      const userAgent = `Mozilla/5.0 (${osPlatform}; rv: ${firefoxVersion}.0) Gecko/${geckoVersion} Firefox/${firefoxVersion}.0`;
      return userAgent;
  },
  safari: function () {
      const windowsNtVersion = Math.floor(Math.random() * 100) + 7;
      const safariVersion = Math.floor(Math.random() * 100) + 10;
      const webkitVersion = Math.floor(Math.random() * 100) + 500;
      const osPlatform = os.platform() === 'win32' ? `Windows NT ${windowsNtVersion}.0; Win64; x64` : 'Macintosh; Intel Mac OS X 10_15_17';
      const userAgent = `Mozilla/5.0 (${osPlatform}) AppleWebKit/${webkitVersion}.1.15 (KHTML, like Gecko) Version/${safariVersion}.1.15 Safari/${webkitVersion}.1.15`;
      return userAgent;
  },
  android: function () {
      const edgeVersion = Math.floor(Math.random() * 25) + 90;
      const androidVersion = Math.floor(Math.random() * 8) + 5;
      const chromeVersion = Math.floor(Math.random() * 20) + 96;
      const webkitVersion = Math.floor(Math.random() * 700) + 500;
      const osPlatform = Math.floor(Math.random() * 10)
      const userAgent = `Mozilla/5.0 (Linux; Android ${androidVersion}.${osPlatform}; K) AppleWebKit/5${webkitVersion}37.36 (KHTML, like Gecko) Chrome/${chromeVersion}.0.0.0 Mobile Safari/${webkitVersion}.36 EdgA/${edgeVersion}.0.1901.196`
      return userAgent;
  },
  ios: function () {
      const iosVersion = Math.floor(Math.random() * 8) + 9;
      const edgeVersion = Math.floor(Math.random() * 25) + 90;
      const safariVersion = Math.floor(Math.random() * 6) + 10;
      const webkitVersion = Math.floor(Math.random() * 700) + 500;
      const osPlatform = Math.floor(Math.random() * 10)
      const userAgent = `Mozilla/5.0 (iPhone; CPU iPhone OS ${iosVersion}_${osPlatform} like Mac OS X) AppleWebKit/${webkitVersion}.1.15 (KHTML, like Gecko) EdgiOS/${edgeVersion}.0.1901.187 Version/${safariVersion}.0 Mobile/15E148 Safari/${webkitVersion}.1`
      return userAgent;
  }
};

const getToken = (query,randomUserAgent) =>
  new Promise((resolve, reject) => {
    fetch("https://interface.carv.io/banana/login", {
        headers: {
          "accept": "application/json, text/plain, */*",
          "accept-language": "en-US,en;q=0.9,id;q=0.8",
          "authorization": "Bearer",
          "content-type": "application/json",
          "priority": "u=1, i",
          'User-Agent': randomUserAgent,
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "x-app-id": "carv",
          "Referer": "https://banana.carv.io/",
          "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        body: `{\"tgInfo\":\"${query}\"}`,
        method: "POST"
      })
      .then((res) => res.json())
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });

const getUser = (bearer,randomUserAgent) =>
    new Promise((resolve, reject) => {
        fetch("https://interface.carv.io/banana/get_user_info", {
            headers: {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9",
              "authorization": `Bearer ${bearer}`,
              "priority": "u=1, i",
              'User-Agent': randomUserAgent,
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site",
              "x-app-id": "carv",
              "Referer": "https://banana.carv.io/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: null,
            method: "GET"
          })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

const getBananaList = (bearer,randomUserAgent) =>
    new Promise((resolve, reject) => {
        fetch("https://interface.carv.io/banana/get_banana_list", {
            headers: {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9",
              "authorization": `Bearer ${bearer}`,
              "priority": "u=1, i",
              'User-Agent': randomUserAgent,
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site",
              "x-app-id": "carv",
              "Referer": "https://banana.carv.io/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: null,
            method: "GET"
          })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

const getClick = (bearer,clickCount,randomUserAgent) =>
    new Promise((resolve, reject) => {
        fetch("https://interface.carv.io/banana/do_click", {
            headers: {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9,id;q=0.8",
              "authorization": `Bearer ${bearer}`,
              "content-type": "application/json",
              "priority": "u=1, i",
              'User-Agent': randomUserAgent,
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site",
              "x-app-id": "carv",
              "Referer": "https://banana.carv.io/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: `{\"clickCount\":${clickCount}}`,
            method: "POST"
          })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

const getBanana = (bearer,randomUserAgent) =>
    new Promise((resolve, reject) => {
        fetch("https://interface.carv.io/banana/claim_lottery", {
            headers: {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9",
              "authorization": `Bearer ${bearer}`,
              "content-type": "application/json",
              "priority": "u=1, i",
              'User-Agent': randomUserAgent,
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site",
              "x-app-id": "carv",
              "Referer": "https://banana.carv.io/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: "{\"claimLotteryType\":1}",
            method: "POST"
          })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

const getHarvest = (bearer,randomUserAgent) =>
    new Promise((resolve, reject) => {
        fetch("https://interface.carv.io/banana/get_lottery_info", {
            headers: {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9",
              "authorization": `Bearer ${bearer}`,
              "priority": "u=1, i",
              'User-Agent': randomUserAgent,
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site",
              "x-app-id": "carv",
              "Referer": "https://banana.carv.io/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: null,
            method: "GET"
          })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

const claimHarvest = (bearer,randomUserAgent) =>
    new Promise((resolve, reject) => {
        fetch("https://interface.carv.io/banana/do_lottery", {
            headers: {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9",
              "authorization": `Bearer ${bearer}`,
              "content-type": "application/json",
              "priority": "u=1, i",
              'User-Agent': randomUserAgent,
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site",
              "x-app-id": "carv",
              "Referer": "https://banana.carv.io/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: "{}",
            method: "POST"
          })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

const equipBanana = (bearer,bananaId,randomUserAgent) =>
    new Promise((resolve, reject) => {
        fetch("https://interface.carv.io/banana/do_equip", {
            headers: {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9",
              "authorization": `Bearer ${bearer}`,
              "content-type": "application/json",
              "priority": "u=1, i",
              'User-Agent': randomUserAgent,
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site",
              "x-app-id": "carv",
              "Referer": "https://banana.carv.io/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: `{\"bananaId\":${bananaId}}`,
            method: "POST"
          })
        .then((res) => res.json())
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

const getInvite = (bearer,gameId,points,randomUserAgent) =>
    new Promise((resolve, reject) => {
        fetch("https://interface.carv.io/banana/get_invite_list?pageNum=1&pageSize=200", {
            headers: {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9",
              "authorization": `Bearer ${bearer}`,
              "priority": "u=1, i",
              'User-Agent': randomUserAgent,
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site",
              "x-app-id": "carv",
              "Referer": "https://banana.carv.io/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: null,
            method: "GET"
          })
      .then((res) => res.clone().json().catch(() => res.text()))
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

const claimInvite = (bearer,gameId,points,randomUserAgent) =>
    new Promise((resolve, reject) => {
        fetch("https://interface.carv.io/banana/claim_lottery", {
            headers: {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9",
              "authorization": `Bearer ${bearer}`,
              "content-type": "application/json",
              "priority": "u=1, i",
              'User-Agent': randomUserAgent,
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site",
              "x-app-id": "carv",
              "Referer": "https://banana.carv.io/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: "{\"claimLotteryType\":2}",
            method: "POST"
          })
      .then((res) => res.clone().json().catch(() => res.text()))
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
    
const getTask = (bearer,randomUserAgent) =>
    new Promise((resolve, reject) => {
        fetch("https://interface.carv.io/banana/get_quest_list", {
            headers: {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9",
              "authorization": `Bearer ${bearer}`,
              "priority": "u=1, i",
              'User-Agent': randomUserAgent,
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site",
              "x-app-id": "carv",
              "Referer": "https://banana.carv.io/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: null,
            method: "GET"
          })
      .then((res) => res.clone().json().catch(() => res.text()))
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
    
const achieveTask = (bearer,quest_id,randomUserAgent) =>
    new Promise((resolve, reject) => {
        fetch("https://interface.carv.io/banana/achieve_quest", {
            headers: {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9",
              "authorization": `Bearer ${bearer}`,
              "content-type": "application/json",
              "priority": "u=1, i",
              'User-Agent': randomUserAgent,
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site",
              "x-app-id": "carv",
              "Referer": "https://banana.carv.io/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: `{\"quest_id\":${quest_id}}`,
            method: "POST"
          })
      .then((res) => res.clone().json().catch(() => res.text()))
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });    

const claimTask = (bearer,quest_id,randomUserAgent) =>
    new Promise((resolve, reject) => {
        fetch("https://interface.carv.io/banana/claim_quest", {
            headers: {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9",
              "authorization": `Bearer ${bearer}`,
              "content-type": "application/json",
              "priority": "u=1, i",
              'User-Agent': randomUserAgent,
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site",
              "x-app-id": "carv",
              "Referer": "https://banana.carv.io/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: `{\"quest_id\":${quest_id}}`,
            method: "POST"
          })
      .then((res) => res.clone().json().catch(() => res.text()))
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    }); 

const claimTaskLottery = (bearer,taskId,randomUserAgent) =>
    new Promise((resolve, reject) => {
        fetch("https://interface.carv.io/banana/claim_quest_lottery", {
            headers: {
              "accept": "application/json, text/plain, */*",
              "accept-language": "en-US,en;q=0.9",
              "authorization": `Bearer ${bearer}`,
              "content-type": "application/json",
              "priority": "u=1, i",
              'User-Agent': randomUserAgent,
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "same-site",
              "x-app-id": "carv",
              "Referer": "https://banana.carv.io/",
              "Referrer-Policy": "strict-origin-when-cross-origin"
            },
            body: "{}",
            method: "POST"
          })
      .then((res) => res.clone().json().catch(() => res.text()))
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });

const readFileToJSON = (path) => {
  return JSON.parse(fs.readFileSync(path, "utf8"));
};

function date_format(unix_timestamp,format){
    const date=new Date(unix_timestamp*1000);
    const dateObject={
        'Y' : date.getFullYear(),
        'm' : String(date.getMonth()).padStart(2,'0'),
        'd' : String(date.getDate()).padStart(2,'0'),
        'H' : String(date.getHours()).padStart(2,'0'),
        'i' : String(date.getMinutes()).padStart(2,'0'),
        's' : String(date.getSeconds()).padStart(2,'0'),
    };
    var dateString='';
    for (let char of format) {
        if(char in dateObject){
            dateString+=dateObject[char];
        }else{
            dateString+=char;
        }
    }
    return dateString;
}
(async () => {
  // var username;
    const queryList = readFileToJSON("./data.json");
    const twisters = new Twisters();

    while (true) {  
        await Promise.all(
            queryList.map(async (query) => {
                try{
                  const randomUserAgent = userAgentGenerator.ios();
                  const generateToken = await getToken(query,randomUserAgent)
                    // get old token from file
                    const bearer = generateToken.data.token
                    // console.log(bearer)
                    if(bearer){
            
                        // get new token and replace old token on file
                        const userDetails = await getUser(bearer,randomUserAgent)
                        // console.log(userDetails)
                        var username = userDetails.data.username
                        twisters.put(username, {
                          text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] DailyPeel: ${userDetails.data.today_click_count}/${userDetails.data.max_click_count} TotalPeel: ${userDetails.data.peel} Money: ${userDetails.data.usdt} USDT | BananaCount: ${userDetails.data.banana_count} BananaUsed: ${userDetails.data.equip_banana.banana_id}${userDetails.data.equip_banana.banana_id} LotteryCount: ${userDetails.data.lottery_info.remain_lottery_count} Countdown: ${userDetails.data.lottery_info.countdown_end}`});
                      
                        const checkBanana = await getBananaList(bearer,randomUserAgent)
                        const getBananas = checkBanana.data.banana_list
                        getBananas.forEach(async (element) => {
                            if(element.count > 0){
                                // console.log(element)
                                const bananacount = element.count
                                const bananaId = element.banana_id
                                const bananaName = element.name
                                const bananaRarity = element.rarity
                                const bananaRipeness = element.ripeness
                                const bananaRipenessLevel = element.ripeness_sub_level
                                const bananaDailyPeel = element.daily_peel_limit
                                const bananaSellPeel = element.sell_exchange_peel
                                const bananaSellUsdt = element.sell_exchange_usdt

                                twisters.put(username, {
                                    text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] DailyPeel: ${userDetails.data.today_click_count}/${userDetails.data.max_click_count} TotalPeel: ${userDetails.data.peel} Money: ${userDetails.data.usdt} USDT | Banana details: ${bananacount} Id : ${bananaId} Name: ${bananaName} Rarity: ${bananaRarity} Ripeness: ${bananaRipeness}/${bananaRipenessLevel} DailyPeel: ${bananaDailyPeel} Price: ${bananaSellPeel} PEEL/${bananaSellUsdt} USDT`});
                            }
                        })

                        if(userDetails.data.today_click_count<userDetails.data.max_click_count){
                            const clickCount = userDetails.data.max_click_count-userDetails.data.today_click_count
                            const clickPeel = await getClick(bearer,clickCount,randomUserAgent)
                            if(clickPeel.msg === 'Success' && clickPeel.data !== null){
                                twisters.put(username, {
                                  text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] DailyPeel: ${userDetails.data.today_click_count}/${userDetails.data.max_click_count} TotalPeel: ${userDetails.data.peel} Money: ${userDetails.data.usdt} USDT | Success Click Peel: ${clickPeel.data.peel}`});
                            }
                        }

                        if(userDetails.data.lottery_info.countdown_end === true){
                            const claimLottery = await getBanana(bearer,randomUserAgent)
                            if(claimLottery.msg === 'Success' && claimLottery.data !== null){
                                twisters.put(username, {
                                  text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] DailyPeel: ${userDetails.data.today_click_count}/${userDetails.data.max_click_count} TotalPeel: ${userDetails.data.peel} Money: ${userDetails.data.usdt} USDT | Claim lottery banana success`});
                            }
                        }

                        if(userDetails.data.lottery_info.remain_lottery_count > 0){
                            for (let index = 0; index < userDetails.data.lottery_info.remain_lottery_count; index++){
                                const claimHarvests = await claimHarvest(bearer,randomUserAgent)
                                if(claimHarvests.msg === 'Success' && claimHarvests.data !== null){
                                    twisters.put(username, {
                                      text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] DailyPeel: ${userDetails.data.today_click_count}/${userDetails.data.max_click_count} TotalPeel: ${userDetails.data.peel} Money: ${userDetails.data.usdt} USDT | Banana Harvest Id: ${claimHarvests.data.banana_id} Name: ${claimHarvests.data.name} | Rarity: ${claimHarvests.data.rarity} | Ripeness: ${claimHarvests.data.ripeness}/${claimHarvests.data.ripeness_sub_level} | DailyPeel: ${claimHarvests.data.daily_peel_limit} | Price: ${claimHarvests.data.sell_exchange_peel} PEEL/${claimHarvests.data.sell_exchange_usdt} USDT | Price: ${claimHarvests.data.count}`});
                                    if(claimHarvests.data.daily_peel_limit > userDetails.data.max_click_count){
                                        const bananaId = claimHarvests.data.banana_id
                                        const equipBananas = await equipBanana(bearer,bananaId,randomUserAgent)
                                        if(equipBananas.msg === 'Success'){
                                            twisters.put(username, {
                                              text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] DailyPeel: ${userDetails.data.today_click_count}/${userDetails.data.max_click_count} TotalPeel: ${userDetails.data.peel} Money: ${userDetails.data.usdt} USDT | equip new banana Id: ${claimHarvests.data.banana_id} Name: ${claimHarvests.data.name} | Rarity: ${claimHarvests.data.rarity} | Ripeness: ${claimHarvests.data.ripeness}/${claimHarvests.data.ripeness_sub_level} | DailyPeel: ${claimHarvests.data.daily_peel_limit} | Price: ${claimHarvests.data.sell_exchange_peel} PEEL/${claimHarvests.data.sell_exchange_usdt} USDT | Price: ${claimHarvests.data.count}`});
                                        }
                                    }
                                }
                            }
                        }

                        const getInvited = await getInvite(bearer,randomUserAgent)
                        if(getInvited.msg === 'Success' && getInvited.data !== null){
                            // twisters.put(username, {
                            //   text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] DailyPeel: ${userDetails.data.today_click_count}/${userDetails.data.max_click_count} TotalPeel: ${userDetails.data.peel} Money: ${userDetails.data.usdt} USDT | Invited Friends: ${getInvited.data.total_invite} LotteryClaimed: ${getInvited.data.receive_lottery_count}`});
                            if(getInvited.data.claim_lottery_count > 0 && getInvited.data.claim === true){
                                const claimInvited = await claimInvite(bearer,randomUserAgent)
                                if(claimInvited.msg === 'Success'){
                                    twisters.put(username, {
                                      text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] DailyPeel: ${userDetails.data.today_click_count}/${userDetails.data.max_click_count} TotalPeel: ${userDetails.data.peel} Money: ${userDetails.data.usdt} USDT | Invited Friends: ${getInvited.data.total_invite} LotteryClaimed: ${getInvited.data.receive_lottery_count} | Success Claim ${getInvited.data.claim_lottery_count} Lottery from invite`});
                                }
                            }
                        }

                        const getTaskList = await getTask(bearer,randomUserAgent)
                        const taskList = getTaskList.data.quest_list
                        taskList.forEach(async (element) => {
                            if(element){
                                // console.log(element)
                                const quest_id = element.quest_id
                                const quest_name = element.quest_name
                                const quest_type = element.quest_type
                                const show_seq_number = element.show_seq_number
                                const description = element.description
                                const start_link = element.start_link
                                const peel = element.peel
                                const is_achieved = element.is_achieved
                                const is_claimed = element.is_claimed
                                
                                if(is_claimed === false){
                                    if(is_achieved === false){
                                        const achieveTasks = await achieveTask(bearer,quest_id,randomUserAgent)
                                        if(achieveTasks.msg === 'Success'){
                                            // twisters.put(username, {
                                            //   text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] DailyPeel: ${userDetails.data.today_click_count}/${userDetails.data.max_click_count} TotalPeel: ${userDetails.data.peel} Money: ${userDetails.data.usdt} USDT |  Start task Id: ${quest_id} Name: ${quest_name} Description: ${description} Rewards: ${peel} PEEL`});
                                            const claimTasks = await claimTask(bearer,quest_id,randomUserAgent)
                                            if(claimTasks.msg === 'Success' && claimTasks.data !== null){
                                                twisters.put(username, {
                                                  text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] DailyPeel: ${userDetails.data.today_click_count}/${userDetails.data.max_click_count} TotalPeel: ${userDetails.data.peel} Money: ${userDetails.data.usdt} USDT | Claim task Id: ${quest_id} Name: ${quest_name} Description: ${description} Rewards: ${claimTasks.data.peel} PEEL`});
                                            }
                                        }
                                    }else if(is_achieved === true){
                                        const claimTasks = await claimTask(bearer,quest_id,randomUserAgent)
                                        if(claimTasks.msg === 'Success' && claimTasks.data !== null){
                                            twisters.put(username, {
                                              text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] DailyPeel: ${userDetails.data.today_click_count}/${userDetails.data.max_click_count} TotalPeel: ${userDetails.data.peel} Money: ${userDetails.data.usdt} USDT | Claim task Id: ${quest_id} Name: ${quest_name} Description: ${description} Rewards: ${claimTasks.data.peel} PEEL`});
                                        }
                                    }
                                }
                                
                                const getLotteryTask = (getTaskList.data.progress).split("/")[0]
                                const getClaimLotteryTask = getTaskList.data.is_claimed
                                // console.log(getLotteryTask)
                                if(getLotteryTask >= 3 && getClaimLotteryTask === true){
                                    const claimTaskLotterys = await claimTaskLottery(bearer,randomUserAgent)
                                    if(claimTaskLotterys.msg === 'Success'){
                                        twisters.put(username, {
                                          text: `[${moment().format("DD/MM/YY HH:mm:ss")}] [${username}] DailyPeel: ${userDetails.data.today_click_count}/${userDetails.data.max_click_count} TotalPeel: ${userDetails.data.peel} Money: ${userDetails.data.usdt} USDT | Claim lottery task success`});
                                    }
                                }
                            }
                        })
                    }
                } catch (e) {
                    console.log(e)
                    // console.log('')
                    twisters.put(username, {
                      text: `[${moment().format("DD/MM/YY HH:mm:ss")}] error:`,e});
                }
          }))
          // Delay 0.5s for each loop
          await delay(500);
    }
})();