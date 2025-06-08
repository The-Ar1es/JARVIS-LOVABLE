import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Calendar, CheckSquare, FileText, Mic, Volume2, VolumeX, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useBackgroundListener } from "@/hooks/useBackgroundListener";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleWakeWordDetected = (transcript: string) => {
    console.log('Wake word detected on dashboard:', transcript);
    
    // Navigate to chat when wake word is detected
    navigate('/chat');
    
    toast({
      title: "Jarvis Activated",
      description: "Redirecting to chat...",
      duration: 2000,
    });
  };

  const {
    isListening: isBackgroundListening,
    hasPermission,
    startBackgroundListening,
    stopBackgroundListening,
  } = useBackgroundListener(handleWakeWordDetected);

  // Auto-start background listening when dashboard loads
  useEffect(() => {
    if (hasPermission !== false) {
      startBackgroundListening();
    }
  }, []);

  const handleSignOut = async () => {
    stopBackgroundListening();
    await signOut();
    navigate('/auth');
  };

  const features = [
    {
      icon: MessageSquare,
      title: "AI Chat",
      description: "Intelligent conversations with Jarvis",
      path: "/chat",
      color: "bg-blue-500",
      status: "Active"
    },
    {
      icon: Calendar,
      title: "Calendar Management",
      description: "Schedule events and manage your time",
      path: "/calendar",
      color: "bg-green-500",
      status: "Active"
    },
    {
      icon: CheckSquare,
      title: "Task Manager",
      description: "Organize your tasks and reminders",
      path: "/tasks",
      color: "bg-purple-500",
      status: "Active"
    },
    {
      icon: FileText,
      title: "Smart Notes",
      description: "AI-powered note taking and organization",
      path: "/notes",
      color: "bg-yellow-500",
      status: "Active"
    },
    {
      icon: Mail,
      title: "Email Integration",
      description: "Connect with Gmail and manage messages",
      path: "/email",
      color: "bg-red-500",
      status: "Beta"
    },
    {
      icon: Newspaper,
      title: "News Aggregator",
      description: "Curated daily news and updates",
      path: "/news",
      color: "bg-indigo-500",
      status: "Active"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-2">
              Welcome to Jarvis
            </h1>
            {user?.email && (
              <p className="text-gray-300">Signed in as {user.email}</p>
            )}
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={isBackgroundListening ? stopBackgroundListening : startBackgroundListening}
              variant={isBackgroundListening ? "destructive" : "secondary"}
              size="sm"
              className="flex items-center"
            >
              {isBackgroundListening ? <VolumeX className="w-4 h-4 mr-2" /> : <Volume2 className="w-4 h-4 mr-2" />}
              {isBackgroundListening ? "Stop Listening" : "Start Listening"}
            </Button>
            <Badge variant="secondary" className="flex items-center">
              <div className={`w-2 h-2 rounded-full mr-2 ${isBackgroundListening ? 'bg-green-500 animate-pulse' : 'bg-gray-500'}`}></div>
              {isBackgroundListening ? 'Always Listening' : 'Manual Mode'}
            </Badge>
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="text-white border-white/20 hover:bg-white/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Background Listening Status */}
        {isBackgroundListening && (
          <Card className="mb-6 bg-green-500/20 backdrop-blur-sm border-green-500/30">
            <CardContent className="p-4">
              <p className="text-green-300 text-center flex items-center justify-center">
                <Volume2 className="w-5 h-5 mr-3" />
                Jarvis is listening in the background - Say "Hey Jarvis" anywhere to activate voice commands
              </p>
            </CardContent>
          </Card>
        )}

        {/* Permission Warning */}
        {hasPermission === false && (
          <Card className="mb-6 bg-red-500/20 backdrop-blur-sm border-red-500/30">
            <CardContent className="p-4">
              <p className="text-red-300 text-center">
                Microphone access required for background listening. Please refresh and allow microphone access.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <Link key={index} to={feature.path}>
              <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-3`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant={feature.status === "Active" ? "default" : "secondary"}>
                      {feature.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-white group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Voice Command Demo */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Mic className="w-5 h-5 mr-2" />
              Voice Command Examples
            </CardTitle>
            <CardDescription className="text-gray-300">
              Try these voice commands with Jarvis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <p className="text-blue-300 font-mono">"Hey Jarvis, schedule a meeting with Sarah for Tuesday at 2 PM"</p>
                <p className="text-green-300 font-mono">"Hey Jarvis, send a message to John saying I'm running late"</p>
                <p className="text-purple-300 font-mono">"Hey Jarvis, give me today's news summary"</p>
              </div>
              <div className="space-y-2">
                <p className="text-yellow-300 font-mono">"Hey Jarvis, add a task to review the project proposal"</p>
                <p className="text-red-300 font-mono">"Hey Jarvis, summarize this document for me"</p>
                <p className="text-indigo-300 font-mono">"Hey Jarvis, what's on my calendar tomorrow?"</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Settings Link */}
        <div className="text-center">
          <Link to="/settings">
            <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
              <Settings className="w-4 h-4 mr-2" />
              Configure Jarvis Settings
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
