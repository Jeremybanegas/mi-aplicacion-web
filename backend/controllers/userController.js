const User = require('../models/User');
const { handleError } = require('../utils/errorHandler');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.getUsers();
    res.status(200).json(users);
  } catch (error) {
    handleError(error, res);
  }
};

exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Nombre y email son obligatorios' });
  try {
    const message = await User.createUser(name, email);
    res.status(201).json({ message });
  } catch (error) {
    handleError(error, res);
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const message = await User.updateUser(id, name, email);
    res.status(200).json({ message });
  } catch (error) {
    handleError(error, res);
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await User.deleteUser(id);
    res.status(200).json({ message });
  } catch (error) {
    handleError(error, res);
  }
};