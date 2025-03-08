import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/button";
import { SendHorizontal, Image, Mic } from "lucide-react";

const USER_ID = "pk"; // Static for now, can be dynamic

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Load messages from local storage on mount
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  useEffect(() => {
    // Save messages to local storage whenever they update
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Append user's message to state
    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("http://localhost:5000/doctor/answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: USER_ID, message: input }),
      });

      const data = await response.json();
      if (data.response) {
        setMessages((prev) => [...prev, { sender: "bot", text: data.response }]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Layout>
      <div style={styles.container}>
        {/* Chat Card */}
        <Card style={styles.chatCard}>
          <CardContent style={styles.chatContent}>
            {/* Chat messages */}
            <div style={styles.chatMessages}>
              {messages.map((msg, index) => (
                <p key={index} style={msg.sender === "user" ? styles.userMessage : styles.botMessage}>
                  {msg.text}
                </p>
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
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />
              <Button variant="ghost" style={styles.iconButton}>
                <Mic size={20} />
              </Button>
              <Button variant="ghost" style={styles.sendButton} onClick={sendMessage}>
                <SendHorizontal size={20} />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ChatBox;

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    background: "#f8f9fa",
  },
  chatCard: {
    width: "80%",
    maxWidth: "100%",
    height: "80vh",
    borderRadius: "16px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  chatContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px",
  },
  chatMessages: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden", // Prevents horizontal scrollbar
    paddingBottom: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#DCF8C6",
    padding: "12px 16px",
    borderRadius: "15px",
    maxWidth: "60%", // Ensures messages do not get too wide
    textAlign: "right",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap", // Ensures long messages wrap correctly
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#EAEAEA",
    padding: "12px 16px",
    borderRadius: "15px",
    maxWidth: "80%", // Prevents messages from stretching too wide
    textAlign: "left",
    wordWrap: "break-word",
    overflowWrap: "break-word",
    whiteSpace: "pre-wrap",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#fff",
    padding: "14px",
    borderTop: "1px solid #ddd",
    borderRadius: "0 0 16px 16px",
  },
  input: {
    flex: 1,
    borderRadius: "20px",
    padding: "10px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
  },
  iconButton: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },
  sendButton: {
    background: "transparent",
    border: "none",
    color: "black",
    // borderRadius: "50%",
    padding: "10px",
  },
};
