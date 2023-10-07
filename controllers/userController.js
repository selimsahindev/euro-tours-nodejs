const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Get all users route is not yet defined',
  });
};

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Get user route is not yet defined',
  });
};

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'Create user route is not yet defined',
  });
};

module.exports = { getAllUsers, getUser, createUser };
