import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Pencil, Trash2, Plus, AlertTriangle, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";

const CATEGORIES = ["Tips", "Markets", "Islamic Finance", "Tax", "Savings"] as const;
type Category = (typeof CATEGORIES)[number];

type Article = {
  id: string;
  title: string;
  content: string;
  category: Category;
  publish_date: string;
};

export const Route = createFileRoute("/admin/articles")({
  head: () => ({ meta: [{ title: "Admin – Tips & News" }] }),
  component: AdminArticlesPage,
});

function AdminArticlesPage() {
  const qc = useQueryClient();
  const [editing, setEditing] = useState<Article | null>(null);
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("id,title,content,category,publish_date")
        .order("publish_date", { ascending: false });
      if (error) throw error;
      return data as Article[];
    },
  });

  const upsert = useMutation({
    mutationFn: async (a: Omit<Article, "id"> & { id?: string }) => {
      if (a.id) {
        const { error } = await supabase.from("articles").update({
          title: a.title, content: a.content, category: a.category, publish_date: a.publish_date,
        }).eq("id", a.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("articles").insert({
          title: a.title, content: a.content, category: a.category, publish_date: a.publish_date,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editing?.id ? "Article updated" : "Article created");
      qc.invalidateQueries({ queryKey: ["articles"] });
      setOpen(false); setEditing(null);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("articles").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Article deleted");
      qc.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Testing banner */}
      <div className="sticky top-0 z-50 bg-amber-500 px-4 py-2 text-center text-sm font-medium text-amber-950">
        <span className="flex items-center justify-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          Admin mode - testing only (protection disabled temporarily)
        </span>
      </div>

      <div className="p-6">
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/admin">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-semibold">Tips &amp; News</h1>
                <p className="text-sm text-muted-foreground">
                  <Link to="/admin/users" className="hover:underline">Users</Link> ·{" "}
                  <span className="text-foreground">Articles</span> ·{" "}
                  <Link to="/admin/courses" className="hover:underline">Courses</Link>
                </p>
              </div>
            </div>
            <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setEditing(null); }}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditing(null)}>
                  <Plus className="h-4 w-4" /> New article
                </Button>
              </DialogTrigger>
              <ArticleDialog
                initial={editing}
                submitting={upsert.isPending}
                onSubmit={(values) => upsert.mutate({ ...values, id: editing?.id })}
              />
            </Dialog>
          </div>

          <Card>
            <CardHeader><CardTitle>All articles ({data?.length ?? 0})</CardTitle></CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-sm text-muted-foreground">Loading…</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Publish date</TableHead>
                      <TableHead className="w-28 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data?.map((a) => (
                      <TableRow key={a.id}>
                        <TableCell className="font-medium">{a.title}</TableCell>
                        <TableCell><Badge variant="secondary">{a.category}</Badge></TableCell>
                        <TableCell>{a.publish_date}</TableCell>
                        <TableCell className="text-right space-x-1">
                          <Button size="icon" variant="ghost"
                            onClick={() => { setEditing(a); setOpen(true); }}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="icon" variant="ghost">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete article?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  \"{a.title}\" will be permanently removed.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => del.mutate(a.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                    {data?.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                          No articles yet
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ArticleDialog({
  initial, submitting, onSubmit,
}: {
  initial: Article | null;
  submitting: boolean;
  onSubmit: (v: { title: string; content: string; category: Category; publish_date: string }) => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [category, setCategory] = useState<Category>(initial?.category ?? "Tips");
  const [publishDate, setPublishDate] = useState(
    initial?.publish_date ?? new Date().toISOString().slice(0, 10),
  );

  useEffect(() => {
    setTitle(initial?.title ?? "");
    setContent(initial?.content ?? "");
    setCategory(initial?.category ?? "Tips");
    setPublishDate(initial?.publish_date ?? new Date().toISOString().slice(0, 10));
  }, [initial]);

  return (
    <DialogContent className="max-w-2xl">
      <DialogHeader>
        <DialogTitle>{initial ? "Edit article" : "New article"}</DialogTitle>
      </DialogHeader>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim() || !content.trim()) return toast.error("Title and content are required");
          if (title.length > 200) return toast.error("Title too long");
          onSubmit({ title: title.trim(), content: content.trim(), category, publish_date: publishDate });
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" maxLength={200} value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Publish date</Label>
            <Input id="date" type="date" value={publishDate} onChange={(e) => setPublishDate(e.target.value)} required />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea id="content" rows={8} value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <DialogFooter>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Saving…" : initial ? "Save changes" : "Create article"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
