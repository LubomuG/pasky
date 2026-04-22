let pasky = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentLang = localStorage.getItem('language') || 'uk';
let currentTopping = null;
let currentSize = null;
let currentAdditives = [];
let currentCaptcha = '';

// Translations
const translations = {
    uk: {
        navHome: "Замовити паску",
        navConstructor: "Конструктор",
        navRoulette: "Рулетка",
        randomTitle: "Випадкова паска",
        randomBtn: "Обрати за мене",
        constructorTitle: "Конструктор паски",
        toppingTitle: "Топінг",
        additivesTitle: "Додатки",
        sizeTitle: "Розмір",
        price: "Ціна",
        addToCart: "Додати в кошик",
        rouletteTitle: "Великодня Рулетка",
        spinBtn: "Крутити",
        cartTitle: "Кошик",
        total: "Разом",
        checkout: "Оформити замовлення",
        checkoutTitle: "Оформлення замовлення",
        payBtn: "Оплатити",
        successTitle: "Замовлення успішне!",
        successMsg: "Дякуємо за покупку. Ваша паска скоро буде готова!",
        closeBtn: "Закрити",
        cardPlaceholder: "Номер картки",
        searchPlaceholder: "Пошук пасок...",
        cartEmpty: "Кошик порожній!",
        invalidCard: "Номер картки має містити рівно 16 цифр",
        selectSize: "Виберіть розмір!",
        customCake: "Конструкторська паска",
        addedToCart: "додано до кошика!",
        youWon: "Ви виграли",
        invalidCaptcha: "Невірний код капчі!"
    },
    en: {
        navHome: "Order Easter Cake",
        navConstructor: "Constructor",
        navRoulette: "Roulette",
        randomTitle: "Random Cake",
        randomBtn: "Choose for me",
        constructorTitle: "Cake Constructor",
        toppingTitle: "Topping",
        additivesTitle: "Additives",
        sizeTitle: "Size",
        price: "Price",
        addToCart: "Add to Cart",
        rouletteTitle: "Easter Roulette",
        spinBtn: "Spin",
        cartTitle: "Cart",
        total: "Total",
        checkout: "Checkout",
        checkoutTitle: "Checkout",
        payBtn: "Pay",
        successTitle: "Order Successful!",
        successMsg: "Thank you for your purchase. Your cake will be ready soon!",
        closeBtn: "Close",
        cardPlaceholder: "Card Number",
        searchPlaceholder: "Search cakes...",
        cartEmpty: "Cart is empty!",
        invalidCard: "Card number must contain exactly 16 digits",
        selectSize: "Select size!",
        customCake: "Custom Cake",
        addedToCart: "added to cart!",
        youWon: "You won",
        invalidCaptcha: "Invalid captcha code!"
    },
    pl: {
        navHome: "Zamów babkę",
        navConstructor: "Konstruktor",
        navRoulette: "Ruletka",
        randomTitle: "Losowa babka",
        randomBtn: "Wybierz za mnie",
        constructorTitle: "Konstruktor babki",
        toppingTitle: "Polewa",
        additivesTitle: "Dodatki",
        sizeTitle: "Rozmiar",
        price: "Cena",
        addToCart: "Dodaj do koszyka",
        rouletteTitle: "Wielkanocna Ruletka",
        spinBtn: "Kręć",
        cartTitle: "Koszyk",
        total: "Razem",
        checkout: "Zamówienie",
        checkoutTitle: "Realizacja zamówienia",
        payBtn: "Zapłać",
        successTitle: "Zamówienie udane!",
        successMsg: "Dziękujemy za zakup. Twoja babka wkrótce będzie gotowa!",
        closeBtn: "Zamknij",
        cardPlaceholder: "Numer karty",
        searchPlaceholder: "Szukaj babyk...",
        cartEmpty: "Koszyk jest pusty!",
        invalidCard: "Numer karty musi zawierać dokładnie 16 cyfr",
        selectSize: "Wybierz rozmiar!",
        customCake: "Babka konstruktorska",
        addedToCart: "dodano do koszyka!",
        youWon: "Wygrałeś",
        invalidCaptcha: "Nieprawidłowy kod captcha!"
    },
    de: {
        navHome: "Osterkuchen bestellen",
        navConstructor: "Konstruktor",
        navRoulette: "Glücksrad",
        randomTitle: "Zufälliger Kuchen",
        randomBtn: "Wähle für mich",
        constructorTitle: "Kuchen Konstruktor",
        toppingTitle: "Topping",
        additivesTitle: "Zusätze",
        sizeTitle: "Größe",
        price: "Preis",
        addToCart: "In den Warenkorb",
        rouletteTitle: "Oster Glücksrad",
        spinBtn: "Drehen",
        cartTitle: "Warenkorb",
        total: "Gesamt",
        checkout: "Zur Kasse",
        checkoutTitle: "Kasse",
        payBtn: "Bezahlen",
        successTitle: "Bestellung erfolgreich!",
        successMsg: "Vielen Dank für Ihren Einkauf. Ihr Kuchen wird bald fertig sein!",
        closeBtn: "Schließen",
        cardPlaceholder: "Kartennummer",
        searchPlaceholder: "Kuchen suchen...",
        cartEmpty: "Warenkorb ist leer!",
        invalidCard: "Kartennummer muss genau 16 Ziffern enthalten",
        selectSize: "Wählen Sie eine Größe!",
        customCake: "Benutzerdefinierter Kuchen",
        addedToCart: "in den Warenkorb gelegt!",
        youWon: "Sie haben gewonnen",
        invalidCaptcha: "Ungültiger Captcha-Code!"
    }
};

