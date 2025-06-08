
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, FileText, Search, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  starred: boolean;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      title: 'Project Meeting Notes',
      content: 'Discussed Q2 goals and objectives. Key action items: 1) Finalize budget allocation 2) Set up team meetings 3) Review project timeline. Next meeting scheduled for next Friday.',
      tags: ['work', 'meeting', 'project'],
      createdAt: new Date('2024-06-07'),
      updatedAt: new Date('2024-06-08'),
      starred: true
    },
    {
      id: '2',
      title: 'Book Recommendations',
      content: 'Books to read this month: "The Lean Startup" by Eric Ries, "Atomic Habits" by James Clear, "Deep Work" by Cal Newport. Focus on productivity and business strategy.',
      tags: ['personal', 'books', 'learning'],
      createdAt: new Date('2024-06-06'),
      updatedAt: new Date('2024-06-06'),
      starred: false
    },
    {
      id: '3',
      title: 'Travel Itinerary',
      content: 'Trip to San Francisco: Flight on June 15th at 8 AM. Hotel: The Marriott downtown. Conference starts June 16th. Remember to pack presentation materials and business cards.',
      tags: ['travel', 'conference', 'personal'],
      createdAt: new Date('2024-06-05'),
      updatedAt: new Date('2024-06-07'),
      starred: false
    }
  ]);

  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const addNote = () => {
    if (!newNoteTitle.trim() || !newNoteContent.trim()) return;

    const newNote: Note = {
      id: Date.now().toString(),
      title: newNoteTitle,
      content: newNoteContent,
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      starred: false
    };

    setNotes([newNote, ...notes]);
    setNewNoteTitle('');
    setNewNoteContent('');
    setSelectedNote(newNote);
  };

  const toggleStar = (noteId: string) => {
    setNotes(notes.map(note =>
      note.id === noteId
        ? { ...note, starred: !note.starred }
        : note
    ));
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const starredNotes = notes.filter(note => note.starred);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="flex items-center text-white hover:text-blue-300 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center space-x-4">
            <Badge variant="secondary">
              {notes.length} Notes
            </Badge>
            <Badge className="bg-yellow-500">
              {starredNotes.length} Starred
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Note List */}
          <div className="lg:col-span-4 space-y-4">
            {/* Search */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search notes..."
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notes List */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  All Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 max-h-96 overflow-y-auto">
                {filteredNotes.map((note) => (
                  <Card
                    key={note.id}
                    className={`bg-white/5 border-white/10 cursor-pointer transition-all hover:bg-white/10 ${
                      selectedNote?.id === note.id ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setSelectedNote(note)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-medium truncate flex-1">{note.title}</h4>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStar(note.id);
                          }}
                          className="p-1 h-auto"
                        >
                          <Star className={`w-4 h-4 ${note.starred ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                        </Button>
                      </div>
                      <p className="text-gray-400 text-sm truncate mb-2">{note.content}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-1">
                          {note.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          {note.updatedAt.toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {filteredNotes.length === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No notes found</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Note Editor/Viewer */}
          <div className="lg:col-span-5 space-y-4">
            {selectedNote ? (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">{selectedNote.title}</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleStar(selectedNote.id)}
                    >
                      <Star className={`w-4 h-4 ${selectedNote.starred ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span>Created: {selectedNote.createdAt.toLocaleDateString()}</span>
                    <span>•</span>
                    <span>Updated: {selectedNote.updatedAt.toLocaleDateString()}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="whitespace-pre-wrap text-gray-300 mb-4">
                    {selectedNote.content}
                  </div>
                  <div className="flex space-x-2">
                    {selectedNote.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-8 text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400 opacity-50" />
                  <p className="text-gray-400">Select a note to view its content</p>
                </CardContent>
              </Card>
            )}

            {/* Add New Note */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Plus className="w-5 h-5 mr-2" />
                  Create New Note
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  placeholder="Note title..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <Textarea
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Start writing your note..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 min-h-32"
                />
                <Button onClick={addNote} className="w-full bg-blue-600 hover:bg-blue-700">
                  Create Note
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3 space-y-4">
            {/* Voice Commands */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Voice Commands</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-blue-300 text-sm font-mono">
                    "Hey Jarvis, create a note about the meeting"
                  </p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-green-300 text-sm font-mono">
                    "Hey Jarvis, summarize this document"
                  </p>
                </div>
                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                  <p className="text-purple-300 text-sm font-mono">
                    "Hey Jarvis, find my travel notes"
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Starred Notes */}
            {starredNotes.length > 0 && (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Star className="w-5 h-5 mr-2" />
                    Starred Notes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {starredNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-2 bg-white/5 rounded cursor-pointer hover:bg-white/10 transition-colors"
                      onClick={() => setSelectedNote(note)}
                    >
                      <p className="text-white text-sm font-medium truncate">{note.title}</p>
                      <p className="text-gray-400 text-xs truncate">{note.content}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Smart Features */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-white">AI Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-300">
                <p>🤖 Auto-categorization of notes</p>
                <p>📝 Smart summarization</p>
                <p>🔍 Intelligent search</p>
                <p>🏷️ Automatic tag suggestions</p>
                <p>💡 Content recommendations</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
