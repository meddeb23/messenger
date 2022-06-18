const normaliseChats = (chat, user_id) => {
  if (!chat.sender._id.equals(user_id)) {
    chat.receiver = chat.sender;
  }
  delete chat.sender;
  return chat;
};

module.exports = { normaliseChats };