const prizes = [
    { name: "Знижка 150 грн", nameEn: "Discount 150 UAH", namePl: "Zniżka 150 UAH", nameDe: "Rabatt 150 UAH", color: "#8b4513" },
    { name: "Безкоштовна доставка", nameEn: "Free delivery", namePl: "Darmowa dostawa", nameDe: "Kostenlose Lieferung", color: "#d2b48c" },
    { name: "Подарунок", nameEn: "Gift", namePl: "Prezent", nameDe: "Geschenk", color: "#8b4513" },
    { name: "Знижка 200 грн", nameEn: "Discount 200 UAH", namePl: "Zniżka 200 UAH", nameDe: "Rabatt 200 UAH", color: "#d2b48c" },
    { name: "Додатковий топінг", nameEn: "Extra topping", namePl: "Dodatkowa polewa", nameDe: "Extra Topping", color: "#8b4513" },
    { name: "Паска в подарунок", nameEn: "Free cake", namePl: "Darmowa babka", nameDe: "Kostenloser Kuchen", color: "#d2b48c" },
    { name: "Знижка 100 грн", nameEn: "Discount 100 UAH", namePl: "Zniżka 100 UAH", nameDe: "Rabatt 100 UAH", color: "#8b4513" },
    { name: "Свічка", nameEn: "Candle", namePl: "Świeca", nameDe: "Kerze", color: "#d2b48c" }
];

const toppings = [
    { name: "Шоколадний", nameEn: "Chocolate", namePl: "Czekoladowy", nameDe: "Schokolade", price: 85 },
    { name: "Ванільний", nameEn: "Vanilla", namePl: "Waniliowy", nameDe: "Vanille", price: 65 },
    { name: "Полуничний", nameEn: "Strawberry", namePl: "Truskawkowy", nameDe: "Erdbeere", price: 95 },
    { name: "Фісташковий", nameEn: "Pistachio", namePl: "Pistacjowy", nameDe: "Pistazie", price: 115 }
];

const additives = [
    { name: "Родзинки", nameEn: "Raisins", namePl: "Rodzynki", nameDe: "Rosinen", price: 55 },
    { name: "Волоський горіх", nameEn: "Walnuts", namePl: "Orzechy włoskie", nameDe: "Walnüsse", price: 75 },
    { name: "Цукати", nameEn: "Candied fruits", namePl: "Kandyzowane owoce", nameDe: "Kristallfrüchte", price: 70 },
    { name: "Шоколадні краплі", nameEn: "Chocolate drops", namePl: "Kropelki czekolady", nameDe: "Schokoladentropfen", price: 80 }
];

const sizes = [
    { name: "Маленька (500г)", nameEn: "Small (500g)", namePl: "Mała (500g)", nameDe: "Klein (500g)", price: 320 },
    { name: "Середня (800г)", nameEn: "Medium (800g)", namePl: "Średnia (800g)", nameDe: "Mittel (800g)", price: 450 },
    { name: "Велика (1200г)", nameEn: "Large (1200g)", namePl: "Duża (1200g)", nameDe: "Groß (1200g)", price: 620 }
];

// CAPTCHA FUNCTIONS
function generateCaptcha() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
        captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    currentCaptcha = captcha;
    $('#captcha-code').text(captcha);
    $('#captcha-input').val('');
    $('#captcha-error').hide();
}

