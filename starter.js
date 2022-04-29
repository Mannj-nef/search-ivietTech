const form = document.querySelector(".form");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const tbodySearch = document.querySelector(".tbody-search");
const tbodyShow = document.querySelector(".tbody-show");
const noData = document.querySelector(".no-data");
const searchBtn = document.querySelector(".btn-search");
const btnUpdate = document.querySelector(".btn-update");
const btnRemove = document.querySelector(".btn-remove");
const inputName = document.querySelector("#name");
const inputClass = document.querySelector("#class");
const show = document.querySelector(".btn-show");
const tblShow = document.querySelector(".tbl-show");

let index;

const listStudent = [
  {
    id: 1,
    name: "Võ Mạnh Quân",
    className: "FE",
  },
  {
    id: 2,
    name: "Nguyễn Văn A",
    className: "FE",
  },
  {
    id: 3,
    name: "Nguyễm Văn B",
    className: "AB",
  },
  {
    id: 4,
    name: "Nguyễn Văn C",
    className: "BE",
  },
];

function handleTbody(value, nodeElement) {
  const student = `
        <tr class="tbl-tr">
          <th scope="row" data-id="id">${value.id}</th>
          <td data-name="name">${value.name}</td>
          <td data-class="class">${value.className}</td>
          ${
            !nodeElement.classList.contains("tbody-search")
              ? `<td style="text-align: end">
              <button class="btn btn-update">Update</button>
                <button class="btn btn-remove">Remove</button>
              </td>`
              : ""
          }  
        </tr>
      `;

  nodeElement.insertAdjacentHTML("beforeend", student);
}

function addlistStudent(nodeElement) {
  listStudent.forEach((item) => {
    handleTbody(item, nodeElement);
  });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let name = this.elements["name"].value;
  let className = this.elements["class"].value;

  if (searchBtn.textContent === "Search") {
    modal.classList.add("active");

    listStudent.forEach((item) => {
      const nameLowerCase = name.toLowerCase();
      const classNameLowerCase = className.toLowerCase();
      const objName = item.name.toLowerCase();
      const objClassName = item.className.toLowerCase();

      if (
        (nameLowerCase.length > 0 && objName.indexOf(nameLowerCase) > -1) ||
        (classNameLowerCase.length > 0 &&
          objClassName.indexOf(classNameLowerCase) > -1)
      ) {
        console.log(objName.indexOf(nameLowerCase));
        handleTbody(item, tbodySearch);
        noData.style.display = "none";
      }
    });
  }

  if (searchBtn.textContent === "Update") {
    const tblTr = document.querySelectorAll(".tbl-tr");
    searchBtn.textContent = "Search";

    listStudent[index - 1].name = name;
    listStudent[index - 1].className = className;

    [...tblTr].forEach((item) => item.parentNode.removeChild(item));
    addlistStudent(tbodyShow);
  }

  this.elements["name"].value = null;
  this.elements["class"].value = null;
});

show.addEventListener("click", function (e) {
  if (this.textContent === "Show") {
    this.textContent = "hidden";
    tblShow.classList.add("active");

    addlistStudent(tbodyShow);
  } else if (this.textContent === "hidden") {
    const tblTr = document.querySelectorAll(".tbl-tr");
    this.textContent = "Show";

    tblShow.classList.remove("active");
    [...tblTr].forEach((item) => item.parentNode.removeChild(item));
  }
});

document.body.addEventListener("click", function (e) {
  if (
    e.target.matches(".modal") ||
    e.target.matches(".icon") ||
    e.target.matches(".icon-close")
  ) {
    if ([...tbodySearch.children]) {
      setTimeout(() => {
        const tbodyList = [...tbodySearch.children];
        tbodyList.forEach((item) => item.parentNode.removeChild(item));
        noData.style.display = "";
      }, 500);
    }
    modal.classList.remove("active");
  }
});

tbodyShow.addEventListener("click", function (e) {
  if (e.target.matches(".btn-update")) {
    const btnUpdate = e.target;
    searchBtn.textContent = "Update";

    const classNameText =
      btnUpdate.parentNode.previousElementSibling.textContent;
    const nameText =
      btnUpdate.parentNode.previousElementSibling.previousElementSibling
        .textContent;
    const idText =
      btnUpdate.parentNode.previousElementSibling.previousElementSibling
        .previousElementSibling.textContent;

    form.elements["name"].value = nameText;
    form.elements["class"].value = classNameText;
    index = idText;
  }

  if (e.target.matches(".btn-remove")) {
    const btnRemove = e.target;

    const tbodyNode = btnRemove.parentNode.parentNode.parentNode;
    const trNode = btnRemove.parentNode.parentNode;

    tbodyNode.removeChild(trNode);
  }
});
