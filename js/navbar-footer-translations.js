// Navbar and Footer Translations
// This file handles translations for navbar menu items and footer content

// Basic polyfills for older browsers (Edge Legacy / IE)
(function() {
  if (typeof NodeList !== 'undefined' && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
  }
  if (!String.prototype.includes) {
    String.prototype.includes = function(search, start) {
      if (typeof start !== 'number') {
        start = 0;
      }
      if (start + search.length > this.length) {
        return false;
      }
      return this.indexOf(search, start) !== -1;
    };
  }
})();

window.gaosTranslationDebug = true;
function runTranslationStep(stepName, fn) {
  try {
    fn();
  } catch (error) {
    console.error(`❌ Translation step "${stepName}" failed:`, error);
    console.error('👉 Location:', error && error.stack ? error.stack.split('\n')[1] : 'stack unavailable');
    if (window.gaosTranslationDebug) {
      debugger;
    }
  }
}

// Translation dictionary
const translations = {
  navbar: {
    home: {
      hy: 'Գլխավոր',
      en: 'Home',
      ru: 'Главная'
    },
    consultation: {
      hy: 'Խորհրդատվություն',
      en: 'Consultation',
      ru: 'Консультация'
    },
    collection: {
      hy: 'Տեսականի',
      en: 'Collection',
      ru: 'Коллекция'
    },
    about: {
      hy: 'Մեր մասին',
      en: 'About Us',
      ru: 'О нас'
    },
    contact: {
      hy: 'Կապ մեզ հետ',
      en: 'Contact Us',
      ru: 'Связаться с нами'
    }
  },
  footer: {
    contactUs: {
      hy: 'Կապ Մեզ Հետ',
      en: 'Contact Us',
      ru: 'Связаться с нами'
    },
    address: {
      hy: 'ք․ Երևան, Կարապետ Ուլնեցի 58/20Բ',
      en: '58/20B Karapet Ulnetsi str., Yerevan',
      ru: '58/20Б ул. Карапет Улнеци, Ереван'
    },
    showroomHours: {
      hy: 'Ցուցասրահի Ժամեր',
      en: 'Showroom Hours',
      ru: 'Часы работы шоурума'
    },
    quickLinks: {
      hy: 'Արագ Հղումներ',
      en: 'Quick Links',
      ru: 'Быстрые ссылки'
    },
    gallery: {
      hy: 'Պատկերասրահ',
      en: 'Gallery',
      ru: 'Галерея'
    },
    mondaySaturday: {
      hy: 'Երկուշաբթի - Շաբաթ',
      en: 'Monday - Saturday',
      ru: 'Понедельник - Суббота'
    },
    copyright: {
      hy: '2025 GAOS Furniture. Բոլոր իրավունքները պաշտպանված են  |  Կայքը պատրաստված է',
      en: '2025 GAOS Furniture. All rights reserved | Website made by',
      ru: '2025 GAOS Furniture. Все права защищены | Сайт создан'
    },
    touchWebAgency: {
      hy: 'Touch Web Agency',
      en: 'Touch Web Agency',
      ru: 'Touch Web Agency'
    },
    touchWebAgencySuffix: {
      hy: '-ի կողմից',
      en: '',
      ru: ' компанией'
    }
  },
  navbarCategories: {
    new: {
      hy: 'Նորույթներ',
      en: 'New Arrivals',
      ru: 'Новинки'
    },
    chairs: {
      hy: 'Աթոռներ',
      en: 'Chairs',
      ru: 'Стулья'
    },
    barChairs: {
      hy: 'Բարի աթոռներ',
      en: 'Bar Chairs',
      ru: 'Барные стулья'
    },
    sofas: {
      hy: 'Բազմոց-Բազկաթոռ',
      en: 'Sofas & Armchairs',
      ru: 'Диваны'
    },
    tables: {
      hy: 'Սեղաններ',
      en: 'Tables',
      ru: 'Столы'
    },
    outdoor: {
      hy: 'Դրսի կահույք',
      en: 'Outdoor Furniture',
      ru: 'Уличная мебель'
    },
    foodCourt: {
      hy: 'Ֆուդ կորտի կահույք',
      en: 'Food Court Furniture',
      ru: 'Мебель для фудкорта'
    }
  },
  index: {
    welcome: {
      hy: 'Բարի Գալուստ',
      en: 'Welcome to',
      ru: 'Добро пожаловать'
    },
    viewProducts: {
      hy: 'Դիտել Ապրանքները',
      en: 'View Products',
      ru: 'Посмотреть товары'
    },
    welcomeToGAOS: {
      hy: 'GAOS',
      en: 'GAOS',
      ru: 'GAOS'
    },
    welcomeDescription: {
      hy: 'Մենք մասնագիտանում ենք բարձրորակ կահույքի լուծումներ տրամադրելու մեջ հյուրանոցների, ռեստորանների, սրճարանների և հյուրասիրության բիզնեսների համար: Մեր լայն տեսականին ներառում է ճաշասեղանների կահույք, նստատեղերի լուծումներ և առևտրային դասի կտորներ, որոնք նախագծված են ամրության և ոճի համար:',
      en: 'We specialize in providing high-quality furniture solutions for hotels, restaurants, cafes, and hospitality businesses. Our extensive collection includes dining furniture, seating solutions, and commercial-grade pieces designed for durability and style.',
      ru: 'Мы специализируемся на предоставлении высококачественных мебельных решений для отелей, ресторанов, кафе и предприятий гостеприимства. Наш обширный ассортимент включает обеденную мебель, решения для сидения и коммерческие изделия, разработанные для долговечности и стиля.'
    },
    ourStory: {
      hy: 'Մեր Պատմությունը',
      en: 'Our Story',
      ru: 'Наша история'
    },
    discover: {
      hy: 'Բացահայտե՛ք',
      en: 'Discover',
      ru: 'Откройте'
    },
    furnitureSuffix: {
      hy: '-ը',
      en: '',
      ru: ''
    },
    restaurantFurniture: {
      hy: 'Ռեստորանի Կահույք',
      en: 'Restaurant Furniture',
      ru: 'Ресторанная мебель'
    },
    restaurantFurnitureDesc: {
      hy: 'Պրեմիում ճաշասեղաններ, աթոռներ և ռեստորանի նստատեղերի լուծումներ, որոնք նախագծված են հարմարավետության և ամրության համար բարձր երթևեկության միջավայրերում:',
      en: 'Premium dining tables, chairs, and restaurant seating solutions designed for comfort and durability in high-traffic environments.',
      ru: 'Премиальные обеденные столы, стулья и решения для сидения в ресторанах, разработанные для комфорта и долговечности в условиях высокой проходимости.'
    },
    hotelFurniture: {
      hy: 'Հյուրանոցի Կահույք',
      en: 'Hotel Furniture',
      ru: 'Гостиничная мебель'
    },
    hotelFurnitureDesc: {
      hy: 'Նրբագեղ հյուրանոցի կահույք, ներառյալ լոբիի նստատեղեր, հյուրերի սենյակների կահույք և հյուրասիրության լուծումներ պրեմիում հյուրանոցների համար:',
      en: 'Elegant hotel furniture, including lobby seating, guest room furniture, and hospitality solutions for premium hotels.',
      ru: 'Элегантная гостиничная мебель, включая сиденья для лобби, мебель для гостевых номеров и решения для гостеприимства премиальных отелей.'
    },
    cafeFurniture: {
      hy: 'Սրճարանի Կահույք',
      en: 'Cafe Furniture',
      ru: 'Мебель для кафе'
    },
    cafeFurnitureDesc: {
      hy: 'Ոճային սրճարանի կահույք, ներառյալ բարի աթոռներ, սրճի սեղաններ և կազուալ ճաշի լուծումներ, որոնք կատարյալ են սրճարանների և բիստրոների համար:',
      en: 'Stylish cafe furniture, including bar chairs, coffee tables, and casual dining solutions perfect for cafes and bistros.',
      ru: 'Стильная мебель для кафе, включая барные стулья, кофейные столы и решения для непринужденной обеденной зоны, идеально подходящие для кафе и бистро.'
    },
    learnMore: {
      hy: 'Իմանալ Ավելին',
      en: 'Learn More',
      ru: 'Узнать больше'
    },
    ourProducts: {
      hy: 'Մեր Ապրանքները',
      en: 'Our Products',
      ru: 'Наши товары'
    },
    watch: {
      hy: 'Դիտե՛ք',
      en: 'Watch',
      ru: 'Смотрите'
    },
    ourVideo: {
      hy: 'Մեր փոքրիկ հոլովակը',
      en: 'Our Video',
      ru: 'Наше видео'
    },
    subscription: {
      hy: 'Բաժանորդագրություն',
      en: 'Subscription',
      ru: 'Подписка'
    },
    subscriptionSuccess: {
      hy: 'Շնորհակալություն բաժանորդագրվելու համար!',
      en: 'Thank you for subscribing!',
      ru: 'Спасибо за подписку!'
    },
    subscriptionError: {
      hy: 'Սխալ է տեղի ունեցել: Խնդրում ենք փորձել ավելի ուշ:',
      en: 'An error occurred. Please try again later.',
      ru: 'Произошла ошибка. Пожалуйста, попробуйте позже.'
    },
    emailAlreadySubscribed: {
      hy: 'Այս էլ. փոստը արդեն բաժանորդագրված է',
      en: 'This email is already subscribed',
      ru: 'Этот email уже подписан'
    },
    enterEmailAddress: {
      hy: 'Խնդրում ենք մուտքագրել էլ. փոստի հասցեն',
      en: 'Please enter your email address',
      ru: 'Пожалуйста, введите ваш email адрес'
    },
    enterValidEmail: {
      hy: 'Խնդրում ենք մուտքագրել վավեր էլ. փոստի հասցե',
      en: 'Please enter a valid email address',
      ru: 'Пожалуйста, введите действительный email адрес'
    },
    emailMissingAt: {
      hy: 'Խնդրում ենք մուտքագրել վավեր էլ. փոստի հասցե (@ սիմվոլը պարտադիր է)',
      en: 'Please enter a valid email address (@ symbol is required)',
      ru: 'Пожалуйста, введите действительный email адрес (требуется символ @)'
    },
    emailAddress: {
      hy: 'Էլ. Փոստի Հասցե',
      en: 'Email Address',
      ru: 'Адрес электронной почты'
    },
    subscribe: {
      hy: 'Բաժանորդագրվել',
      en: 'Subscribe',
      ru: 'Подписаться'
    }
  },
  consultation: {
    consultationRequest: {
      hy: 'Խորհրդատվության Հարցում',
      en: 'Consultation Request',
      ru: 'Запрос на консультацию'
    },
    fillFormDescription: {
      hy: 'Լրացրեք Ձեր տվյալները և մեր մասնագետը սեղմ ժամկետներում կկապվի Ձեզ հետ',
      en: 'Fill in your details and our specialist will contact you shortly',
      ru: 'Заполните свои данные, и наш специалист свяжется с вами в ближайшее время'
    },
    preferredDate: {
      hy: 'Նախընտրելի Ամսաթիվ',
      en: 'Preferred Date',
      ru: 'Предпочтительная дата'
    },
    preferredTime: {
      hy: 'Նախընտրելի Ժամ',
      en: 'Preferred Time',
      ru: 'Предпочтительное время'
    },
    numberOfGuests: {
      hy: 'Հյուրերի Քանակ',
      en: 'Number of Guests',
      ru: 'Количество гостей'
    },
    projectSize: {
      hy: 'Նախագծի Չափ',
      en: 'Project Size',
      ru: 'Размер проекта'
    },
    projectSizeOptions: {
      small: {
        hy: 'Փոքր (1-10 նստատեղ)',
        en: 'Small (1-10 seats)',
        ru: 'Малый (1-10 мест)'
      },
      medium: {
        hy: 'Միջին (11-25 նստատեղ)',
        en: 'Medium (11-25 seats)',
        ru: 'Средний (11-25 мест)'
      },
      large: {
        hy: 'Մեծ (26-50 նստատեղ)',
        en: 'Large (26-50 seats)',
        ru: 'Большой (26-50 мест)'
      },
      veryLarge: {
        hy: 'Շատ Մեծ (50+ նստատեղ)',
        en: 'Very Large (50+ seats)',
        ru: 'Очень большой (50+ мест)'
      },
      hotelLobby: {
        hy: 'Հյուրանոցի Լոբի',
        en: 'Hotel Lobby',
        ru: 'Гостиничное лобби'
      },
      restaurantChain: {
        hy: 'Ռեստորանների Ցանց',
        en: 'Restaurant Chain',
        ru: 'Сеть ресторанов'
      },
      customProject: {
        hy: 'Անհատական Նախագիծ',
        en: 'Custom Project',
        ru: 'Индивидуальный проект'
      }
    },
    businessName: {
      hy: 'Բիզնեսի Անուն',
      en: 'Business Name',
      ru: 'Название компании'
    },
    businessNamePlaceholder: {
      hy: 'Բիզնեսի Անուն',
      en: 'Business Name',
      ru: 'Название компании'
    },
    phone: {
      hy: 'Հեռախոս',
      en: 'Phone',
      ru: 'Телефон'
    },
    phonePlaceholder: {
      hy: 'Հեռախոսահամար',
      en: 'Phone Number',
      ru: 'Номер телефона'
    },
    email: {
      hy: 'Էլ․ հասցե',
      en: 'Email',
      ru: 'Электронная почта'
    },
    emailPlaceholder: {
      hy: 'Էլ․ հասցե',
      en: 'Email Address',
      ru: 'Адрес электронной почты'
    },
    submitRequest: {
      hy: 'Կատարել հարցում',
      en: 'Submit Request',
      ru: 'Отправить запрос'
    }
  },
  about: {
    ourStory: {
      hy: 'Մեր Պատմությունը',
      en: 'Our Story',
      ru: 'Наша история'
    },
    ourStoryDescription: {
      hy: 'GAOS Furniture-ն ավելի քան երկու տասնամյակ առաջատար դիրք է զբաղեցնում HORECA կահույքի ոլորտում: Մենք մասնագիտանում ենք պրեմիում կահույքի լուծումների ստեղծման մեջ հյուրանոցների, ռեստորանների, սրճարանների և հյուրասիրության բիզնեսների համար: Մեր նվիրվածությունը որակին, ամրությանը և նորարարական դիզայնին դարձրել է մեզ վստահելի գործընկեր համաշխարհային բիզնեսների համար: Նրբագեղ ճաշասեղաններից մինչև հարմարավետ նստատեղերի լուծումներ՝ մենք հասկանում ենք հյուրասիրության ոլորտի յուրահատուկ կարիքները և տրամադրում ենք արտադրանք, որը բարձրացնում է ինչպես գործառնականությունը, այնպես էլ գեղագիտությունը:',
      en: 'GAOS Furniture has been a leading position in the HORECA furniture sector for more than two decades. We specialize in creating premium furniture solutions for hotels, restaurants, cafes, and hospitality businesses. Our commitment to quality, durability, and innovative design has made us a trusted partner for global businesses. From elegant dining tables to comfortable seating solutions, we understand the unique needs of the hospitality industry and provide products that enhance both functionality and aesthetics.',
      ru: 'GAOS Furniture занимает ведущую позицию в секторе HORECA мебели более двух десятилетий. Мы специализируемся на создании премиальных мебельных решений для отелей, ресторанов, кафе и предприятий гостеприимства. Наша приверженность качеству, долговечности и инновационному дизайну сделала нас надежным партнером для глобального бизнеса. От элегантных обеденных столов до комфортных решений для сидения, мы понимаем уникальные потребности индустрии гостеприимства и предоставляем продукты, которые улучшают как функциональность, так и эстетику.'
    },
    discover: {
      hy: 'Բացահայտեք',
      en: 'Discover',
      ru: 'Откройте'
    },
    watch: {
      hy: 'Դիտե՛ք',
      en: 'Watch',
      ru: 'Смотрите'
    },
    ourVideo: {
      hy: 'Մեր փոքրիկ հոլովակը',
      en: 'Our Video',
      ru: 'Наше видео'
    },
    ourShowroom: {
      hy: 'Մեր Ցուցասրահը',
      en: 'Our Showroom',
      ru: 'Наш шоурум'
    },
    premium: {
      hy: 'Պրեմիում',
      en: 'Premium',
      ru: 'Премиум'
    },
    materials: {
      hy: 'ՆՅՈՒԹԵՐ',
      en: 'Materials',
      ru: 'Материалы'
    },
    materialsDescription: {
      hy: 'Մենք օգտագործում ենք միայն լավագույն նյութերը մեր կահույքի արտադրության մեջ: Մասիվ փայտից մինչև պրեմիում մետաղներ և բարձրորակ գործվածքներ, յուրաքանչյուր կտոր ստեղծված է դիմանալու առևտրային օգտագործման պահանջներին՝ միաժամանակ պահպանելով իր գեղեցկությունը և հարմարավետությունը:',
      en: 'We use only the finest materials in our furniture production. From solid wood to premium metals and high-quality fabrics, each piece is crafted to withstand the demands of commercial use while maintaining its beauty and comfort.',
      ru: 'Мы используем только лучшие материалы в производстве нашей мебели. От массивной древесины до премиальных металлов и высококачественных тканей, каждая деталь создана, чтобы выдерживать требования коммерческого использования, сохраняя при этом свою красоту и комфорт.'
    },
    custom: {
      hy: 'Անհատական',
      en: 'Custom',
      ru: 'Индивидуальный'
    },
    solutions: {
      hy: 'Լուծումներ',
      en: 'Solutions',
      ru: 'Решения'
    },
    customSolutionsDescription: {
      hy: 'Յուրաքանչյուր հյուրասիրության բիզնես յուրահատուկ է, ինչպես և նրանց կահույքի կարիքները: Մեր դիզայներական թիմը սերտորեն համագործակցում է հաճախորդների հետ՝ ստեղծելու անհատական լուծումներ, որոնք կատարյալ համապատասխանում են նրանց տեսլականին, տարածքի պահանջներին և բրենդի ինքնությանը:',
      en: 'Every hospitality business is unique, as are their furniture needs. Our design team works closely with clients to create custom solutions that perfectly match their vision, space requirements, and brand identity.',
      ru: 'Каждый бизнес в сфере гостеприимства уникален, как и их потребности в мебели. Наша команда дизайнеров тесно сотрудничает с клиентами для создания индивидуальных решений, которые идеально соответствуют их видению, требованиям пространства и идентичности бренда.'
    },
    ourPartners: {
      hy: 'Մեր Գործընկերները',
      en: 'Our Partners',
      ru: 'Наши партнеры'
    },
    trustedPartners: {
      hy: 'Վստահելի Գործընկերներ',
      en: 'Trusted Partners',
      ru: 'Надежные партнеры'
    },
    partnersSubtitle: {
      hy: 'Մեզ վստահում են մի շարք առաջատար սննդի և հյուրանոցային օբյեկտներ',
      en: 'Trusted by leading food and hospitality establishments',
      ru: 'Нам доверяют ведущие предприятия общественного питания и гостиничного бизнеса'
    }
  },
  contact: {
    sendUsMessage: {
      hy: 'Ուղարկեք Մեզ Հաղորդագրություն',
      en: 'Send Us a Message',
      ru: 'Отправить нам сообщение'
    },
    name: {
      hy: 'Անուն',
      en: 'Name',
      ru: 'Имя'
    },
    namePlaceholder: {
      hy: 'Անուն',
      en: 'Name',
      ru: 'Имя'
    },
    email: {
      hy: 'Էլ․ հասցե',
      en: 'Email',
      ru: 'Электронная почта'
    },
    emailPlaceholder: {
      hy: 'Էլ․ հասցե',
      en: 'Email Address',
      ru: 'Адрес электронной почты'
    },
    phone: {
      hy: 'Հեռախոս',
      en: 'Phone',
      ru: 'Телефон'
    },
    phonePlaceholder: {
      hy: 'Հեռախոս',
      en: 'Phone Number',
      ru: 'Номер телефона'
    },
    message: {
      hy: 'Հաղորդագրություն',
      en: 'Message',
      ru: 'Сообщение'
    },
    messagePlaceholder: {
      hy: 'Հաղորդագրություն',
      en: 'Message',
      ru: 'Сообщение'
    },
    send: {
      hy: 'Ուղարկել',
      en: 'Send',
      ru: 'Отправить'
    },
    address: {
      hy: 'Հասցե',
      en: 'Address',
      ru: 'Адрес'
    },
    callUs: {
      hy: 'Զանգահարել Մեզ',
      en: 'Call Us',
      ru: 'Позвоните нам'
    },
    showroomHours: {
      hy: 'Ցուցասրահի Ժամեր',
      en: 'Showroom Hours',
      ru: 'Часы работы шоурума'
    }
  }
};

