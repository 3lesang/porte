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
import { database, notesRef } from "@/firebase";
import { genSlug } from "@/lib/utils";
import type { Note } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { get, push, ref, remove, update } from "firebase/database";
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

  const { data, refetch } = useQuery<Record<string, Note>>({
    queryKey: ["notes"],
    queryFn: async () => {
      const snapshot = await get(notesRef);
      return snapshot.val();
    },
  });

  const { mutate: addMutate } = useMutation({
    mutationFn: async (data: {
      title: string;
      content?: string | undefined;
    }) => {
      const payload = {
        title: data.title,
        slug: genSlug(data.title),
        content: data.content,
        createdAt: Date.now(),
      };
      return await push(notesRef, payload);
    },
    onSuccess: () => {
      setOpen(false);
      refetch();
    },
  });

  const { mutate: editMutate } = useMutation({
    mutationFn: async (data: {
      id: string;
      title: string;
      content?: string | undefined;
    }) => {
      const payload = {
        title: data.title,
        slug: genSlug(data.title),
        content: data.content,
        createdAt: Date.now(),
      };
      return await update(ref(database, `notes/${data.id}`), payload);
    },
    onSuccess: () => {
      setOpen(false);
      refetch();
    },
  });

  const { mutate: deleteMutate } = useMutation({
    mutationFn: async (id: string) => {
      return await remove(ref(database, `notes/${id}`));
    },
    onSuccess: () => {
      refetch();
    },
  });

  const { mutate: deleteAllMutate } = useMutation({
    mutationFn: async () => {
      return await remove(notesRef);
    },
    onSuccess: () => {
      refetch();
    },
  });

  const handleDelete = (id: string) => {
    deleteMutate(id);
  };

  const handleDeleteAll = () => {
    deleteAllMutate();
  };

  const handleSubmit = (data: {
    title: string;
    content?: string | undefined;
  }) => {
    if (action === "edit") {
      editMutate({
        id: noteId,
        title: data.title,
        content: data.content,
      });
      return;
    }
    addMutate(data);
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
        <Button variant="ghost" size="sm" onClick={handleDeleteAll}>
          Delete All
        </Button>
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
      <div className="grid grid-cols-3 gap-2">
        {data &&
          Object.entries(data).map(([key, value]) => (
            <ContextMenu key={key}>
              <ContextMenuTrigger>
                <Card
                  className="bg-slate-100 relative group cursor-pointer"
                  onClick={() =>
                    handleEditClick({
                      id: key,
                      title: value.title,
                      content: value.content || "",
                    })
                  }
                >
                  <CardHeader>
                    <CardTitle className="line-clamp-1">
                      {value.title}
                    </CardTitle>
                    <CardDescription>
                      {new Date(value.createdAt).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="line-clamp-2 h-12">
                    {value.content}
                  </CardContent>
                </Card>
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem onClick={() => handleDelete(key)}>
                  Delete
                </ContextMenuItem>
                <a
                  href={`/notes/${value.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ContextMenuItem>View</ContextMenuItem>
                </a>
              </ContextMenuContent>
            </ContextMenu>
          ))}
      </div>
    </div>
  );
}
