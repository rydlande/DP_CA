import renderShowData from './showData.js';
import updateForm from './updateForm.js';
import updateShowData from './updateShowData.js';
import PocketBase from 'https://cdn.jsdelivr.net/gh/pocketbase/js-sdk@latest/dist/pocketbase.es.mjs';

const url = 'https://rydlande.pockethost.io/';
const pb = new PocketBase(url);

const editForm = document.querySelector('#editForm');
editForm.style.display = 'none';

document.addEventListener('DOMContentLoaded', () => {
  const URL = 'https://rydlande.pockethost.io/api/collections/data/records';
  const enterIdForm = document.querySelector('#enterIdForm');

  const enterIdInput = document.querySelector('#enterId');
  const idValue = enterIdInput.value;

  async function getData(e) {
    e.preventDefault();

    try {
      const res = await fetch(`${URL}?filter=id='${idValue}'`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('API request failed');
      } else {
        const data = await res.json();
        console.log(data);
        renderShowData(data);
        updateForm(data);
        editForm.style.display = 'block';
      }
    } catch (error) {
      console.error(error);
    }
  }

  enterIdForm.addEventListener('submit', getData);

  async function updateFormData(e) {
    e.preventDefault();

    const attending = document.querySelector('#attending');
    const name = document.querySelector('#name');
    const companion = document.querySelector('#companion');
    const allergy = document.querySelector('#allergy');

    const newData = {
      attending: attending.checked,
      name: name.value,
      companion: companion.value,
      allergy: allergy.value,
    };

    try {
      const data = await pb.collection('data').update(idValue, newData);
      console.log(data);
      updateShowData(data);
    } catch (error) {
      console.error(error);
      alert('An error occurred while submitting data. Please try again.');
    }
  }
  editForm.addEventListener('submit', updateFormData);
});
