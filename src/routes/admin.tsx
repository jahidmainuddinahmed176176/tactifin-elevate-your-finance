import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { FileText, GraduationCap, Users, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard — Tactifin" }] }),
  component: AdminLayout,
});

function AdminLayout() {
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
            <div>
              <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">Manage content and users for Tactifin.</p>
            </div>
            <Link to="/" className="text-sm text-muted-foreground hover:underline">
              Back to home
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Link
              to="/admin/articles"
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-3">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Articles</div>
                  <div className="text-xs text-muted-foreground">Tips & News</div>
                </div>
              </div>
            </Link>

            <Link
              to="/admin/courses"
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-3">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Courses</div>
                  <div className="text-xs text-muted-foreground">Learning content</div>
                </div>
              </div>
            </Link>

            <Link
              to="/admin/users"
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary hover:shadow-md"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-3">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Users</div>
                  <div className="text-xs text-muted-foreground">Manage accounts</div>
                </div>
              </div>
            </Link>
          </div>

          {/* Outlet for sub-routes */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
