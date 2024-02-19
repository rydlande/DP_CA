import pb from '../../lib/pocketbase.js';
import renderCreatedData from './createdData.js';
const form = document.querySelector('#createForm');
const attendingInput = document.querySelector('#attending');
const companionInput = document.querySelector('#companion');
const allergyInput = document.querySelector('#allergy');

const handleAttendingChange = () => {
  const attendingChecked = attendingInput.checked;
  companionInput.disabled = !attendingChecked;
  allergyInput.disabled = !attendingChecked;
  companionInput.value = '';
  allergyInput.value = '';
};
attendingInput.addEventListener('change', handleAttendingChange);

async function handleSubmit(e) {
  e.preventDefault();
  const formData = new FormData(form);

  try {
    const data = await pb
      .collection('data')
      .create(Object.fromEntries(formData.entries()));
    renderCreatedData(data);
    form.reset();
  } catch (error) {
    alert('An error occurred while submitting data. Please try again.');
  }
}
form.addEventListener('submit', handleSubmit);
