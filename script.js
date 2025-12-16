// Factory Game Logic

let progress = 0;
let cash = 0;
let characters = [];
let baseEarnings = 10;
let level = 1;
let maxCharacters = 10;

// Answering questions fills the bar
function answer(correct) {
  if (correct) {
    progress += 20;
    if (progress >= 100) {
      progress = 0;
      unlockCharacter();
      document.getElementById("status").textContent = "🎉 You unlocked a Character!";
    } else {
      document.getElementById("status").textContent = "Good job! Keep going...";
    }
  } else {
    document.getElementById("status").textContent = "Oops! Try again.";
  }
  document.getElementById("bar").style.width = progress + "%";
}

// Unlock new Characters (random class emoji)
function unlockCharacter() {
  if (characters.length < maxCharacters) {
    let classes = ["👷","🤖","🧑‍🏭","👔"];
    let newChar = classes[Math.floor(Math.random() * classes.length)];
    characters.push({emoji:newChar, level:1});
    renderCharacters();
  } else {
    alert("Factory full! Replace a Character to optimize multipliers.");
  }
}

// Display Characters
function renderCharacters() {
  let container = document.getElementById("characters");
  container.innerHTML = "";
  characters.forEach((c,i) => {
    container.innerHTML += `<p>${c.emoji} Level ${c.level} — Produces $${earnings(c)} per bar fill 
    <button onclick="replace(${i})">Replace</button></p>`;
  });
}

// Calculate earnings with class multiplier
function earnings(c) {
  let count = characters.filter(x => x.emoji === c.emoji).length;
  return baseEarnings * c.level * count;
}

// Add money every cycle
function earnMoney() {
  characters.forEach(c => {
    cash += earnings(c);
  });
  document.getElementById("cash").textContent = cash;
  checkUpgrade();
}

// Upgrade Characters
function upgrade() {
  if (cash >= 50) {
    cash -= 50;
    level++;
    document.getElementById("cash").textContent = cash;
    document.getElementById("status").textContent = "⬆️ Character upgraded to Level " + level;
    checkUpgrade();
    renderCharacters();
  }
}

// Check if upgrade is affordable
function checkUpgrade() {
  let btn = document.getElementById("upgradeBtn");
  if (cash >= 50) {
    btn.classList.add("active");
  } else {
    btn.classList.remove("active");
  }
}

// Replace a Character
function replace(index) {
  let classes = ["👷","🤖","🧑‍🏭","👔"];
  let newChar = classes[Math.floor(Math.random() * classes.length)];
  characters[index] = {emoji:newChar, level:1};
  renderCharacters();
}

// Auto money every 5 seconds
setInterval(earnMoney, 5000);
