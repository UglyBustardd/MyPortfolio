function userInfo() {
  let name = document.getElementById("name").value;
  let effect = document.getElementById("effect").value;
  console.log(name + " " + effect);
}

const worksField = document.getElementById("works");
const pictures = [
  document.getElementById("p1"),
  document.getElementById("p2"),
  document.getElementById("p3"),
  document.getElementById("p4"),
  document.getElementById("p5")
];

// Функция для сброса всех стилей к исходным
function resetStyles() {
  for (let i = 0; i < pictures.length; i++) {
    pictures[i].classList.remove("active-picture-field");
    pictures[i].classList.remove("active-border");
  }
  worksField.style.gridTemplateColumns = "repeat(5, 1fr)";
  worksField.classList.remove("active-picture");
}

// Добавляем обработчики кликов для всех изображений
for (let i = 0; i < pictures.length; i++) {
  pictures[i].addEventListener("click", () => {
    // Если кликнули по уже активному изображению, сбрасываем стили
    if (pictures[i].classList.contains("active-picture-field")) {
      resetStyles();
    } else {
      // Сначала сбрасываем все стили
      resetStyles();

      // Применяем активный стиль ко всем изображениям
      for (let j = 0; j < pictures.length; j++) {
        pictures[j].classList.add("active-picture-field");
      }

      // Устанавливаем соответствующую сетку в зависимости от индекса изображения
      let gridColumns;
      switch (i) {
        case 0:
          gridColumns = "24fr 3fr 3fr 3fr 3fr";
          break;
        case 1:
          gridColumns = "3fr 24fr 3fr 3fr 3fr";
          break;
        case 2:
          gridColumns = "3fr 3fr 24fr 3fr 3fr";
          break;
        case 3:
          gridColumns = "3fr 3fr 3fr 24fr 3fr";
          break;
        case 4:
          gridColumns = "3fr 3fr 3fr 3fr 24fr";
          break;
        default:
          gridColumns = "repeat(5, 1fr)";
      }
      pictures[i].classList.add("active-border");

      worksField.style.gridTemplateColumns = gridColumns;
      worksField.classList.add("active-picture");
    }
  });
}

// Логика скрытия/отображения навигационного меню при прокрутке
let prevScrollPos = window.pageYOffset;

window.addEventListener('scroll', function () {
  const currentScrollPos = window.pageYOffset;
  const navbar = document.querySelector('nav');

  if (prevScrollPos > currentScrollPos) {
    navbar.classList.remove('hidden');
  } else {
    navbar.classList.add('hidden');
  }

  prevScrollPos = currentScrollPos;
});

// Работа бургер меню

const burger = document.querySelector('.burger');
const menu = document.querySelector('.nav_icons');
const menuLinks = document.querySelectorAll('.nav_icons a'); // Ссылки внутри меню

burger.addEventListener('click', () => {
  burger.classList.toggle('active');
  menu.classList.toggle('active');
});

menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('active');
    menu.classList.remove('active');
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 992) {
    burger.classList.remove('active');
    menu.classList.remove('active');
  }
});