const attendingContent = document.querySelector('#attending');

function renderGuests(data) {
  if (data.attending === true) {
    const contentDiv = document.createElement('div');
    const name = document.createElement('h2');
    const date = document.createElement('h4');

    contentDiv.classList.add('content');

    name.textContent = `${data.name}`;
    date.textContent = `${data.companion}`;

    contentDiv.append(name, date);
    attendingContent.appendChild(contentDiv);
  }
}

export default renderGuests;