function setElementLanguage(element, lang) {
  if (!element) return;
  element.setAttribute('lang', lang);
  element.classList.remove('armenian-text', 'english-text');
  if (lang === 'hy') {
    element.classList.add('armenian-text');
  } else if (lang === 'en') {
    element.classList.add('english-text');
  }
}

// Get current language
function getCurrentLanguage() {
  return localStorage.getItem('selectedLanguage') || 'hy';
}

// Update elements with data-text attributes (for page-specific text variables)
function updatePageTexts() {
  const lang = getCurrentLanguage();
  const textElements = document.querySelectorAll('[data-text]');
  
  textElements.forEach(element => {
    const varName = element.getAttribute('data-text');
    
    // Check if the variable exists in window scope (from index-texts.js, about-texts.js, etc.)
    if (window[varName] && window[varName][lang]) {
      element.textContent = window[varName][lang];
      setElementLanguage(element, lang);
    } else {
      console.warn(`⚠️ Text variable "${varName}" not found or missing translation for language "${lang}"`);
    }
  });
}

// Update navbar menu items
function updateNavbarMenu() {
  const lang = getCurrentLanguage();
  
  // Main menu items - update by checking text content to handle all cases
  const menuLinks = document.querySelectorAll('.main_menu a');
  menuLinks.forEach(link => {
    const href = link.getAttribute('href') || '';
    const currentText = link.textContent.trim();
    
    // Check if this is consultation link
    if (href.includes('reservation.html') || currentText.includes('Խորհրդատվություն') || currentText.includes('Consultation') || currentText.includes('Консультация')) {
      if (translations.navbar.consultation[lang]) {
        link.textContent = translations.navbar.consultation[lang];
        link.setAttribute('lang', lang);
      }
    }
    // Check if this is home link
    else if (href.includes('index.html') && !href.includes('#')) {
      if (translations.navbar.home[lang]) {
        link.textContent = translations.navbar.home[lang];
        link.setAttribute('lang', lang);
      }
    }
    // Check if this is collection link
    else if (href.includes('collection.html')) {
      if (translations.navbar.collection[lang]) {
        link.textContent = translations.navbar.collection[lang];
        link.setAttribute('lang', lang);
      }
    }
    // Check if this is about link
    else if (href.includes('about.html')) {
      if (translations.navbar.about[lang]) {
        link.textContent = translations.navbar.about[lang];
        link.setAttribute('lang', lang);
      }
    }
    // Check if this is contact link
    else if (href.includes('contact.html')) {
      if (translations.navbar.contact[lang]) {
        link.textContent = translations.navbar.contact[lang];
        link.setAttribute('lang', lang);
      }
    }
  });
  
  // Sidebar menu items
  const sidebarItems = [
    { selector: 'a[href="index.html"].txt19', key: 'home' },
    { selector: 'a[href="reservation.html"].txt19', key: 'consultation' },
    { selector: 'a[href="collection.html"].txt19', key: 'collection' },
    { selector: 'a[href="about.html"].txt19', key: 'about' },
    { selector: 'a[href="contact.html"].txt19', key: 'contact' },
    { selector: 'a[href="reservation.html"].btn3', key: 'consultation' }
  ];
  
  // Also update sidebar consultation button text directly by checking content
  const sidebarConsultationBtn = document.querySelector('.menu-sidebar a.btn3');
  if (sidebarConsultationBtn && (sidebarConsultationBtn.textContent.includes('Խորհրդատվություն') || sidebarConsultationBtn.textContent.includes('Consultation') || sidebarConsultationBtn.textContent.includes('Консультация'))) {
    if (translations.navbar.consultation[lang]) {
      sidebarConsultationBtn.textContent = translations.navbar.consultation[lang];
      sidebarConsultationBtn.setAttribute('lang', lang);
    }
  }
  
  sidebarItems.forEach(item => {
    const elements = document.querySelectorAll(`.menu-sidebar ${item.selector}`);
    elements.forEach(el => {
      if (translations.navbar[item.key] && translations.navbar[item.key][lang]) {
        el.textContent = translations.navbar[item.key][lang];
        el.setAttribute('lang', lang);
      }
    });
  });
  
  // Sidebar gallery title
  const sidebarGalleryTitle = document.querySelector('.gallery-sidebar h4.txt20');
  if (sidebarGalleryTitle && translations.footer.gallery[lang]) {
    sidebarGalleryTitle.textContent = translations.footer.gallery[lang];
    sidebarGalleryTitle.setAttribute('lang', lang);
  }
}

