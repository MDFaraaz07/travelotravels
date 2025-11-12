import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  isStreaming?: boolean;
}

const quickReplies = [
  "Popular destinations",
  "Tour packages",
  "Book a tour",
  "Contact support",
  "Travel tips"
];

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm your Travelo assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const streamText = (text: string) => {
    setStreamingText("");
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setStreamingText((prev) => prev + text[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
        
        // Add final message after streaming completes
        const botMessage: Message = {
          id: Date.now().toString(),
          text: text,
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
        setStreamingText("");
      }
    }, 30); // Adjust speed here (lower = faster)
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://easily-wise-cattle.ngrok-free.app/webhook/agency-chatbot",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const text = await response.text();
      let botText = "I'm here to help!";

      try {
        // Try parsing as JSON
        const data = JSON.parse(text);
        botText = data.output || data.response || data.message || botText;
      } catch {
        // Check if it's NDJSON (streaming format)
        if (text.includes('{"type":"item"')) {
          const lines = text.split('\n').filter(line => line.trim());
          const contentParts: string[] = [];
          
          lines.forEach(line => {
            try {
              const parsed = JSON.parse(line);
              if (parsed.type === 'item' && parsed.content) {
                contentParts.push(parsed.content);
              }
            } catch {}
          });
          
          if (contentParts.length > 0) {
            botText = contentParts.join('');
          }
        } else {
          // Use plain text response
          botText = text.trim() || botText;
        }
      }
      
      // Use streaming animation for bot response
      streamText(botText);
    } catch (error) {
      console.error("Chatbot error:", error);
      toast({
        title: "Connection Error",
        description: "Unable to reach the chatbot. Please try again later.",
        variant: "destructive",
      });

      streamText("Sorry, I'm having trouble connecting right now. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-glow transition-all duration-300 z-50 ${
          isOpen ? "scale-0" : "scale-100 hover:scale-110"
        }`}
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 right-6 w-96 h-[600px] bg-card border border-border rounded-2xl shadow-2xl transition-all duration-300 z-50 flex flex-col overflow-hidden ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-ocean p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-background/20 flex items-center justify-center backdrop-blur-sm">
              <MessageCircle className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-primary-foreground">Travelo Assistant</h3>
              <p className="text-xs text-primary-foreground/80">Online</p>
            </div>
          </div>
          <Button
            onClick={() => setIsOpen(false)}
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-background/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                } animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted text-foreground rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-muted text-foreground rounded-2xl rounded-bl-none px-4 py-2 flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p className="text-sm">Typing...</p>
                </div>
              </div>
            )}
            {streamingText && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-muted text-foreground rounded-2xl rounded-bl-none px-4 py-2 max-w-[80%]">
                  <p className="text-sm">{streamingText}<span className="animate-pulse">▋</span></p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Quick Replies */}
        {messages.length === 1 && !isLoading && (
          <div className="px-4 pb-2">
            <p className="text-xs text-muted-foreground mb-2">Quick replies:</p>
            <div className="flex flex-wrap gap-2">
              {quickReplies.map((reply, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setInput(reply);
                    setTimeout(() => sendMessage(), 100);
                  }}
                  className="text-xs hover:bg-primary hover:text-primary-foreground transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {reply}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-border bg-background/50 backdrop-blur-sm">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading || !!streamingText}
              className="flex-1"
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading || !!streamingText}
              size="icon"
              className="shrink-0"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
