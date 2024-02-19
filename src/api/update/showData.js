const attendingContent = document.querySelector('#response');

function renderShowData(data) {
  const items = data.items;

  items.forEach((item) => {
    const contentDiv = document.createElement('div');
    const success = document.createElement('h2');
    const id = document.createElement('p');
    const name = document.createElement('h4');
    const companion = document.createElement('h4');
    const attending = document.createElement('h4');
    const allergy = document.createElement('h4');
    contentDiv.classList.add('content');
    contentDiv.setAttribute('id', 'contentData');
    success.setAttribute('id', 'successData');
    id.setAttribute('id', 'idData');
    name.setAttribute('id', 'nameData');
    companion.setAttribute('id', 'companionData');
    attending.setAttribute('id', 'attendingData');
    allergy.setAttribute('id', 'allergyData');

    if (item.attending === true) {
      success.textContent = 'Data submitted successfully';
      id.textContent = `ID: ${item.id}`;
      attending.textContent = `Attending: yes, can't wait!`;
      name.textContent = `Name: ${item.name}`;
      companion.textContent = `Companion: ${item.companion}`;
      allergy.textContent = `Allergies: ${item.allergy}`;
    } else {
      success.textContent = 'Data submitted successfully';
      id.textContent = `ID: ${item.id}`;
      attending.textContent = `Attending: no, unfortunately can't come`;
      name.textContent = `Name: ${item.name}`;
    }
    contentDiv.append(success, id, name, companion, attending, allergy);
    attendingContent.appendChild(contentDiv);
  });
}
export default renderShowData;
