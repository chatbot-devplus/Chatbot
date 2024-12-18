
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import ChatWindow from "../components/ChatWindow";
import MessageInput from "../components/MessageInput";

const Homepage = () => {
  return (
    <div className="homepage">
      <Sidebar />
      <div className="chat-container">
        <ChatHeader />
        <ChatWindow />
        <MessageInput />
      </div>
    </div>
  );
};

export default Homepage;