function verifyCaptcha() {
    const userInput = $('#captcha-input').val().trim();
    if (userInput === currentCaptcha) {
        $('#captcha-error').hide();
        return true;
    } else {
        $('#captcha-error').text(getTranslation('invalidCaptcha')).show();
        generateCaptcha();
        return false;
    }
}

$(document).ready(function() {
    applyLanguage();
    loadPasky();
    updateCartCount();
    renderConstructor();
    createWheel();
    generateCaptcha();

    // Language change
    $('.lang-btn').click(function() {
        currentLang = $(this).data('lang');
        localStorage.setItem('language', currentLang);
        applyLanguage();
        renderPasky(pasky);
        renderConstructor();
        createWheel();
        updateCartCount();
        generateCaptcha();
    });

    // Navigation
    $('.nav-link').click(function(e) {
        e.preventDefault();
        $('.nav-link').removeClass('active');
        $(this).addClass('active');
        $('.page').removeClass('active');
        $(`#${$(this).data('page')}-page`).addClass('active');
    });

    // Search
    $('#search-input').on('input', filterPasky);

    // Random cake
    $('#btn-random').click(() => {
        if (pasky.length) showProductModal(pasky[Math.floor(Math.random() * pasky.length)]);
    });

    // Cart
    $('#cart-icon').click(showCart);
    $('#close-cart').click(() => $('#cart-modal').fadeOut());
    $('#close-product').click(() => $('#product-modal').fadeOut());
    $('#close-checkout').click(() => $('#checkout-modal').fadeOut());
    $('#close-success').click(() => $('#success-modal').fadeOut());
    $('#close-success-btn').click(() => $('#success-modal').fadeOut());

    $('#captcha-refresh').click(generateCaptcha);

    // Checkout
    $('#checkout-btn').click(() => {
        if (cart.length === 0) {
            showCustomAlert(getTranslation('cartEmpty'), 'error');
            return;
        }
        $('#cart-modal').fadeOut();
        generateCaptcha();
        setTimeout(() => $('#checkout-modal').fadeIn(), 300);
    });

    $('#pay-btn').click(() => {
        const card = $('#card-number').val().trim();
        
        if (card.length !== 16 || !/^\d+$/.test(card)) {
            showCustomAlert(getTranslation('invalidCard'), 'error');
            return;
        }
        
        if (!verifyCaptcha()) {
            return;
        }
        
        $('#checkout-modal').fadeOut();
        setTimeout(() => $('#success-modal').fadeIn(), 400);
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        $('#card-number').val('');
        generateCaptcha();
    });

    $('#add-to-cart-constructor').click(() => {
        if (!currentSize) {
            showCustomAlert(getTranslation('selectSize'), 'error');
            return;
        }
        const price = parseInt($('#constructor-price').text());
        const customPasca = {
            _id: 'custom-' + Date.now(),
            name: getTranslation('customCake'),
            price: price,
            description: `${currentSize ? currentSize.name : ''}${currentTopping ? ', ' + currentTopping.name : ''}${currentAdditives.length ? ', ' + currentAdditives.map(a => a.name).join(', ') : ''}`
        };
        addToCart(customPasca);
    });
});

function applyLanguage() {
    $('[data-key]').each(function() {
        const key = $(this).data('key');
        if (translations[currentLang][key]) {
            if ($(this).is('input')) {
                $(this).attr('placeholder', translations[currentLang][key]);
            } else {
                $(this).text(translations[currentLang][key]);
            }
        }
    });
    
    $('#search-input').attr('placeholder', getTranslation('searchPlaceholder'));
    $('#card-number').attr('placeholder', getTranslation('cardPlaceholder'));
}

function getTranslation(key) {
    return translations[currentLang][key] || translations.uk[key] || key;
}

async function loadPasky() {
    try {
        const res = await fetch('https://easter-cake.onrender.com/api/pasky');
        pasky = await res.json();
        renderPasky(pasky);
    } catch (err) {
        console.error(err);
        pasky = [
            { _id: '1', name: 'Класична паска', nameEn: 'Classic Easter Cake', namePl: 'Klasyczna babka', nameDe: 'Klassischer Osterkuchen', description: 'Традиційна великодня паска', descriptionEn: 'Traditional Easter cake', descriptionPl: 'Tradycyjna babka wielkanocna', descriptionDe: 'Traditioneller Osterkuchen', price: 350, image: 'https://cdn-icons-png.flaticon.com/512/2975/2975360.png' },
            { _id: '2', name: 'Шоколадна паска', nameEn: 'Chocolate Cake', namePl: 'Babka czekoladowa', nameDe: 'Schokoladenkuchen', description: 'З шоколадною глазур\'ю', descriptionEn: 'With chocolate glaze', descriptionPl: 'Z polewą czekoladową', descriptionDe: 'Mit Schokoladenglasur', price: 420, image: 'https://cdn-icons-png.flaticon.com/512/2975/2975360.png' },
            { _id: '3', name: 'Ванільна паска', nameEn: 'Vanilla Cake', namePl: 'Babka waniliowa', nameDe: 'Vanillekuchen', description: 'Ніжна ванільна паска', descriptionEn: 'Delicate vanilla cake', descriptionPl: 'Delikatna babka waniliowa', descriptionDe: 'Zarter Vanillekuchen', price: 380, image: 'https://cdn-icons-png.flaticon.com/512/2975/2975360.png' }
        ];
        renderPasky(pasky);
    }
}

