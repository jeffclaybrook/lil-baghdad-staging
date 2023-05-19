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
    const { name, category, description, price } = item.fields;
    const image = item.fields.image.fields.file.url;
    return {
      name,
      category,
      description,
      price,
      image
    }
  })
  return menu;
}

async function initApp() {
  try {
    const data = await getData();
    setHeader();
    setTabs(data);
    setItems(data);
    setDisabledItems();
    setFooter();
  } catch {
    document.querySelector('body').innerHTML = `
    <h1>Ooops! We're having trouble loading the menu</h1>
    `
  }
}

function setHeader() {
  const header = document.querySelector('header');
  header.innerHTML += `
  <figure>
    <img src="images/logo.png" alt="Lil Baghdad" width="160px" height="160px">
    <figcaption>Iraqi made, Texas inspired</figcaption>
  </figure>
  <h5>Order Online</h5>
  <div class="flex">
    <a href="https://www.doordash.com/store/lil-baghdad-copperas-cove-23416610/?pickup=true&utm_campaign=gpa">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 154 18" width="154" height="18"><path d="M44.674 5.074v7.865h1.961a3.743 3.743 0 0 0 2.667-1.174A3.939 3.939 0 0 0 50.377 9a3.872 3.872 0 0 0-1.06-2.777 3.677 3.677 0 0 0-2.682-1.15h-1.96zm1.961-2.466c3.655 0 6.42 2.832 6.42 6.392 0 3.56-2.765 6.408-6.42 6.408H42.31a.314.314 0 0 1-.31-.318V2.939c0-.176.139-.319.31-.319l4.325-.012zm15.841 10.605c1.66.005 3.159-1.016 3.798-2.587a4.285 4.285 0 0 0-.878-4.587 4.027 4.027 0 0 0-4.47-.922C59.392 5.765 58.39 7.298 58.387 9c0 2.32 1.828 4.202 4.09 4.213m0-10.895c3.847 0 6.788 3.032 6.788 6.682 0 3.65-2.941 6.682-6.789 6.682-3.847 0-6.763-3.017-6.763-6.682 0-3.665 2.941-6.682 6.763-6.682M78.61 13.213c2.263-.006 4.094-1.89 4.092-4.21-.003-2.322-1.838-4.202-4.1-4.203-2.264 0-4.1 1.879-4.103 4.2 0 1.118.433 2.19 1.204 2.98a4.056 4.056 0 0 0 2.906 1.233m0-10.895c3.835 0 6.776 3.017 6.776 6.682 0 3.665-2.953 6.682-6.776 6.682-3.822 0-6.788-3.017-6.788-6.682 0-3.665 2.941-6.682 6.788-6.682m15.746 2.756H91.59v3.385h2.765a1.6 1.6 0 0 0 1.188-.453c.32-.31.502-.74.506-1.192a1.703 1.703 0 0 0-.48-1.246 1.616 1.616 0 0 0-1.214-.491v-.003zm-5.44-2.135c0-.176.14-.319.311-.319h5.206c2.482 0 4.278 1.865 4.278 4.207.019 1.584-.846 3.039-2.227 3.748l2.401 4.353a.325.325 0 0 1 .012.34.308.308 0 0 1-.294.156h-2.107a.31.31 0 0 1-.282-.172l-2.314-4.308H91.58v4.136a.314.314 0 0 1-.31.319h-2.03a.314.314 0 0 1-.31-.319l-.014-12.14zm16.767 2.195V13h1.96a3.743 3.743 0 0 0 2.668-1.17 3.938 3.938 0 0 0 1.077-2.763 3.872 3.872 0 0 0-1.057-2.782 3.677 3.677 0 0 0-2.687-1.15l-1.961-.001zm1.96-2.469c3.655 0 6.42 2.835 6.42 6.402s-2.765 6.402-6.42 6.402h-4.312a.314.314 0 0 1-.31-.319V3c0-.177.139-.32.31-.32l4.313-.015zm14.576 3.128l-1.517 4.206h3.031l-1.514-4.206zm-2.407 6.583l-.993 2.8a.31.31 0 0 1-.31.22h-2.154a.307.307 0 0 1-.283-.134.325.325 0 0 1-.027-.318l4.654-12.139a.31.31 0 0 1 .31-.21h2.41a.31.31 0 0 1 .311.21l4.654 12.139a.325.325 0 0 1-.028.318.307.307 0 0 1-.283.133h-2.153a.31.31 0 0 1-.31-.22l-.993-2.8h-4.805zm11.069-6.31c0-2.01 1.694-3.748 4.369-3.748a5.457 5.457 0 0 1 3.88 1.499.322.322 0 0 1 0 .468L137.936 5.5a.306.306 0 0 1-.44 0 3.097 3.097 0 0 0-2.07-.837c-1.07 0-1.861.637-1.861 1.372 0 2.376 6.323 1.005 6.323 5.577-.003 2.317-1.71 4.07-4.728 4.07a6.25 6.25 0 0 1-4.511-1.858.322.322 0 0 1 0-.468l1.154-1.184a.307.307 0 0 1 .45 0 3.935 3.935 0 0 0 2.727 1.14c1.337 0 2.218-.732 2.218-1.649 0-2.377-6.32-1.005-6.32-5.578m20.476-3.162v4.804h-5.352V2.923a.314.314 0 0 0-.31-.318h-2.03a.314.314 0 0 0-.31.318V15.06c0 .176.14.319.31.319h2.03c.17 0 .31-.143.31-.319v-4.88h5.348v4.88c0 .176.14.319.31.319h2.03c.171 0 .31-.143.31-.319V2.923a.314.314 0 0 0-.31-.318h-2.03a.314.314 0 0 0-.306.318zM30.605 4.225C29.197 1.615 26.442-.01 23.446 0H.778a.78.78 0 0 0-.716.478.763.763 0 0 0 .168.836l4.938 4.9c.436.434 1.03.677 1.648.677h15.98c1.139-.012 2.07.89 2.082 2.013.012 1.123-.901 2.043-2.04 2.054H11.821a.78.78 0 0 0-.718.476.763.763 0 0 0 .167.838l4.941 4.904a2.34 2.34 0 0 0 1.648.676h4.983c6.483 0 11.385-6.84 7.763-13.63" fill="#FF3008"/></svg>
    </a>
    <a href="https://www.ubereats.com/store/lil-baghdad/ugkEkaVyX0eNfA6ezGU0eA">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1052 170" width="146" height="24"><path d="M787.3 105.2c0-21-16.8-37.5-38-37.5-20.9 0-38 16.5-38 37.5s17.1 37.5 38 37.5c21.2 0 38-16.5 38-37.5m31-61.4v122.9h-31.6v-11.1c-11 9.1-24.9 14.2-40 14.2-37.4 0-66.6-28.7-66.6-64.6 0-35.8 29.3-64.6 66.6-64.6 15.1 0 29 5.1 40 14.2v-11h31.6zm105 95h-23.8c-7.2 0-11.9-3.1-11.9-9.7V71.6h35.6V43.8h-35.6v-35h-31.9v35h-24v27.9h24V137c0 16.5 11.9 29.6 33.3 29.6h34.2v-27.8zm72 31c36.5 0 57.1-17.1 57.1-40.7 0-16.8-12.2-29.3-37.7-34.7l-27-5.4c-15.6-2.8-20.6-5.7-20.6-11.4 0-7.4 7.5-11.9 21.4-11.9 15.1 0 26.1 4 29.3 17.6h31.6c-1.7-25.6-20.6-42.7-58.8-42.7-33 0-56.2 13.4-56.2 39.3 0 17.9 12.8 29.6 40.3 35.3l30.1 6.8c11.9 2.3 15.1 5.4 15.1 10.2 0 7.7-9 12.5-23.5 12.5-18.2 0-28.7-4-32.7-17.6h-31.9c4.7 25.6 24.1 42.7 63.5 42.7M552.6.2h119.1v28.4h-86.9v40.7h84.6v27.6h-84.6v41.2h86.9v28.4H552.6V.2z" fill="#06c167"/><path d="M496 66.7V44.4h-8.5c-13.5 0-23.5 6.2-29.5 15.9v-15h-24.2v121.1h24.4V97.6c0-18.8 11.6-30.9 27.6-30.9H496zm-175.6 28c4.4-18.5 19.6-30.9 37.7-30.9s33.4 12.3 37.5 30.9h-75.2zM358.6 43c-36 0-63.4 28.7-63.4 62.9 0 36.1 28.5 63.2 65.6 63.2 22.5 0 40.9-9.7 53.2-25.9l-17.7-12.8c-9.2 12.1-21.3 17.8-35.6 17.8-20.8 0-37.5-14.7-40.9-34.4h100.4V106c.1-36.2-26-63-61.6-63M219 148.2c-23.7 0-42.6-18.8-42.6-42 0-23.5 19.1-42 42.6-42 23.2 0 42.3 18.5 42.3 42 .1 23.2-19 42-42.3 42m-66.5 18.3h24.2v-15.2c11.1 11.2 26.9 18 44 18 36.3 0 64.8-28.3 64.8-63.2 0-35.1-28.5-63.4-64.8-63.4-17.2 0-32.7 6.9-43.8 18V.2h-24.4v166.3zM66.6 147c23.5 0 41.6-17.8 41.6-44.2V.2h25.4v166.2h-25.2V151c-11.4 11.6-27.1 18.3-44.8 18.3-36.3 0-64.1-25.9-64.1-65.1V.2H25v102.6c0 26.9 17.9 44.2 41.6 44.2" fill="#142328"/></svg>
    </a>
  </div>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960" height="24" width="24" fill="currentColor"><path d="M480 591q-6 0-11-2t-10-7L261 384q-9-9-9-21t9-21q9-9 21-9t21 9l177 177 177-177q9-9 21-9t21 9q9 9 9 21t-9 21L501 582q-5 5-10 7t-11 2Zm0 253q-6 0-11-2t-10-7L261 637q-9-9-9-21t9-21q9-9 21-9t21 9l177 177 177-177q9-9 21-9t21 9q9 9 9 21t-9 21L501 835q-5 5-10 7t-11 2Z"/></svg>
  <p>Scroll to see menu</p>
  `
}

