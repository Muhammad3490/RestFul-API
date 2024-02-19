//using the api
fetch("http://localhost:4000/api/users")
  .then((response) => response.json())
  .then((data) => console.log("Data from simple fetch request", data))
  .catch((err) => console.log("Error :", err));
// script.js

// Assuming this code is within an event handler, e.g., a button click event
function editUser(id, data) {
  axios
    .patch(`http://localhost:4000/api/users/${id}`, data)
    .then((response) => {
      console.log("Edit user:", response.data);
    })
    .then(data=>alert("User updated!"))

    .catch((error) => {
      console.error("Error in editing the user:", error);
    });
}

// Attach the function to an event, e.g., a button click event
const btn = document.getElementById("editbtn");
btn.addEventListener("click", (e) => {
  e.preventDefault();
  let userId = document.getElementById("editId").value;
  let editedUser = {
    first_name: document.getElementById("efirst_name").value,
    last_name: document.getElementById("elast_name").value,
    email: document.getElementById("eemail").value,
    gender: document.getElementById("egender").value,
    city: document.getElementById("ecity").value,
  };
  editUser(userId, editedUser);
});

let deleteBtn = document
  .getElementById("deleteBtn")
  .addEventListener("click", (e) => {
    let deleteId = document.getElementById("deleteId").value;
    deleteUser(e, deleteId);
  });

function deleteUser(event, id) {
  event.preventDefault();
  axios
    .delete(`http://localhost:4000/api/users/${id}`)
    .then((response) => console.log("User deleted :", response))
    .then(data=>alert("User deleted!"))
    .catch((err) => console.log("Error: ", err));
}
let addUser = document
  .getElementById("addUser")
  .addEventListener("click", (e) => {
    e.preventDefault();
    let newUser = {
      first_name: document.getElementById("first_name").value,
      last_name: document.getElementById("last_name").value,
      email: document.getElementById("email").value,
      gender: document.getElementById("gender").value,
      city: document.getElementById("city").value,
    };
    createNewUser(newUser);
  });

function createNewUser(data) {
  axios
    .post(`http://localhost:4000/api/users`, data)
    .then((response) => console.log("Added new user :", response))
    .then(data=>alert("Added new user!"))
    .catch((err) => console.log("Error in adding the new user", err));
}

