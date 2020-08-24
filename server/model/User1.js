const pool = require("./db");
const { search } = require("../routes/api/user");

const insertUser = async (first_name, last_name, email, password) => {
  try {
    const artist = await pool.query(
      `INSERT INTO users(first_name,last_name,email,password) VALUES ($1,$2,$3,$4)`,
      [first_name, last_name, email, password]
    );
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

const getUserById = async (id) => {
  try {
    const user = await pool.query(
      `SELECT id, first_name,last_name,email FROM users WHERE id=$1`,
      [id]
    );
    return Promise.resolve(user.rows[0]);
  } catch (error) {
    return Promise.reject(error);
  }
};
const getUserByEmail = async (email) => {
  try {
    const user = await pool.query(
      `SELECT id,first_name,last_name,email,password FROM users WHERE email=$1`,
      [email]
    );
    console.log(user.rows[0]);
    return Promise.resolve(user.rows[0]);
  } catch (error) {
    return Promise.reject(error);
  }
};
const getUser = async (search) => {
  try {
    const user = await pool.query(
      `SELECT id,first_name,last_name,email FROM users WHERE first_name LIKE '%${search}%'`
    );
    return Promise.resolve(user.rows);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = { insertUser, getUserById, getUserByEmail, getUser };
