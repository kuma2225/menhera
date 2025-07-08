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
    text: "おかえり、遅かったね。",
    options: [
      { text: "ただいま", delta: 40, next: "q1_1" },
      { text: "ごめんね、まさきを家まで送ってて", delta: 10, next: "q1_2" },
      { text: "んー大好きだよみーちゃん♡", delta: 60, next: "q1_3" }
    ]
  },

  q1_1: {
    text: "それだけ？他に言うことないの？",
    options: [
      { text: "これ、お土産。", delta: -10, next: "q2_11" },
      { text: "大好きだよ。", delta: 5, next: "q2_12" }
    ]
  },

  q1_2: {
    text: "まさきくんって家、杉本町だよね？",
    options: [
      { text: "え…うん。", delta: 30, next: "q2_21" },
      { text: "あいつ最近引っ越したんだよ。", delta: 20, next: "q2_22" }
    ]
  },

  q1_3: {
    text: "みーちゃん？誰よその女！！浮気してたの！？もうもえのこと好きじゃないんだ！！",
    options: [
      { text: "ちがうよ。もえみの”み”でみーちゃん。浮気なんてするわけないじゃん。", delta: -20, next: "q2_31" },
      { text: "大丈夫。もえみが一番だよ。", delta: 40, next: "q2_32" }
    ]
  },

  q2_11: {
    text: "…ケーキ？",
    options: [
      { text: "今日で付き合って178日記念。", delta: -10, next: "q3_111" },
      { text: "遅くなっちゃったからさ。", delta: 5, next: "q3_112" }
    ]
  },

 q2_12: {
  text: "ほんとに思ってる？じゃあ今日が何の日かわかる？",
  type: "input",
  answer: 189,
  prefix: "付き合って",
  suffix: "日記念でしょ。",
  delta: -50,
  deltaWrong: 100,
  correctNext: "q3_121",
  wrongNext: "q3_122"
},

  q2_21: {
    text: "じゃあなんで中百舌鳥に行ってたの？",
    options: [
      { text: "…行ってないよ？", delta: 30, next: "q3_211" },
      { text: "なんで知ってんの？もう勝手にGPSつけないって言ったよね？", delta: 20, next: "q3_212" }
    ]
  },

  q2_22: {
    text: "ふーん…。あとさ、今日の飲み会男の人だけって言ってたよね？…誰この女達？",
    options: [
      { text: "（なんで鍵垢のツイート見られてんの…）", delta: -20, next: "q3_221" },
      { text: "まさきが勝手につれてきてさー", delta: 40, next: "q3_222" }
    ]
  },

  q2_31: {
    text: "そんな言い訳でいけると思った？",
    next: "dead"
  },

    q2_32: {
    text: "なんも大丈夫じゃねーよ",
    next: "dead"
  },

  q3_111: {
  text: "189日だよ。もえとの11日どうでもよかったんだね。",
  next: "dead" 
},

  q3_112: {
    text: "…覚えてないんだ。もえとの記念日。",
    next: "dead" 
  },

   q3_121: {
    text: "覚えててくれたの…？",
    options: [
      { text: "もちろんだよ。", delta: -100, next: "q4_1211" },
      { text: "もえみと過ごした時間１分１秒たりともわすれるわけないだろ。", delta: -100, next: "q4_1212" }
    ]
  },


  q3_122: {
  text: "もえとの時間なんてどうでもよかったんだね。",
  next: "dead" 
},

 q3_211: {
    text: "なんでそんな嘘つくの！！",
    next: "dead" 
  },

  q3_212: {
  text: "不安にさせるきみ君が悪いんじゃん！！もえだってこんなことしたくないのに！！",
  next: "dead" 
},

 q3_221: {
    text: "…言い訳もできないの？",
    next: "dead" 
  },

  q3_222: {
  text: "わかった。まさきくんが悪いんだね。",
  next: "clear?" 
},

  q4_1212: {
    text: "ほんとに！？じゃあ７６日前の１３時間４０分前、なんの話してたでしょうか！",
    options: [
      { text: "…………", delta: 100, next: "q5_12121" },
      ]
  },
  
  q4_1211: {
  text: "……♡",
  next: "clear",
  image: "images/menhera4.png",
  delay: 2000
},
  
  q5_12121: {
  text: "もえ嘘つく人きらい。",
  next: "dead" 
},


  
  clear: "CLEAR",
  clearMaybe: "CLEAR？",
  dead: "YOU DIED4"
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

  // nextIdを取り出す
  const nextId = opt.next;
  const nextNode = story[nextId];

  if (yamido > 100) {
    // 病み度が100超えたら
    if (nextNode && typeof nextNode === "object" && nextNode.text) {
      // 次のセリフがある場合はそれをタイピング表示してから赤フラッシュ
      message.textContent = "";
      choices.innerHTML = "";

      let j = 0;
      const interval = setInterval(() => {
        message.textContent += nextNode.text[j];
        j++;
        if (j >= nextNode.text.length) {
          clearInterval(interval);

          setTimeout(() => {
            const redFlash = document.getElementById("redFlash");
            redFlash.style.display = "block";

            setTimeout(() => {
              redFlash.style.display = "none";
              showEnd("YOU DIED3", "殺された", 0);
            }, 50);

          }, 750);
        }
      }, 30);

    } else {
      // セリフがなければ即赤フラッシュ＆エンド画面へ
      const redFlash = document.getElementById("redFlash");
      redFlash.style.display = "block";

      setTimeout(() => {
        redFlash.style.display = "none";
        showEnd("YOU DIED2", "殺された", 0);
      }, 700);
    }
  } else {
    // 病み度100以下なら普通に進行
    handleNext(nextId);
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
  const node = story[nextId];

  if (!node || typeof node === 'string') {
    // 文字列だけならエンド判定
    if (nextId === "dead") {
      const redFlash = document.getElementById("redFlash");
      redFlash.style.display = "block";
      setTimeout(() => {
        redFlash.style.display = "none";
        showEnd("YOU DIED1", "殺された", 0);
      }, 700);
    } else if (nextId === "clear") {
      setTimeout(() => showEnd("CLEAR", "うまく言い訳できた", 1), 650);
    } else if (nextId === "clearMaybe") {
      setTimeout(() => showEnd("CLEAR？", "なんとかごまかせた…", 2), 650);
    }
    return;  // 処理をここで止める
  }

  currentNode = node;

  if (currentNode.type === "input") {
    showInputPrompt(currentNode);
  } else {
    showMessage(currentNode.text, currentNode.options || []);
    if ((!currentNode.options || currentNode.options.length === 0) && currentNode.next) {
      const waitTime = 1000 + currentNode.text.length * 30;
      setTimeout(() => handleNext(currentNode.next), waitTime);
    }
  }
}




function showInputPrompt(node) { 
   // タイピング表示
  message.textContent = "";
  let i = 0;
  const interval = setInterval(() => {
    message.textContent += node.text[i];
    i++;
    if (i >= node.text.length) clearInterval(interval);
  }, 30); // ← タイピング速度（ms）

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
  console.log("showEnd called:", type, name, id);
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

