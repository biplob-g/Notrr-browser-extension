import { useState, useEffect } from "react";
import NoteEditor from "@/components/NoteEditor";
import NotesList from "@/components/NotesList";
import Sidebar from "@/components/Sidebar";
import { Note } from "@/types/note";
import { Button } from "@/components/ui/button";
import { PlusCircle, Menu } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import EmptyState from "@/components/EmptyState";
import WelcomeDialog from "@/components/WelcomeDialog";
import { generateSummaryWithGemini } from "@/services/geminiService";
import { extractPageContent, isVideoPage } from "@/utils/pageContentExtractor";

const Index = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showWelcomeDialog, setShowWelcomeDialog] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();
  
  // Load notes from localStorage on component mount
  useEffect(() => {
    const savedNotes = localStorage.getItem("gemini-notes");
    if (savedNotes) {
      try {
        const parsedNotes = JSON.parse(savedNotes);
        setNotes(parsedNotes);
        
        // Set the most recently updated note as active
        if (parsedNotes.length > 0) {
          const sortedNotes = [...parsedNotes].sort((a, b) => 
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
          setActiveNoteId(sortedNotes[0].id);
        }
      } catch (error) {
        console.error("Error parsing saved notes:", error);
      }
    }
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("gemini-notes", JSON.stringify(notes));
  }, [notes]);

  const activeNote = notes.find(note => note.id === activeNoteId) || null;

  const createNewNote = () => {
    setShowWelcomeDialog(true);
  };

  const createEmptyNote = () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: "Untitled Note",
      content: "",
      url: window.location.href,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: []
    };
    
    setNotes([...notes, newNote]);
    setActiveNoteId(newNote.id);
    setShowWelcomeDialog(false);
    
    toast({
      title: "New note created",
      description: "Start typing to edit your note"
    });
  };
  
  const analyzePage = async () => {
    setIsAnalyzing(true);
    try {
      // Extract content from the current page
      const pageContent = extractPageContent();
      const isVideo = isVideoPage();
      const currentUrl = window.location.href;
      
      // Generate summary using Gemini API
      const summary = await generateSummaryWithGemini(pageContent, currentUrl);
      
      // Create a new note with the summary
      const newNote: Note = {
        id: crypto.randomUUID(),
        title: `Notes from ${document.title || "Current Page"}`,
        content: summary.text,
        url: summary.sourceUrl || currentUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: isVideo ? ["video"] : ["webpage"]
      };
      
      setNotes([...notes, newNote]);
      setActiveNoteId(newNote.id);
      
      toast({
        title: "Page analyzed",
        description: `AI summary created from ${isVideo ? "video" : "webpage"}`
      });
    } catch (error) {
      console.error("Error analyzing page:", error);
      toast({
        title: "Analysis failed",
        description: "Unable to analyze the current page. Please try again or create a note manually.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
      setShowWelcomeDialog(false);
    }
  };

  const updateNote = (updatedNote: Note) => {
    setNotes(notes.map(note => 
      note.id === updatedNote.id 
        ? {...updatedNote, updatedAt: new Date().toISOString()} 
        : note
    ));
  };

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
    
    if (activeNoteId === noteId) {
      const remainingNotes = notes.filter(note => note.id !== noteId);
      setActiveNoteId(remainingNotes.length > 0 ? remainingNotes[0].id : null);
    }
    
    toast({
      title: "Note deleted",
      description: "Your note has been removed"
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border p-2 sm:p-4 bg-card">
        <div className="flex items-center gap-1 sm:gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={toggleSidebar}>
            <Menu className="h-4 w-4" />
          </Button>
          <h1 className="text-base sm:text-xl font-semibold">Gemini Scribe</h1>
        </div>
        <Button onClick={createNewNote} size="sm" className="flex items-center gap-1 text-xs sm:text-sm">
          <PlusCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          New Note
        </Button>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {isSidebarOpen && (
          <div className="w-full sm:w-auto sm:min-w-[250px] lg:min-w-[300px] border-r border-border bg-card overflow-hidden">
            <NotesList 
              notes={notes} 
              activeNoteId={activeNoteId}
              onSelectNote={setActiveNoteId}
              onDeleteNote={deleteNote}
            />
          </div>
        )}
        
        <main className="flex-1 overflow-hidden">
          {activeNote ? (
            <NoteEditor 
              note={activeNote} 
              onUpdateNote={updateNote} 
            />
          ) : (
            <EmptyState onCreateNote={createNewNote} />
          )}
        </main>
      </div>

      {/* Welcome Dialog */}
      <WelcomeDialog
        isOpen={showWelcomeDialog}
        onClose={() => setShowWelcomeDialog(false)}
        onCreateManualNote={createEmptyNote}
        onAnalyzePage={analyzePage}
        isAnalyzing={isAnalyzing}
        isVideoPage={isVideoPage()}
      />
    </div>
  );
};

export default Index;