// Update navbar category filters
function updateNavbarCategories() {
  const lang = getCurrentLanguage();
  
  const categoryMap = {
    '.new': 'new',
    '.chairs': 'chairs',
    '.bar-chairs': 'barChairs',
    '.sofas': 'sofas',
    '.tables': 'tables',
    '.outdoor': 'outdoor',
    '.food-court': 'foodCourt'
  };
  
  Object.keys(categoryMap).forEach(selector => {
    const elements = document.querySelectorAll(`.navbar-filter-btn[data-filter="${selector}"]`);
    const key = categoryMap[selector];
    elements.forEach(el => {
      if (translations.navbarCategories[key] && translations.navbarCategories[key][lang]) {
        el.textContent = translations.navbarCategories[key][lang];
        setElementLanguage(el, lang);
      }
    });
  });
}

// Update footer content
function updateFooter() {
  const lang = getCurrentLanguage();
  
  // Contact Us heading
  const contactHeading = document.querySelector('footer .txt13.m-b-33');
  if (contactHeading && !contactHeading.classList.contains('m-b-32') && !contactHeading.classList.contains('m-b-38')) {
    if (translations.footer.contactUs[lang]) {
      contactHeading.textContent = translations.footer.contactUs[lang];
      setElementLanguage(contactHeading, lang);
    }
  }
  
  // Address text
  const addressElements = document.querySelectorAll('footer .txt14.m-b-14');
  addressElements.forEach(el => {
    const text = el.textContent.trim();
    // Check if this is the address line (contains Երևան, Yerevan, or Ереван)
    if (text.includes('Երևան') || text.includes('Yerevan') || text.includes('Ереван') || text.includes('Կարապետ') || text.includes('Karapet') || text.includes('Карапет')) {
      if (translations.footer.address[lang]) {
        // Preserve the icon if it exists
        const icon = el.querySelector('i');
        if (icon) {
          el.innerHTML = icon.outerHTML + ' ' + translations.footer.address[lang];
        } else {
          el.textContent = translations.footer.address[lang];
        }
        setElementLanguage(el, lang);
      }
    }
  });
  
  // Showroom Hours heading
  const hoursHeadings = document.querySelectorAll('footer .txt13.m-b-32');
  hoursHeadings.forEach(heading => {
    if (heading.textContent.includes('Ցուցասրահ') || heading.textContent.includes('Showroom') || heading.textContent.includes('шоурум')) {
      if (translations.footer.showroomHours[lang]) {
        heading.textContent = translations.footer.showroomHours[lang];
        setElementLanguage(heading, lang);
      }
    }
  });
  
  // Monday - Saturday text
  const mondaySaturday = document.querySelectorAll('footer .txt14');
  mondaySaturday.forEach(el => {
    if (el.textContent.includes('Երկուշաբթի') || el.textContent.includes('Monday') || el.textContent.includes('Понедельник')) {
      if (translations.footer.mondaySaturday[lang]) {
        el.textContent = translations.footer.mondaySaturday[lang];
        setElementLanguage(el, lang);
      }
    }
  });
  
  // Quick Links heading
  const quickLinksHeadings = document.querySelectorAll('footer .txt13.m-b-33[lang="hy"]');
  quickLinksHeadings.forEach(heading => {
    if (heading.textContent.includes('Արագ') || heading.textContent.includes('Quick') || heading.textContent.includes('Быстрые')) {
      if (translations.footer.quickLinks[lang]) {
        heading.textContent = translations.footer.quickLinks[lang];
        setElementLanguage(heading, lang);
      }
    }
  });
  
  // Footer links - update by checking text content first to handle all cases
  const footerLinkElements = document.querySelectorAll('footer .footer-links a');
  footerLinkElements.forEach(link => {
    const href = link.getAttribute('href') || '';
    const currentText = link.textContent.trim();
    
    // Check if this is consultation link - check text first (most reliable)
    if (currentText.includes('Խորհրդատվություն') || currentText.includes('Consultation') || currentText.includes('Консультация')) {
      if (translations.navbar.consultation[lang]) {
        link.textContent = translations.navbar.consultation[lang];
        setElementLanguage(link, lang);
      }
    }
    // Check if this is consultation link by href
    else if (href.includes('reservation.html')) {
      if (translations.navbar.consultation[lang]) {
        link.textContent = translations.navbar.consultation[lang];
        setElementLanguage(link, lang);
      }
    }
    // Check if this is home link - check text content
    else if (currentText.includes('Գլխավոր') || currentText.includes('Home') || currentText.includes('Главная')) {
      if (translations.navbar.home[lang]) {
        link.textContent = translations.navbar.home[lang];
        setElementLanguage(link, lang);
      }
    }
    // Check if this is home link by href (only if text doesn't match consultation)
    else if (href.includes('index.html')) {
      if (translations.navbar.home[lang]) {
        link.textContent = translations.navbar.home[lang];
        setElementLanguage(link, lang);
      }
    }
    // Check if this is collection link
    else if (href.includes('collection.html') || currentText.includes('Տեսականի') || currentText.includes('Collection') || currentText.includes('Коллекция')) {
      if (translations.navbar.collection[lang]) {
        link.textContent = translations.navbar.collection[lang];
        setElementLanguage(link, lang);
      }
    }
    // Check if this is about link
    else if (href.includes('about.html') || currentText.includes('Մեր մասին') || currentText.includes('About Us') || currentText.includes('О нас')) {
      if (translations.navbar.about[lang]) {
        link.textContent = translations.navbar.about[lang];
        setElementLanguage(link, lang);
      }
    }
    // Check if this is contact link
    else if (href.includes('contact.html') || currentText.includes('Կապ մեզ հետ') || currentText.includes('Contact Us') || currentText.includes('Связаться с нами')) {
      if (translations.navbar.contact[lang]) {
        link.textContent = translations.navbar.contact[lang];
        setElementLanguage(link, lang);
      }
    }
  });
  
  // Gallery heading
  const galleryHeadings = document.querySelectorAll('footer .txt13.m-b-38');
  galleryHeadings.forEach(heading => {
    if (heading.textContent.includes('Պատկերասրահ') || heading.textContent.includes('Gallery') || heading.textContent.includes('Галерея')) {
      if (translations.footer.gallery[lang]) {
        heading.textContent = translations.footer.gallery[lang];
        setElementLanguage(heading, lang);
      }
    }
  });
  
  // Copyright text
  const copyrightText = document.querySelector('.end-footer .txt17');
  if (copyrightText) {
    const currentText = copyrightText.textContent;
    if (currentText.includes('2024 GAOS Furniture')) {
      if (translations.footer.copyright[lang] && translations.footer.touchWebAgency[lang]) {
        // Build the copyright text with proper formatting
        let copyrightHTML = translations.footer.copyright[lang];
        
        // Add Touch Web Agency link with appropriate suffix
        // For Russian: "компанией" comes before the link, for Armenian: suffix comes after
        if (lang === 'ru') {
          copyrightHTML += ' ' + translations.footer.touchWebAgencySuffix[lang] + ' <a href="https://touchweb.am" target="_blank">' + translations.footer.touchWebAgency[lang] + '</a>';
        } else {
          const suffix = translations.footer.touchWebAgencySuffix[lang] || '';
          copyrightHTML += ' <a href="https://touchweb.am" target="_blank">' + translations.footer.touchWebAgency[lang] + '</a>' + suffix;
        }
        
        copyrightText.innerHTML = copyrightHTML;
        setElementLanguage(copyrightText, lang);
      }
    }
  }
}

