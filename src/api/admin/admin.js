import { BASE_URL } from '../../lib/base.js';
import renderGuests from './attending.js';
import renderAllergies from './allergies.js';
import renderNotAttending from './notAttending.js';
import renderAll from './showAll.js';
const tabLink = document.querySelectorAll('.tab-menu-link');
const tabContent = document.querySelectorAll('.tab-bar-content');

function clearTabs() {
  tabContent.forEach((content) => {
    content.innerHTML = '';
  });
}

async function handleTabClick(event) {
  const btnTarget = event.currentTarget;
  if (!btnTarget) return;
  const content = btnTarget.dataset.content;

  tabContent.forEach((item) => {
    item.classList.remove('is-active');
  });
  tabLink.forEach((item) => {
    item.classList.remove('is-active');
  });

  document.querySelector(`#${content}`)?.classList.add('is-active');
  btnTarget.classList.add('is-active');

  await showingData();
}

async function showingData() {
  try {
    clearTabs();

    const res = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('API request failed');
    } else {
      const data = await res.json();
      data.items.forEach((data) => {
        renderGuests(data);
        renderNotAttending(data);
        renderAll(data);
      });
      renderAllergies();
    }
  } catch (error) {
    alert('An error occurred while submitting data. Please try again.');
  }
}

tabLink.forEach((item) => {
  item.addEventListener('click', handleTabClick);
});
