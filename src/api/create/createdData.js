const attendingContent = document.querySelector('#createdData');

function renderCreatedData(data) {
  const contentDiv = document.createElement('div');
  const success = document.createElement('h2');
  const id = document.createElement('p');
  const name = document.createElement('h4');
  const date = document.createElement('h4');
  const attending = document.createElement('h4');
  const allergy = document.createElement('h4');
  contentDiv.classList.add('content');

  if (data.attending === true) {
    success.textContent = 'Data sumbitted successfully';
    id.textContent = `ID: ${data.id}`;
    attending.textContent = `Attending: yes, can't wait!`;
    name.textContent = `Name: ${data.name}`;
    date.textContent = `Companion: ${data.companion}`;
    allergy.textContent = `${data.allergy}`;
  } else {
    success.textContent = 'Data sumbitted successfully';
    id.textContent = `ID: ${data.id}`;
    attending.textContent = `Attending: no, unfortunately can't come`;
    name.textContent = `Name: ${data.name}`;
  }
  contentDiv.append(success, id, name, date, attending, allergy);
  attendingContent.appendChild(contentDiv);
}
export default renderCreatedData;