function renderPasky(data) {
    const grid = $('#pasky-grid');
    grid.empty();

    data.forEach(p => {
        const card = `
            <div class="paska-card" data-id="${p._id}">
                <img src="${p.image}" alt="${getLocalizedName(p, 'name')}">
                <div class="paska-card-info">
                    <h3>${getLocalizedName(p, 'name')}</h3>
                    <div class="price">${p.price} грн</div>
                    <button class="add-to-cart-btn" data-key="addToCart">${getTranslation('addToCart')}</button>
                </div>
            </div>
        `;
        grid.append(card);
    });

    $('.paska-card').click(function(e) {
        if (!$(e.target).hasClass('add-to-cart-btn')) {
            const id = $(this).data('id');
            const product = pasky.find(p => p._id == id);
            if (product) showProductModal(product);
        }
    });

    $('.add-to-cart-btn').click(function(e) {
        e.stopPropagation();
        const card = $(this).closest('.paska-card');
        const id = card.data('id');
        const product = pasky.find(p => p._id == id);
        if (product) addToCart(product);
    });
}

function getLocalizedName(item, field) {
    if (field === 'name') {
        return item[`name${currentLang.charAt(0).toUpperCase() + currentLang.slice(1)}`] || item.name;
    }
    if (field === 'description') {
        return item[`description${currentLang.charAt(0).toUpperCase() + currentLang.slice(1)}`] || item.description;
    }
    return item[field];
}

function filterPasky() {
    const term = $('#search-input').val().toLowerCase().trim();
    const filtered = term ? pasky.filter(p => getLocalizedName(p, 'name').toLowerCase().includes(term)) : pasky;
    renderPasky(filtered);
}

function showProductModal(product) {
    $('#modal-image').attr('src', product.image);
    $('#modal-name').text(getLocalizedName(product, 'name'));
    $('#modal-description').text(getLocalizedName(product, 'description'));
    $('#modal-price').html(`<strong>${product.price} грн</strong>`);

    $('#add-to-cart-modal').off('click').on('click', () => {
        addToCart(product);
        $('#product-modal').fadeOut();
    });

    $('#product-modal').fadeIn();
}

function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCustomAlert(`✅ ${getLocalizedName(product, 'name')} ${getTranslation('addedToCart')}`, 'success');
}

function updateCartCount() {
    $('#cart-count').text(cart.length);
}

