const store = require("store2");
// Create and Save a new User
exports.create = (req, res) => {
  // Validate request

  if (!req.body.id) {
    res
      .status(400)
      .send({ data: [], success: false, message: "ID can not be empty!" });
    return;
  } else if (!req.body.name) {
    res
      .status(400)
      .send({ data: [], success: false, message: "Name can not be empty!" });
    return;
  } else if (!req.body.email) {
    res
      .status(400)
      .send({ data: [], success: false, message: "Email can not be empty!" });
    return;
  }

  var users = store("users");

  if (users == "" || users == null) {
    users = [];
  }

  var user = {
    id: req.body.id ? req.body.id : "",
    name: req.body.name ? req.body.name : "",
    email: req.body.email ? req.body.email : "",
    age: req.body.age ? req.body.age : "",
    country: req.body.country ? req.body.country : "",
    gender: req.body.gender ? req.body.gender : "",
  };
  users.push(user);

  store({ users: users });

  res.send({ data: user, success: true, message: "User created sucessfully" });

  res.send(users);
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  var users = store("users");
  if (!users) {
    users = [];
  }
  res.send({ data: users, success: true, message: "Data fetched sucessfully" });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  var users = store("users");

  if (users) {
    for (let index = 0; index < users.length; index++) {
      if (users[index].id == id) {
        res.send({
          data: users[index],
          success: false,
          message: "Data fetched successfully",
        });
      }
    }
  }
  res.send({
    data: [],
    success: false,
    message: "Record does not exist against this ID",
  });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  if (!id) {
    res
      .status(400)
      .send({ data: [], success: false, message: "ID can not be empty!" });
    return;
  } else if (!req.body.name) {
    res
      .status(400)
      .send({ data: [], success: false, message: "Name can not be empty!" });
    return;
  } else if (!req.body.email) {
    res
      .status(400)
      .send({ data: [], success: false, message: "Email can not be empty!" });
    return;
  }

  var user = {
    id: id,
    name: req.body.name ? req.body.name : "",
    email: req.body.email ? req.body.email : "",
    age: req.body.age ? req.body.age : "",
    country: req.body.country ? req.body.country : "",
    gender: req.body.gender ? req.body.gender : "",
  };

  var users = store("users");
  if (users) {
    var flag = false;
    for (let index = 0; index < users.length; index++) {
      if (users[index].id == id) {
        users[index] = user;
        flag = true;
      }
    }

    if (flag) {
      store(false);
      store({ users: users });
      res.send({
        data: user,
        success: true,
        message: "Record has been updated successfully",
      });
    }
  }
  res.send({
    data: [],
    success: false,
    message: "Record does not exist against this ID",
  });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  var users = store("users");

  if (users) {
    var flag = false;
    for (let index = 0; index < users.length; index++) {
      if (users[index].id == id) {
        users.splice(index, 1);

        flag = true;
      }
    }
    if (flag) {
      store(false);
      store({ users: users });
      res.send({
        data: [],
        success: true,
        message: "Record deleted successfully",
      });
    }
  }
  res.send({
    data: [],
    success: false,
    message: "Record does not exist against this ID",
  });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  store(false);
  res.send({
    data: [],
    success: true,
    message: "Records deleted successfully",
  });
};
