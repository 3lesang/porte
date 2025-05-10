import { Button } from "@/components/ui/button";
import { notesRef } from "@/firebase";
import type { Note } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams, useRouter } from "@tanstack/react-router";
import { equalTo, get, orderByChild, query } from "firebase/database";

export const Route = createFileRoute("/_view/notes/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const router = useRouter();
  const { id } = useParams({
    from: "/_view/notes/$id",
  });

  const { data } = useQuery<Note>({
    queryKey: ["notes", id],
    queryFn: async () => {
      const q = query(notesRef, orderByChild("slug"), equalTo(id));

      const snapshot = await get(q);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const key = Object.keys(data)[0];
        return { ...data[key], id: key };
      }
    },
    enabled: !!id,
  });

  const goBack = () => {
    router.history.back();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Button size="sm" variant="link" className="mb-4" onClick={goBack}>
        ← Back to
      </Button>
      <h1 className="text-2xl font-bold">{data?.title}</h1>
      <p className="text-xs text-gray-600">
        {data?.createdAt && new Date(data?.createdAt).toLocaleString()}
      </p>
      <p className="mt-4 text-justify text-gray-800 whitespace-break-spaces">
        {data?.content}
      </p>
    </div>
  );
}
