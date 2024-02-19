import pb from '../../lib/pocketbase.js';
import { ALLERGIES_URL } from '../../lib/base.js';

const allergyContent = document.querySelector('#allergies');

async function renderAllergies() {
  try {
    const res = await fetch(ALLERGIES_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('API request failed');
    } else {
      const data = await res.json();
      data.items.forEach((item) => {
        if (item.allergy != '') {
          const contentDiv = document.createElement('div');
          const allergy = document.createElement('h2');
          const count = document.createElement('p');
          contentDiv.classList.add('content');
          allergy.textContent = `${item.allergy}`;
          count.textContent = `Count: ${item.allergy_count}`;
          contentDiv.append(allergy, count);
          allergyContent.appendChild(contentDiv);
        }
      });
    }
  } catch (error) {
    alert('An error occurred while fetching allergy data. Please try again.');
  }
}

export default renderAllergies;
