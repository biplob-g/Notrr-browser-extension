
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, Edit, Loader } from "lucide-react";

interface WelcomeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateManualNote: () => void;
  onAnalyzePage: () => void;
  isAnalyzing: boolean;
  isVideoPage: boolean;
}

const WelcomeDialog = ({
  isOpen,
  onClose,
  onCreateManualNote,
  onAnalyzePage,
  isAnalyzing,
  isVideoPage
}: WelcomeDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create a new note</DialogTitle>
          <DialogDescription>
            Choose how you'd like to start your note
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-24 p-4"
            onClick={onAnalyzePage}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <Loader className="h-8 w-8 animate-spin mb-2" />
            ) : (
              <FileText className="h-8 w-8 mb-2" />
            )}
            <span>{isAnalyzing ? "Analyzing..." : `Summarize this ${isVideoPage ? "video" : "page"}`}</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-24 p-4"
            onClick={onCreateManualNote}
          >
            <Edit className="h-8 w-8 mb-2" />
            <span>I'll write it myself</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeDialog;