// Update subscription forms (available on multiple pages)
function updateSubscriptionForms() {
  const lang = getCurrentLanguage();
  
  // Subscription text - update all subscription forms
  const subscriptionTexts = document.querySelectorAll('.section-signup .txt5');
  subscriptionTexts.forEach(subscriptionText => {
    if (subscriptionText && translations.index.subscription[lang]) {
      subscriptionText.textContent = translations.index.subscription[lang];
      setElementLanguage(subscriptionText, lang);
    }
  });
  
  // Email placeholder - update all subscription forms
  const emailInputs = document.querySelectorAll('.section-signup input[name="email-address"], .section-signup input[type="text"]');
  emailInputs.forEach(emailInput => {
    if (emailInput && translations.index.emailAddress[lang]) {
      emailInput.placeholder = translations.index.emailAddress[lang];
      setElementLanguage(emailInput, lang);
    }
  });
  
  // Subscribe button - update all subscription forms
  const subscribeButtons = document.querySelectorAll('.section-signup button[type="submit"]');
  subscribeButtons.forEach(subscribeButton => {
    if (subscribeButton && translations.index.subscribe[lang]) {
      subscribeButton.textContent = translations.index.subscribe[lang];
      setElementLanguage(subscribeButton, lang);
    }
  });
}

// Update index page content
function updateIndexPage() {
  const lang = getCurrentLanguage();
  
  // Only update if we're on index page
  const pathname = window.location.pathname;
  if (!pathname.includes('index.html') && pathname !== '/' && !pathname.endsWith('/')) {
    return;
  }
  
  // Slide captions - combine Welcome and GAOS Furniture for Russian
  const slideCaptions = document.querySelectorAll('.caption1-slide1');
  slideCaptions.forEach((caption, index) => {
    const text = caption.textContent.trim();
    if (text.includes('Բարի Գալուստ') || text.includes('Welcome') || text.includes('Добро пожаловать')) {
      // For Russian, combine "Добро пожаловать в GAOS" in one caption with different font for GAOS
      if (lang === 'ru') {
        caption.innerHTML = 'Добро пожаловать в <br/><span class="english-text" style="font-size: 1.5em; font-weight: bold;">GAOS</span>';
        caption.setAttribute('lang', lang);
        // Hide the GAOS Furniture caption for Russian
        const gaosCaption = caption.parentElement.querySelector('.caption2-slide1');
        if (gaosCaption) {
          gaosCaption.style.display = 'none';
        }
      } else {
        // For other languages, just translate "Welcome"
        if (translations.index.welcome[lang]) {
          caption.textContent = translations.index.welcome[lang];
          caption.setAttribute('lang', lang);
        }
        // Show the GAOS Furniture caption for other languages
        const gaosCaption = caption.parentElement.querySelector('.caption2-slide1');
        if (gaosCaption) {
          gaosCaption.style.display = '';
        }
      }
    }
  });
  
  // Slide buttons
  const slideButtons = document.querySelectorAll('.wrap-btn-slide1 a.btn1');
  slideButtons.forEach(btn => {
    const text = btn.textContent.trim();
    if (text.includes('Դիտել Ապրանքները') || text.includes('View Products') || text.includes('Посмотреть товары')) {
      if (translations.index.viewProducts[lang]) {
        btn.textContent = translations.index.viewProducts[lang];
        setElementLanguage(btn, lang);
      }
    }
  });
  
  // Welcome section title
  const premiumTitle = document.querySelector('.section-welcome .tit2');
  if (premiumTitle && (premiumTitle.textContent.includes('Պրեմիում') || premiumTitle.textContent.includes('Premium') || premiumTitle.textContent.includes('Премиальная'))) {
    if (translations.index.premiumHorecaFurniture[lang]) {
      premiumTitle.textContent = translations.index.premiumHorecaFurniture[lang];
      setElementLanguage(premiumTitle, lang);
    }
  }
  
  // Welcome heading
  const welcomeHeading = document.querySelector('.section-welcome .tit3');
  if (welcomeHeading) {
    const currentText = welcomeHeading.textContent.trim();
    // Check if it matches any language version or contains GAOS
    if (currentText.includes('Բարի Գալուստ GAOS') || 
        currentText.includes('Welcome to GAOS') || 
        currentText.includes('Добро пожаловать') ||
        currentText.includes('GAOS')) {
      if (translations.index.welcomeToGAOS[lang]) {
        welcomeHeading.textContent = translations.index.welcomeToGAOS[lang];
        setElementLanguage(welcomeHeading, lang);
      }
    }
  }
  
  // Welcome description
  const welcomeDesc = document.querySelector('.section-welcome .size3');
  if (welcomeDesc && (welcomeDesc.textContent.includes('Մենք մասնագիտանում') || welcomeDesc.textContent.includes('We specialize') || welcomeDesc.textContent.includes('Мы специализируемся'))) {
    if (translations.index.welcomeDescription[lang]) {
      welcomeDesc.textContent = translations.index.welcomeDescription[lang];
      setElementLanguage(welcomeDesc, lang);
    }
  }
  
  // Our Story link
  const ourStoryLink = document.querySelector('.section-welcome .txt4');
  if (ourStoryLink && (ourStoryLink.textContent.includes('Մեր Պատմությունը') || ourStoryLink.textContent.includes('Our Story') || ourStoryLink.textContent.includes('Наша история'))) {
    if (translations.index.ourStory[lang]) {
      ourStoryLink.innerHTML = translations.index.ourStory[lang] + ' <i class="fa fa-long-arrow-right m-l-10" aria-hidden="true"></i>';
      setElementLanguage(ourStoryLink, lang);
    }
  }
  
  // Discover text
  const discoverText = document.querySelector('.section-intro .header-intro .tit2');
  if (discoverText && (discoverText.textContent.includes('Բացահայտե՛ք') || discoverText.textContent.includes('Discover') || discoverText.textContent.includes('Откройте'))) {
    if (translations.index.discover[lang]) {
      discoverText.textContent = translations.index.discover[lang];
      discoverText.setAttribute('lang', lang);
    }
  }
  
  // GAOS Furniture suffix
  const furnitureSuffix = document.querySelector('.intro-suffix');
  if (furnitureSuffix) {
    if (lang === 'hy') {
      furnitureSuffix.textContent = translations.index.furnitureSuffix[lang];
      furnitureSuffix.style.display = 'inline';
    } else {
      furnitureSuffix.style.display = 'none';
    }
  }
  
  // Restaurant/Hotel/Cafe Furniture headings
  const furnitureHeadings = document.querySelectorAll('.blo1 h4.txt5');
  furnitureHeadings.forEach(el => {
    // If this element is controlled by data-text (index-texts.js), skip
    if (el.hasAttribute('data-text')) {
      return;
    }
    const text = el.textContent.trim();
    if (text.includes('Ռեստորանի Կահույք') || text.includes('Restaurant Furniture') || text.includes('Ресторанная мебель')) {
      if (translations.index.restaurantFurniture[lang]) {
        el.textContent = translations.index.restaurantFurniture[lang];
        setElementLanguage(el, lang);
      }
    } else if (text.includes('Հյուրանոցի Կահույք') || text.includes('Hotel Furniture') || text.includes('Гостиничная мебель')) {
      if (translations.index.hotelFurniture[lang]) {
        el.textContent = translations.index.hotelFurniture[lang];
        setElementLanguage(el, lang);
      }
    } else if (text.includes('Սրճարանի Կահույք') || text.includes('Cafe Furniture') || text.includes('Мебель для кафе')) {
      if (translations.index.cafeFurniture[lang]) {
        el.textContent = translations.index.cafeFurniture[lang];
        setElementLanguage(el, lang);
      }
    }
  });
  
  // Furniture descriptions
  const furnitureDescs = document.querySelectorAll('.blo1 p.m-b-20');
  furnitureDescs.forEach(p => {
    // If this element is controlled by data-text (index-texts.js), skip
    if (p.hasAttribute('data-text')) {
      return;
    }
    const text = p.textContent.trim();
    if (text.includes('Պրեմիում ճաշասեղաններ') || text.includes('Premium dining tables') || text.includes('Премиальные обеденные столы')) {
      if (translations.index.restaurantFurnitureDesc[lang]) {
        p.textContent = translations.index.restaurantFurnitureDesc[lang];
        setElementLanguage(p, lang);
      }
    } else if (text.includes('Նրբագեղ հյուրանոցի') || text.includes('Elegant hotel') || text.includes('Элегантная гостиничная')) {
      if (translations.index.hotelFurnitureDesc[lang]) {
        p.textContent = translations.index.hotelFurnitureDesc[lang];
        setElementLanguage(p, lang);
      }
    } else if (text.includes('Ոճային սրճարանի') || text.includes('Stylish cafe') || text.includes('Стильная мебель для кафе')) {
      if (translations.index.cafeFurnitureDesc[lang]) {
        p.textContent = translations.index.cafeFurnitureDesc[lang];
        setElementLanguage(p, lang);
      }
    }
  });
  
  // Learn More links
  const learnMoreLinks = document.querySelectorAll('.blo1 .txt4');
  learnMoreLinks.forEach(link => {
    const text = link.textContent.trim();
    if (text.includes('Իմանալ Ավելին') || text.includes('Learn More') || text.includes('Узнать больше')) {
      if (translations.index.learnMore[lang]) {
        link.innerHTML = translations.index.learnMore[lang] + ' <i class="fa fa-long-arrow-right m-l-10" aria-hidden="true"></i>';
        setElementLanguage(link, lang);
      }
    }
  });
  
  // Partners section heading (index page)
  const partnersHeading = document.querySelector('.section-partners h3.tit3');
  if (partnersHeading) {
    const headingText = partnersHeading.textContent.trim();
    if (headingText.includes('Մեր գործընկերները') || headingText.includes('Our Partners') || headingText.includes('Наши партнеры')) {
      if (translations.about.ourPartners[lang]) {
        partnersHeading.textContent = translations.about.ourPartners[lang];
        partnersHeading.setAttribute('lang', lang);
      }
    }
  }

  // Partners section subtitle (index page)
  const partnersSubtitle = document.querySelector('.section-partners .partners-subtitle');
  if (partnersSubtitle) {
    if (translations.about.partnersSubtitle[lang]) {
      partnersSubtitle.textContent = translations.about.partnersSubtitle[lang];
      partnersSubtitle.setAttribute('lang', lang);
    }
  }

  // Our Products heading
  const ourProductsHeading = document.querySelector('.title-section-ourmenu .tit5');
  if (ourProductsHeading && (ourProductsHeading.textContent.includes('Մեր Ապրանքները') || ourProductsHeading.textContent.includes('Our Products') || ourProductsHeading.textContent.includes('Наши товары'))) {
    if (translations.index.ourProducts[lang]) {
      ourProductsHeading.textContent = translations.index.ourProducts[lang];
      setElementLanguage(ourProductsHeading, lang);
    }
  }
  
  // Product category grid items (buttons that link to collection.html#category)
  const categoryButtons = document.querySelectorAll('.item-ourmenu a.btn2');
  categoryButtons.forEach(btn => {
    const href = btn.getAttribute('href') || '';
    const text = btn.textContent.trim();
    
    // Check by text content first
    if (text.includes('Աթոռներ') || text.includes('Chairs') || text.includes('Стулья')) {
      if (href.includes('#chairs') && translations.navbarCategories.chairs[lang]) {
        btn.textContent = translations.navbarCategories.chairs[lang];
        setElementLanguage(btn, lang);
      }
    } else if (text.includes('Բարի աթոռներ') || text.includes('Bar Chairs') || text.includes('Барные стулья')) {
      if (href.includes('#bar-chairs') && translations.navbarCategories.barChairs[lang]) {
        btn.textContent = translations.navbarCategories.barChairs[lang];
        setElementLanguage(btn, lang);
      }
    } else if (text.includes('Բազմոց-Բազկաթոռ') || text.includes('Sofas') || text.includes('Диваны')) {
      if (href.includes('#sofas') && translations.navbarCategories.sofas[lang]) {
        btn.textContent = translations.navbarCategories.sofas[lang];
        setElementLanguage(btn, lang);
      }
    } else if (text.includes('Սեղաններ') || text.includes('Tables') || text.includes('Столы')) {
      if (href.includes('#tables') && translations.navbarCategories.tables[lang]) {
        btn.textContent = translations.navbarCategories.tables[lang];
        setElementLanguage(btn, lang);
      }
    } else if (text.includes('Դրսի կահույք') || text.includes('Outdoor') || text.includes('Уличная мебель')) {
      if (href.includes('#outdoor') && translations.navbarCategories.outdoor[lang]) {
        btn.textContent = translations.navbarCategories.outdoor[lang];
        setElementLanguage(btn, lang);
      }
    } else if (text.includes('Ֆուդ կորտի կահույք') || text.includes('Food Court') || text.includes('Мебель для фудкорта')) {
      if (href.includes('#food-court') && translations.navbarCategories.foodCourt[lang]) {
        btn.textContent = translations.navbarCategories.foodCourt[lang];
        setElementLanguage(btn, lang);
      }
    }
  });
  
  // Watch text
  const watchText = document.querySelector('.section-video .tit2');
  if (watchText && (watchText.textContent.includes('Դիտե՛ք') || watchText.textContent.includes('Watch') || watchText.textContent.includes('Смотрите'))) {
    if (translations.index.watch[lang]) {
      watchText.textContent = translations.index.watch[lang];
      setElementLanguage(watchText, lang);
    }
  }
  
  // Our Video heading
  const ourVideoHeading = document.querySelector('.section-video .tit4');
  if (ourVideoHeading && (ourVideoHeading.textContent.includes('Մեր փոքրիկ հոլովակը') || ourVideoHeading.textContent.includes('Our Video') || ourVideoHeading.textContent.includes('Наше видео'))) {
    if (translations.index.ourVideo[lang]) {
      ourVideoHeading.textContent = translations.index.ourVideo[lang];
      setElementLanguage(ourVideoHeading, lang);
    }
  }
  
  // Subscription forms (also called separately for all pages)
  updateSubscriptionForms();
}

