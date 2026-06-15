import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { isUserAdmin } from "@/lib/admin";
import { Pencil, Trash2, Plus } from "lucide-react";

const CATEGORIES = ["Budgeting", "Investing", "Islamic Finance", "Savings", "Debt Management", "Tax Planning", "Insurance", "Real Estate"] as const;
const LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;
type Category = (typeof CATEGORIES)[number];
type Level = (typeof LEVELS)[number];

type Course = {
  id: string;
  title: string;
  description: string;
  content: string;
  category: Category;
  level: Level;
  duration_hours: number;
  instructor: string;
  published: boolean;
};

export const Route = createFileRoute("/_authenticated/admin/courses")({
  head: () => ({ meta: [{ title: "Admin – Learning Courses" }] }),
  component: AdminCoursesPage,
});

function AdminCoursesPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [editing, setEditing] = useState<Course | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return navigate({ to: "/auth" });
      const isAdmin = await isUserAdmin(supabase, u.user.id);
      if (!isAdmin) { toast.error("Admins only"); navigate({ to: "/app" }); return; }
      setAllowed(true);
    })();
  }, [navigate]);

  const { data, isLoading } = useQuery({
    queryKey: ["courses"],
    enabled: allowed === true,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("courses")
        .select("id,title,description,content,category,level,duration_hours,instructor,published")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Course[];
    },
  });

  const upsert = useMutation({
    mutationFn: async (c: Omit<Course, "id"> & { id?: string }) => {
      if (c.id) {
        const { error } = await supabase.from("courses").update({
          title: c.title, description: c.description, content: c.content, category: c.category, 
          level: c.level, duration_hours: c.duration_hours, instructor: c.instructor, published: c.published,
        }).eq("id", c.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("courses").insert({
          title: c.title, description: c.description, content: c.content, category: c.category, 
          level: c.level, duration_hours: c.duration_hours, instructor: c.instructor, published: c.published,
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editing?.id ? "Course updated" : "Course created");
      qc.invalidateQueries({ queryKey: ["courses"] });
      setOpen(false); setEditing(null);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("courses").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Course deleted");
      qc.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (!allowed) return null;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Learning Courses</h1>
            <p className="text-sm text-muted-foreground">
              <Link to="/admin/users" className="hover:underline">Users</Link> ·{" "}
              <Link to="/admin/articles" className="hover:underline">Articles</Link> ·{" "}
              <span className="text-foreground">Courses</span>
            </p>
          </div>
          <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setEditing(null); }}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditing(null)}>
                <Plus className="h-4 w-4" /> New course
              </Button>
            </DialogTrigger>
            <CourseDialog
              initial={editing}
              submitting={upsert.isPending}
              onSubmit={(values) => upsert.mutate({ ...values, id: editing?.id })}
            />
          </Dialog>
        </div>

        <Card>
          <CardHeader><CardTitle>All courses ({data?.length ?? 0})</CardTitle></CardHeader>
          <CardContent>
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Loading…</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Published</TableHead>
                    <TableHead className="w-28 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.title}</TableCell>
                      <TableCell><Badge variant="secondary">{c.category}</Badge></TableCell>
                      <TableCell><Badge variant="outline">{c.level}</Badge></TableCell>
                      <TableCell>{c.duration_hours} hrs</TableCell>
                      <TableCell>{c.instructor}</TableCell>
                      <TableCell>{c.published ? "✓" : "✗"}</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button size="icon" variant="ghost"
                          onClick={() => { setEditing(c); setOpen(true); }}>
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
                              <AlertDialogTitle>Delete course?</AlertDialogTitle>
                              <AlertDialogDescription>
                                \"{c.title}\" will be permanently removed.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => del.mutate(c.id)}
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
                      <TableCell colSpan={7} className="text-center text-muted-foreground">
                        No courses yet
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
  );
}

function CourseDialog({
  initial, submitting, onSubmit,
}: {
  initial: Course | null;
  submitting: boolean;
  onSubmit: (v: Omit<Course, "id">) => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [category, setCategory] = useState<Category>(initial?.category ?? "Budgeting");
  const [level, setLevel] = useState<Level>(initial?.level ?? "Beginner");
  const [durationHours, setDurationHours] = useState(initial?.duration_hours ?? 1);
  const [instructor, setInstructor] = useState(initial?.instructor ?? "");
  const [published, setPublished] = useState(initial?.published ?? false);

  useEffect(() => {
    setTitle(initial?.title ?? "");
    setDescription(initial?.description ?? "");
    setContent(initial?.content ?? "");
    setCategory(initial?.category ?? "Budgeting");
    setLevel(initial?.level ?? "Beginner");
    setDurationHours(initial?.duration_hours ?? 1);
    setInstructor(initial?.instructor ?? "");
    setPublished(initial?.published ?? false);
  }, [initial]);

  return (
    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>{initial ? "Edit course" : "New course"}</DialogTitle>
      </DialogHeader>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!title.trim() || !description.trim() || !content.trim() || !instructor.trim()) {
            return toast.error("All fields are required");
          }
          if (title.length > 200) return toast.error("Title too long");
          if (durationHours < 1) return toast.error("Duration must be at least 1 hour");
          onSubmit({
            title: title.trim(),
            description: description.trim(),
            content: content.trim(),
            category,
            level,
            duration_hours: durationHours,
            instructor: instructor.trim(),
            published,
          });
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" maxLength={200} value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
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
            <Label>Level</Label>
            <Select value={level} onValueChange={(v) => setLevel(v as Level)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {LEVELS.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (hours)</Label>
            <Input 
              id="duration" 
              type="number" 
              min="1" 
              value={durationHours} 
              onChange={(e) => setDurationHours(parseInt(e.target.value) || 1)} 
              required 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="instructor">Instructor</Label>
            <Input 
              id="instructor" 
              maxLength={100}
              value={instructor} 
              onChange={(e) => setInstructor(e.target.value)} 
              required 
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Course Content</Label>
          <Textarea 
            id="content" 
            rows={10} 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="Enter the full course content or lessons..."
            required 
          />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox 
            id="published" 
            checked={published} 
            onCheckedChange={(checked) => setPublished(!!checked)}
          />
          <Label htmlFor="published" className="font-normal cursor-pointer">
            Publish this course (visible to users)
          </Label>
        </div>

        <DialogFooter>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Saving…" : initial ? "Save changes" : "Create course"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
