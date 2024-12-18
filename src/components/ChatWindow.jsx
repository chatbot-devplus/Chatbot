
import MessageItem from "./MessageItem";

const ChatWindow = () => {
  const messages = [
    { id: 1, sender: "User", content: "Giải thích lệnh npm run" },
    { id: 2, sender: "ChatGPT", content: "Khi bạn chạy lệnh npm run..." },
  ];

  return (
    <div className="chat-window">
      {messages.map((msg) => (
        <MessageItem key={msg.id} sender={msg.sender} content={msg.content} />
      ))}
    </div>
  );
};

export default ChatWindow;
