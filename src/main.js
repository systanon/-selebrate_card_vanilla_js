import './styles/main.scss';

const createCardBtn = document.getElementById('create-card');
const modalWrapp = document.getElementById('modal-wrapp');
const buttonCloseModal = document.getElementById('close-form');
const cardList = document.getElementById('card-list');
const submit = document.getElementById('sub');

const form = document.getElementById('card-form');
const inputHoliday = document.getElementById('holidays');
const inputText = document.getElementById('text-selebrate');
const inputAdress = document.getElementById('text-adress');
const fromPicture = document.getElementById('formPicture');


const defaultSrc = '/src/image/monkey.jpg';
fromPicture.src = defaultSrc;

const inputs = ['', '', ''];

const checked = () => {
  let empty = false;
  inputs.forEach((i) => {
    const a = i.length === 0 ? empty = true : null;
    return a;
  });
  if (empty) {
    // скрыть кнопку
    submit.disabled = true;// 'disabled';
  } else {
    // показать кнопку
    submit.disabled = false;// 'enable';
  }
};

const validateInputHandlerH = (e) => {
  inputs[0] = e.target.value;
  checked();
};
const validateInputHandlerT = (e) => {
  inputs[1] = e.target.value;
  checked();
};
const validateInputHandlerA = (e) => {
  inputs[2] = e.target.value;
  checked();
};

inputHoliday.addEventListener('change', validateInputHandlerH);
inputText.addEventListener('change', validateInputHandlerT);
inputAdress.addEventListener('change', validateInputHandlerA);


createCardBtn.addEventListener('click', () => {
  modalWrapp.style.display = 'block';
  createCardBtn.style.display = 'none';
  fromPicture.src = defaultSrc;
});

const closeFormHandler = () => {
  modalWrapp.style.display = 'none';
  createCardBtn.style.display = 'block';
  submit.disabled = true;
};

const deleteHandler = (e) => {
  e.target.parentNode.parentNode.removeChild(e.target.parentNode);
};

function clearForm() {
  inputHoliday.value = '';
  inputText.value = '';
  inputAdress.value = '';
}


buttonCloseModal.addEventListener('click', closeFormHandler);


const changeImageHandler = (e) => {
  fromPicture.src = URL.createObjectURL(e.target.files[0]);
  fromPicture.style = `
    width:400px;
    max-height:400px;
  `;
};

document.getElementById('add-picture-btn')
  .addEventListener('change', changeImageHandler);

function createCardHendler() {
  const div = document.createElement('div');
  div.style = `
      position:relative;
      width:800px;
      margin:0 auto;
      background:red;
    `;

  const h2 = document.createElement('h2');
  h2.innerText = `С праздником ${inputs[0]}, желаю ${inputs[1]}, ${inputs[2]}`;
  clearForm();

  const img = document.createElement('img');
  img.src = fromPicture.src;
  img.style = `
    width:400px;
    max-height:400px;
    margin:0 auto;
  `;
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = 'delete ';
  deleteBtn.style = `
    position:absolute;
    top:0;
    right:0;
    width:50px;
    height:50px;
    background:green;
  `;
  cardList.appendChild(div);
  div.appendChild(h2);
  div.appendChild(img);
  div.appendChild(deleteBtn);
  deleteBtn.addEventListener('click', deleteHandler);
  closeFormHandler();
  fromPicture.src = defaultSrc;
}
submit.addEventListener('click', createCardHendler);

form.addEventListener('submit', (e) => {
  e.preventDefault();
});

const changeHandler = (e) => {
  e.stopPropagation();
};
// хендлер на форме
form.addEventListener('change', changeHandler);

// хендлер на инпуте
// document.getElementById('holidays').addEventListener("change",changeHandler)
