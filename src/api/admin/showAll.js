import pb from '../../lib/pocketbase.js';
const attendingContent = document.querySelector('#all');

function renderAll(data) {
  const contentDiv = document.createElement('div');
  const id = document.createElement('p');
  const name = document.createElement('h2');
  const companion = document.createElement('h4');
  const attending = document.createElement('h4');
  const allergy = document.createElement('h4');
  const deleteButton = document.createElement('button');
  deleteButton.setAttribute('type', 'button');
  deleteButton.textContent = 'Delete';
  contentDiv.classList.add('content');

  id.textContent = `ID: ${data.id}`;
  name.textContent = `${data.name}`;

  if (data.attending != false) {
    attending.textContent = 'Attending';
  } else {
    attending.textContent = 'Not attending';
  }
  if (data.companion != '') {
    companion.textContent = `Companion: ${data.companion}`;
  } else {
    companion.textContent = '';
  }
  if (data.allergy != '') {
    allergy.textContent = `Allergies: ${data.allergy}`;
  } else {
    allergy.textContent = '';
  }

  deleteButton.addEventListener('click', async () => {
    try {
      await pb.collection('data').delete(data.id);
      contentDiv.remove();
    } catch (error) {
      alert('An error occurred while submitting data. Please try again.');
    }
  });

  contentDiv.append(id, name, companion, attending, allergy, deleteButton);
  attendingContent.appendChild(contentDiv);
}
export default renderAll;
