const notAttendingContent = document.querySelector('#not-attending');

function renderNotAttending(data) {
  if (data.attending === false) {
    const contentDiv = document.createElement('div');
    const name = document.createElement('h2');
    const date = document.createElement('h4');

    contentDiv.classList.add('content');

    name.textContent = `${data.name}`;

    contentDiv.append(name, date);
    notAttendingContent.appendChild(contentDiv);
  }
}

export default renderNotAttending;