function showCart() {
    const container = $('#cart-items');
    container.empty();
    let total = 0;

    cart.forEach((item, i) => {
        total += item.price;
        container.append(`
            <div class="cart-item">
                <span>${getLocalizedName(item, 'name')}</span>
                <span>${item.price} грн</span>
                <button class="remove-item" data-index="${i}">×</button>
            </div>
        `);
    });

    $('#cart-total-price').text(total);
    $('#cart-modal').fadeIn();

    $('.remove-item').off('click').on('click', function() {
        const idx = $(this).data('index');
        cart.splice(idx, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        showCart();
        updateCartCount();
    });
}

function renderConstructor() {
    $('#topping-options').empty();
    $('#additives-options').empty();
    $('#size-options').empty();

    toppings.forEach(t => {
        const option = $(`<div class="option topping-option" data-price="${t.price}" data-name="${t.name}" data-name-en="${t.nameEn}" data-name-pl="${t.namePl}" data-name-de="${t.nameDe}">${getLocalizedName(t, 'name')}</div>`);
        $('#topping-options').append(option);
    });

    additives.forEach(a => {
        const option = $(`<div class="option additive-option" data-price="${a.price}" data-name="${a.name}" data-name-en="${a.nameEn}" data-name-pl="${a.namePl}" data-name-de="${a.nameDe}">${getLocalizedName(a, 'name')}</div>`);
        $('#additives-options').append(option);
    });

    sizes.forEach(s => {
        const option = $(`<div class="option size-option" data-price="${s.price}" data-name="${s.name}" data-name-en="${s.nameEn}" data-name-pl="${s.namePl}" data-name-de="${s.nameDe}">${getLocalizedName(s, 'name')}</div>`);
        $('#size-options').append(option);
    });

    $('.topping-option').click(function() {
        $('.topping-option').removeClass('active');
        $(this).addClass('active');
        currentTopping = {
            name: $(this).data('name'),
            nameEn: $(this).data('name-en'),
            namePl: $(this).data('name-pl'),
            nameDe: $(this).data('name-de'),
            price: parseInt($(this).data('price'))
        };
        calculatePrice();
    });

    $('.size-option').click(function() {
        $('.size-option').removeClass('active');
        $(this).addClass('active');
        currentSize = {
            name: $(this).data('name'),
            nameEn: $(this).data('name-en'),
            namePl: $(this).data('name-pl'),
            nameDe: $(this).data('name-de'),
            price: parseInt($(this).data('price'))
        };
        calculatePrice();
    });

    $('.additive-option').click(function() {
        $(this).toggleClass('active');
        const price = parseInt($(this).data('price'));
        const additive = {
            name: $(this).data('name'),
            nameEn: $(this).data('name-en'),
            namePl: $(this).data('name-pl'),
            nameDe: $(this).data('name-de'),
            price: price
        };
        
        if ($(this).hasClass('active')) {
            currentAdditives.push(additive);
        } else {
            const index = currentAdditives.findIndex(a => a.name === additive.name);
            if (index !== -1) currentAdditives.splice(index, 1);
        }
        calculatePrice();
    });
}

function calculatePrice() {
    let total = 0;
    if (currentSize) total += currentSize.price;
    if (currentTopping) total += currentTopping.price;
    currentAdditives.forEach(a => total += a.price);
    if (total === 0) total = 450;
    $('#constructor-price').text(total);
}

function createWheel() {
    const canvas = document.getElementById('wheelCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const size = 400;
    canvas.width = size;
    canvas.height = size;
    
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 10;
    const angleStep = (Math.PI * 2) / prizes.length;
    
    ctx.clearRect(0, 0, size, size);
    
    for (let i = 0; i < prizes.length; i++) {
        const startAngle = i * angleStep;
        const endAngle = (i + 1) * angleStep;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.fillStyle = prizes[i].color;
        ctx.fill();
        ctx.stroke();
        
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + angleStep / 2);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "white";
        ctx.font = "bold 14px Montserrat";
        const prizeText = prizes[i][`name${currentLang.charAt(0).toUpperCase() + currentLang.slice(1)}`] || prizes[i].name;
        ctx.fillText(prizeText.substring(0, 12), radius / 1.5, 0);
        ctx.restore();
    }
    
    ctx.beginPath();
    ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.stroke();
}

let isSpinning = false;

$('#btn-spin').click(() => {
    if (isSpinning) return;
    isSpinning = true;
    
    const canvas = $('#wheelCanvas');
    const extraSpins = 1440 + Math.random() * 720;
    const final = extraSpins + Math.random() * 360;
    
    canvas.css('transform', `rotate(${final}deg)`);
    
    setTimeout(() => {
        isSpinning = false;
        const angle = final % 360;
        const segmentAngle = 360 / prizes.length;
        const winningIndex = Math.floor((360 - angle) / segmentAngle) % prizes.length;
        const win = prizes[winningIndex];
        const winText = win[`name${currentLang.charAt(0).toUpperCase() + currentLang.slice(1)}`] || win.name;
        $('#roulette-result').html(`<h3 style="color:#4caf50">🎉 ${getTranslation('youWon')}: ${winText}!</h3>`);
        showCustomAlert(`🎉 ${winText}`, 'success');
        
        setTimeout(() => {
            canvas.css('transform', 'rotate(0deg)');
        }, 500);
    }, 4200);
});

function showCustomAlert(message, type = 'success') {
    const alertDiv = $('#custom-alert');
    alertDiv.removeClass('error').addClass(type);
    alertDiv.find('#alert-message').text(message);
    if (type === 'success') {
        alertDiv.find('i').attr('class', 'fas fa-check-circle');
    } else {
        alertDiv.find('i').attr('class', 'fas fa-exclamation-circle');
    }
    
    alertDiv.fadeIn(300);
    
    setTimeout(() => {
        alertDiv.fadeOut(300);
    }, 3000);
}