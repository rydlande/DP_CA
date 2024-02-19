import pb from '../../lib/pocketbase.js';
const notAttendingContent = document.querySelector('#not-attending');

function renderNotAttending(data) {
  const contentDiv = document.createElement('div');
  const name = document.createElement('h2');
  const button = document.createElement('button');
  button.setAttribute('type', 'button');
  button.textContent = 'Attending';

  button.addEventListener('click', async () => {
    const switchToTrue = { attending: true };

    try {
      if (data.attending != true) {
        await pb.collection('data').update(data.id, switchToTrue);
        contentDiv.remove();
      }
    } catch (error) {
      alert('An error occurred while submitting data. Please try again.');
    }
  });

  if (data.attending === false) {
    contentDiv.classList.add('content');
    name.textContent = `${data.name}`;
    contentDiv.append(name, button);
    notAttendingContent.appendChild(contentDiv);
  }
}
export default renderNotAttending;
