function changeTestResultDisplay(show) {
  var testResultElement = document.getElementById('test-result-question');
  if (show) {
    testResultElement.style.display = 'block';
  } else {
    testResultElement.style.display = 'none';
  }
}

var symptomCheckboxes = document.querySelectorAll(
  'input[type=checkbox][name^=symptom-]'
);

function isAtLeastOneCheckboxChecked(checkboxes) {
  for (var i = 0; i < checkboxes.length; i++) {
    if (checkboxes[i].checked) {
      return true;
    }
  }
  return false;
}

function symptomCheckboxClicked() {
  var symptomStartElement = document.getElementById('symptom-start-question');
  if (isAtLeastOneCheckboxChecked(symptomCheckboxes)) {
    symptomStartElement.style.display = 'block';
  } else {
    symptomStartElement.style.display = 'none';
  }
}

for (var i = 0; i < symptomCheckboxes.length; i++) {
  symptomCheckboxes[i].addEventListener('change', symptomCheckboxClicked);
}