// Update consultation/reservation page
function updateConsultationPage() {
  const lang = getCurrentLanguage();
  
  // Check if we're on reservation page - check both pathname and href
  const pathname = window.location.pathname;
  const href = window.location.href;
  const isReservationPage = pathname.includes('reservation.html') || href.includes('reservation.html') || 
                           document.querySelector('.section-booking') !== null;
  
  if (!isReservationPage) {
    return;
  }
  
  console.log('🌐 Translating consultation page for language:', lang);
  
  // Consultation Request heading - DIRECT UPDATE
  const consultationHeading = document.querySelector('.section-booking h3.tit3');
  if (consultationHeading && translations.consultation.consultationRequest[lang]) {
    consultationHeading.textContent = translations.consultation.consultationRequest[lang];
    setElementLanguage(consultationHeading, lang);
  }
  
  // Description text - DIRECT UPDATE
  const descriptionText = document.querySelector('.section-booking p.txt14');
  if (descriptionText && translations.consultation.fillFormDescription[lang]) {
    descriptionText.textContent = translations.consultation.fillFormDescription[lang];
    setElementLanguage(descriptionText, lang);
  }
  
  // Form labels - DIRECT UPDATE by position (order matters!)
  const formLabels = document.querySelectorAll('.section-booking span.txt9, .wrap-form-booking span.txt9');
  
  // Update by position since we know the order: Date, Time, Project Size, Business Name, Phone, Email
  if (formLabels.length >= 6) {
    if (translations.consultation.preferredDate[lang]) {
      formLabels[0].textContent = translations.consultation.preferredDate[lang];
      setElementLanguage(formLabels[0], lang);
    }
    if (translations.consultation.preferredTime[lang]) {
      formLabels[1].textContent = translations.consultation.preferredTime[lang];
      setElementLanguage(formLabels[1], lang);
    }
    if (translations.consultation.projectSize[lang]) {
      formLabels[2].textContent = translations.consultation.projectSize[lang];
      setElementLanguage(formLabels[2], lang);
    }
    if (translations.consultation.businessName[lang]) {
      formLabels[3].textContent = translations.consultation.businessName[lang];
      setElementLanguage(formLabels[3], lang);
    }
    if (translations.consultation.phone[lang]) {
      formLabels[4].textContent = translations.consultation.phone[lang];
      setElementLanguage(formLabels[4], lang);
    }
    if (translations.consultation.email[lang]) {
      formLabels[5].textContent = translations.consultation.email[lang];
      setElementLanguage(formLabels[5], lang);
    }
  } else {
    // Fallback: match by text content
    formLabels.forEach((label) => {
      const text = label.textContent.trim();
      if (text === 'Նախընտրելի Ամսաթիվ' || text === 'Preferred Date' || text === 'Предпочтительная дата') {
        label.textContent = translations.consultation.preferredDate[lang];
        setElementLanguage(label, lang);
      } else if (text === 'Նախընտրելի Ժամ' || text === 'Preferred Time' || text === 'Предпочтительное время') {
        label.textContent = translations.consultation.preferredTime[lang];
        setElementLanguage(label, lang);
      } else if (text === 'Նախագծի Չափ' || text === 'Project Size' || text === 'Размер проекта') {
        label.textContent = translations.consultation.projectSize[lang];
        setElementLanguage(label, lang);
      } else if (text === 'Բիզնեսի Անուն' || text === 'Business Name' || text === 'Название компании') {
        label.textContent = translations.consultation.businessName[lang];
        setElementLanguage(label, lang);
      } else if (text === 'Հեռախոս' || text === 'Phone' || text === 'Телефон') {
        label.textContent = translations.consultation.phone[lang];
        setElementLanguage(label, lang);
      } else if (text === 'Էլ․ հասցե' || text === 'Email' || text === 'Электронная почта') {
        label.textContent = translations.consultation.email[lang];
        setElementLanguage(label, lang);
      }
    });
  }
  
  // Form placeholders - DIRECT UPDATE
  const businessNameInput = document.querySelector('.section-booking input[name="name"]');
  if (businessNameInput && translations.consultation.businessNamePlaceholder[lang]) {
    businessNameInput.placeholder = translations.consultation.businessNamePlaceholder[lang];
  }
  
  const phoneInput = document.querySelector('.section-booking input[name="phone"]');
  if (phoneInput && translations.consultation.phonePlaceholder[lang]) {
    phoneInput.placeholder = translations.consultation.phonePlaceholder[lang];
  }
  
  const emailInput = document.querySelector('.section-booking input[name="email"]');
  if (emailInput && translations.consultation.emailPlaceholder[lang]) {
    emailInput.placeholder = translations.consultation.emailPlaceholder[lang];
  }
  
  // Submit button - DIRECT UPDATE
  const submitButton = document.querySelector('.section-booking button[type="submit"]');
  if (submitButton && translations.consultation.submitRequest[lang]) {
    submitButton.textContent = translations.consultation.submitRequest[lang];
    setElementLanguage(submitButton, lang);
  }
  
  // Project Size dropdown options - DIRECT UPDATE by position
  const projectSizeSelect = document.querySelector('.section-booking select[name="people"]');
  if (projectSizeSelect) {
    const options = projectSizeSelect.querySelectorAll('option');
    let optionsUpdated = false;
    
    // Update by position: Small, Medium, Large, Very Large, Hotel Lobby, Restaurant Chain, Custom Project
    if (options.length >= 7) {
      if (translations.consultation.projectSizeOptions.small[lang]) {
        options[0].textContent = translations.consultation.projectSizeOptions.small[lang];
        setElementLanguage(options[0], lang);
        optionsUpdated = true;
      }
      if (translations.consultation.projectSizeOptions.medium[lang]) {
        options[1].textContent = translations.consultation.projectSizeOptions.medium[lang];
        setElementLanguage(options[1], lang);
        optionsUpdated = true;
      }
      if (translations.consultation.projectSizeOptions.large[lang]) {
        options[2].textContent = translations.consultation.projectSizeOptions.large[lang];
        setElementLanguage(options[2], lang);
        optionsUpdated = true;
      }
      if (translations.consultation.projectSizeOptions.veryLarge[lang]) {
        options[3].textContent = translations.consultation.projectSizeOptions.veryLarge[lang];
        setElementLanguage(options[3], lang);
        optionsUpdated = true;
      }
      if (translations.consultation.projectSizeOptions.hotelLobby[lang]) {
        options[4].textContent = translations.consultation.projectSizeOptions.hotelLobby[lang];
        setElementLanguage(options[4], lang);
        optionsUpdated = true;
      }
      if (translations.consultation.projectSizeOptions.restaurantChain[lang]) {
        options[5].textContent = translations.consultation.projectSizeOptions.restaurantChain[lang];
        setElementLanguage(options[5], lang);
        optionsUpdated = true;
      }
      if (translations.consultation.projectSizeOptions.customProject[lang]) {
        options[6].textContent = translations.consultation.projectSizeOptions.customProject[lang];
        setElementLanguage(options[6], lang);
        optionsUpdated = true;
      }
    } else {
      // Fallback: match by text
      options.forEach(option => {
        const text = option.textContent.trim();
        if (text === 'Փոքր (1-10 նստատեղ)' || text.includes('Small') || text.includes('Малый')) {
          option.textContent = translations.consultation.projectSizeOptions.small[lang];
          setElementLanguage(option, lang);
          optionsUpdated = true;
        } else if (text === 'Միջին (11-25 նստատեղ)' || text.includes('Medium') || text.includes('Средний')) {
          option.textContent = translations.consultation.projectSizeOptions.medium[lang];
          setElementLanguage(option, lang);
          optionsUpdated = true;
        } else if (text === 'Մեծ (26-50 նստատեղ)' || text.includes('Large') || text.includes('Большой')) {
          option.textContent = translations.consultation.projectSizeOptions.large[lang];
          setElementLanguage(option, lang);
          optionsUpdated = true;
        } else if (text === 'Շատ Մեծ (50+ նստատեղ)' || text.includes('Very Large') || text.includes('Очень большой')) {
          option.textContent = translations.consultation.projectSizeOptions.veryLarge[lang];
          setElementLanguage(option, lang);
          optionsUpdated = true;
        } else if (text === 'Հյուրանոցի Լոբի' || text.includes('Hotel Lobby') || text.includes('Гостиничное лобби')) {
          option.textContent = translations.consultation.projectSizeOptions.hotelLobby[lang];
          setElementLanguage(option, lang);
          optionsUpdated = true;
        } else if (text === 'Ռեստորանների Ցանց' || text.includes('Restaurant Chain') || text.includes('Сеть ресторанов')) {
          option.textContent = translations.consultation.projectSizeOptions.restaurantChain[lang];
          setElementLanguage(option, lang);
          optionsUpdated = true;
        } else if (text === 'Անհատական Նախագիծ' || text.includes('Custom Project') || text.includes('Индивидуальный проект')) {
          option.textContent = translations.consultation.projectSizeOptions.customProject[lang];
          setElementLanguage(option, lang);
          optionsUpdated = true;
        }
      });
    }
    
    // Refresh Select2 dropdown if it exists (Select2 creates a custom dropdown that needs to be refreshed)
    if (optionsUpdated && typeof jQuery !== 'undefined') {
      const $select = jQuery(projectSizeSelect);
      // Check if Select2 is initialized
      if ($select.data('select2')) {
        // Destroy Select2, update options, then reinitialize
        $select.select2('destroy');
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          $select.select2({
            minimumResultsForSearch: 20,
            dropdownParent: jQuery('#dropDownSelect1')
          });
        }, 10);
      }
    }
  }
}

