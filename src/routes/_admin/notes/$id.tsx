import { Button } from "@/components/ui/button";
import { database } from "@/firebase";
import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { get, ref } from "firebase/database";
import type { Note } from "..";

export const Route = createFileRoute("/_admin/notes/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const { id } = useParams({
    from: "/_admin/notes/$id",
  });

  const { data } = useQuery<Note>({
    queryKey: ["notes", id],
    queryFn: async () => {
      const snapshot = await get(ref(database, `notes/${id}`));
      return snapshot.val();
    },
    enabled: !!id,
  });

  const handleBack = () => {
    navigate({ to: "/" });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Button size="sm" variant="link" className="mb-4" onClick={handleBack}>
        ← Back to
      </Button>
      <h1 className="text-2xl font-bold">{data?.text}</h1>
      <p className="text-xs text-gray-600">
        {data?.createdAt && new Date(data?.createdAt).toLocaleString()}
      </p>
      <p className="mt-4 text-justify text-gray-800">{data?.content}</p>
    </div>
  );
}
