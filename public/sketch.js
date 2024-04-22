var socket;
var chatlog = {
  name: '',
  message: ''
}// ml5 Face Detection Model
let faceapi;
let detections = [];
let w = 1920 / 5;
let h = 1080 / 5;
let time_inference;

// Video
let video;
let video2;

//各表情の値を取得
let neutral_value;
let happy_value;
let sad_value;
let angry_value;
let fearful_value;
let disgusted_value;
let surprised_value;

count_neutral = 0;
count_happy = 0;
count_sad = 0;
count_angry = 0;
count_fearful = 0;
count_disgusted = 0;
count_surprised = 0;

//今送られるべき絵文字を番号として表す
//0はneutral 1はhappy...　のように
let face_value = 0;

//時間カウント
let timestamp = 0;


// Start detecting faces
function faceReady() {
  faceapi.detect(gotFaces);
}

// Got faces
let t0;

//コメント用関数
var chatcoment = {
  name: '',
  message: ''
}

var comment;
var text;


function gotFaces(error, result) {
  time_inference = millis() - t0;
  //console.log(time_inference);
  if (error) {
    //  console.log(error);
    return;
  }
  detections = result;

  //console.log(detections);

  if (detections.length > 0) {
    for (let i = 0; i < detections.length; i++) {
      let expressions = detections[i].expressions;
      //    console.log(expressions);
      for (let key in expressions) {

        if (key == "neutral") {
          select("#neutral").value(parseInt(expressions[key] * 100));
          neutral_value = parseInt(expressions[key] * 100);
        }
        else if (key == "happy") {
          select("#happy").value(parseInt(expressions[key] * 100));
          happy_value = parseInt(expressions[key] * 100);
        }
        else if (key == "sad") {
          select("#sad").value(parseInt(expressions[key] * 100));
          sad_value = parseInt(expressions[key] * 100);
        }
        else if (key == "angry") {
          select("#angry").value(parseInt(expressions[key] * 100));
          angry_value = parseInt(expressions[key] * 100);
        }
        else if (key == "fearful") {
          select("#fearful").value(parseInt(expressions[key] * 100));
          fearful_value = parseInt(expressions[key] * 100);
        }
        else if (key == "disgusted") {
          select("#disgusted").value(parseInt(expressions[key] * 100));
          disgusted_value = parseInt(expressions[key] * 100);
        }
        else if (key == "surprised") {
          select("#surprised").value(parseInt(expressions[key] * 100));
          surprised_value = parseInt(expressions[key] * 100);
        }
      }
    }
  }
  let array = [neutral_value, happy_value, sad_value, angry_value, fearful_value, disgusted_value, surprised_value];
  array.sort(
    function (a, b) {
      return (a < b ? 1 : -1);
    }
  );
  if (array[0] == neutral_value) {
    face_value = 0;
  }
  else if (array[0] == happy_value) {
    face_value = 1;
  }
  else if (array[0] == sad_value) {
    face_value = 2;
  }
  else if (array[0] == angry_value) {
    face_value = 3;
  }
  else if (array[0] == fearful_value) {
    face_value = 4;
  }
  else if (array[0] == disgusted_value) {
    face_value = 5;
  }
  else if (array[0] == surprised_value) {
    face_value = 6;
  }



  faceapi.detect(gotFaces);
  t0 = millis();
}

function setup() {
  // Creat the video and start face tracking
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();
  // Only need landmarks for this example
  const faceOptions = {
    withLandmarks: true,
    withExpressions: true,
    withDescriptors: false,
    minConfidence: 0.5,
    withTinyNet: true
  };

  faceapi = ml5.faceApi(video, faceOptions, faceReady);
  frameRate(30);
  select('#send').mouseClicked(sendComent);
  //socket = io.connect('https://facechat-123.herokuapp.com');
  //socket = io.connect('http://localhost:3000');
  //サーバーからきたコメントをgotComentで処理する
  socket.on('gotComent', gotComent);
}

