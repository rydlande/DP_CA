const attendingContent = document.querySelector('#attending-content');
const allergiesContent = document.querySelector('#allergies-content');
const notAttendingContent = document.querySelector('#not-attending-content');

function renderGuest(guest) {
  const attendingDiv = document.createElement('div');
  const companionDiv = document.createElement('div');
  const allergyDiv = document.createElement('div');
  const notAttendingDiv = document.createElement('div');

  attendingDiv.innerHTML = `
      <span>${guest.name}</span>`;
  companionDiv.innerHTML = `
      <span>${guest.companion}</span>`;
  allergyDiv.innerHTML = `
      <span>${guest.allergy}</span>`;
  notAttendingDiv.innerHTML = `
      <span>${guest.name}</span>`;

  if (guest.attending === true && guest.companion != '') {
    attendingContent.append(attendingDiv, companionDiv);
    allergiesContent.append(allergyDiv);
  } else if (guest.attending === true) {
    attendingContent.append(attendingDiv);
  } else if (guest.attending === false) {
    notAttendingContent.append(notAttendingDiv, companionDiv);
  }
}

export default renderGuest;
