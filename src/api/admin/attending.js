import pb from '../../lib/pocketbase.js';
const attendingContent = document.querySelector('#attending');

function renderGuests(data) {
  const contentDiv = document.createElement('div');
  const name = document.createElement('h2');
  const date = document.createElement('h4');
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.textContent = 'Not attending';

  button.addEventListener('click', async () => {
    const switchToFalse = { attending: false };
    try {
      if (data.attending != false) {
        await pb.collection('data').update(data.id, switchToFalse);
        contentDiv.remove();
      }
    } catch (error) {
      alert('An error occurred while submitting data. Please try again.');
    }
  });

  if (data.attending === true) {
    contentDiv.classList.add('content');
    name.textContent = `${data.name}`;
    date.textContent = `${data.companion}`;
    contentDiv.append(name, date, button);
    attendingContent.appendChild(contentDiv);
  }
}
export default renderGuests;
