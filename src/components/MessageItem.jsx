import PropTypes from "prop-types";
const MessageItem = ({ sender, content }) => {
  return (
    <div className={`message-item ${sender === "User" ? "user" : "chatgpt"}`}>
      <strong>{sender}:</strong>
      <p>{content}</p>
    </div>
  );
};
MessageItem.propTypes = {
  sender: PropTypes.string.isRequired, // Kiểu dữ liệu string, bắt buộc
  content: PropTypes.string.isRequired, // Kiểu dữ liệu string, bắt buộc
};

export default MessageItem;
