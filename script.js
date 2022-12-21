const form = document.querySelector("form");
const storables = {
  instructorsName: {
    element: document.querySelector("#instructorsName"),
  },
  school: { element: document.querySelector("#school") },
  district: { element: document.querySelector("#district") },
};

function studentRows() {
  const addRow = document.querySelector("#addRow");
  const removeRow = document.querySelector("#removeRow");
  let row = 0;
  const addRowFunc = (event) => {
    event ? event.preventDefault() : null;
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><input name="name${row}" id="name${row}" /></td>
      <td><input name="reason${row}" id="reason${row}" /></td>
    `;
    document.querySelector("tbody").appendChild(tr);
    row++;
  };
  const removeRowFunc = (event) => {
    event ? event.preventDefault() : null;
    document.querySelector("tbody>:last-child").remove();
    row--;
  };
  const disabler = () => {
    if (row <= 1) {
      removeRow.disabled = true;
    } else {
      removeRow.disabled = false;
    }
  };
  addRow.onclick = (event) => {
    addRowFunc(event);
    disabler();
  };
  addRowFunc();
  removeRow.onclick = (event) => {
    removeRowFunc(event);
    disabler();
  };
}

function initAndComputeValues() {
  const testDate = document.querySelector("#testDate");
  testDate.valueAsDate = new Date();
  Object.keys(storables).forEach((key) => {
    storables[key].element.value = localStorage.getItem(key);
  });
  form.onchange = (event) => {
    console.log(event.target.id);
    if (Object.keys(storables).includes(event.target.id)) {
      storables[event.target.id].value = event.target.value;
      localStorage.setItem(event.target.id, event.target.value);
    }
  };
}

function clearValues() {
  const clearButton = document.querySelector("#clearButton");
  clearButton.onclick = (event) => {
    localStorage.clear();
    form.reset();
  };
}

form.onsubmit = (event) => {
  event.preventDefault();
  console.log(new FormData(form));
  const data = new FormData(form);
  //data.append("form-name", "newsletter");
  fetch("/", {
    method: "POST",
    body: data,
  })
    .then(() => {
      form.innerHTML = `<div class="form--success">Almost there! Check your inbox for a confirmation e-mail.</div>`;
    })
    .catch((error) => {
      form.innerHTML = `<div class="form--error">Error: ${error}</div>`;
    });
};

studentRows();
initAndComputeValues();
clearValues();
