import PocketBase from 'https://cdn.jsdelivr.net/gh/pocketbase/js-sdk@latest/dist/pocketbase.es.mjs';

const url = 'https://rydlande.pockethost.io/';
const pb = new PocketBase(url);

const loginForm = document.querySelector('#login');
const loginEmail = document.querySelector('#email');
const loginPassword = document.querySelector('#password');
const logoutButton = document.querySelector('#logout');
const table = document.querySelector('#table');

logoutButton.style.display = 'none';

async function handleLogin(e) {
  e.preventDefault();
  try {
    const authData = await pb.admins.authWithPassword(
      loginEmail.value,
      loginPassword.value,
    );
    console.log(authData);
  } catch (error) {
    loginForm.style.display = 'block';
    console.log('Error submitting data:', error);
    alert('An error occurred while submitting data. Please try again.');
  }
  localStorage.setItem('token', pb.authStore.token);
}

if (pb.authStore.token === localStorage.token) {
  loginForm.style.display = 'none';
  logoutButton.style.display = 'block';
  getGuests();
} else {
  alert('You need to log in as admin to access guest data.');
}

loginForm.addEventListener('submit', handleLogin);

async function getGuests() {
  try {
    const records = await pb.collection('data').getFullList({
      filter: 'attending != false',
    });
    console.log(records);

    table.innerHTML = '';

    const attendingTh = document.createElement('th');
    attendingTh.textContent = 'Guests Attending';
    const companionTh = document.createElement('th');
    companionTh.textContent = 'Companion';
    const totalTh = document.createElement('th');
    totalTh.textContent = 'Total';

    const attendingTr = document.createElement('tr');
    attendingTr.appendChild(attendingTh);
    attendingTr.appendChild(companionTh);
    attendingTr.appendChild(totalTh);
    table.appendChild(attendingTr);

    let totalGuests = 0;

    records.forEach((guest) => {
      const guestTr = document.createElement('tr');
      const nameTd = document.createElement('td');
      const companionTd = document.createElement('td');
      const totalTd = document.createElement('td');

      nameTd.textContent = guest.name;
      companionTd.textContent = guest.companion || '';
      totalTd.textContent = 1 + (guest.companion ? 1 : 0);

      guestTr.appendChild(nameTd);
      guestTr.appendChild(companionTd);
      guestTr.appendChild(totalTd);

      table.appendChild(guestTr);
      totalGuests += 1 + (guest.companion ? 1 : 0);
    });

    const summaryTr = document.createElement('tr');
    const totalTd = document.createElement('td');
    totalTd.textContent = `Total Guests: ${totalGuests}`;
    totalTd.setAttribute('colspan', '3');
    summaryTr.appendChild(totalTd);
    table.appendChild(summaryTr);
  } catch (error) {
    console.log('Error fetching guest data:', error);
  }
}

// "logout" the last authenticated account
//pb.authStore.clear();
//logoutButton.addEventListener('sumbit', pb.authStore.clear());