// Update About Us page
function updateAboutPage() {
  const lang = getCurrentLanguage();
  
  // Check if we're on about page
  const pathname = window.location.pathname;
  const href = window.location.href;
  const isAboutPage = pathname.includes('about.html') || href.includes('about.html') || 
                      document.querySelector('.bg2-pattern.p-t-116') !== null;
  
  if (!isAboutPage) {
    return;
  }
  
  console.log('🌐 Translating About Us page for language:', lang);
  
  // Premium HORECA Furniture span
  const premiumHorecaSpan = document.querySelector('.bg2-pattern.p-t-116 .tit2');
  if (premiumHorecaSpan && (premiumHorecaSpan.textContent.includes('Պրեմիում HORECA') || premiumHorecaSpan.textContent.includes('Premium HORECA') || premiumHorecaSpan.textContent.includes('Премиальная HORECA'))) {
    if (translations.about.premiumHorecaFurniture[lang]) {
      premiumHorecaSpan.textContent = translations.about.premiumHorecaFurniture[lang];
    }
  }
  
  // Our Story heading
  const ourStoryHeading = document.querySelector('.bg2-pattern.p-t-116 h3.tit3');
  if (ourStoryHeading && !ourStoryHeading.hasAttribute('data-text')) {
    if (ourStoryHeading.textContent.includes('Մեր Պատմությունը') || ourStoryHeading.textContent.includes('Our Story') || ourStoryHeading.textContent.includes('Наша история')) {
      if (translations.about.ourStory[lang]) {
        ourStoryHeading.textContent = translations.about.ourStory[lang];
      }
    }
  }
  
  // Our Story description paragraph
  const ourStoryDesc = document.querySelector('.bg2-pattern.p-t-116 p.size32');
  if (ourStoryDesc && !ourStoryDesc.hasAttribute('data-text')) {
    if (ourStoryDesc.textContent.includes('GAOS Furniture-ն') || ourStoryDesc.textContent.includes('GAOS Furniture has') || ourStoryDesc.textContent.includes('GAOS Furniture занимает')) {
      if (translations.about.ourStoryDescription[lang]) {
        ourStoryDesc.textContent = translations.about.ourStoryDescription[lang];
      }
    }
  }
  
  // Watch span (in video section) - check for both "Դիտե՛ք" and "Բացահայտեք"
  const watchSpan = document.querySelector('.section-video .tit2');
  if (watchSpan) {
    const text = watchSpan.textContent.trim();
    if (text.includes('Դիտե՛ք') || text.includes('Բացահայտեք') || text.includes('Watch') || text.includes('Discover') || text.includes('Смотрите') || text.includes('Откройте')) {
      if (translations.about.watch && translations.about.watch[lang]) {
        watchSpan.textContent = translations.about.watch[lang];
        setElementLanguage(watchSpan, lang);
      } else if (translations.about.discover && translations.about.discover[lang]) {
        watchSpan.textContent = translations.about.discover[lang];
        setElementLanguage(watchSpan, lang);
      }
    }
  }
  
  // Our Video heading - check for both "Մեր փոքրիկ հոլովակը" and "Մեր Ցուցասրահը"
  const videoHeading = document.querySelector('.section-video .tit4');
  if (videoHeading) {
    const text = videoHeading.textContent.trim();
    if (text.includes('Մեր փոքրիկ հոլովակը') || text.includes('Our Video') || text.includes('Наше видео')) {
      if (translations.about.ourVideo && translations.about.ourVideo[lang]) {
        videoHeading.textContent = translations.about.ourVideo[lang];
        setElementLanguage(videoHeading, lang);
      }
    } else if (text.includes('Մեր Ցուցասրահը') || text.includes('Our Showroom') || text.includes('Наш шоурум')) {
      if (translations.about.ourShowroom && translations.about.ourShowroom[lang]) {
        videoHeading.textContent = translations.about.ourShowroom[lang];
        setElementLanguage(videoHeading, lang);
      }
    }
  }
  
  // Premium span (Materials section)
  const premiumSpan = document.querySelector('.wrap-text-delicious .tit2');
  if (premiumSpan && !premiumSpan.hasAttribute('data-text')) {
    if (premiumSpan.textContent.includes('Պրեմիում') || premiumSpan.textContent.includes('Premium') || premiumSpan.textContent.includes('Премиум')) {
      if (translations.about.premium[lang]) {
        premiumSpan.textContent = translations.about.premium[lang];
      }
    }
  }
  
  // Materials heading
  const materialsHeading = document.querySelector('.wrap-text-delicious h3.tit3');
  if (materialsHeading && !materialsHeading.hasAttribute('data-text')) {
    if (materialsHeading.textContent.includes('ՆՅՈՒԹԵՐ') || materialsHeading.textContent.includes('Materials') || materialsHeading.textContent.includes('Материалы')) {
      if (translations.about.materials[lang]) {
        materialsHeading.textContent = translations.about.materials[lang];
      }
    }
  }
  
  // Materials description
  const materialsDesc = document.querySelector('.wrap-text-delicious p.size3');
  if (materialsDesc && !materialsDesc.hasAttribute('data-text')) {
    if (materialsDesc.textContent.includes('Մենք օգտագործում ենք') || materialsDesc.textContent.includes('We use only the finest') || materialsDesc.textContent.includes('Мы используем только лучшие')) {
      if (translations.about.materialsDescription[lang]) {
        materialsDesc.textContent = translations.about.materialsDescription[lang];
      }
    }
  }
  
  // Custom span (Solutions section)
  const customSpan = document.querySelector('.wrap-text-romantic .tit2');
  if (customSpan && !customSpan.hasAttribute('data-text')) {
    if (customSpan.textContent.includes('Անհատական') || customSpan.textContent.includes('Custom') || customSpan.textContent.includes('Индивидуальный')) {
      if (translations.about.custom[lang]) {
        customSpan.textContent = translations.about.custom[lang];
      }
    }
  }
  
  // Solutions heading
  const solutionsHeading = document.querySelector('.wrap-text-romantic h3.tit3');
  if (solutionsHeading && !solutionsHeading.hasAttribute('data-text')) {
    if (solutionsHeading.textContent.includes('Լուծումներ') || solutionsHeading.textContent.includes('Solutions') || solutionsHeading.textContent.includes('Решения')) {
      if (translations.about.solutions[lang]) {
        solutionsHeading.textContent = translations.about.solutions[lang];
      }
    }
  }
  
  // Custom Solutions description
  const customSolutionsDesc = document.querySelector('.wrap-text-romantic p.size3');
  if (customSolutionsDesc && !customSolutionsDesc.hasAttribute('data-text')) {
    if (customSolutionsDesc.textContent.includes('Յուրաքանչյուր հյուրասիրության') || customSolutionsDesc.textContent.includes('Every hospitality business') || customSolutionsDesc.textContent.includes('Каждый бизнес в сфере')) {
      if (translations.about.customSolutionsDescription[lang]) {
        customSolutionsDesc.textContent = translations.about.customSolutionsDescription[lang];
      }
    }
  }
  
  // Partners section - Our Partners span
  const partnersSpan = document.querySelector('.section-partners .tit2');
  if (partnersSpan && (partnersSpan.textContent.includes('Մեր Գործընկերները') || partnersSpan.textContent.includes('Our Partners') || partnersSpan.textContent.includes('Наши партнеры'))) {
    if (translations.about.ourPartners[lang]) {
      partnersSpan.textContent = translations.about.ourPartners[lang];
    }
  }
  
  // Partners section heading
  const partnersHeading = document.querySelector('.section-partners h3.tit3');
  if (partnersHeading && (partnersHeading.textContent.includes('Մեր գործընկերները') || partnersHeading.textContent.includes('Our Partners') || partnersHeading.textContent.includes('Наши партнеры'))) {
    if (translations.about.ourPartners[lang]) {
      partnersHeading.textContent = translations.about.ourPartners[lang];
      partnersHeading.setAttribute('lang', lang);
    }
  }

  // Partners section subtitle
  const partnersSubtitle = document.querySelector('.section-partners .partners-subtitle');
  if (partnersSubtitle) {
    if (translations.about.partnersSubtitle[lang]) {
      partnersSubtitle.textContent = translations.about.partnersSubtitle[lang];
      partnersSubtitle.setAttribute('lang', lang);
    }
  }
  
  // Subscription section (at bottom of about page)
  updateSubscriptionForms();
}

