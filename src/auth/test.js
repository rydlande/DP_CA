import PocketBase from 'https://cdn.jsdelivr.net/gh/pocketbase/js-sdk@latest/dist/pocketbase.es.mjs';

const url = 'https://rydlande.pockethost.io/';
const pb = new PocketBase(url);

const urlF = 'https://rydlande.pockethost.io/api/collections/data/records';
const attendingContent = document.querySelector('#attending-content');
const allergiesContent = document.querySelector('#allergies-content');
const notAttendingContent = document.querySelector('#not-attending-content');
const searchContent = document.querySelector('#search-content');

async function showingData() {
  try {
    attendingContent.innerHTML = '';
    allergiesContent.innerHTML = '';
    notAttendingContent.innerHTML = '';

    const res = await fetch(urlF, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('API request failed');
    }

    const data = await res.json();
    data.items.forEach((guest) => {
      console.log(guest);
      const attendingDiv = document.createElement('div');
      const companionDiv = document.createElement('div');
      const allergyDiv = document.createElement('div');
      const notAttendingDiv = document.createElement('div');
      const deleteNameButton = document.createElement('button');
      deleteNameButton.innerText = 'delete';
      const deleteCompanionButton = document.createElement('button');
      deleteCompanionButton.innerText = 'delete';

      attendingDiv.innerHTML = `
          <span>${guest.name}</span>`;

      companionDiv.innerHTML = `
          <span>${guest.companion}</span>`;

      allergyDiv.innerHTML = `
          <span>${guest.allergy}</span> `;

      notAttendingDiv.innerHTML = `
          <span>${guest.name}</span>`;

      if (guest.attending === true) {
        attendingContent.append(
          attendingDiv,
          deleteNameButton,
          companionDiv,
          deleteCompanionButton,
        );
        allergiesContent.append(allergyDiv);
      } else if (guest.attending === false) {
        notAttendingContent.append(notAttendingDiv);
      }

      deleteNameButton.addEventListener('click', () =>
        handleDelete(guest.id, 'name'),
      );
      deleteCompanionButton.addEventListener('click', () =>
        handleDelete(guest.id, 'companion'),
      );
    });
  } catch (error) {
    console.error(error);
  }
}

async function handleDelete(itemId, property, attending) {
  try {
    let dataToUpdate = {};
    if (property === 'name') {
      if (attending === true) {
        dataToUpdate = { attending: false };
      } else {
        dataToUpdate = { attending: true };
      }
    } else if (property === 'companion') {
      dataToUpdate = { companion: '' };
    }

    await pb.collection('data').update(itemId, dataToUpdate);

    showingData();
  } catch (error) {
    console.error('Error deleting:', error);
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
showingData();
