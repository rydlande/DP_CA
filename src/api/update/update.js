import pb from '../../lib/pocketbase.js';
import BASE_URL from '../../lib/base.js';

import renderShowData from './showData.js';
import updateForm from './updateForm.js';
import updateShowData from './updateShowData.js';
const editForm = document.querySelector('#editForm');
editForm.style.display = 'none';

document.addEventListener('DOMContentLoaded', () => {
  const enterIdForm = document.querySelector('#enterIdForm');
  const enterIdInput = document.querySelector('#enterId');
  const idValue = enterIdInput.value;

  async function getData(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}?filter=id='${idValue}'`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('API request failed');
      } else {
        const data = await res.json();
        renderShowData(data);
        updateForm(data);
        editForm.style.display = 'block';
      }
    } catch (error) {
      alert('An error occurred while submitting data. Please try again.');
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
      updateShowData(data);
    } catch (error) {
      alert('An error occurred while submitting data. Please try again.');
    }
  }

  editForm.addEventListener('submit', updateFormData);
});
