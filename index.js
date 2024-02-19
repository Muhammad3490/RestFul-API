const express = require("express");

const app = express();
const PORT = 4000;
app.use(express.json());
//getting the users data from the file
const users = require("./MOCK_DATA (1).json");
app.use(express.urlencoded({ extended: false }));
const cors = require("cors");
app.use(cors());

const fs = require("fs");

app.get("/api/users", (req, res) => {
  return res.json(users);
});
app.get("/users", (req, res) => {
  const html = `<ul>
  ${users
    .map(
      (user) => `
    <li>
      First Name: ${user.first_name}, 
      Last Name: ${user.last_name}, 
      City: ${user.city}
    </li>
  `
    )
    .join("")}
</ul>`;

  return res.send(html);
});

app.get("/api/users/:id", (req, res) => {
  const requestId = Number(req.params.id);
  const userIndex = BinarySearch(users, requestId);
  if (userIndex >= 0) {
    return res.json(users[userIndex]);
  } else {
    return res.json({ status: "User not found" });
  }
});

app.patch("/api/users/:id", (req, res) => {
  const reqId = Number(req.params.id);
  const data = req.body;
  const index = BinarySearch(users, reqId);
  console.log(index);

  if (index == -1) {
    return res.json({ status: "User not found" });
  }

  users[index].first_name = data.first_name;
  users[index].last_name = data.last_name;
  users[index].email = data.email;
  users[index].gender = data.gender;
  users[index].city = data.city;

  // Writing the file after updating
  fs.writeFile("./MOCK_DATA (1).json", JSON.stringify(users), (err) => {
    if (err) {
      return res.status(500).json({ status: "Internal server error" });
    } else {
      return res.status(200).json({ status: "Updated data" });
    }
  });
});

app.post("/api/users", (req, res) => {
  const data = req.body;
  newId = users[users.length - 1].id + 1;
  let newUser = {
    id: newId,
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    gender: data.gender,
    city: data.city,
  };
  users.push(newUser);
  fs.writeFile("./MOCK_DATA (1).json", JSON.stringify(users), (err) => {
    if (err) {
      return res.status(500).json({ status: "Internal server error" });
    } else {
      return res.status(200).json({ status: "Added new user" });
    }
  });
});

app.delete("/api/users/:id", (req, res) => {
  const reqId = Number(req.params.id);
  const index = BinarySearch(users, reqId);
  if (index == -1) {
    return res.json({ status: "User not found" });
  }
  users.splice(index, 1);
  fs.writeFile("./MOCK_DATA (1).json", JSON.stringify(users), (err) => {
    if (err) {
      return res.status(500).json({ status: "Internal server error" });
    } else {
      return res.status(200).json({ status: "Deleted the user" });
    }
  });
});

//function
const BinarySearch = (users, id) => {
  let start = 0;
  let end = users.length - 1;
  while (start <= end) {
    let mid = Math.floor((start + end) / 2); // Ensure proper order of operations
    if (users[mid].id === id) {
      return mid;
    } else if (id > users[mid].id) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }
  return -1; // Return -1 when the element is not found
};

app.listen(PORT, () => {
  console.log("Server running");
});