// Update Collection page
function updateCollectionPage() {
  const lang = getCurrentLanguage();
  
  // Check if we're on collection page
  const pathname = window.location.pathname;
  const href = window.location.href;
  const isCollectionPage = pathname.includes('collection.html') || href.includes('collection.html') || 
                           document.querySelector('.section-gallery') !== null;
  
  if (!isCollectionPage) {
    return;
  }
  
  console.log('🌐 Translating Collection page for language:', lang);
  
  // Update filter button texts (the .filter-text divs inside .label-gallery buttons)
  const categoryMap = {
    '.new': 'new',
    '.chairs': 'chairs',
    '.bar-chairs': 'barChairs',
    '.sofas': 'sofas',
    '.tables': 'tables',
    '.outdoor': 'outdoor',
    '.food-court': 'foodCourt'
  };
  
  Object.keys(categoryMap).forEach(selector => {
    const buttons = document.querySelectorAll(`.label-gallery[data-filter="${selector}"]`);
    const key = categoryMap[selector];
    buttons.forEach(button => {
      const filterText = button.querySelector('.filter-text');
      if (filterText && translations.navbarCategories[key] && translations.navbarCategories[key][lang]) {
        filterText.textContent = translations.navbarCategories[key][lang];
        setElementLanguage(filterText, lang);
      }
    });
  });
}