function textInput() {
  //console.log(this.value());
}

//空白だとコメントが送れないようにする
function checkEmail(){
  const email = document.getElementById("message");
  const button = document.getElementById("send");
  //text = document.getElementById("message");

  if(email.value && email.value.length){
    button.disabled = false;
  }
  else{
    button.disabled = true;
  }
}


function draw() {
  if (face_value == 0) {
    document.getElementById("now-face").textContent = "😐";
  }
  else if (face_value == 1) {
    document.getElementById("now-face").textContent = "😄";
  }
  else if (face_value == 2) {
    document.getElementById("now-face").textContent = "😢";
  }
  else if (face_value == 3) {
    document.getElementById("now-face").textContent = "😡";
  }
  else if (face_value == 4) {
    document.getElementById("now-face").textContent = "😱";
  }
  else if (face_value == 5) {
    document.getElementById("now-face").textContent = "😫";
  }
  else if (face_value == 6) {
    document.getElementById("now-face").textContent = "😮";
  }

  //時間ごとに表情取得,送信
  if (millis() - timestamp > 3000) {
    timestamp = millis();
    console.log(document.getElementById("now-face").textContent);

    if (face_value == 0) {
      count_neutral = count_neutral + 1;
      document.getElementById("count_neutral").textContent = count_neutral;
    }
    else if (face_value == 1) {
      count_happy = count_happy + 1;
      document.getElementById("count_happy").textContent = count_happy;
    }
    else if (face_value == 2) {
      count_sad = count_sad + 1;
      document.getElementById("count_sad").textContent = count_sad;
    }
    else if (face_value == 3) {
      count_angry = count_angry + 1;
      document.getElementById("count_angry").textContent = count_angry;
    }
    else if (face_value == 4) {
      count_fearful = count_fearful + 1;
      document.getElementById("count_fearful").textContent = count_fearful;
    }
    else if (face_value == 5) {
      count_disgusted = count_disgusted + 1;
      document.getElementById("count_disgusted").textContent = count_disgusted;
    }
    else if (face_value == 6) {
      count_surprised = count_surprised + 1;
      document.getElementById("count_surprised").textContent = count_surprised;
    }

    if(face_value != 0){
      var chatdata = {
        name: select('#name').value(),
        message: document.getElementById("now-face").textContent,
        namelength: select('#name').value().length
      }
      socket.emit('sendMessage', chatdata);
    }
  }
}


function keyPressed() {
  if (keyCode == RETURN) {
    // var chatdata = {
    //   name: select('#name').value(),
    //   message: select('#message').value()
    // }
    //socket.emit('sendMessage', chatdata);
    //select('#message').value('');
  }
}




//コメント送信　送信ボタンを押したらこの関数が一番最初に実行される
function sendComent() {
  var chatdata = {
    name: select('#name').value(),
    message: select('#message').value()
  }
   //サーバーに情報が送られる
   socket.emit('sendComent', chatdata);

  //入力フォームを空白にする
  var textForm = document.getElementById("message");
  textForm.value = '';
  const button = document.getElementById("send");
  button.disabled = true;
  
  if(chatdata.message != ''){
    comment ='\n'+ chatdata.message + "[" + chatdata.name + "]"; 
    select("#textarea_comment_history").html(comment, true);
    var obj = document.getElementById('textarea_comment_history');
    obj.scrollTop = obj.scrollHeight;
    }
}

//サーバーからコメント受信/これ代入して何してるんだろう
function gotComent(chatdata) {
  // chatcoment.name = chatdata.name;
  // chatcoment.message = chatdata.message;
    //送られてきたコメントを表示
    if(chatdata.message != ''){
    comment ='\n'+ chatdata.message + "[" + chatdata.name + "]"; 
    select("#textarea_comment_history").html(comment, true);
    var obj = document.getElementById('textarea_comment_history');
    obj.scrollTop = obj.scrollHeight;
    }
}