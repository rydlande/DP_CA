const form = document.querySelector('#editForm');

function updateForm(data) {
  const items = data.items;

  items.forEach((item) => {
    const id = document.createElement('p');
    const nameLabel = document.createElement('label');
    const companionLabel = document.createElement('label');
    const allergyLabel = document.createElement('label');
    const attendingLabel = document.createElement('label');

    nameLabel.setAttribute('for', 'name');
    companionLabel.setAttribute('for', 'companion');
    allergyLabel.setAttribute('for', 'allergy');
    attendingLabel.setAttribute('for', 'attending');

    nameLabel.textContent = 'Name:';
    companionLabel.textContent = 'Companion:';
    allergyLabel.textContent = 'Allergy:';
    attendingLabel.textContent = 'Attending:';

    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('id', 'name');
    nameInput.setAttribute('name', 'name');
    nameInput.setAttribute('required', '');

    const companionInput = document.createElement('input');
    companionInput.setAttribute('type', 'text');
    companionInput.setAttribute('id', 'companion');
    companionInput.setAttribute('name', 'companion');

    const allergyInput = document.createElement('input');
    allergyInput.setAttribute('type', 'text');
    allergyInput.setAttribute('id', 'allergy');
    allergyInput.setAttribute('name', 'allergy');

    const attendingInput = document.createElement('input');
    attendingInput.setAttribute('type', 'checkbox');
    attendingInput.setAttribute('id', 'attending');
    attendingInput.setAttribute('name', 'attending');
    attendingInput.setAttribute('checked', '');

    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.textContent = 'Submit';

    if (item.attending === true) {
      id.textContent = `ID: ${item.id}`;
      attendingInput.checked = true;
      nameInput.value = `${item.name}`;
      companionInput.value = `${item.companion}`;
      allergyInput.value = `${item.allergy}`;
    } else {
      id.textContent = `ID: ${item.id}`;
      attendingInput.checked = false;
      nameInput.value = `${item.name}`;
      companionInput.value = '';
      allergyInput.value = '';
    }
    form.append(
      id,
      attendingLabel,
      attendingInput,
      nameLabel,
      nameInput,
      companionLabel,
      companionInput,
      allergyLabel,
      allergyInput,
      submitButton,
    );
  });
}
export default updateForm;
