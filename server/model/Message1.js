const pool = require("./db");

const insertMessage = async (body, sender_id, chat_id) => {
  try {
    const message = await pool.query(
      `INSERT INTO message(body, sender_id, chat_id)
       VALUES ($1,$2,$3)`,
      [body, sender_id, chat_id]
    );
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
};

const getChatMessages = async (chat_id, offset, limit) => {
  try {
    const messages = await pool.query(
      `SELECT body, sender_id FROM message WHERE chat_id=$1 ORDER BY created_at DESC OFFSET $2 LIMIT $3;`,
      [chat_id, offset, limit]
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

module.exports = { insertMessage, getChatMessages, createChat, getUserChat };
