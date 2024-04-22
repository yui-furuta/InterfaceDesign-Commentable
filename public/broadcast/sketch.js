var socket;
var chatlog = [];
// var sound_cracker;
// var sound_punch;

//表情カウント
count_happy = 0;
count_sad = 0;
count_angry = 0;
count_fearful = 0;
count_disgusted = 0;
count_surprised = 0;

//祝福コメントのアニメーションで使う変数
let posX = 0;
let speed = 50;
let nekoalpha = 0;
let nekoalphaspeed = 0;
let kiraPosPlus = -100;
let kiraPosMinus = -100;

//コメント用関数
var chatcoment = [];

var str1, str2, sliceStr;
var addBreakStr=[];
//１行の文字数
var wCount = 10;
var comentHeight;
var comentWidth;
var comentCount;
var x1, x2, y1 ,y2 ,pi,z1;
//文字サイズ
var tsize =15;


function setup() {
  createCanvas(windowWidth, windowHeight);
  socket = io.connect(window.location.origin);
  socket.on('gotMessage', gotMessage);

  //サーバーからきたコメントをgotComent関数で処理する
  socket.on('gotComent', gotComent);
  textAlign(CENTER);

  // 初期化
  for (let i = 0; i < 50; i++) {
    chatlog[i] = {
      name: '',
      message: '',
      namelength: 0,
      alpha: 0,
      x: 0,
      y: 0
    }
  }

  // コメント初期化
  for (let i = 0; i < 50; i++) {
    chatcoment[i] = {
      name: '',
      message: '',
      coment: '',
      alpha: 0,
      x: 0,
      y: 0
    }
  }
}


function gotMessage(chatdata) {
  console.log(chatdata);
  // メッセージを空いてる配列(alpha==0）に代入する
  for (let i = 0; i < 50; i++) {
    if (chatlog[i].alpha == 0) {
      //if(chatdata.message == "😄" || chatdata.message == "😢" || chatdata.message == "😡" ||  chatdata.message == "😮" ){
      chatlog[i].name = chatdata.name;
      chatlog[i].message = chatdata.message;
      chatlog[i].namelength = chatdata.namelength;
      chatlog[i].alpha = 255;
      chatlog[i].x = random(50, width - 50);
      chatlog[i].y = 50;
      //}

      // if (chatlog[i].message == "🎉") {
      //   console.log("パン!")
      //   sound_cracker.play();
      // }
      // else if (chatlog[i].message == "👊") {
      //   console.log("👊");
      //   sound_punch.play();
      // }
      //表情count
      if (chatlog[i].message == "😄") {
        count_happy = count_happy + 1;
      }
      if (chatlog[i].message == "😢") {
        count_sad = count_sad + 1;
      }
      if (chatlog[i].message == "😡") {
        count_angry = count_angry + 1;
      }
      if (chatlog[i].message == "😱") {
        count_fearful = count_fearful + 1;
      }
      if (chatlog[i].message == "😫") {
        count_disgusted = count_disgusted + 1;
      }
      if (chatlog[i].message == "😮") {
        count_surprised = count_surprised + 1;
      }
      i = 50; // loopは終了
    }
  }
}

//コメント受信
//サーバーからきたコメントを処理する
function gotComent(chatdata) {
  // メッセージを空いてる配列(alpha==0）に代入する
  for (let i = 0; i < 50; i++) {
    if (chatcoment[i].alpha == 0) {
      chatcoment[i].name = chatdata.name;
      chatcoment[i].message = chatdata.message;
      chatcoment[i].alpha = 255;
      chatcoment[i].x = random(50, width - 50);
      chatcoment[i].y = random(50, height - 50);
      sliceStr = chatcoment[i].message;
      chatcoment[i].q = "🤔";

      for (var l = 0; l < chatcoment[i].message.length / wCount; l++) {
      str1 = sliceStr.slice(0, wCount);
      str2 = sliceStr.slice(wCount);
      chatcoment[i].coment += str1 + '\n';
      sliceStr = str2;
      }
      i = 50; // loopは終了
    }
  }
}