// Update Contact page
function updateContactPage() {
  const lang = getCurrentLanguage();
  
  // Check if we're on contact page
  const pathname = window.location.pathname;
  const href = window.location.href;
  const isContactPage = pathname.includes('contact.html') || href.includes('contact.html') || 
                        document.querySelector('.section-contact') !== null;
  
  if (!isContactPage) {
    return;
  }
  
  console.log('🌐 Translating Contact page for language:', lang);
  
  // Send Us a Message heading
  const sendMessageHeading = document.querySelector('.section-contact h3.tit7');
  if (sendMessageHeading && (sendMessageHeading.textContent.includes('Ուղարկեք Մեզ Հաղորդագրություն') || sendMessageHeading.textContent.includes('Send Us a Message') || sendMessageHeading.textContent.includes('Отправить нам сообщение'))) {
    if (translations.contact.sendUsMessage[lang]) {
      sendMessageHeading.textContent = translations.contact.sendUsMessage[lang];
    }
  }
  
  // Form labels - update by position (Name, Email, Phone, Message)
  const formLabels = document.querySelectorAll('.section-contact .wrap-form-reservation span.txt9');
  if (formLabels.length >= 4) {
    if (translations.contact.name[lang]) {
      formLabels[0].textContent = translations.contact.name[lang];
    }
    if (translations.contact.email[lang]) {
      formLabels[1].textContent = translations.contact.email[lang];
    }
    if (translations.contact.phone[lang]) {
      formLabels[2].textContent = translations.contact.phone[lang];
    }
    if (translations.contact.message[lang]) {
      formLabels[3].textContent = translations.contact.message[lang];
    }
  } else {
    // Fallback: match by text content
    formLabels.forEach((label) => {
      const text = label.textContent.trim();
      if (text === 'Անուն' || text === 'Name' || text === 'Имя') {
        label.textContent = translations.contact.name[lang];
      } else if (text === 'Էլ․ հասցե' || text === 'Email' || text === 'Электронная почта') {
        label.textContent = translations.contact.email[lang];
      } else if (text === 'Հեռախոս' || text === 'Phone' || text === 'Телефон') {
        label.textContent = translations.contact.phone[lang];
      } else if (text === 'Հաղորդագրություն' || text === 'Message' || text === 'Сообщение') {
        label.textContent = translations.contact.message[lang];
      }
    });
  }
  
  // Form placeholders
  const nameInput = document.querySelector('.section-contact input[name="name"]');
  if (nameInput && translations.contact.namePlaceholder[lang]) {
    nameInput.placeholder = translations.contact.namePlaceholder[lang];
  }
  
  const emailInput = document.querySelector('.section-contact input[name="email"]');
  if (emailInput && translations.contact.emailPlaceholder[lang]) {
    emailInput.placeholder = translations.contact.emailPlaceholder[lang];
  }
  
  const phoneInput = document.querySelector('.section-contact input[name="phone"]');
  if (phoneInput && translations.contact.phonePlaceholder[lang]) {
    phoneInput.placeholder = translations.contact.phonePlaceholder[lang];
  }
  
  const messageTextarea = document.querySelector('.section-contact textarea[name="message"]');
  if (messageTextarea && translations.contact.messagePlaceholder[lang]) {
    messageTextarea.placeholder = translations.contact.messagePlaceholder[lang];
  }
  
  // Send button
  const sendButton = document.querySelector('.section-contact button[type="submit"]');
  if (sendButton && (sendButton.textContent.includes('Ուղարկել') || sendButton.textContent.includes('Send') || sendButton.textContent.includes('Отправить'))) {
    if (translations.contact.send[lang]) {
      sendButton.textContent = translations.contact.send[lang];
    }
  }
  
  // Contact info labels (Address, Call Us, Showroom Hours)
  const contactInfoLabels = document.querySelectorAll('.section-contact .txt5.p-b-10');
  contactInfoLabels.forEach((label) => {
    const text = label.textContent.trim();

    let parentBlock = null;
    if (typeof label.closest === 'function') {
      parentBlock = label.closest('.flex-col-l');
    }
    if (!parentBlock) {
      let current = label.parentElement;
      while (current && !(current.classList && current.classList.contains('flex-col-l'))) {
        current = current.parentElement;
      }
      parentBlock = current;
    }

    const valueElement = parentBlock ? parentBlock.querySelector('.txt23.size38') : null;

    if (text === 'Հասցե' || text === 'Address' || text === 'Адрес') {
      if (translations.contact.address[lang]) {
        label.textContent = translations.contact.address[lang];
        setElementLanguage(label, lang);
      }
      if (valueElement && translations.footer.address[lang]) {
        valueElement.textContent = translations.footer.address[lang];
        setElementLanguage(valueElement, lang);
      }
    } else if (text === 'Զանգահարել Մեզ' || text === 'Call Us' || text === 'Позвоните нам') {
      if (translations.contact.callUs[lang]) {
        label.textContent = translations.contact.callUs[lang];
        setElementLanguage(label, lang);
      }
    } else if (text === 'Ցուցասրահի Ժամեր' || text === 'Showroom Hours' || text === 'Часы работы шоурума') {
      if (translations.contact.showroomHours[lang]) {
        label.textContent = translations.contact.showroomHours[lang];
        setElementLanguage(label, lang);
      }
      if (valueElement && translations.footer.mondaySaturday[lang]) {
        const valueHTML = valueElement.innerHTML;
        const timeMatch = valueHTML.match(/(\d+\s*:\s*\d+\s*-\s*\d+\s*:\s*\d+)/);
        const timeText = timeMatch ? timeMatch[0].replace(/\s+/g, '').replace(/:/g, ':').replace(/-/g, ' - ') : null;
        const timeDisplay = timeMatch ? valueHTML.substring(0, timeMatch.index + timeMatch[0].length).match(/(\d+:\d+\s*-\s*\d+:\d+)/)?.[0] || timeMatch[0].replace(/\s+/g, '') : null;
        const finalTime = timeDisplay || '9:00 - 18:00';
        valueElement.innerHTML = finalTime + ' <br/>' + translations.footer.mondaySaturday[lang];
        setElementLanguage(valueElement, lang);
      }
    }
  });
  
  // Showroom hours text (Monday - Saturday)
  const showroomHoursText = document.querySelector('.section-contact .txt23.size38');
  if (showroomHoursText) {
    const hoursText = showroomHoursText.textContent;
    if (hoursText.includes('Երկուշաբթի') || hoursText.includes('Monday') || hoursText.includes('Понедельник')) {
      if (translations.footer.mondaySaturday[lang]) {
        // Replace only the Monday-Saturday part, keep the time
        const timeMatch = showroomHoursText.textContent.match(/(\d+:\d+\s*-\s*\d+:\d+)/);
        if (timeMatch) {
          showroomHoursText.innerHTML = timeMatch[0] + ' <br/>' + translations.footer.mondaySaturday[lang];
          setElementLanguage(showroomHoursText, lang);
        }
      }
    }
  }
}

// Initialize translations on page load
function initializeTranslations() {
  // Use setTimeout to ensure DOM is fully loaded
  setTimeout(() => {
    const lang = getCurrentLanguage();
    console.log('🔄 Initializing translations for language:', lang);
    
    runTranslationStep('updateNavbarMenu', updateNavbarMenu);
    runTranslationStep('updateNavbarCategories', updateNavbarCategories);
    runTranslationStep('updateFooter', updateFooter);
    runTranslationStep('updatePageTexts', updatePageTexts); // Update data-text elements
    runTranslationStep('updateIndexPage', updateIndexPage);
    runTranslationStep('updateConsultationPage', updateConsultationPage);
    runTranslationStep('updateAboutPage', updateAboutPage);
    runTranslationStep('updateContactPage', updateContactPage);
    runTranslationStep('updateCollectionPage', updateCollectionPage);
    // Always update subscription forms (they appear on multiple pages)
    runTranslationStep('updateSubscriptionForms', updateSubscriptionForms);
    
    // For reservation page, retry multiple times to catch late-loading elements
    if (window.location.pathname.includes('reservation.html') || document.querySelector('.section-booking')) {
      setTimeout(() => {
        console.log('🔄 Retry 1: consultation page translation...');
        runTranslationStep('updateConsultationPage::retry1', updateConsultationPage);
      }, 500);
      
      setTimeout(() => {
        console.log('🔄 Retry 2: consultation page translation...');
        runTranslationStep('updateConsultationPage::retry2', updateConsultationPage);
      }, 1500);
      
      setTimeout(() => {
        console.log('🔄 Retry 3: consultation page translation...');
        runTranslationStep('updateConsultationPage::retry3', updateConsultationPage);
      }, 3000);
    }
    
    // For about page, retry multiple times to catch late-loading elements
    if (window.location.pathname.includes('about.html') || document.querySelector('.bg2-pattern.p-t-116')) {
      setTimeout(() => {
        console.log('🔄 Retry 1: about page translation...');
        runTranslationStep('updateAboutPage::retry1', updateAboutPage);
      }, 500);
      
      setTimeout(() => {
        console.log('🔄 Retry 2: about page translation...');
        runTranslationStep('updateAboutPage::retry2', updateAboutPage);
      }, 1500);
      
      setTimeout(() => {
        console.log('🔄 Retry 3: about page translation...');
        runTranslationStep('updateAboutPage::retry3', updateAboutPage);
      }, 3000);
    }
    
    // For contact page, retry multiple times to catch late-loading elements
    if (window.location.pathname.includes('contact.html') || document.querySelector('.section-contact')) {
      setTimeout(() => {
        console.log('🔄 Retry 1: contact page translation...');
        runTranslationStep('updateContactPage::retry1', updateContactPage);
      }, 500);
      
      setTimeout(() => {
        console.log('🔄 Retry 2: contact page translation...');
        runTranslationStep('updateContactPage::retry2', updateContactPage);
      }, 1500);
      
      setTimeout(() => {
        console.log('🔄 Retry 3: contact page translation...');
        runTranslationStep('updateContactPage::retry3', updateContactPage);
      }, 3000);
    }
    
    // For collection page, retry multiple times to catch late-loading elements
    if (window.location.pathname.includes('collection.html') || document.querySelector('.section-gallery')) {
      setTimeout(() => {
        console.log('🔄 Retry 1: collection page translation...');
        runTranslationStep('updateCollectionPage::retry1', updateCollectionPage);
      }, 500);
      
      setTimeout(() => {
        console.log('🔄 Retry 2: collection page translation...');
        runTranslationStep('updateCollectionPage::retry2', updateCollectionPage);
      }, 1500);
      
      setTimeout(() => {
        console.log('🔄 Retry 3: collection page translation...');
        runTranslationStep('updateCollectionPage::retry3', updateCollectionPage);
      }, 3000);
    }
    
    // Retry subscription forms (they appear on multiple pages)
    if (document.querySelector('.section-signup')) {
      setTimeout(() => {
        runTranslationStep('updateSubscriptionForms::retry1', updateSubscriptionForms);
      }, 300);
      
      setTimeout(() => {
        runTranslationStep('updateSubscriptionForms::retry2', updateSubscriptionForms);
      }, 1000);
    }
    
    console.log('✅ All translations initialized');
  }, 100);
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTranslations);
} else {
  initializeTranslations();
}

// Export for use in other files
window.updateNavbarFooterTranslations = initializeTranslations;

