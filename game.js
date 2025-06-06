let yami = 0;
let current = 0;
let unlockedEnds = JSON.parse(localStorage.getItem("unlockedEnds")) || [];

const questions = [
  {
    text: "昨日の女、誰？",
    choices: [
      { text: "妹だよ！", yami: -10 },
      { text: "ただの友達だって", yami: 10 },
      { text: "うるさいな…", yami: 100 }
    ]
  },
  {
    text: "この前既読スルーしたよね？",
    choices: [
      { text: "寝てた", yami: 0 },
      { text: "忘れてた", yami: 20 },
      { text: "気分じゃなかった", yami: 100 }
    ]
  }
];

const ends = [
  { id: "dead", name: "ゲームオーバー", condition: () => yami > 100, label: "YOU DEAD" },
  { id: "clear", name: "ハッピーエンド", condition: () => current >= questions.length && yami <= 50, label: "クリア" },
  { id: "clear2", name: "妥協エンド", condition: () => current >= questions.length && yami <= 100, label: "クリア？" }
];

function startGame() {
  yami = 0;
  current = 0;
  updateHeroImage();
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("descriptionScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "block";
  document.getElementById("endScreen").style.display = "none";
  showQuestion();
  updateYamiMeter();
  updateEndList();
}

function showDescription() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("descriptionScreen").style.display = "block";
}

function backToStart() {
  document.getElementById("startScreen").style.display = "block";
  document.getElementById("descriptionScreen").style.display = "none";
  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("endScreen").style.display = "none";
}

function showQuestion() {
  if (current >= questions.length) {
    checkEnding();
    return;
  }
  const q = questions[current];
  document.getElementById("dialogue").innerText = q.text;
  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";
  q.choices.forEach(c => {
    const btn = document.createElement("button");
    btn.textContent = c.text;
    btn.onclick = () => {
      yami += c.yami;
      current++;
      updateYamiMeter();
      updateHeroImage();
      showQuestion();
    };
    choicesDiv.appendChild(btn);
  });
}

function updateYamiMeter() {
  const meter = document.getElementById("yamiMeter");
  meter.innerText = `病み度：${yami}%`;
  if (yami < 50) {
    meter.style.color = "lightgreen";
  } else if (yami < 80) {
    meter.style.color = "yellow";
  } else {
    meter.style.color = "red";
  }
}

function updateHeroImage() {
  const hero = document.getElementById("hero");
  if (yami < 50) {
    hero.src = "images/menhera1.png";
  } else if (yami < 80) {
    hero.src = "images/menhera2.png";
  } else {
    hero.src = "images/menhera3.png";
  }
}

function checkEnding() {
  for (let end of ends) {
    if (end.condition()) {
      showEnd(end.id, end.name, end.label);
      return;
    }
  }
}

function showEnd(id, name, label) {
  if (!unlockedEnds.includes(id)) {
    unlockedEnds.push(id);
    localStorage.setItem("unlockedEnds", JSON.stringify(unlockedEnds));
  }

  document.getElementById("gameScreen").style.display = "none";
  document.getElementById("endScreen").style.display = "block";
  document.getElementById("endName").innerText = name;
  document.getElementById("endType").innerText = label;
  updateEndList();
}

function retryGame() {
  startGame();
}

function toggleEndList() {
  const list = document.getElementById("endList");
  list.style.display = list.style.display === "none" ? "block" : "none";
}

function updateEndList() {
  const ul = document.getElementById("endItems");
  ul.innerHTML = "";
  ends.forEach(end => {
    const li = document.createElement("li");
    li.textContent = unlockedEnds.includes(end.id) ? end.name : "？？？？";
    ul.appendChild(li);
  });
}
// 見たエンドを記録する配列
let seenEndings = {
  bad: false,
  clear: false,
  clear2: false
};

// エンド一覧を更新
function updateEndList() {
  const list = document.getElementById('endList');
  list.innerHTML = `
    1. ${seenEndings.bad ? 'YOU DEAD' : '？？？？'}<br>
    2. ${seenEndings.clear ? 'クリア' : '？？？？'}<br>
    3. ${seenEndings.clear2 ? 'クリア？' : '？？？？'}<br>
  `;
}

// ⭐スタートボタン押したときにエンド状態をリセット
document.getElementById('startBtn').addEventListener('click', () => {
  // ゲーム画面表示などの処理
  document.getElementById('startScreen').style.display = 'none';
  document.getElementById('gameScreen').style.display = 'block';

  // ⭐ここでエンド状態リセット
  seenEndings = {
    bad: false,
    clear: false,
    clear2: false
  };
  updateEndList(); // 表示も更新
});
