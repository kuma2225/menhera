const startBtn = document.getElementById('startBtn');
const infoBtn = document.getElementById('infoBtn');
const startScreen = document.getElementById('startScreen');
const gameScreen = document.getElementById('gameScreen');
const endScreen = document.getElementById('endScreen');
const endListScreen = document.getElementById('endListScreen');
const meter = document.getElementById('meter');
const girl = document.getElementById('girl');
const message = document.getElementById('message');
const choices = document.getElementById('choices');
const retryBtn = document.getElementById('retryBtn');
const exitBtn = document.getElementById('exitBtn');
const endListBtn = document.getElementById('endListBtn');
const closeEndList = document.getElementById('closeEndList');
const endType = document.getElementById('endType');
const endName = document.getElementById('endName');
const infoScreen = document.getElementById("infoScreen");
const backBtn = document.getElementById("backBtn");


let yamido = 30;
let seenEnds = [false, false, false]; // 0:YOU DEAD, 1:CLEAR, 2:CLEAR?

function startGame() {
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  yamido = 30;
  updateMeter();
  showMessage("ねぇ、昨日どこに行ってたの？", [
    { text: "友達と飲みに…", delta: 30 },
    { text: "バイトだったよ", delta: -10 },
    { text: "言う必要ある？", delta: 80 }
  ]);
}

function showMessage(text, options) {
  message.textContent = "";
  let i = 0;
  let interval = setInterval(() => {
    message.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 30);

  choices.innerHTML = "";

  options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.textContent = opt.text;
    btn.classList.add('choiceBtn');

    // 3つ選択肢の時だけ、上下のスペースを開けるためクラス付与
    if (options.length === 3) {
      if (idx === 0) btn.style.marginTop = '0';   // 一番上は余白なし
      if (idx === 1) btn.style.marginTop = 'auto'; // 真ん中は自動マージンで間を広げる
      if (idx === 2) btn.style.marginTop = 'auto'; // 下もautoで間隔維持
    }

    btn.onclick = () => {
      yamido += opt.delta;
      yamido = Math.max(0, yamido);
      updateMeter();
      checkEnd();
    };
    choices.appendChild(btn);
  });

  // 2つのときは上から詰める（flex-start）に変更
  if (options.length === 2) {
    choices.style.justifyContent = 'flex-start';
  } else {
    choices.style.justifyContent = 'space-between';
  }
}

function updateMeter() {
  let percent = Math.min(yamido, 100);
  meter.style.height = percent + "%";
  if (yamido < 50) {
    meter.style.background = "green";
    girl.src = "images/menhera1.png";
  } else if (yamido < 80) {
    meter.style.background = "yellow";
    girl.src = "images/menhera2.png";
  } else {
    meter.style.background = "red";
    girl.src = "images/menhera3.png";
  }
}


function checkEnd() {
  if (yamido > 100) {
    setTimeout(() => {
      showEnd("YOU DEAD", "殺された", 0);
    }, 650);
  } else {
    if (yamido < 20) {
      setTimeout(() => {
        showEnd("CLEAR", "うまく言い訳できた", 1);
      }, 650);
    } else if (yamido < 60) {
      setTimeout(() => {
        showEnd("CLEAR？", "なんとかごまかせた…", 2);
      }, 650);
    } else {
      showMessage("……本当に？", [
        { text: "もちろん", delta: -20 },
        { text: "違うかも", delta: 40 }
      ]);
    }
  }
}


function showEnd(type, name, id) {
  gameScreen.classList.add('hidden');
  endScreen.classList.remove('hidden');
  endType.textContent = type;
  endName.textContent = name;
  seenEnds[id] = true;
}

startBtn.onclick = startGame;

retryBtn.onclick = () => {
  endScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  yamido = 30;
  updateMeter();
  showMessage("ねぇ、昨日どこに行ってたの？", [
    { text: "友達と飲みに…", delta: 30 },
    { text: "バイトだったよ", delta: -10 },
    { text: "言う必要ある？", delta: 80 }
  ]);
};

exitBtn.onclick = () => {
  endScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
  seenEnds = [false, false, false];
};

endListBtn.onclick = () => {
  gameScreen.classList.add('hidden');
  endListScreen.classList.remove('hidden');
  updateEndList();
};

closeEndList.onclick = () => {
  endListScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
};

// 説明ボタンが押されたとき
infoBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  infoScreen.classList.remove("hidden");
});

// 戻るボタンの処理（説明 → スタートに戻る）
backBtn.addEventListener("click", () => {
  infoScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});

function updateEndList() {
  document.getElementById('end1').textContent = seenEnds[0] ? "YOU DEAD" : "？？？？";
  document.getElementById('end2').textContent = seenEnds[1] ? "CLEAR" : "？？？？";
  document.getElementById('end3').textContent = seenEnds[2] ? "CLEAR？" : "？？？？";
}

