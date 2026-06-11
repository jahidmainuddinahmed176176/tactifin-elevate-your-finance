import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { b as useQueryClient, u as useQuery, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-C60lNmPB.mjs";
import { D as Dialog, p as DialogTrigger, B as Button, C as Card, a as CardHeader, b as CardTitle, d as CardContent, q as Badge, i as DialogContent, j as DialogHeader, k as DialogTitle, L as Label, I as Input, S as Select, e as SelectTrigger, f as SelectValue, g as SelectContent, h as SelectItem, l as DialogFooter, c as cn } from "./router-DLLEZnVG.mjs";
import { T as Textarea } from "./textarea-BPi2Jec4.mjs";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, A as AlertDialog, f as AlertDialogTrigger, g as AlertDialogContent, h as AlertDialogHeader, i as AlertDialogTitle, j as AlertDialogDescription, k as AlertDialogFooter, l as AlertDialogCancel, m as AlertDialogAction } from "./alert-dialog-DBhgnJEi.mjs";
import { C as Checkbox$1, a as CheckboxIndicator } from "../_libs/radix-ui__react-checkbox.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as Plus, _ as Pencil, n as Trash2, r as Check } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-progress.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-tabs.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/recharts.mjs";
import "../_libs/lodash.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
import "../_libs/radix-ui__react-alert-dialog.mjs";
const Checkbox = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Checkbox$1,
  {
    ref,
    className: cn(
      "grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxIndicator, { className: cn("grid place-content-center text-current"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) })
  }
));
Checkbox.displayName = Checkbox$1.displayName;
const CATEGORIES = ["Budgeting", "Investing", "Islamic Finance", "Savings", "Debt Management", "Tax Planning", "Insurance", "Real Estate"];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];
function AdminCoursesPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [allowed, setAllowed] = reactExports.useState(null);
  const [editing, setEditing] = reactExports.useState(null);
  const [open, setOpen] = reactExports.useState(false);
  reactExports.useEffect(() => {
    (async () => {
      const {
        data: u
      } = await supabase.auth.getUser();
      if (!u.user) return navigate({
        to: "/auth"
      });
      const {
        data: isAdmin
      } = await supabase.rpc("has_role", {
        _user_id: u.user.id,
        _role: "admin"
      });
      if (!isAdmin) {
        toast.error("Admins only");
        navigate({
          to: "/"
        });
        return;
      }
      setAllowed(true);
    })();
  }, [navigate]);
  const {
    data,
    isLoading
  } = useQuery({
    queryKey: ["courses"],
    enabled: allowed === true,
    queryFn: async () => {
      const {
        data: data2,
        error
      } = await supabase.from("courses").select("id,title,description,content,category,level,duration_hours,instructor,published").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      return data2;
    }
  });
  const upsert = useMutation({
    mutationFn: async (c) => {
      if (c.id) {
        const {
          error
        } = await supabase.from("courses").update({
          title: c.title,
          description: c.description,
          content: c.content,
          category: c.category,
          level: c.level,
          duration_hours: c.duration_hours,
          instructor: c.instructor,
          published: c.published
        }).eq("id", c.id);
        if (error) throw error;
      } else {
        const {
          error
        } = await supabase.from("courses").insert({
          title: c.title,
          description: c.description,
          content: c.content,
          category: c.category,
          level: c.level,
          duration_hours: c.duration_hours,
          instructor: c.instructor,
          published: c.published
        });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      toast.success(editing?.id ? "Course updated" : "Course created");
      qc.invalidateQueries({
        queryKey: ["courses"]
      });
      setOpen(false);
      setEditing(null);
    },
    onError: (e) => toast.error(e.message)
  });
  const del = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("courses").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Course deleted");
      qc.invalidateQueries({
        queryKey: ["courses"]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  if (!allowed) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-6xl space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold", children: "Learning Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/users", className: "hover:underline", children: "Users" }),
          " ·",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin/articles", className: "hover:underline", children: "Articles" }),
          " ·",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Courses" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: (v) => {
        setOpen(v);
        if (!v) setEditing(null);
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => setEditing(null), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4" }),
          " New course"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CourseDialog, { initial: editing, submitting: upsert.isPending, onSubmit: (values) => upsert.mutate({
          ...values,
          id: editing?.id
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { children: [
        "All courses (",
        data?.length ?? 0,
        ")"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Loading…" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Title" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Level" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Duration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Instructor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "Published" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "w-28 text-right", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableBody, { children: [
          data?.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: c.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: c.category }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: c.level }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
              c.duration_hours,
              " hrs"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: c.instructor }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: c.published ? "✓" : "✗" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-right space-x-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", onClick: () => {
                setEditing(c);
                setOpen(true);
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon", variant: "ghost", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTitle, { children: "Delete course?" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogDescription, { children: [
                      '\\"',
                      c.title,
                      '\\" will be permanently removed.'
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: () => del.mutate(c.id), className: "bg-destructive text-destructive-foreground hover:bg-destructive/90", children: "Delete" })
                  ] })
                ] })
              ] })
            ] })
          ] }, c.id)),
          data?.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 7, className: "text-center text-muted-foreground", children: "No courses yet" }) })
        ] })
      ] }) })
    ] })
  ] }) });
}
function CourseDialog({
  initial,
  submitting,
  onSubmit
}) {
  const [title, setTitle] = reactExports.useState(initial?.title ?? "");
  const [description, setDescription] = reactExports.useState(initial?.description ?? "");
  const [content, setContent] = reactExports.useState(initial?.content ?? "");
  const [category, setCategory] = reactExports.useState(initial?.category ?? "Budgeting");
  const [level, setLevel] = reactExports.useState(initial?.level ?? "Beginner");
  const [durationHours, setDurationHours] = reactExports.useState(initial?.duration_hours ?? 1);
  const [instructor, setInstructor] = reactExports.useState(initial?.instructor ?? "");
  const [published, setPublished] = reactExports.useState(initial?.published ?? false);
  reactExports.useEffect(() => {
    setTitle(initial?.title ?? "");
    setDescription(initial?.description ?? "");
    setContent(initial?.content ?? "");
    setCategory(initial?.category ?? "Budgeting");
    setLevel(initial?.level ?? "Beginner");
    setDurationHours(initial?.duration_hours ?? 1);
    setInstructor(initial?.instructor ?? "");
    setPublished(initial?.published ?? false);
  }, [initial]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "max-w-3xl max-h-[90vh] overflow-y-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: initial ? "Edit course" : "New course" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "space-y-4", onSubmit: (e) => {
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
        published
      });
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "title", children: "Title" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "title", maxLength: 200, value: title, onChange: (e) => setTitle(e.target.value), required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "description", children: "Description" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "description", rows: 3, value: description, onChange: (e) => setDescription(e.target.value), required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: category, onValueChange: (v) => setCategory(v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: CATEGORIES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: c, children: c }, c)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Level" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: level, onValueChange: (v) => setLevel(v), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: LEVELS.map((l) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: l, children: l }, l)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "duration", children: "Duration (hours)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "duration", type: "number", min: "1", value: durationHours, onChange: (e) => setDurationHours(parseInt(e.target.value) || 1), required: true })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "instructor", children: "Instructor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "instructor", maxLength: 100, value: instructor, onChange: (e) => setInstructor(e.target.value), required: true })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "content", children: "Course Content" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { id: "content", rows: 10, value: content, onChange: (e) => setContent(e.target.value), placeholder: "Enter the full course content or lessons...", required: true })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { id: "published", checked: published, onCheckedChange: (checked) => setPublished(!!checked) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "published", className: "font-normal cursor-pointer", children: "Publish this course (visible to users)" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: submitting, children: submitting ? "Saving…" : initial ? "Save changes" : "Create course" }) })
    ] })
  ] });
}
export {
  AdminCoursesPage as component
};
