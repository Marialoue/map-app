const User = require("./User");

// these are the CRUD methods
// only this method (createUser - POST) is implemented in front end
const createUser = (request, response) => {
  const body = request.body;

  const user = new User({
    username: body.username,
    email: body.email,
    password: body.password,
    confirmPassword: body.confirmPassword,
  });

  user
    .save()
    .then(() => {
      return response.status(201).json();
    })
    .catch((error) => {
      return response.status(400).json();
    });
};

const updateUser = async (request, response) => {
  const body = request.body;

  User.findOne({ _id: request.params.id }, (error, user) => {
    if (error) {
      return response.status(404).json({ error });
    }
    user.username = body.username;
    user.email = body.email;
    user.password = body.password;
    user.confirmPassword = body.confirmPassword;

    user
      .save()
      .then(() => {
        return response.status(200).json();
      })
      .catch((error) => {
        return response.status(404).json({ error });
      });
  });
};

const deleteUser = async (request, response) => {
  await User.findOneAndDelete({ _id: request.params.id }, (error, user) => {
    if (error) {
      return response.status(400).json({ error });
    }

    if (!user) {
      return response.status(404).json({ error: `User not found` });
    }

    return response.status(200).json({ data: user });
  }).catch((error) => console.log(error));
};

const getUserById = async (req, response) => {
  await User.findOne({ _id: req.params.id }, (error, user) => {
    if (error) {
      return response.status(400).json({ success: false, error: error });
    }

    if (!user) {
      return response
        .status(404)
        .json({ success: false, error: `User not found` });
    }
    return response.status(200).json({ success: true, data: user });
  }).catch((error) => console.log(error));
};

const getUsers = async (request, response) => {
  await User.find({}, (error, users) => {
    if (error) {
      return response.status(400).json({ error });
    }
    if (!users.length) {
      return response
        .status(404)
        .json({ error: `User not found` });
    }
    return response.status(200).json({ data: users });
  }).catch((error) => console.log(error));
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUsers,
};
