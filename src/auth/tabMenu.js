import renderGuest from './tabs.js';

const URL = 'https://rydlande.pockethost.io/api/collections/data/records';

async function showingData() {
  try {
    const res = await fetch(URL, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('API request failed');
    } else {
      const data = await res.json();
      data.items.forEach((guest) => {
        renderGuest(guest);
      });
    }
  } catch (error) {
    console.error(error);
  }
}

const tabLink = document.querySelectorAll('.tab-menu-link');
const tabContent = document.querySelectorAll('.tab-bar-content');

tabLink.forEach((item) => {
  item.addEventListener('click', activeTab);
});

function activeTab(item) {
  const btnTarget = item.currentTarget;
  const content = btnTarget.dataset.content;

  tabContent.forEach((item) => {
    item.classList.remove('is-active');
  });

  tabLink.forEach((item) => {
    item.classList.remove('is-active');
  });

  document.querySelector('#' + content).classList.add('is-active');
  btnTarget.classList.add('is-active');
}
export default showingData();