function setFooter() {
  const footer = document.querySelector('footer');
  footer.innerHTML += `
  <a href="/" aria-label="Lil Baghdad home">
    <img src="images/logo.png" alt="Lil Baghdad" width="120px" height="120px">
  </a>
  <ul>
    <li>
      <a href="https://www.facebook.com/profile.php?id=100074970285412/" target="_blank" aria-label="Lil Baghdad on Facebook">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="#e1e3e5">
          <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
        </svg>
      </a>
    </li>
    <li>
      <a href="https://www.instagram.com/desireddishes/" target="_blank" aria-label="Lil Baghdad on Instagram">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16" fill="#e1e3e5">
          <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
        </svg>
      </a>
    </li>
    <li>
      <a href="https://goo.gl/maps/DjnmrwDQn6bWSLAj9" target="_blank" aria-label="Lil Baghdad on Google Maps">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512" width="16" height="16" fill="#e1e3e5">
          <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
        </svg>
      </a>
    </li>
    <li>
      <a href="tel:(512)-300-9655" aria-label="Lil Baghdad Phone number">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="#e1e3e5">
          <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/>
        </svg>
      </a>
    </li>
  </ul>
  <p>© 2023 Jeffrey Claybrook</p>
  `
}

function setCategories(data) {
  const categories = [
    'Appetizers',
    'Dishes',
    'Curry',
    'Breakfast',
    'Desserts',
    'Drinks'
  ]
  return categories;
}

