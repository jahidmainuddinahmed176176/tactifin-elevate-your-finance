import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { getMyRole } from "@/lib/admin.functions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileText, GraduationCap, Users } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard" }] }),
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const navigate = useNavigate();
  const role = useServerFn(getMyRole);
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    role().then((r) => {
      if (!r.isAdmin) {
        toast.error("Admins only");
        navigate({ to: "/app" });
      } else {
        setAllowed(true);
      }
    });
  }, [role, navigate]);

  if (!allowed) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Manage content and users for Tactifin.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <FileText className="h-4 w-4" />
              Articles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Create and edit Tips & News articles.</p>
            <Button asChild>
              <Link to="/admin/articles">Manage articles</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <GraduationCap className="h-4 w-4" />
              Courses
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">Manage learning courses and lessons.</p>
            <Button asChild>
              <Link to="/admin/courses">Manage courses</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Users className="h-4 w-4" />
              Users
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">View and manage registered users.</p>
            <Button asChild>
              <Link to="/admin/users">Manage users</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
