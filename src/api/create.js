import PocketBase from 'https://cdn.jsdelivr.net/gh/pocketbase/js-sdk@latest/dist/pocketbase.es.mjs';

const url = 'https://rydlande.pockethost.io/';
const pb = new PocketBase(url);

const myForm = document.querySelector('#myForm');
const attendingInput = document.querySelector('#attending');
const companionInput = document.querySelector('#companion');
const allergyInput = document.querySelector('#allergy');

const handleAttendingChange = () => {
  const attendingChecked = attendingInput.checked;
  companionInput.disabled = !attendingChecked;
  allergyInput.disabled = !attendingChecked;
};

attendingInput.addEventListener('change', handleAttendingChange);

async function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(myForm);

  try {
    const data = await pb
      .collection('data')
      .create(Object.fromEntries(formData.entries()));
    alert('Data sumbitted successfully');
    myForm.reset();
    console.log(data);
  } catch (error) {
    console.log('Error submitting data:', error);
    alert('An error occurred while submitting data. Please try again.');
  }
}

myForm.addEventListener('submit', handleSubmit);

await pb
  .collection('data')
  .getFullList({
    sort: '-created',
  })
  .then((data) => {
    console.log(data);
  });
