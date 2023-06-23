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

const filterFruits = () => {
  const minWeight = document.querySelector('.minweight__input').value;
  const maxWeight = document.querySelector('.maxweight__input').value;

  fruits = fruits.filter((item) => {
      return item.weight >= minWeight && item.weight <= maxWeight; 
  });
};

filterButton.addEventListener('click', () => {
  filterFruits();
  display();
});

/*** СОРТИРОВКА ***/

let sortKind = 'bubbleSort'; // инициализация состояния вида сортировки
let sortTime = '-'; // инициализация состояния времени сортировки

const priority = ['светло-коричневый', 'желтый', 'розово-красный', 'зеленый', 'фиолетовый']

const comparationColorBubble = (fruit1, fruit2) => {
  const priority1 = priority.indexOf(fruit1.color);
  const priority2 = priority.indexOf(fruit2.color);
  return priority1 > priority2;
};

const comparationColorQuick = (fruit1, fruit2) => {
  const priority1 = priority.indexOf(fruit1.color);
  const priority2 = priority.indexOf(fruit2.color);
  return priority1 - priority2;
};

const sortAPI = {
  bubbleSort(arr, comparation) {
    const n = arr.length;
    for (let i = 0; i < n-1; i++) { 

      for (let j = 0; j < n-1-i; j++) { 
           if (comparation(arr[j], arr[j+1])) { 
               let temp = arr[j+1]; 
               arr[j+1] = arr[j]; 
               arr[j] = temp; 
           }
        }
    }
  },

  quickSort(array, comparation) {
    if (array.length <= 1) {
      return array;
    }
  
    const pivotIndex = Math.floor(array.length / 2);
    const pivot = array[pivotIndex];
    const less = [];
    const equal = [];
    const greater = [];
  
    for (const element of array) {
      const comparison = comparation(element, pivot);
      if (comparison < 0) {
        less.push(element);
      } else if (comparison > 0) {
        greater.push(element);
      } else {
        equal.push(element);
      }
    }
  
    return [...this.quickSort(less, comparation), ...equal, ...this.quickSort(greater, comparation)];
  },
};

// инициализация полей
sortKindLabel.textContent = sortKind;
sortTimeLabel.textContent = sortTime;


sortChangeButton.addEventListener('click', () => {
  sortKind = sortKind === 'bubbleSort' ? 'quickSort' : 'bubbleSort';
  sortKindLabel.textContent = sortKind;
});

sortActionButton.addEventListener('click', () => {
  sortTimeLabel.textContent = 'sorting...';
  
  const start = new Date().getTime();

  if (sortKind === 'bubbleSort') {
    sortAPI.bubbleSort(fruits, comparationColorBubble);
  } else {
    fruits = sortAPI.quickSort(fruits, comparationColorQuick);
  }

  const end = new Date().getTime();
  sortTime = `${end - start} ms`;

  display();

  sortTimeLabel.textContent = sortTime;
});

/*** ДОБАВИТЬ ФРУКТ ***/

addActionButton.addEventListener('click', () => {
  const kindInput = document.querySelector('.kind__input').value;
  const colorInput = document.querySelector('.color__input').value;
  const weightInput = document.querySelector('.weight__input').value;
  

  if (!kindInput || !colorInput || !weightInput) {
    alert('Пожалуйста, заполните все поля');
    return; 
  }

  const newFruit = {
    index: '5',
    kind: kindInput,
    color: colorInput,
    weight: parseInt(weightInput),
  };

  fruits.push(newFruit);
  display();
});
