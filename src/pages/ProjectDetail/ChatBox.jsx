import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useEffect, useState, useCallback, useRef } from "react"; // Added useRef
import { useDispatch, useSelector } from "react-redux";
import { fetchChatByProject, fetchChatMessages, sendMessage, deleteMessage } from "../../redux/chat/action";
import { useParams } from "react-router-dom";

const ChatBox = () => {
  const [message, setMessage] = useState('');
  const auth = useSelector(state => state.auth);
  const chat = useSelector(state => state.chat);
  const { id } = useParams();
  const dispatch = useDispatch();
  const lastMessageRef = useRef(null); // Ref for the last message

  useEffect(() => {
    dispatch(fetchChatByProject(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (chat.chat?.id) {
      dispatch(fetchChatMessages(chat.chat.id));
    }
  }, [dispatch, chat.chat?.id]);

  // Scroll to the last message when messages update
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [chat.message]); // Trigger when chat messages change

  const handleSendMessage = useCallback(() => {
    if (message.trim()) {
      dispatch(sendMessage({ senderId: auth.user?.id, projectId: id, content: message }));
      setMessage("");
    }
  }, [dispatch, auth.user?.id, id, message]);

  const handleMessageChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const handleDelete = (id) => {
    dispatch(deleteMessage(id));
  };

  console.log("auth user:",auth.user)

  return (
    <div className="sticky">
      <div className="border rounded-lg">
        <h1 className="border-b p-5">Chat Box</h1>
        <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col">
          {chat.message?.map((item, index) => {
            const isLastMessage = index === chat.message.length - 1;
            return (
              <div
                key={index}
                className={`flex gap-2 mb-2 ${item.sender.id !== auth.user?.id ? "justify-start" : "justify-end"}`}
                ref={isLastMessage ? lastMessageRef : null} // Attach ref to last message
              >
                {item.sender.id !== auth.user?.id ? (
                  <>
                    <Avatar>
                      <AvatarFallback>{item.sender?.fullName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl">
                      <p>{item.sender?.fullName}</p>
                      <p>{item.content}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="relative space-y-2 py-2 px-5 border rounded-se-2xl rounded-s-xl">
                      <p>{item.sender?.fullName}</p>
                      <p>{item.content}</p>
                      <button
                        onClick={() => handleDelete(item.id)} // Use item.id not index!
                        className="absolute top-0.5 right-1 text-red-400 hover:text-red-50"
                        title="Delete message"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <Avatar>
                      <AvatarFallback>{item.sender?.fullName[0]}</AvatarFallback>
                    </Avatar>
                  </>
                )}
              </div>
            );
          })}
        </ScrollArea>
        <div className="relative p-0">
          <Input
            placeholder="Type a message"
            className="py-7 border-t outline-none focus:outline-none focus:ring-0 rounded-none border-b-0 border-x-0"
            value={message}
            onChange={handleMessageChange}
          />
          <Button
            onClick={handleSendMessage}
            className="absolute right-2 top-3 rounded-full"
            size="icon"
            variant="ghost"
          >
            <PaperPlaneIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