function getMetadata(data) {
  const categoryNames = setCategories(data);
  const categories = data.map(item => {
    const { name, category, description, price, image } = item;
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
    category = categories.filter(item => item.category === categoryNames[i]);
    categoryData.push(category);
  })

  return categoryData;
}

function setTabs(data) {
  const categories = setCategories(data);
  const nav = document.querySelector('nav');
  const ul = document.createElement('ul');
  nav.appendChild(ul);

  categories.forEach(category => {
    const categoryAlt = category.toLowerCase();
    const li = document.createElement('li');
    const anchor = document.createElement('a');
    li.classList.add(`${categoryAlt}`);
    anchor.setAttribute('href', `#${categoryAlt}`);
    anchor.innerText = category;
    ul.appendChild(li);
    li.appendChild(anchor);
  })
}

function setSections(data) {
  const categories = setCategories(data);
  const section = document.querySelector('section');

  categories.forEach(category => {
    const categoryAlt = category.toLowerCase();
    const article = document.createElement('article');
    const h2 = document.createElement('h2');
    const ul = document.createElement('ul');
    article.setAttribute('id', `${categoryAlt}`);
    h2.innerText = category;
    section.appendChild(article);
    article.appendChild(h2);
    article.appendChild(ul);
  })

  const subHeadings = [
    'Served with side of pita bread',
    'Served with side of basmati rice',
    'Served all day, Saturdays only'
  ]

  const headings = [
    document.querySelector('#dishes h2'),
    document.querySelector('#curry h2'),
    document.querySelector('#breakfast h2')
  ]

  headings.forEach((heading, i) => {
    const h3 = document.createElement('h3');
    h3.innerText = subHeadings[i];
    heading.insertAdjacentElement('afterend', h3);
  })
}

