
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send, Mic, MicOff, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'jarvis';
  timestamp: Date;
  type: 'text' | 'voice';
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm Jarvis, your personal AI assistant. How can I help you today?",
      sender: 'jarvis',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I understand you'd like me to help with that. Let me process your request...",
        "That's an interesting question! Based on the information available, I can assist you with that.",
        "I'm here to help! Let me analyze what you need and provide the best solution.",
        "Great question! I'm processing your request using my advanced reasoning capabilities.",
        "I'll help you with that right away. Let me access the relevant information for you."
      ];

      const jarvisResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: 'jarvis',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, jarvisResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleVoiceRecording = () => {
    if (!isListening) {
      setIsListening(true);
      toast({
        title: "Voice Recording",
        description: "Listening for your command...",
      });
      
      // Simulate voice recognition
      setTimeout(() => {
        setIsListening(false);
        const voiceCommands = [
          "Hey Jarvis, what's the weather like today?",
          "Hey Jarvis, schedule a meeting for tomorrow",
          "Hey Jarvis, send a message to my team",
          "Hey Jarvis, summarize my emails"
        ];
        const command = voiceCommands[Math.floor(Math.random() * voiceCommands.length)];
        handleSendMessage(command);
      }, 3000);
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center text-white hover:text-blue-300 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          <Badge variant="secondary" className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Jarvis Online
          </Badge>
        </div>

        {/* Chat Container */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 h-[70vh] flex flex-col">
          <CardHeader className="border-b border-white/20">
            <CardTitle className="text-white flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
                <Mic className="w-4 h-4 text-white" />
              </div>
              Chat with Jarvis
            </CardTitle>
          </CardHeader>
          
          {/* Messages Area */}
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-white/20 text-white border border-white/20'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/20 text-white border border-white/20 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </CardContent>

          {/* Input Area */}
          <div className="p-4 border-t border-white/20">
            <div className="flex space-x-2">
              <Input
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message to Jarvis..."
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
              />
              <Button
                onClick={toggleVoiceRecording}
                variant={isListening ? "destructive" : "secondary"}
                size="icon"
                className={isListening ? "animate-pulse" : ""}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
              <Button
                onClick={() => handleSendMessage(inputText)}
                className="bg-blue-600 hover:bg-blue-700"
                size="icon"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Voice Commands Help */}
        <Card className="mt-4 bg-white/5 backdrop-blur-sm border-white/10">
          <CardContent className="p-4">
            <p className="text-gray-300 text-sm text-center">
              💡 Try voice commands like: "Hey Jarvis, schedule a meeting" or "Hey Jarvis, what's my agenda today?"
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
