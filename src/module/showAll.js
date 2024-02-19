const attendingContent = document.querySelector('#all');

function renderAll(data) {
  const contentDiv = document.createElement('div');
  const id = document.createElement('p');
  const name = document.createElement('h2');
  const date = document.createElement('h4');
  const attending = document.createElement('h4');
  const allergy = document.createElement('h4');
  contentDiv.classList.add('content');

  id.textContent = `ID: ${data.id}`;
  name.textContent = `${data.name}`;
  date.textContent = `${data.companion}`;
  attending.textContent = `${data.attending}`;
  allergy.textContent = `${data.allergy}`;

  contentDiv.append(id, name, date, attending, allergy);

  attendingContent.appendChild(contentDiv);
}

export default renderAll;
