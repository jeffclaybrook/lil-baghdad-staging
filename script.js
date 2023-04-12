async function getData() {
    const client = contentful.createClient({
        space: 'rmkbw43wse32',
        environment: 'myEnvironment',
        accessToken: 'cJNcZ9LxEH5J3YhIDFTEvHfk7IKSh30peycaWT2vFK0'
    })
    const res = await client.getEntries({
        content_type: 'lilBaghdadV2'
    })
    const data = await res.items;
    const menu = data.map(item => {
        const {
            name,
            category,
            description,
            price
        } = item.fields;
        const image = item.fields.image.fields.file.url;
        return {
            name,
            category,
            description,
            price,
            image
        }
    })
    return menu
}

async function initApp() {
    getPageLoader();
    try {
        const menu = await getData();
        setCategoryTabs(menu);
        setCategoryItems(menu);
    } catch {
        document.querySelector('body').innerHTML = `
        <h1>Ooops! We're having trouble loading the menu</h1>
        `
    }
}

function getPageLoader() {
    const loader = document.querySelector('aside');
    setTimeout(() => {
        loader.classList.remove('visible');
        loader.innerHTML = '';
    }, 2000)
}

function getCategoryNames(menu) {
    const categories = menu.map(item => {
        const { category } = item;
        return category
    })
    const categoryNames = [...new Set(categories)];
    const categoriesSorted = categoryNames.reverse();
    return categoriesSorted;
}

function getCategoryData(menu) {
    const categoryNames = getCategoryNames(menu);
    const categories = menu.map(items => {
        const {
            name,
            category,
            description,
            price,
            image
        } = items;
        return {
            name,
            category,
            description,
            price,
            image
        }
    })
    const categoryData = [];
    categoryNames.forEach((category, i) => {
        category = categories.filter(item =>
            item.category === categoryNames[i]
        )
        categoryData.push(category);
    })
    return categoryData;
}

function setCategoryTabs(menu) {
    const categoryNames = getCategoryNames(menu);
    const nav = document.querySelector('nav');
    const ul = document.createElement('ul');
    nav.appendChild(ul);
    categoryNames.forEach(category => {
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

function setCategorySections(menu) {
    const categoryNames = getCategoryNames(menu);
    const section = document.querySelector('section');
    categoryNames.forEach(category => {
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
    const headings = [
        document.querySelector('#dishes h2'),
        document.querySelector('#curry h2'),
        document.querySelector('#breakfast h2')
    ];
    const subHeadings = [
        'Main dishes served with pita bread',
        'Curry dishes served with side of Basmati rice',
        'All day, Saturdays only'
    ];
    headings.forEach((heading, i) => {
        const h3 = document.createElement('h3');
        h3.innerText = subHeadings[i];
        heading.insertAdjacentElement('afterend', h3);
    })
}

function setCategoryItems(menu) {
    setCategorySections(menu);
    const categoryData = getCategoryData(menu);
    const ul = document.querySelectorAll('article ul');
    categoryData.map((items, i) => {
        ul[i].innerHTML += items.map(item => {
            const {
                name,
                category,
                description,
                price,
                image
            } = item;
            const priceFormatted = price.toFixed(2);
            return `
            <li onclick="createModal('${name}', '${category}', '${description}', '${priceFormatted}', '${image}')">
                <div class="item-image">
                    <img src="${image}" alt="${name}" style="aspect-ratio: 16 / 10" loading="lazy">
                </div>
                <div class="item-details">
                    <h3>${name}</h3>
                    <p>${description}</p>
                    <h4>$${priceFormatted}</h4>
                </div>
            </li>
            `
        }).join('')
    })
}

function createModal(name, category, description, priceFormatted, image) {
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
            <h4>$${priceFormatted}</h4>
        </div>
    </div>
    `
}

function closeModal() {
    const body = document.querySelector('body');
    const dialog = document.querySelector('dialog');
    body.style.overflow = 'auto';
    dialog.classList.remove('expanded');
    dialog.setAttribute('aria-hidden', 'true');
    dialog.innerHTML = '';
}

function onTabClick() {
    const tabs = document.querySelectorAll('nav ul li');
    tabs.forEach((tab, i) => {
        tab.addEventListener('click', () => {
            tabs.forEach(tab => tab.classList.remove('active'));
            tabs[i].classList.add('active');
        })
    })
}

function onPageScroll() {
    const articles = document.querySelectorAll('article');
    const tabs = document.querySelectorAll('nav ul li');
    let current = '';
    articles.forEach(article => {
        const articleTop = article.offsetTop;
        if (window.pageYOffset >= articleTop - 60) {
            current = article.getAttribute('id')
        }
    })
    tabs.forEach(tab => {
        tab.classList.remove('active');
        if (tab.classList.contains(current)) {
            tab.classList.add('active')
        }
    })
}

window.addEventListener('scroll', onPageScroll)

initApp()