function draw() {
  clear();

  //喜び
  if(count_happy >= 10){
    posX += speed;
    kiraPosPlus += 1;
    kiraPosMinus -= 1;
    nekoalpha += nekoalphaspeed;
    textSize(30);
    fill(Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),nekoalpha);
    text("\n／￣￣￣＼\n／　　　　　＼\n｜　　 ∧　　 ｜\n｜　 ／川＼　 ｜\n＼／┏┷┓＼／\n。┃祝┃:｡\n#ﾟ┃🌟┃/:｡\n: ｡:･┃笑┃･: #\n｡:ﾞ#┃い┃:# ｡\nﾞ･#: ┃十┃.｡ : ｡\n# ﾞ｡ﾟ┃回┃  ﾟ｡#\n｡:ﾞ:./｡┗┯┛｡# : #\nﾞハ_ハ │\n( ﾟωﾟ)│\n/つΦ",posX,90);
    text("★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜",kiraPosMinus,40);
    text("★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜",kiraPosPlus,windowHeight-20);
    text("★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n'゜★\n。、\n:*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.:\n*:・\n'゜★\n。、\n:*:\n。.:\n*:・'\n゜☆。\n.:*:\n・'゜\n★。、\n:*:。\n.:*:\n・'゜\n☆。.:\n*:・\n'゜★\n。、:\n*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.\n:*:・'\n゜☆\n。.:",40,kiraPosPlus-100);
    text("★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n'゜★\n。、\n:*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.:\n*:・\n'゜★\n。、\n:*:\n。.:\n*:・'\n゜☆。\n.:*:\n・'゜\n★。、\n:*:。\n.:*:\n・'゜\n☆。.:\n*:・\n'゜★\n。、:\n*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.\n:*:・'\n゜☆\n。.:",1400,kiraPosMinus-100);
    if(posX < windowWidth /2-140){
      speed -= 0.5;
      nekoalphaspeed +=2;
    }
    else if(posX >windowWidth /2 - 140 && posX < windowWidth /2 + 70){
      speed = 0.8;
      nekoalphaspeed = 1;
    }
    else{
      speed += 10;
      nekoalphaspeed -=2;
    }

    if(posX >windowWidth){
      count_happy = 0;
      posX = 0;
      speed = 50;
      nekoalpha = 0;
      nekoalphaspeed = 0;
      kiraPosPlus = -100;
      kiraPosMinus = -100;
    }
  }

  //悲しみ
  if(count_sad >= 10){
    posX += speed;
    kiraPosPlus += 1;
    kiraPosMinus -= 1;
    nekoalpha += nekoalphaspeed;
    textSize(40);
    fill(Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),nekoalpha);
    text("\n　/。 /　/。/ ///　°/ /　/。/ /\n/　°/ /　/。/ //　/  ///°  //  \n悲　|￣￣￣￣￣|￣￣￣|　/ °　/°/ \nし　|      //      （∵）      |  /°//         \nみ　|         //     /_|         |      /。 /   \n十　|   ｡  ∧,,∧         //     |　/°/  /。/ \n回　|    ∩´･_･`∩ °　   /　|    ｡/   /    \n ￣￣￣￣￣￣￣￣       ",posX,200);
    textSize(30);
    text("★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜",kiraPosMinus,40);
    text("★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜",kiraPosPlus,windowHeight-20);
    text("★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n'゜★\n。、\n:*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.:\n*:・\n'゜★\n。、\n:*:\n。.:\n*:・'\n゜☆。\n.:*:\n・'゜\n★。、\n:*:。\n.:*:\n・'゜\n☆。.:\n*:・\n'゜★\n。、:\n*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.\n:*:・'\n゜☆\n。.:",40,kiraPosPlus-100);
    text("★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n'゜★\n。、\n:*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.:\n*:・\n'゜★\n。、\n:*:\n。.:\n*:・'\n゜☆。\n.:*:\n・'゜\n★。、\n:*:。\n.:*:\n・'゜\n☆。.:\n*:・\n'゜★\n。、:\n*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.\n:*:・'\n゜☆\n。.:",1400,kiraPosMinus-100);
    if(posX < windowWidth /3-140){
      speed -= 0.5;
      nekoalphaspeed +=2;
    }
    else if(posX >windowWidth /3 - 140 && posX < windowWidth /3 + 70){
      speed = 0.8;
      nekoalphaspeed = 1;
    }
    else{
      speed += 10;
      nekoalphaspeed -=2;
    }

    if(posX >windowWidth){
      count_sad = 0;
      posX = 0;
      speed = 50;
      nekoalpha = 0;
      nekoalphaspeed = 0;
      kiraPosPlus = -100;
      kiraPosMinus = -100;
    }
  }

  //怒り
  if(count_angry >= 10){
    posX += speed;
    kiraPosPlus += 1;
    kiraPosMinus -= 1;
    nekoalpha += nekoalphaspeed;
    textSize(40);
    fill(Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),nekoalpha);
    text("\n(      ついに怒り      )\n(     十回！    )\n(  　　　 )\nii!i\nii!i\nii!i\nﾄﾞｶ━━━━━━  ／ ~~~ ＼ ━━━━━ﾝ!!!!  \n     ,,,,,,,／  ＃｀Д´ ＼,,,,,,,,,, ",posX,200);
    textSize(30);
    text("★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜",kiraPosMinus,40);
    text("★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜",kiraPosPlus,windowHeight-20);
    text("★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n'゜★\n。、\n:*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.:\n*:・\n'゜★\n。、\n:*:\n。.:\n*:・'\n゜☆。\n.:*:\n・'゜\n★。、\n:*:。\n.:*:\n・'゜\n☆。.:\n*:・\n'゜★\n。、:\n*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.\n:*:・'\n゜☆\n。.:",40,kiraPosPlus-100);
    text("★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n'゜★\n。、\n:*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.:\n*:・\n'゜★\n。、\n:*:\n。.:\n*:・'\n゜☆。\n.:*:\n・'゜\n★。、\n:*:。\n.:*:\n・'゜\n☆。.:\n*:・\n'゜★\n。、:\n*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.\n:*:・'\n゜☆\n。.:",1400,kiraPosMinus-100);
    if(posX < windowWidth /2-140){
      speed -= 0.5;
      nekoalphaspeed +=2;
    }
    else if(posX >windowWidth /2 - 140 && posX < windowWidth /2 + 70){
      speed = 0.8;
      nekoalphaspeed = 1;
    }
    else{
      speed += 10;
      nekoalphaspeed -=2;
    }

    if(posX >windowWidth){
      count_angry = 0;
      posX = 0;
      speed = 50;
      nekoalpha = 0;
      nekoalphaspeed = 0;
      kiraPosPlus = -100;
      kiraPosMinus = -100;
    }
  }

  //恐れ
  if(count_fearful >= 10){
    posX += speed;
    kiraPosPlus += 1;
    kiraPosMinus -= 1;
    nekoalpha += nekoalphaspeed;
    textSize(40);
    fill(Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),nekoalpha);
    text("\nﾋﾞｸｯ.    ∧ ∧        ∧ ∧　　 ／￣￣￣￣￣￣￣￣￣　　\nΣ(ﾟДﾟ；≡；ﾟдﾟ) ＜　恐れ！十回！！！！\n                 ./ つ　つ　     　＼＿＿＿＿＿＿＿＿＿　　　\n～（＿⌒ヽ　ﾄﾞｷﾄﾞｷ                                    \n )ノ ｀Jззз                                   ",posX,200);
    textSize(30);
    text("★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜",kiraPosMinus,40);
    text("★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜",kiraPosPlus,windowHeight-20);
    text("★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n'゜★\n。、\n:*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.:\n*:・\n'゜★\n。、\n:*:\n。.:\n*:・'\n゜☆。\n.:*:\n・'゜\n★。、\n:*:。\n.:*:\n・'゜\n☆。.:\n*:・\n'゜★\n。、:\n*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.\n:*:・'\n゜☆\n。.:",40,kiraPosPlus-100);
    text("★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n'゜★\n。、\n:*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.:\n*:・\n'゜★\n。、\n:*:\n。.:\n*:・'\n゜☆。\n.:*:\n・'゜\n★。、\n:*:。\n.:*:\n・'゜\n☆。.:\n*:・\n'゜★\n。、:\n*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.\n:*:・'\n゜☆\n。.:",1400,kiraPosMinus-100);
    if(posX < windowWidth /2-140){
      speed -= 0.5;
      nekoalphaspeed +=2;
    }
    else if(posX >windowWidth /2 - 140 && posX < windowWidth /2 + 70){
      speed = 0.8;
      nekoalphaspeed = 1;
    }
    else{
      speed += 10;
      nekoalphaspeed -=2;
    }

    if(posX >windowWidth){
      count_fearful = 0;
      posX = 0;
      speed = 50;
      nekoalpha = 0;
      nekoalphaspeed = 0;
      kiraPosPlus = -100;
      kiraPosMinus = -100;
    }
  }
  
  //嫌悪
  if(count_disgusted >= 10){
    posX += speed;
    kiraPosPlus += 1;
    kiraPosMinus -= 1;
    nekoalpha += nekoalphaspeed;
    textSize(50);
    fill(Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),nekoalpha);
    text("\n∧__∧  \n( ｀Д´ ）\n             (っ▄︻▇〓┳═\n/　　  )  \n( /￣∪   ",posX-200,200);
    textSize(30);
    text("\n＿人人人人人人人人＿\n＞ 嫌悪　十回！？！？＜\n￣Y^Y^Y^Y^Y^Y^Y￣",posX+300,300);
    text("★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜",kiraPosMinus,40);
    text("★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜",kiraPosPlus,windowHeight-20);
    text("★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n'゜★\n。、\n:*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.:\n*:・\n'゜★\n。、\n:*:\n。.:\n*:・'\n゜☆。\n.:*:\n・'゜\n★。、\n:*:。\n.:*:\n・'゜\n☆。.:\n*:・\n'゜★\n。、:\n*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.\n:*:・'\n゜☆\n。.:",40,kiraPosPlus-100);
    text("★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n'゜★\n。、\n:*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.:\n*:・\n'゜★\n。、\n:*:\n。.:\n*:・'\n゜☆。\n.:*:\n・'゜\n★。、\n:*:。\n.:*:\n・'゜\n☆。.:\n*:・\n'゜★\n。、:\n*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.\n:*:・'\n゜☆\n。.:",1400,kiraPosMinus-100);
    if(posX < windowWidth /2-140){
      speed -= 0.5;
      nekoalphaspeed +=2;
    }
    else if(posX >windowWidth /2 - 140 && posX < windowWidth /2 + 70){
      speed = 0.8;
      nekoalphaspeed = 1;
    }
    else{
      speed += 10;
      nekoalphaspeed -=2;
    }

    if(posX >windowWidth){
      count_disgusted = 0;
      posX = 0;
      speed = 50;
      nekoalpha = 0;
      nekoalphaspeed = 0;
      kiraPosPlus = -100;
      kiraPosMinus = -100;
    }
  }

  //驚き
  if(count_surprised >= 10){
    posX += speed;
    kiraPosPlus += 1;
    kiraPosMinus -= 1;
    nekoalpha += nekoalphaspeed;
    textSize(30);
    fill(Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),Math.floor(Math.random() * 255),nekoalpha);
    text("\n ∧_∧  \n (　ﾟдﾟ)　\n|　⊃ ⊃\n└-⊃～⊃\n | |\n | |\n   ＿ _　　／(＿＿_\n／　 (＿＿＿_／　／\n￣￣￣￣￣￣￣  ",posX,300);
    text("\n＿人人人人人人人人人人＿\n＞ 驚き！！十回！！！！＜\n￣Y^Y^Y^ Y^Y^Y^Y^Y^Y",posX,150);
    text("★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜",kiraPosMinus,40);
    text("★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜★。、:*:。.:*:・'゜☆。.:*:・'゜",kiraPosPlus,windowHeight-20);
    text("★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n'゜★\n。、\n:*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.:\n*:・\n'゜★\n。、\n:*:\n。.:\n*:・'\n゜☆。\n.:*:\n・'゜\n★。、\n:*:。\n.:*:\n・'゜\n☆。.:\n*:・\n'゜★\n。、:\n*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.\n:*:・'\n゜☆\n。.:",40,kiraPosPlus-100);
    text("★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n★。\n、:*\n:。.:*\n:・'\n゜☆。\n.:*:・\n'゜★\n。、\n:*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.:\n*:・\n'゜★\n。、\n:*:\n。.:\n*:・'\n゜☆。\n.:*:\n・'゜\n★。、\n:*:。\n.:*:\n・'゜\n☆。.:\n*:・\n'゜★\n。、:\n*:。\n.:*:\n・'゜\n☆。.\n:*:\n・'゜\n★。、\n:*:\n。.\n:*:・'\n゜☆\n。.:",1400,kiraPosMinus-100);
    if(posX < windowWidth /2-140){
      speed -= 0.5;
      nekoalphaspeed +=2;
    }
    else if(posX >windowWidth /2 - 140 && posX < windowWidth /2 + 70){
      speed = 0.8;
      nekoalphaspeed = 1;
    }
    else{
      speed += 10;
      nekoalphaspeed -=2;
    }

    if(posX >windowWidth){
      count_surprised = 0;
      posX = 0;
      speed = 50;
      nekoalpha = 0;
      nekoalphaspeed = 0;
      kiraPosPlus = -100;
      kiraPosMinus = -100;
    }
  }


  for (let i = 0; i < 50; i++) {
    fill(50, chatlog[i].alpha);
    textSize(48);
    text(chatlog[i].message, chatlog[i].x, chatlog[i].y);
    textSize(13);
    text(chatlog[i].name,chatlog[i].x, chatlog[i].y+20);
    chatlog[i].y ++;
    if(chatlog[i].y>windowHeight){
      chatlog[i].alpha = 0;
    }
  }
   //画面下表情
   noStroke();
   fill(255);
  //  textSize(24);
  //  text("表情カウンター", windowWidth/2, height - 30);

  var smallsize = 20;
  var haba = 100;
  var takasa = height - 70;

   textSize(smallsize + count_happy);
   text(count_happy, windowWidth/2-haba*5, takasa - (smallsize + count_happy*5));
   textSize(smallsize + count_sad);
   text(count_sad, windowWidth/2-haba*3, takasa - (smallsize + count_sad*5 ));
   textSize(smallsize + count_angry);
   text(count_angry, windowWidth/2-haba, takasa - (smallsize + count_angry*5 ));
   textSize(smallsize + count_fearful);
   text(count_fearful, windowWidth/2+haba, takasa - (smallsize + count_fearful*5 ));
   textSize(smallsize + count_disgusted);
   text(count_disgusted, windowWidth/2+haba*3, takasa - (smallsize + count_disgusted*5 ));
   textSize(smallsize + count_surprised);
   text(count_surprised, windowWidth/2+haba*5, takasa - (smallsize + count_surprised*5 ));
 
   textSize(smallsize + count_happy*5 );
   //text(count_happy, 100, height - 70 - count_happy);
   text("😄", windowWidth/2-haba*5, takasa);
 
   textSize(smallsize + count_sad*5 );
   //text(count_sad, 200, height - 70 - count_sad);
   text("😢",windowWidth/2-haba*3, takasa);
 
   textSize(smallsize + count_angry*5 );
   //text(count_angry, 300, height - 70 - count_angry);
   text("😡",  windowWidth/2-haba, takasa);

   textSize(smallsize + count_fearful*5 );
   //text(count_sad, 200, height - 70 - count_sad);
   text("😱",windowWidth/2+haba, takasa);
 
   textSize(smallsize + count_disgusted*5 );
   //text(count_angry, 300, height - 70 - count_angry);
   text("😫",  windowWidth/2+haba*3, takasa);
 
   textSize(smallsize + count_surprised*5 );
   //text(count_surprised, 400, height - 70 - count_surprised);
   text("😮",windowWidth/2+haba*5, takasa);

   //以下コメントと吹き出し
   textSize(20);
   for (let i = 0; i < 50; i++) {
     //吹き出し
     if(chatcoment[i].coment != ''){
     strokeWeight(2);
     comentCount = Math.trunc((chatcoment[i].message.length - 1) / wCount);
     comentWidth = tsize * wCount;
     comentHeight = tsize*1.25+comentCount*tsize*1.25;
     
     x1 = chatcoment[i].x-comentWidth/2;
     x2 = chatcoment[i].x+comentWidth/2;
     y1 = chatcoment[i].y-tsize;
     y2 = chatcoment[i].y-tsize+comentHeight;
     z1 = tsize*0.25;
 
 
     fill(255,255,255, chatcoment[i].alpha);
     noStroke();
     rect(x1,y1-z1,x2-x1,y2-y1+z1*2);
     rect(x1-z1,y1,z1,y2-y1);
     rect(x2,y1,z1,y2-y1);
 
     stroke(0,0,0,chatcoment[i].alpha);
     beginShape();
     vertex(x2,y2+z1);
     vertex(x2-tsize*3.25,y2+z1);
     vertex(x2-tsize*3.5,y2+tsize*0.5);
     vertex(x2-tsize*3.75,y2+z1);
     vertex(x1,y2+z1); 
     endShape();
 
     arc(x1,y1,z1*2,z1*2,PI, PI+HALF_PI);
     arc(x2,y1,z1*2,z1*2,PI+HALF_PI,0);
     arc(x2,y2,z1*2,z1*2,0,HALF_PI);
     arc(x1,y2,z1*2,z1*2,HALF_PI,PI);
 
     noFill();
     stroke(0,0,0,chatcoment[i].alpha);
     line(x1,y1-z1,x2,y1-z1);
     line(x2+z1,y1,x2+z1,y2);
     line(x1-z1,y2,x1-z1,y1);
 
     textSize(tsize*1.5);
     text(chatcoment[i].q,x2-tsize*3.5,y2+tsize*2);
 
     fill(0, 0, 0, chatcoment[i].alpha);
     noStroke();
     textSize(tsize);
     text(chatcoment[i].coment , chatcoment[i].x,chatcoment[i].y);
     textSize(tsize/2);
     text(chatcoment[i].name, x2-tsize*3.5,y2+tsize*2.6);
 
     if (chatcoment[i].alpha > 0) {
       chatcoment[i].alpha = chatcoment[i].alpha - 1;
     }
     if(chatcoment[i].alpha == 0){
       chatcoment[i].coment = '';
     }
   }
  }
}