// элементы в DOM можно получить при помощи функции querySelector
const fruitsList = document.querySelector('.fruits__list'); // список карточек
const shuffleButton = document.querySelector('.shuffle__btn'); // кнопка перемешивания
const filterButton = document.querySelector('.filter__btn'); // кнопка фильтрации
const sortKindLabel = document.querySelector('.sort__kind'); // поле с названием сортировки
const sortTimeLabel = document.querySelector('.sort__time'); // поле с временем сортировки
const sortChangeButton = document.querySelector('.sort__change__btn'); // кнопка смены сортировки
const sortActionButton = document.querySelector('.sort__action__btn'); // кнопка сортировки
const kindInput = document.querySelector('.kind__input'); // поле с названием вида
const colorInput = document.querySelector('.color__input'); // поле с названием цвета
const weightInput = document.querySelector('.weight__input'); // поле с весом
const addActionButton = document.querySelector('.add__action__btn'); // кнопка добавления

// список фруктов в JSON формате
let fruitsJSON = `[
  {"kind": "Мангустин", "color": "фиолетовый", "weight": 13},
  {"kind": "Дуриан", "color": "зеленый", "weight": 35},
  {"kind": "Личи", "color": "розово-красный", "weight": 17},
  {"kind": "Карамбола", "color": "желтый", "weight": 28},
  {"kind": "Тамаринд", "color": "светло-коричневый", "weight": 22}
]`;

// преобразование JSON в объект JavaScript
let fruits = JSON.parse(fruitsJSON);

const selectionSort = (arr, comparation) => {
   // обратите внимание на список инициализаций в цикле
   for (let i = 0, l = arr.length, k = l - 1; i < k; i++) {
       let indexMin = i;
       // поиск минимального элемента в правой части массива
       for (let j = i + 1; j < l; j++) {
           if (comparation(arr[indexMin], arr[j])) {
               indexMin = j;
           }
       }
       // проверка корректности поиска и обмен значениями
       // при обмене используется деструктуризация
       if (indexMin !== i) {
           [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
       }
   }
   return arr;
};

const getColor = (color) => {
  switch (color) {
    case 'фиолетовый': return 'violet'
    case 'зеленый': return 'green'
    case 'розово-красный': return 'carmazin'
    case 'желтый': return 'yellow'
    case 'светло-коричневый': return 'lightbrown'
  }
}

const display = () => {

  while (fruitsList.firstChild) {
    fruitsList.removeChild(fruitsList.firstChild);
  }

  fruits.forEach((fruit, index) => {
    let listItem = document.createElement('li');
    listItem.classList.add('fruit__item');
    listItem.classList.add(`fruit_${getColor(fruit.color)}`);
  
    let fruitInfo = document.createElement('div');
    fruitInfo.classList.add('fruit__info');
  
    let indexInfo = document.createElement('div');
    indexInfo.textContent = `index: ${index}`;
  
    let kindInfo = document.createElement('div');
    kindInfo.textContent = `kind: ${fruit.kind}`;
  
    let colorInfo = document.createElement('div');
    colorInfo.textContent = `color: ${fruit.color}`;
  
    let weightInfo = document.createElement('div');
    weightInfo.textContent = `weight (кг): ${fruit.weight}`;
  
    fruitInfo.appendChild(indexInfo);
    fruitInfo.appendChild(kindInfo);
    fruitInfo.appendChild(colorInfo);
    fruitInfo.appendChild(weightInfo);
  
    listItem.appendChild(fruitInfo);
    fruitsList.appendChild(listItem);
  });
};

// первая отрисовка карточек
display();

/*** ПЕРЕМЕШИВАНИЕ ***/

// генерация случайного числа в заданном диапазоне
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// перемешивание массива
const shuffleFruits = () => {
  let result = [];
  let fruitsCopy = [...fruits];

  while (fruitsCopy.length > 0) {
    const randomIndex = Math.floor(Math.random() * fruitsCopy.length);
    result.push(fruitsCopy.splice(randomIndex, 1)[0]);
  }

  if (JSON.stringify(fruits) === JSON.stringify(result)) {
    alert('Совпадение! Перемешайте еще раз!');
  } else {
    fruits = result
  }
};

shuffleButton.addEventListener('click', () => {
  shuffleFruits();
  display();
});

/*** ФИЛЬТРАЦИЯ ***/

// фильтрация массива
const filterFruits = () => {
  fruits.filter((item) => {
    // TODO: допишите функцию
  });
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const comparationColor = (a, b) => {
  // TODO: допишите функцию сравнения двух элементов по цвету
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    // TODO: допишите функцию сортировки пузырьком
  },

  quickSort(arr, comparation) {
    // TODO: допишите функцию быстрой сортировки
  },

  // выполняет сортировку и производит замер времени
  startSort(sort, arr, comparation) {
    const start = new Date().getTime();
    sort(arr, comparation);
    const end = new Date().getTime();
    sortTime = `${end - start} ms`;
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;

sortChangeButton.addEventListener('click', () => {
  // TODO: переключать значение sortKind между 'bubbleSort' / 'quickSort'
});

sortActionButton.addEventListener('click', () => {
  // TODO: вывести в sortTimeLabel значение 'sorting...'
  const sort = sortAPI[sortKind];
  sortAPI.startSort(sort, fruits, comparationColor);
  display();
  // TODO: вывести в sortTimeLabel значение sortTime
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  // TODO: создание и добавление нового фрукта в массив fruits
  // необходимые значения берем из kindInput, colorInput, weightInput
  display();
});
