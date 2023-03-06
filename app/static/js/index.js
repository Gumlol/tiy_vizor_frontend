const WRAPPERS = document.querySelectorAll('.wrapper');
const BUTTONS = document.querySelectorAll('.wrapper-button');
const INPUTS = document.querySelectorAll('.search-input');
const SEARCHS = document.querySelectorAll('.search-list');
const API_URL = 'http://81.200.145.23:443';

const FRONT_URL = 'http://127.0.0.1:5500';

async function getGroups() {
  let data = await fetch(`${API_URL}/api/v1/groups/all`);
  let response = await data.json();
  return response;
}

async function getTeachers() {
  let data = await fetch(`${API_URL}/api/v1/groups/all_teachers`);
  let response = await data.json();
  return response;
}

async function getCabinets() {
  let data = await fetch(`${API_URL}/api/v1/groups/all_cabinets`);
  let response = await data.json();
  return response;
}

BUTTONS[0].addEventListener('click', () => {
  WRAPPERS[0].classList.toggle('active');

  WRAPPERS[1].classList.remove('active');
  WRAPPERS[2].classList.remove('active');
})

BUTTONS[1].addEventListener('click', () => {
  WRAPPERS[1].classList.toggle('active');

  WRAPPERS[0].classList.remove('active');
  WRAPPERS[2].classList.remove('active');
})

BUTTONS[2].addEventListener('click', () => {
  WRAPPERS[2].classList.toggle('active');

  WRAPPERS[0].classList.remove('active');
  WRAPPERS[1].classList.remove('active');
})

function filterPairs() {
  let filter = INPUTS[0].value.toUpperCase();
  let as = SEARCHS[0].querySelectorAll('a');
  for (i = 0; i < as.length; i++) {
    txtValue = as[i].textContent || as[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      as[i].style.display = '';
    } else {
      as[i].style.display = "none";
    }
  }
}

function filterTeachers() {
  let filter = INPUTS[1].value.toUpperCase();
  let as = SEARCHS[1].querySelectorAll('a');
  for (i = 0; i < as.length; i++) {
    txtValue = as[i].textContent || as[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      as[i].style.display = '';
    } else {
      as[i].style.display = "none";
    }
  }
}

function filterCabinets() {
  let filter = INPUTS[2].value.toUpperCase();
  let as = SEARCHS[2].querySelectorAll('a');
  for (i = 0; i < as.length; i++) {
    txtValue = as[i].textContent || as[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      as[i].style.display = '';
    } else {
      as[i].style.display = "none";
    }
  }
}

async function onloadGroups() {
  let groups = await getGroups();
  for (let i of groups) {
    let a = Object.assign(document.createElement('a'), { className: 'search-list-element', textContent: `${i.name}-${i.year}-${i.base}-${i.number}` });
    a.href = `/schedule?dispatcher=${i.dispatcher_id}&group=${i.id}&name=${i.name}-${i.year}-${i.base}-${i.number}`;
    SEARCHS[0].appendChild(a);
  }
}

async function onloadTeachers() {
  let teachers = await getTeachers();
  for (let i of teachers) {
    if (i.name === '------') {
      continue;
    } else {
      let a = Object.assign(document.createElement('a'), { className: 'search-list-element', textContent: `${i.name}` });
      a.href = `/teachers?teacher_id=${i.id}&name=${i.name}`;
      SEARCHS[1].appendChild(a);
    }
  }
}

async function onloadCabinets() {
  let cabinets = await getCabinets();
  for (let i of cabinets) {
    let multimedia = i.is_multimedia ? 'м' : '';
    let computer = i.is_computer ? 'к' : '';
    let a = Object.assign(document.createElement('a'), { className: 'search-list-element', textContent: `${i.number}${multimedia}${computer} (${i.corps} корпус)` });
    a.href = `/cabinets?cabinet_id=${i.id}&name=${i.number}&corps=${i.corps}`;
    SEARCHS[2].appendChild(a);
  }
}

document.body.onload = function () {
  onloadGroups();
  onloadTeachers();
  onloadCabinets();
}
