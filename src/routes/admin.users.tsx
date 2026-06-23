import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { AlertTriangle, ArrowLeft, Users as UsersIcon, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/users")({
  head: () => ({ meta: [{ title: "Admin – Users" }] }),
  component: AdminUsersPage,
});

function AdminUsersPage() {
  const qc = useQueryClient();
  const [editingRole, setEditingRole] = useState<{ userId: string; currentRole: string | null } | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("");

  const { data: profiles, isLoading } = useQuery({
    queryKey: ["admin-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, display_name, avatar_url, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: userRoles } = useQuery({
    queryKey: ["admin-user-roles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("user_id, role");
      if (error) throw error;
      return data || [];
    },
  });

  const updateRole = useMutation({
    mutationFn: async (data: { userId: string; role: string }) => {
      // Delete existing role first
      const { error: delError } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", data.userId);
      if (delError) throw delError;

      // Insert new role
      const { error: insError } = await supabase
        .from("user_roles")
        .insert({ user_id: data.userId, role: data.role });
      if (insError) throw insError;
    },
    onSuccess: () => {
      toast.success("User role updated");
      qc.invalidateQueries({ queryKey: ["admin-user-roles"] });
      setEditingRole(null);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteUser = useMutation({
    mutationFn: async (userId: string) => {
      // Delete user role first
      await supabase.from("user_roles").delete().eq("user_id", userId);
      // Delete user profile
      const { error } = await supabase.from("profiles").delete().eq("id", userId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("User deleted");
      qc.invalidateQueries({ queryKey: ["admin-profiles"] });
      qc.invalidateQueries({ queryKey: ["admin-user-roles"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const getRoleBadge = (userId: string) => {
    const roles = userRoles?.filter(r => r.user_id === userId) || [];
    if (roles.length === 0) return <Badge variant="outline">No role</Badge>;
    return roles.map(r => (
      <Badge key={r.role} variant={r.role === 'admin' ? 'default' : 'secondary'} className="ml-1">
        {r.role}
      </Badge>
    ));
  };

  const getUserRole = (userId: string) => {
    const roleRecord = userRoles?.find(r => r.user_id === userId);
    return roleRecord?.role || null;
  };

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
                <h1 className="text-2xl font-semibold">Users</h1>
                <p className="text-sm text-muted-foreground">
                  <span className="text-foreground">Users</span> ·{" "}
                  <Link to="/admin/articles" className="hover:underline">Articles</Link> ·{" "}
                  <Link to="/admin/courses" className="hover:underline">Courses</Link>
                </p>
              </div>
            </div>
            <Link to="/">
              <Button variant="outline">Back to home</Button>
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UsersIcon className="h-5 w-5" />
                Registered users ({profiles?.length ?? 0})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-sm text-muted-foreground">Loading…</p>
              ) : profiles && profiles.length > 0 ? (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Display Name</TableHead>
                        <TableHead>User ID</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead className="w-32 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {profiles.map((u) => (
                        <TableRow key={u.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {u.avatar_url && (
                                <img src={u.avatar_url} alt="" className="h-6 w-6 rounded-full" />
                              )}
                              {u.display_name || "No name"}
                            </div>
                          </TableCell>
                          <TableCell className="text-xs text-muted-foreground font-mono">
                            {u.id.slice(0, 8)}...
                          </TableCell>
                          <TableCell>{new Date(u.created_at).toLocaleDateString()}</TableCell>
                          <TableCell>{getRoleBadge(u.id)}</TableCell>
                          <TableCell className="text-right space-x-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => {
                                setEditingRole({ userId: u.id, currentRole: getUserRole(u.id) });
                                setSelectedRole(getUserRole(u.id) || "");
                              }}
                            >
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
                                  <AlertDialogTitle>Delete user?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    &quot;{u.display_name || "No name"}&quot; and all their data will be permanently removed.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => deleteUser.mutate(u.id)}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8">
                  <UsersIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No users have signed up yet.</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Users will appear here after they create an account.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Admin Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                To grant admin access to a user, they must first sign up. Then use the Edit button next to their name to assign a role.
              </p>
              <p className="text-sm">
                Your email: <code className="bg-muted px-2 py-1 rounded">jahidmainuddinahmed@gmail.com</code>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                After signing up, you will automatically get admin access if you use the above email.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Role editing dialog */}
      {editingRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Assign Role</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Select role:</label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No role</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="moderator">Moderator</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setEditingRole(null)}>
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    if (selectedRole) {
                      updateRole.mutate({ userId: editingRole.userId, role: selectedRole });
                    } else {
                      // If no role selected, just close
                      setEditingRole(null);
                    }
                  }}
                  disabled={updateRole.isPending}
                >
                  {updateRole.isPending ? "Saving…" : "Save"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