function setItems(data) {
  setSections(data);
  const metadata = getMetadata(data);
  const ul = document.querySelectorAll('article ul');
  metadata.map((items, i) => {
    ul[i].innerHTML += items.map(item => {
      const { name, category, description, price, image } = item;
      const priceAlt = price.toFixed(2);
      const imageAlt = `https:${image}`;
      return `
      <li onclick='setDialog("${name}", "${category}", "${description}", "${priceAlt}", "${imageAlt}")'>
        <div class="item-image">
          <img src="${imageAlt}" alt="${name}" style="aspect-ratio: 16 / 10" loading="lazy">
        </div>
        <div class="item-details">
          <h3>${name}</h3>
          <p>${description}</p>
          <h4>$${priceAlt}</h4>
        </div>
      </li>
      `
    }).join('')
  })
}

function setDisabledItems() {
  const items = document.querySelectorAll('#breakfast li');
  const date = new Date();
  if (date.getDay() != 6) {
    items.forEach(item => {
      item.classList.add('disabled')
    })
  } else if (date.getDay() === 6) {
    items.forEach(item => {
      item.classList.remove('disabled')
    })
  }
}

function setDialog(name, category, description, priceAlt, imageAlt) {
  const body = document.querySelector('body');
  const dialog = document.querySelector('dialog');
  body.style.overflow = 'hidden';
  dialog.classList.add('expanded');
  dialog.setAttribute('aria-hidden', 'false');
  dialog.innerHTML += `
  <div class="dialog-scrim"></div>
  <div class="dialog-content">
    <div class="dialog-header" style="background-image: url('${imageAlt}')">
      <button type="button" aria-label="Close dialog">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="16" height="16" fill="#292a2d">
          <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/>
        </svg>
      </button>
    </div>
    <div class="dialog-body">
      <h5>${category}</h5>
      <h3>${name}</h3>
      <p>${description}</p>
      <h4>$${priceAlt}</h4>
    </div>
  </div>
  `;
  const button = dialog.querySelector('button');
  button.addEventListener('click', closeDialog);
}

function closeDialog() {
  const body = document.querySelector('body');
  const dialog = document.querySelector('dialog');
  body.style.overflow = 'auto';
  dialog.classList.remove('expanded');
  dialog.setAttribute('aria-hidden', 'true');
  dialog.innerHTML = '';
}

function handleTabClick() {
  const tabs = document.querySelectorAll('nav ul li');
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      tabs.forEach(tab => tab.classList.remove('active'));
      tabs[i].classList.add('active');
    })
  })
}

function handlePageScroll() {
  const articles = document.querySelectorAll('article');
  const tabs = document.querySelectorAll('nav ul li');
  let current = '';
  articles.forEach(article => {
    const top = article.offsetTop;
    if (window.pageYOffset >= top - 50) {
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

window.addEventListener('scroll', handlePageScroll);

initApp()