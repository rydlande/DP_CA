const attendingContent = document.querySelector('#response');

function updateShowData(data) {
  const contentData = document.querySelector('#contentData');
  const successData = document.querySelector('#successData');
  const idData = document.querySelector('#idData');
  const nameData = document.querySelector('#nameData');
  const companionData = document.querySelector('#companionData');
  const attendingData = document.querySelector('#attendingData');
  const allergyData = document.querySelector('#allergyData');

  if (data.attending === true) {
    successData.textContent = 'Data submitted successfully';
    idData.textContent = `ID: ${data.id}`;
    attendingData.textContent = `Attending: yes, can't wait!`;
    nameData.textContent = `Name: ${data.name}`;
    companionData.textContent = `Companion: ${data.companion}`;
    allergyData.textContent = `Allergies:${data.allergy}`;
  } else {
    successData.textContent = 'Data submitted successfully';
    idData.textContent = `ID: ${data.id}`;
    attendingData.textContent = `Attending: no, unfortunately can't come`;
    nameData.textContent = `Name: ${data.name}`;
  }
  contentData.append(
    successData,
    idData,
    nameData,
    companionData,
    attendingData,
    allergyData,
  );
  attendingContent.appendChild(contentData);
}

export default updateShowData;
