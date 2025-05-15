import { createFileRoute } from "@tanstack/react-router";

import NoteForm from "@/components/form/NoteForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { genSlug } from "@/lib/utils";
import { noteCollectionId, pb } from "@/pb";
import type { Note } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export const Route = createFileRoute("/_admin/notes/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("add");
  const [noteId, setNoteId] = useState("");
  const [defaultValues, setDefaultValues] = useState({
    title: "",
    content: "",
  });

  const { data, refetch } = useQuery<Note[]>({
    queryKey: [noteCollectionId],
    queryFn: async () => {
      return pb
        .collection(noteCollectionId)
        .getFullList({ fields: "id,title,slug,content,created" });
    },
  });

  const { mutate: addMutate } = useMutation({
    mutationFn: async (payload: {
      title: string;
      content?: string | undefined;
      slug: string;
    }) => {
      return pb.collection(noteCollectionId).create(payload);
    },
    onSuccess: () => {
      setOpen(false);
      refetch();
    },
  });

  const { mutate: editMutate } = useMutation({
    mutationFn: async (data: {
      id: string;
      payload: {
        title: string;
        content?: string | undefined;
        slug: string;
      };
    }) => {
      return pb.collection(noteCollectionId).update(data.id, data.payload);
    },
    onSuccess: () => {
      setOpen(false);
      refetch();
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: async (documentId: string) => {
      return pb.collection(noteCollectionId).delete(documentId);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleDelete = (id: string) => {
    deleteMutate(id);
  };

  const handleSubmit = (data: {
    title: string;
    content?: string | undefined;
  }) => {
    if (action === "edit") {
      editMutate({
        id: noteId,
        payload: {
          title: data.title,
          slug: genSlug(data.title),
          content: data.content,
        },
      });
      return;
    }
    addMutate({
      title: data.title,
      slug: genSlug(data.title),
      content: data.content,
    });
  };

  const handleEditClick = (data: {
    id: string;
    title: string;
    content: string;
  }) => {
    setNoteId(data.id);
    setAction("edit");
    setDefaultValues({
      title: data.title,
      content: data.content,
    });
    setOpen(true);
  };

  const handleAddNote = () => {
    setAction("add");
    setDefaultValues({
      title: "",
      content: "",
    });
    setOpen(true);
  };

  return (
    <div className="w-full max-w-2xl h-full flex flex-col gap-2 mx-auto">
      <h1 className="text-2xl font-bold">Notes</h1>
      <p className="text-sm text-gray-500">
        You can add notes to your notes. You can add a title and content.
      </p>
      <div className="flex items-center gap-2 justify-end w-full">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="sm" onClick={handleAddNote}>
              Take a Note
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Notes</DialogTitle>
              <DialogDescription>
                Add a note to your notes. You can add a title and content.
                <br />
                <span className="text-xs italic text-gray-500">
                  Note: The title will be used as the slug for the note.
                </span>
              </DialogDescription>
            </DialogHeader>
            <NoteForm
              actionText={action === "add" ? "Add Note" : "Update Note"}
              onSubmit={handleSubmit}
              defaultValues={defaultValues}
            />
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
        {data?.map((item) => (
          <ContextMenu key={item.id}>
            <ContextMenuTrigger>
              <Card
                className="bg-slate-100 relative group cursor-pointer"
                onClick={() =>
                  handleEditClick({
                    id: item.id,
                    title: item.title,
                    content: item.content || "",
                  })
                }
              >
                <CardHeader>
                  <CardTitle className="line-clamp-1">{item.title}</CardTitle>
                  <CardDescription>
                    {new Date(item.created).toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="line-clamp-2 h-12">
                  {item.content}
                </CardContent>
              </Card>
            </ContextMenuTrigger>
            <ContextMenuContent>
              <a
                href={`/notes/${item.slug}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ContextMenuItem>View</ContextMenuItem>
              </a>
              <ContextMenuItem onClick={() => handleDelete(item.id)}>
                <p className="text-red-500">Delete</p>
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        ))}
      </div>
    </div>
  );
}
