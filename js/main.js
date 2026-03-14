// Мобильное меню
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Анимация при скролле
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Элементы для анимации
const fadeElements = document.querySelectorAll('.about-content, .skills-grid, .projects-grid, .contact-content');
fadeElements.forEach(el => {
    el.classList.add('opacity-0');
    observer.observe(el);
});

// Анимация прогресс-баров навыков
const skillsSection = document.getElementById('skills');
const skillBars = document.querySelectorAll('.progress-level');

const animateSkillBars = () => {
    const skillsPosition = skillsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (skillsPosition < screenPosition) {
        skillBars.forEach(bar => {
            const level = bar.getAttribute('data-level');
            bar.style.width = level;
        });
    }
};

// Запуск анимации при загрузке и скролле
window.addEventListener('load', animateSkillBars);
window.addEventListener('scroll', animateSkillBars);

// Валидация формы контактов
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Получение значений полей
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Простая валидация
        if (name === '' || email === '' || subject === '' || message === '') {
            alert('Пожалуйста, заполните все поля формы.');
            return;
        }
        
        // Проверка email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Пожалуйста, введите действительный адрес электронной почты.');
            return;
        }
        
        // Здесь можно добавить отправку формы
        alert('Спасибо за ваше сообщение! Я свяжусь с вами в ближайшее время.');
        contactForm.reset();
    });
}

// Показ/скрытие хедера при скролле
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        document.querySelector('.header').style.transform = 'translateY(-100%)';
    } else {
        document.querySelector('.header').style.transform = 'translateY(0)';
    }
    
    lastScrollY = window.scrollY;
});

// Анимация чисел при достижении секции
const animateValue = (obj, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
};

// Анимация счетчиков при достижении секции
const counters = document.querySelectorAll('[data-target]');
const counterSection = document.querySelector('.counter-section'); // если есть такая секция

// Функция для запуска анимации счетчиков
const runCounterAnimation = () => {
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const current = +counter.innerText;
        
        if (current < target) {
            animateValue(counter, current, target, 2000);
        }
    });
};

// Добавление эффекта параллакса для hero-секции
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero');
    const speed = scrolled * -0.5;
    
    if (parallax) {
        parallax.style.backgroundPositionY = `${speed}px`;
    }
});