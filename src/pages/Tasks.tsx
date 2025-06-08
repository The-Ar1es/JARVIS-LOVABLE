
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Plus, CheckSquare, Clock, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'completed';
  dueDate?: string;
  createdAt: Date;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Review project proposal',
      description: 'Go through the Q2 project proposal and provide feedback',
      priority: 'high',
      status: 'pending',
      dueDate: '2024-06-10',
      createdAt: new Date('2024-06-08')
    },
    {
      id: '2',
      title: 'Prepare presentation slides',
      description: 'Create slides for the upcoming team meeting',
      priority: 'medium',
      status: 'pending',
      dueDate: '2024-06-09',
      createdAt: new Date('2024-06-07')
    },
    {
      id: '3',
      title: 'Send follow-up emails',
      description: 'Follow up with clients from last week\'s meetings',
      priority: 'medium',
      status: 'completed',
      createdAt: new Date('2024-06-06')
    },
    {
      id: '4',
      title: 'Update project documentation',
      description: 'Update the technical documentation with recent changes',
      priority: 'low',
      status: 'pending',
      dueDate: '2024-06-12',
      createdAt: new Date('2024-06-05')
    }
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId
        ? { ...task, status: task.status === 'pending' ? 'completed' : 'pending' }
        : task
    ));
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      priority: 'medium',
      status: 'pending',
      createdAt: new Date()
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle('');
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const pendingTasks = tasks.filter(task => task.status === 'pending');
  const completedTasks = tasks.filter(task => task.status === 'completed');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center text-white hover:text-blue-300 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">
              {pendingTasks.length} Pending
            </Badge>
            <Badge className="bg-green-600">
              {completedTasks.length} Completed
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Task List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Add New Task */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Add New Task
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2">
                  <Input
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Enter task title..."
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    onKeyPress={(e) => e.key === 'Enter' && addTask()}
                  />
                  <Button onClick={addTask} className="bg-blue-600 hover:bg-blue-700">
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Pending Tasks */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CheckSquare className="w-5 h-5 mr-2" />
                  Pending Tasks
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pendingTasks.map((task) => (
                  <Card key={task.id} className="bg-white/5 border-white/10">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          checked={task.status === 'completed'}
                          onCheckedChange={() => toggleTaskStatus(task.id)}
                          className="mt-1"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-white font-medium">{task.title}</h4>
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 ${getPriorityColor(task.priority)} rounded-full`}></div>
                              <Badge variant="secondary" className="text-xs capitalize">
                                {task.priority}
                              </Badge>
                            </div>
                          </div>
                          {task.description && (
                            <p className="text-gray-400 text-sm mb-2">{task.description}</p>
                          )}
                          {task.dueDate && (
                            <div className="flex items-center text-gray-300 text-sm">
                              <Clock className="w-4 h-4 mr-1" />
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {pendingTasks.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <CheckSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No pending tasks. Great job!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <CheckSquare className="w-5 h-5 mr-2" />
                    Completed Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {completedTasks.map((task) => (
                    <Card key={task.id} className="bg-white/5 border-white/10 opacity-75">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Checkbox
                            checked={task.status === 'completed'}
                            onCheckedChange={() => toggleTaskStatus(task.id)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <h4 className="text-white font-medium line-through">{task.title}</h4>
                            {task.description && (
                              <p className="text-gray-400 text-sm mt-1">{task.description}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Voice Commands */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Voice Commands</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-blue-300 text-sm font-mono">
                    "Hey Jarvis, add a task to review the project proposal"
                  </p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-green-300 text-sm font-mono">
                    "Hey Jarvis, mark the email task as completed"
                  </p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-purple-300 text-sm font-mono">
                    "Hey Jarvis, what are my high priority tasks?"
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Task Statistics */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Task Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Tasks</span>
                  <Badge variant="secondary">{tasks.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Pending</span>
                  <Badge variant="secondary">{pendingTasks.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Completed</span>
                  <Badge className="bg-green-600">{completedTasks.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">High Priority</span>
                  <Badge className="bg-red-500">
                    {tasks.filter(t => t.priority === 'high' && t.status === 'pending').length}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Productivity Tips */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Smart Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-300">
                  <p>💡 Use voice commands to quickly add tasks while on the go</p>
                  <p>⏰ Set due dates for better time management</p>
                  <p>🎯 Focus on high-priority tasks first</p>
                  <p>✅ Regular task completion boosts productivity</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
