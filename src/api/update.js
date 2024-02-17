import PocketBase from 'https://cdn.jsdelivr.net/gh/pocketbase/js-sdk@latest/dist/pocketbase.es.mjs';

const url = 'https://rydlande.pockethost.io/';
const pb = new PocketBase(url);

const editForm = document.querySelector('#editForm');
const editId = document.querySelector('#id');
const nameInput = document.querySelector('#name');
const attendingInput = document.querySelector('#attending');
const companionInput = document.querySelector('#companion');
const allergyInput = document.querySelector('#allergy');

const response = document.querySelector('#response');

const handleAttendingChange = () => {
  const attendingChecked = attendingInput.checked;
  companionInput.disabled = !attendingChecked;
  allergyInput.disabled = !attendingChecked;
};
attendingInput.addEventListener('change', handleAttendingChange);

async function update(e) {
  e.preventDefault();

  const id = editId.value;

  const newData = {
    name: nameInput.value,
    attending: attendingInput.checked,
    companion: companionInput.value,
    allergy: allergyInput.value,
  };

  try {
    const record = await pb.collection('data').update(id, newData);
    console.log('Record updated:', record);
    response.innerHTML = 'Record updated successfully!';
    editForm.reset();
  } catch (error) {
    console.error('Error updating record:', error);
    response.innerHTML = `Error: ${error.message}`;
  }
}

editForm.addEventListener('submit', update);
