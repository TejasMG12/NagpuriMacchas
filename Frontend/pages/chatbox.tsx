import React, { useState } from "react";
import Layout from "../components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/button";
import { SendHorizontal, Image, Mic } from "lucide-react";

const USER_ID = "pk"; // Static for now, can be dynamic

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  // Function to send messages
  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    // Append user's message to state
    const newMessages = [...messages, { sender: "user", text: message }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("http://localhost:5000/doctor/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: USER_ID, message }),
      });

      const data = await response.json();
      console.log("Backend Response:", data);

      if (data.textMessage) {
        setMessages((prev) => [...prev, { sender: "bot", text: data.textMessage }]);
      }

      if (data.question?.type) {
        setMessages((prev) => [...prev, { sender: "bot", question: data.question }]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Function to handle MCQ selection
  const handleMcqSelection = (option: string) => {
    sendMessage(option);
  };

  // Function to handle MSQ selection
  const handleMsqSelection = (option: string) => {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  // Function to submit MSQ answers
  const submitMsq = () => {
    if (selectedOptions.length > 0) {
      sendMessage(selectedOptions.join(", "));
      setSelectedOptions([]); // Reset selection
    }
  };

  return (
    <Layout>
      <div style={{width: "90%", 
  margin: "auto", 
//   display: "flex", 
  flexDirection: "column", // Ensures components stack vertically
  alignItems: "center", 
  justifyContent: "space-between", // Pushes the input container to the bottom
   }}>
        {/* Chat messages */}
        <div style={styles.chatMessages}>
          {messages.map((msg, index) => (
            <div key={index} style={msg.sender === "user" ? styles.userMessage : styles.botMessage}>
              {/* Display plain text messages */}
              {msg.text && <p>{msg.text}</p>}

              {/* Display MCQ question */}
              {msg.question?.type === "mcq" && (
                <div>
                  <p>{msg.question.question}</p>
                  {msg.question.options.map((option: string, i: number) => (
                    <Button key={i} style={styles.optionButton} onClick={() => handleMcqSelection(option)}>
                      {option}
                    </Button>
                  ))}
                </div>
              )}

              {/* Display MSQ question */}
              {msg.question?.type === "msq" && (
                <div>
                  <p>{msg.question.question}</p>
                  {msg.question.options.map((option: string, i: number) => (
                    <Button
                      key={i}
                      style={{
                        ...styles.optionButton,
                        backgroundColor: selectedOptions.includes(option) ? "#90caf9" : "#e3f2fd",
                      }}
                      onClick={() => handleMsqSelection(option)}
                    >
                      {option}
                    </Button>
                  ))}
                  <Button style={styles.submitButton} onClick={submitMsq}>
                    Submit
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div style={styles.inputContainer}>
          <Button variant="ghost" style={styles.iconButton}>
            <Image size={20} />
          </Button>
          <Input
            type="text"
            placeholder="Type your message..."
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
          />
          <Button variant="ghost" style={styles.iconButton}>
            <Mic size={20} />
          </Button>
          <Button variant="ghost" style={styles.sendButton} onClick={() => sendMessage(input)}>
            <SendHorizontal size={20} />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default ChatBox;

const styles: { [key: string]: React.CSSProperties } = {
  chatMessages: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    paddingBottom: "80px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    padding: "5px 16px",
    borderRadius: "15px",
    minWidth:"10%",
    maxWidth: "60%",
    textAlign: "right",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#EAEAEA",
    padding: "12px 16px",
    borderRadius: "15px",
    maxWidth: "60%",
    textAlign: "left",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap",
  },
  optionButton: {
    borderRadius: "20px",
    padding: "10px 15px",
    margin: "5px",
    cursor: "pointer",
  },
  submitButton: {
    backgroundColor: "#b2dfdb",
    borderRadius: "20px",
    padding: "10px 15px",
    margin: "10px 0",
    cursor: "pointer",
  },
  inputContainer: {
    width:"80%",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "14px",
    borderTop: "1px solid #ddd",
    position: "fixed",  // Fixes it at the bottom
    bottom: 0,  
    backgroundColor:"#FFFCF8"
  },
  input: {
    flex: 1,
    borderRadius: "20px",
    padding: "10px",
    border: "1px solid #ddd",
  },
  iconButton: {
    background: "transparent",
    borderRadius: "50%",
    padding: "10px",
  },
  sendButton: {
    background: "#ffccbc",
    borderRadius: "50%",
    padding: "10px",
  },
};
