const { pool } = require('../config/db');

const getUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM Users');
  return rows;
};

const createUser = async (name, email) => {
  await pool.query('INSERT INTO Users (name, email) VALUES (?, ?)', [name, email]);
  return 'Usuario creado correctamente';
};

const updateUser = async (id, name, email) => {
  await pool.query('UPDATE Users SET name = ?, email = ? WHERE id = ?', [name, email, id]);
  return 'Usuario actualizado correctamente';
};

const deleteUser = async (id) => {
  await pool.query('DELETE FROM Users WHERE id = ?', [id]);
  return 'Usuario eliminado correctamente';
};

module.exports = { getUsers, createUser, updateUser, deleteUser };