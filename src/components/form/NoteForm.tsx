import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title is required",
  }),
  content: z.string().optional(),
});

type FormTypes = z.infer<typeof formSchema>;

interface NoteFormProps {
  actionText?: string;
  defaultValues?: FormTypes;
  onSubmit?: (data: FormTypes) => void;
}

function NoteForm({ actionText, defaultValues, onSubmit }: NoteFormProps) {
  const form = useForm<FormTypes>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    form.reset();
    onSubmit?.(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Title here..."
                  type="text"
                  {...field}
                  className="border-0 shadow-none focus-visible:ring-0 focus-visible:border-0 px-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ScrollArea className="h-56">
                  <Textarea
                    className="border-0 shadow-none focus-visible:ring-0 focus-visible:border-0 px-0 resize-none min-h-44"
                    placeholder="Content here..."
                    rows={5}
                    {...field}
                  />
                </ScrollArea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-2">
          <Button size="sm" type="submit" className="ml-auto">
            {actionText}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default NoteForm;
