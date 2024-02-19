const allergyContent = document.querySelector('#allergies');

function renderAllergies(data) {
  if (data.attending === true) {
    const contentDiv = document.createElement('div');
    const allergy = document.createElement('h2');

    contentDiv.classList.add('content');

    allergy.textContent = `${data.allergy}`;

    contentDiv.appendChild(allergy);
    allergyContent.appendChild(contentDiv);
  }
}

export default renderAllergies;
