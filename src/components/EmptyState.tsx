
import { FileText, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onCreateNote: () => void;
}

const EmptyState = ({ onCreateNote }: EmptyStateProps) => {
  return (
    <div className="h-full flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center max-w-md text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <FileText className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">No note selected</h2>
        <p className="text-muted-foreground mb-6">
          Create a new note to get started or select an existing note from the sidebar.
        </p>
        <Button onClick={onCreateNote} className="flex items-center gap-1">
          <PlusCircle className="h-4 w-4" />
          Create New Note
        </Button>
      </div>
    </div>
  );
};

export default EmptyState;
