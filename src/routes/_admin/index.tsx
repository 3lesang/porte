import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { database } from "@/firebase";
import { genSlug } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { get, ref, remove, set } from "firebase/database";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type Note = {
  text: string;
  content?: string;
  createdAt: number;
};

export const Route = createFileRoute("/_admin/")({
  component: RouteComponent,
});

const notesRef = ref(database, "notes/");

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required",
  }),
  content: z.string().optional(),
});

function RouteComponent() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const { data, refetch } = useQuery<Record<string, Note>>({
    queryKey: ["notes"],
    queryFn: async () => {
      const snapshot = await get(notesRef);
      return snapshot.val();
    },
  });

  const { mutate: addMutate } = useMutation({
    mutationFn: async (data: { text: string; content: string }) => {
      const slug = genSlug(data.text);
      return await set(ref(database, `notes/${slug}`), {
        text: data.text,
        content: data.content,
        createdAt: Date.now(),
      });
    },
    onSuccess: () => {
      refetch();
      form.reset();
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    addMutate({
      text: values.title,
      content: values.content || "",
    });
  }

  const handleDelete = (id: string) => {
    deleteMutate(id);
  };

  const handleDeleteAll = () => {
    deleteAllMutate();
  };

  return (
    <div className="w-full max-w-xl h-full flex flex-col gap-2 mx-auto">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full max-w-sm mx-auto"
        >
          <h1 className="text-2xl font-bold">Notes</h1>
          <p className="text-sm text-gray-500">
            This is a note page. You can add your note here.
          </p>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title... " {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter content... " {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button size="sm" type="submit">
            Add
          </Button>
        </form>
      </Form>

      <div className="flex items-center gap-2 justify-end w-full">
        <Button variant="outline" size="sm" onClick={handleDeleteAll}>
          Delete all
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {data &&
          Object.entries(data).map(([key, value]) => (
            <div key={key} className="bg-slate-100 px-1 py-2 rounded-md">
              <Link to="/notes/$id" params={{ id: key }}>
                <h1 className="font-bold line-clamp-1">{value.text}</h1>
              </Link>
              <p className="text-xs text-gray-600">
                {new Date(value.createdAt).toLocaleString()}
              </p>
              <p className="text-sm line-clamp-2">{value.content}</p>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDelete(key)}
              >
                Delete
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}
