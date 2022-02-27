var sound = "";
leftWristY = 0;
rightWristY = 0;
leftWristX = 0;
rightWristX = 0;
lefConf = 0;
rigConf = 0;
function setup() {
  canvas = createCanvas(600, 400);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotResult);
}

function preload() {
  sound = loadSound("Looks_Like_Me.mp3");
  sound2 = loadSound("BoyWithUke.mp3");
}

function draw() {
  image(video, 0, 0, 600, 400);

  circle(leftWristX, leftWristY - 150, 50);

  circle(rightWristX, rightWristY - 150, 50);
}

function play() {
  sound.play();
}
function next() {
  sound2.play();
}

function pause() {
  sound.pause();
}
function modelLoaded() {
  console.log("Cool :D");
}
function gotResult(result) {
  if (result.length > 0) {
    console.log(result);
    lefConf = result[0].pose.leftWrist.confidence;
    rigConf = result[0].pose.rightWrist.confidence;
    if (rigConf > 0.1) {
      rightWristY = result[0].pose.rightWrist.y;
      rightWristX = result[0].pose.rightWrist.x;
      if(sound.isPlaying() == false){
        sound.play()
        sound2.stop()
      }
    }
    if (lefConf > 0.1) {
      leftWristX = result[0].pose.leftWrist.x;
      leftWristY = result[0].pose.leftWrist.y;
      
      if(sound2.isPlaying() == false){
        sound2.play()
        sound.stop()
      }
    }
  }
}
