let wood = 0;
let stone = 0;
let wave = 1;
let castleLevel = 1;
let lastResourceGather = Date.now();
let lastSupplyDrop = Date.now();
let bossWave = false; // Флаг для проверки, является ли волна боссом

const woodElement = document.getElementById('wood');
const stoneElement = document.getElementById('stone');
const waveElement = document.getElementById('wave');
const castleElement = document.getElementById('castle');
const enemyElement = document.getElementById('enemy');
const playerDisplay = document.getElementById('playerDisplay');

function updateResources() {
  woodElement.textContent = wood;
  stoneElement.textContent = stone;
}

function gatherResources() {
  const now = Date.now();
  const threeHours = 3 * 60 * 60 * 1000; // 3 часа в миллисекундах

  if (now - lastResourceGather >= threeHours) {
    wood += castleLevel * 20; // Больше уровня замка — больше дерева
    stone += castleLevel * 15; // Больше уровня замка — больше камня
    updateResources();
    lastResourceGather = now;
    console.log("Ресурсы автоматически собраны!");
  }
}

function dailySupplyDrop() {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000; // 1 день в миллисекундах

  if (now - lastSupplyDrop >= oneDay) {
    alert('Вам пришла ежедневная провизия!');
    wood += castleLevel * 100; // Провизия зависит от уровня замка
    stone += castleLevel * 50;
    updateResources();
    lastSupplyDrop = now;
  }
}

document.getElementById('upgradeCastle').addEventListener('click', () => {
  if (wood >= 200 && stone >= 100) {
    wood -= 200;
    stone -= 100;
    castleLevel++;
    updateResources();
    castleElement.textContent = `Замок (Уровень ${castleLevel})`; // Отображаем уровень замка
    alert('Замок улучшен до уровня ' + castleLevel + '!');
  } else {
    alert('Не хватает ресурсов для улучшения замка.');
  }
});

function startWave() {
  if (wave % 10 === 0) {
    bossWave = true;
    enemyElement.textContent = '👹👹👹'; // Босс
    alert(`Волна ${wave} — Босс атакует!`);
  } else {
    bossWave = false;
    enemyElement.textContent = '👹'.repeat(wave); // Обычные враги
    alert(`Волна ${wave} врагов атакует!`);
  }
  wave++;
}

document.getElementById('launchWave').addEventListener('click', () => {
  startWave();
});

setInterval(() => {
  gatherResources();
  dailySupplyDrop();
}, 1000); // Проверяем каждую секунду

// Обработчики событий для навигации между страницами
document.getElementById('army').addEventListener('click', () => showPage('armyPage'));
document.getElementById('friends').addEventListener('click', () => showPage('friendsPage'));
document.getElementById('leagues').addEventListener('click', () => showPage('leaguesPage'));
document.getElementById('shop').addEventListener('click', () => showPage('shopPage'));

function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.style.display = 'none'; // Скрыть все страницы
  });
  document.getElementById(pageId).style.display = 'block'; // Показать выбранную страницу
}

// Обработчик для ввода ника и выбора аватара
document.getElementById('submitPlayerInfo').addEventListener('click', () => {
  const nickname = document.getElementById('nickname').value;
  const selectedAvatar = document.getElementById('avatarSelect').value;
  playerDisplay.textContent = nickname; // Отобразить ник
  // Здесь можно добавить код для отображения аватарки
  alert(`Добро пожаловать, ${nickname}!`);
});
