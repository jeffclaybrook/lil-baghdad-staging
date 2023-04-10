// Fetch data
async function getMenuData() {
    const client = contentful.createClient({
        space: 'rmkbw43wse32',
        accessToken: 'LH1A4Pbn5WMso-OgGWFmnBje0LY48PXd3d3rKLEsQ5c'
    })
    const res = await client.getEntries({
        content_type: 'lilBaghdad'
    })
    const data = await res.items;
    const menu = data.map(item => {
        const {
            name,
            description,
            price,
            category
        } = item.fields;
        const image = item.fields.image.fields.file.url;
        return {
            name,
            description,
            price,
            category,
            image
        };
    });
    return menu;
}

// Initialize app
async function initApp() {
    createLoader();
    try {
        const data = await getMenuData();
        setNavigationTabs(data);
        setArticleListItems(data);
    } catch {
        document.querySelector('body').innerHTML = `
        <h1>Ooops! We're having trouble loading the menu</h1>
        `
    }
}

// Create loader
function createLoader() {
    const loader = document.querySelector('aside');
    setTimeout(() => {
        loader.classList.remove('visible');
        loader.innerHTML = '';
    }, 2000);
}

// Category names
function getCategoryNames(data) {
    const categories = data.map(item => {
        const { category } = item;
        return category;
    });
    const categoryNames = [...new Set(categories)];
    return categoryNames;
}

// Category objects
function getCategoryData(data) {
    const categoryNames = getCategoryNames(data);
    const categories = data.map(items => {
        const {
            name,
            description,
            price,
            category,
            image
        } = items;
        return {
            name,
            description,
            price,
            category,
            image
        };
    })
    let myArr = [];
    categoryNames.forEach((category, i) => {
        category = categories.filter(item =>
            item.category === categoryNames[i]
        );
        myArr.push(category);
    })
    return myArr
}

// Navigation tabs
function setNavigationTabs(data) {
    const categories = getCategoryNames(data);
    const nav = document.querySelector('nav');
    const ul = document.createElement('ul');
    nav.appendChild(ul);
    categories.forEach(category => {
        const lowercaseCategory = category.toLowerCase();
        const li = document.createElement('li');
        const anchor = document.createElement('a');
        li.classList.add(`${lowercaseCategory}`);
        anchor.setAttribute('href', `#${lowercaseCategory}`);
        anchor.innerText = category;
        ul.appendChild(li);
        li.appendChild(anchor);
    })
}

// Section articles
function setSectionArticles(data) {
    const categories = getCategoryNames(data);
    const section = document.querySelector('section');
    categories.forEach(category => {
        const lowercaseCategory = category.toLowerCase();
        const article = document.createElement('article');
        const h2 = document.createElement('h2');
        const ul = document.createElement('ul');
        article.setAttribute('id', `${lowercaseCategory}`);
        h2.innerText = category;
        section.appendChild(article);
        article.appendChild(h2);
        article.appendChild(ul);
    })
}

// Menu items
function setArticleListItems(data) {
    setSectionArticles(data);
    const categories = getCategoryData(data);
    const ul = document.querySelectorAll('article ul');
    categories.map((items, i) => {
        ul[i].innerHTML += items.map(item => {
            const {
                category,
                name,
                description,
                price,
                image
            } = item;
            return `
            <li onclick="createModal('${category}', '${name}', '${description}', '${price}', '${image}')">
                <div class="item-image">
                    <img src="${image}" alt="${name}" style="aspect-ratio: 16 / 10" loading="lazy">
                </div>
                <div class="item-details">
                    <h3>${name}</h3>
                    <p>${description}</p>
                    <h4>${price}</h4>
                </div>
            </li>
            `
        }).join('');
    })
}

// Create modal
function createModal(category, name, description, price, image) {
    const body = document.querySelector('body');
    const dialog = document.querySelector('dialog');
    body.style.overflow = 'hidden';
    dialog.classList.add('expanded');
    dialog.setAttribute('aria-hidden', 'false');
    dialog.innerHTML += `
    <div class="dialog-scrim"></div>
    <div class="dialog-container">
        <div class="dialog-header" style="background-image: url('${image}')">
            <button type="button" aria-label="Close menu item" onclick="closeModal()">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="16" height="16" fill="#292a2d">
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
                </svg>
            </button>
        </div>
        <div class="dialog-body">
            <h5>${category}</h5>
            <h3>${name}</h3>
            <p>${description}</p>
            <h4>${price}</h4>
        </div>
    </div>
    `
}

// Close modal
function closeModal() {
    const body = document.querySelector('body');
    const dialog = document.querySelector('dialog');
    body.style.overflow = 'auto';
    dialog.classList.remove('expanded');
    dialog.setAttribute('aria-hidden', 'true');
    dialog.innerHTML = '';
}

// Tab click
function onTabClick() {
    const tabs = document.querySelectorAll('nav ul li');
    tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => {
            tabs.forEach(tab => tab.classList.remove('active'));
            tabs[i].classList.add('active');
        })
    })
}

// Active tab on page scroll
function onPageScroll() {
    const articles = document.querySelectorAll('article');
    const tabs = document.querySelectorAll('nav ul li');
    let current = '';
    articles.forEach(article => {
        const articleTop = article.offsetTop;
        if (window.pageYOffset >= articleTop - 50) {
            current = article.getAttribute('id');
        }
    })
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.classList.contains(current)) {
            tab.classList.add('active');
        }
    })
}

window.addEventListener('scroll', onPageScroll);

initApp()