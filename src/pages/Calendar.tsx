
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Calendar as CalendarIcon, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  type: 'meeting' | 'reminder' | 'personal';
  description?: string;
}

const Calendar = () => {
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Team Meeting',
      date: '2024-06-08',
      time: '10:00 AM',
      type: 'meeting',
      description: 'Weekly team sync and project updates'
    },
    {
      id: '2',
      title: 'Lunch with Sarah',
      date: '2024-06-08',
      time: '12:30 PM',
      type: 'personal',
      description: 'Discuss the new project proposal'
    },
    {
      id: '3',
      title: 'Doctor Appointment',
      date: '2024-06-09',
      time: '2:00 PM',
      type: 'reminder',
      description: 'Annual checkup'
    },
    {
      id: '4',
      title: 'Project Review',
      date: '2024-06-10',
      time: '3:00 PM',
      type: 'meeting',
      description: 'Review Q2 progress and goals'
    }
  ]);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500';
      case 'personal': return 'bg-green-500';
      case 'reminder': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const groupEventsByDate = (events: Event[]) => {
    return events.reduce((groups, event) => {
      const date = event.date;
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(event);
      return groups;
    }, {} as Record<string, Event[]>);
  };

  const groupedEvents = groupEventsByDate(events);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center text-white hover:text-blue-300 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Event
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar Overview */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <CalendarIcon className="w-5 h-5 mr-2" />
                  Calendar Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(groupedEvents).map(([date, dayEvents]) => (
                    <div key={date} className="space-y-3">
                      <h3 className="text-lg font-semibold text-white border-b border-white/20 pb-2">
                        {formatDate(date)}
                      </h3>
                      <div className="space-y-3">
                        {dayEvents.map((event) => (
                          <Card key={event.id} className="bg-white/5 border-white/10">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3">
                                  <div className={`w-3 h-3 ${getEventTypeColor(event.type)} rounded-full mt-2`}></div>
                                  <div>
                                    <h4 className="text-white font-medium">{event.title}</h4>
                                    <div className="flex items-center text-gray-300 text-sm mt-1">
                                      <Clock className="w-4 h-4 mr-1" />
                                      {event.time}
                                    </div>
                                    {event.description && (
                                      <p className="text-gray-400 text-sm mt-2">{event.description}</p>
                                    )}
                                  </div>
                                </div>
                                <Badge variant="secondary" className="capitalize">
                                  {event.type}
                                </Badge>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Voice Commands */}
          <div className="space-y-6">
            {/* Voice Commands */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Voice Commands</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-blue-300 text-sm font-mono">
                    "Hey Jarvis, schedule a meeting with Sarah for Tuesday at 2 PM"
                  </p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-green-300 text-sm font-mono">
                    "Hey Jarvis, what's on my calendar tomorrow?"
                  </p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-purple-300 text-sm font-mono">
                    "Hey Jarvis, add a reminder for the doctor appointment"
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Total Events</span>
                  <Badge variant="secondary">{events.length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Meetings</span>
                  <Badge className="bg-blue-500">{events.filter(e => e.type === 'meeting').length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Personal</span>
                  <Badge className="bg-green-500">{events.filter(e => e.type === 'personal').length}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Reminders</span>
                  <Badge className="bg-yellow-500">{events.filter(e => e.type === 'reminder').length}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
