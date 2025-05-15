import { Button } from "@/components/ui/button";
import { noteCollectionId, pb } from "@/pb";
import type { Note } from "@/types";
import { useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_view/notes/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { id } = useParams({
    from: "/_view/notes/$id",
  });

  const { data } = useQuery<Note>({
    queryKey: [noteCollectionId, id],
    queryFn: async () => {
      return pb.collection(noteCollectionId).getFirstListItem(`slug="${id}"`);
    },
    enabled: !!id,
  });

  const goBack = () => {
    navigate({ from: "/notes/$id", to: "/notes" });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Button size="sm" variant="link" className="mb-4" onClick={goBack}>
        ← Notes
      </Button>
      <h1 className="text-2xl font-bold">{data?.title}</h1>
      <p className="text-xs text-gray-600">
        {data?.created && new Date(data?.created).toLocaleString()}
      </p>
      <p className="mt-4 text-justify text-gray-800 whitespace-break-spaces">
        {data?.content}
      </p>
    </div>
  );
}
