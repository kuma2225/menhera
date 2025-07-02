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
let seenEnds = [false, false, false];
let currentNode = null;

const story = {
  start: {
    text: "おかえり。遅かったね。",
    options: [
      { text: "ただいま。", delta: 40, next: "q1_a" },
      { text: "ごめんね、まさき家まで送ってて…", delta: 10, next: "q1_b" },
      { text: "んー大好きだよみーちゃん♡", delta: 60, next: "q1_c" }
    ]
  },
  q1_a: {
    text: "それだけ？他に言うことないの？",
    options: [
      { text: "これ、お土産。", delta: -10, next: "q2_1a" },
      { text: "大好きだよ。", delta: 5, next: "q2_2a" }
    ]
  },
  q1_b: {
    text: "まさきくんって家、杉本町だよね？",
    options: [
      { text: "え…うん。", delta: 30, next: "q2_1b" },
      { text: "あいつ最近引っ越したんだよ。", delta: 20, next: "q2_2b" }
    ]
  },
  q1_c: {
    text: "誰よその女！浮気してたの！？もうもえのこと好きじゃないんだ！！",
    options: [
      { text: "ちがうよ。もえみの”み”でみーちゃん。浮気なんてするわけないじゃん。", delta: -20, next: "q2_1c" },
      { text: "大丈夫。お前が一番だよ。", delta: 40, next: "q2_2c" }
    ]
  },

  q2_1a: {
    text: "…ケーキ？",
    options: [
      { text: "今日で付き合って178日記念。", delta: -10, next: "clear" },
      { text: "遅くなっちゃったからさ。", delta: 5, next: "clearMaybe" }
    ]
  },

 q2_2a: {
  text: "てきとうなこと言わないで！じゃあ今日が何の日かわかる？",
  type: "input",
  answer: 189,
  prefix: "付き合って",
  suffix: "日記念でしょ。",
  delta: -50,
  deltaWrong: 40,
  correctNext: "q3_1a",
  wrongNext: "q3_2a"
},


  q2_1b: {
    text: "てきとうなこと言わないで！じゃあ今日が何の日かわかる？",
    options: [
      { text: "今日で付き合って", delta: 30, next: "dead" },
      { text: "あいつ最近引っ越したんだよ。", delta: 20, next: "clearMaybe" }
    ]
  },
  q2_c: {
    text: "誰よその女！浮気してたの！？もうもえのこと好きじゃないんだ！！",
    options: [
      { text: "ちがうよ。もえみの”み”でみーちゃん。浮気なんてするわけないじゃん。", delta: -20, next: "clear" },
      { text: "大丈夫。お前が一番だよ。", delta: 40, next: "dead" }
    ]
  },

  q3_1a: {
    text: "覚えててくれたの…？",
    options: [
      { text: "もちろんだよ。", delta: -100, next: "clear" },
      { text: "もえみと過ごした時間１分１秒たりともわすれるわけないだろ。", delta: -100, next: "q4_1a" }
    ]
  },

  q4_1a: {
    text: "ほんとに！？じゃあ７６日前の１３時間４０分前、なんの話してたでしょうか！",
    options: [
      { text: "…………", delta: 100, next: "q5_1a" },
      ]
  },

q5_1a: {
    text: "もえ嘘つく人きらい。",
    options: [
      
      ]
  },


  
  clear: "CLEAR",
  clearMaybe: "CLEAR？",
  dead: "YOU DEAD"
};

function startGame() {
  startScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');
  yamido = 30;
  updateMeter();
  handleNext("start");
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

    if (options.length === 3) {
      if (idx === 0) btn.style.marginTop = '0';
      if (idx === 1 || idx === 2) btn.style.marginTop = 'auto';
    }
btn.onclick = () => {
  yamido += opt.delta;
  yamido = Math.max(0, yamido);
  updateMeter();

  const nextNode = story[opt.next];

  // 病み度が100超えていて、次にセリフがあるとき
  if (yamido > 100 && nextNode && nextNode.text) {
    message.textContent = "";
    choices.innerHTML = "";

    let j = 0;
    const interval = setInterval(() => {
      message.textContent += nextNode.text[j];
      j++;
      if (j >= nextNode.text.length) {
        clearInterval(interval);

        // 1秒待ってから赤フラッシュ→さらに0.5秒後エンド画面
        setTimeout(() => {
          document.getElementById("redFlash").style.display = "block";

          setTimeout(() => {
            document.getElementById("redFlash").style.display = "none";
            showEnd("YOU DEAD", "殺された", 0);
          }, 100);

        }, 600);
      }
    }, 30);
  } else {
    handleNext(opt.next);
  }
};


    choices.appendChild(btn);
  });

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
    meter.style.background = "#4d9933";
    girl.src = "images/menhera1.png";
  } else if (yamido < 80) {
    meter.style.background = "#e6b800";
    girl.src = "images/menhera2.png";
  } else {
    meter.style.background = "#b3244d";
    girl.src = "images/menhera3.png";
  }
}

function handleNext(nextId) {
  if (nextId === "dead") {
    setTimeout(() => showEnd("YOU DEAD", "殺された", 0), 650);
  } else if (nextId === "clear") {
    setTimeout(() => showEnd("CLEAR", "うまく言い訳できた", 1), 650);
  } else if (nextId === "clearMaybe") {
    setTimeout(() => showEnd("CLEAR？", "なんとかごまかせた…", 2), 650);
  } else {
    currentNode = story[nextId];
    if (currentNode.type === "input") {
      showInputPrompt(currentNode); // ここで currentNode を使う！
    } else {
      showMessage(currentNode.text, currentNode.options);
    }
  }
}

function showInputPrompt(node) {
  message.textContent = node.text;
  choices.innerHTML = "";

  const container = document.createElement("div");
  container.style.display = "flex";
  container.style.alignItems = "center";
  container.style.gap = "6px";

  const prefixSpan = document.createElement("span");
  prefixSpan.textContent = node.prefix || "";

  const input = document.createElement("input");
  input.type = "number";
  input.min = 0;
  input.style.fontSize = "1.2em";
  input.style.width = "60px";

  const suffixSpan = document.createElement("span");
  suffixSpan.textContent = node.suffix || "";

  const submitBtn = document.createElement("button");
  submitBtn.textContent = "決定";
  submitBtn.classList.add("submitBtn"); // ← 修正ここ


  submitBtn.onclick = () => {
  const val = parseInt(input.value, 10);
  if (isNaN(val)) {
    alert("数字を入力してください");
    return;
  }

  if (val === node.answer) {
    yamido = Math.max(0, yamido + (node.delta || 0));  // 減らす方向のdeltaなら負の値を入れてる想定
    updateMeter();
    handleNext(node.correctNext);
  } else {
    yamido = Math.min(100, yamido + (node.deltaWrong || 0));  // 不正解なら増える方向にdeltaWrongを別途用意
    updateMeter();
    handleNext(node.wrongNext);
  }
};


  container.appendChild(prefixSpan);
  container.appendChild(input);
  container.appendChild(suffixSpan);
  choices.appendChild(container);
  choices.appendChild(submitBtn);
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
  handleNext("start"); // 最初のストーリーノードから再開
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

