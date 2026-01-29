import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCreateComment } from "@/lib/queries/comments";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface NewCommentDialogProps {
  ticketId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewCommentDialog({ ticketId, open, onOpenChange }: NewCommentDialogProps) {
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);

  const createComment = useCreateComment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) {
      toast({
        title: "Please enter a comment",
        variant: "destructive",
      });
      return;
    }

    const formData = new FormData();
    formData.append("description", description);
    if (attachment) {
      formData.append("attachments", attachment);
    }

    try {
      await createComment.mutateAsync({ ticketId, data: formData });
      toast({ title: "Comment added successfully" });
      onOpenChange(false);
      resetForm();
    } catch {
      toast({
        title: "Failed to add comment",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setDescription("");
    setAttachment(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Comment</DialogTitle>
          <DialogDescription>Share your thoughts or provide additional information.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="comment">Comment *</Label>
              <Textarea
                id="comment"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your comment here..."
                rows={4}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="attachment">Attachment</Label>
              <Input
                id="attachment"
                type="file"
                accept="image/*"
                onChange={(e) => setAttachment(e.target.files?.[0] || null)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createComment.isPending}>
              {createComment.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Comment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
