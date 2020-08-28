const pool = require("./db");

const insertMessage = async (body, sender_id, chat_id) => {
  try {
    const message = await pool.query(
      `INSERT INTO message(body, sender_id, chat_id)
       VALUES ($1,$2,$3)`,
      [body, sender_id, chat_id]
    );
    const chat = await pool.query(
      `UPDATE chat SET updated_at = NOW() WHERE id = $1`,
      [chat_id]
    );
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

const getChatMessages = async (chat_id, offset, limit) => {
  try {
    const messages = await pool.query(
      `SELECT msg.id, msg.chat_id, msg.body, msg.created_at, msg.sender_id, u.first_name, u.last_name from message as msg
       JOIN users as u ON msg.sender_id = u.id
       WHERE chat_id=$1 ORDER BY created_at DESC OFFSET $2 LIMIT $3;`,
      [chat_id, offset, limit]
    );
    return Promise.resolve(messages.rows);
  } catch (error) {
    return Promise.reject(error);
  }
};
const messageById = async (msgId) => {
  try {
    const messages = await pool.query(
      `SELECT msg.id, msg.chat_id, msg.body, msg.created_at, msg.sender_id, u.first_name, u.last_name from message as msg
       JOIN users as u ON msg.sender_id = u.id
       WHERE id=$1`,
      [msgId]
    );
    return Promise.resolve(messages.rows);
  } catch (error) {
    return Promise.reject(error);
  }
};

const createChat = async (sender_id, receiver_id) => {
  try {
    const chat = await pool.query(
      `INSERT INTO chat(sender_id, receiver_id)
          VALUES ($1,$2)`,
      [sender_id, receiver_id]
    );
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

const getUserChat = async (user_id, offset, limit) => {
  try {
    const chat = await pool.query(
      `select id,sender_id, receiver_id from chat where sender_id=$1 OR receiver_id=$1 ORDER BY updated_at DESC OFFSET $2 LIMIT $3;`,
      [user_id, offset, limit]
    );
    return Promise.resolve(chat.rows);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getChatDetail = async (chat_id) => {
  try {
    const chat = await pool.query(
      `SELECT * FROM chat WHERE id = $1
       `,
      [chat_id]
    );
    return Promise.resolve(chat.rows[0]);
  } catch (error) {
    return Promise.reject(error);
  }
};

module.exports = {
  insertMessage,
  getChatMessages,
  createChat,
  getUserChat,
  getChatDetail,
  messageById,
};
