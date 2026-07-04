import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getGoals, addGoal, updateGoal, deleteGoal } from "@/lib/local-storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/goals")({
  head: () => ({ meta: [{ title: "Goals — Tactifin" }] }),
  component: GoalsPage,
});

function GoalsPage() {
  const qc = useQueryClient();
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [date, setDate] = useState("");

  const { data: goals = [] } = useQuery({
    queryKey: ["goals"],
    queryFn: () => getGoals(),
  });

  const add = useMutation({
    mutationFn: () => {
      addGoal({ name, target_amount: Number(target), target_date: date || null });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["goals"] });
      setName(""); setTarget(""); setDate("");
      toast.success("Goal added");
    },
    onError: (e) => toast.error(e instanceof Error ? e.message : "Failed"),
  });

  const contribute = useMutation({
    mutationFn: ({ id, current, amount }: { id: string; current: number; amount: number }) => {
      updateGoal(id, { current_amount: current + amount });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goals"] }),
  });

  const del = useMutation({
    mutationFn: (id: string) => { deleteGoal(id); },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["goals"] }),
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Savings goals</h1>
        <p className="text-sm text-muted-foreground">Set targets and track your progress.</p>
      </div>

      <Card>
        <CardHeader><CardTitle>New goal</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); add.mutate(); }} className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <Label>Name</Label>
              <Input className="mt-1" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Emergency fund" />
            </div>
            <div>
              <Label>Target amount</Label>
              <Input className="mt-1" type="number" min="1" step="0.01" required value={target} onChange={(e) => setTarget(e.target.value)} />
            </div>
            <div>
              <Label>Target date</Label>
              <Input className="mt-1" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="md:col-span-4">
              <Button type="submit" disabled={add.isPending}>Add goal</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {goals.map((g) => {
          const pct = Math.min(100, (g.current_amount / g.target_amount) * 100);
          return (
            <Card key={g.id}>
              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>{g.name}</CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">
                    ${g.current_amount.toFixed(2)} of ${g.target_amount.toFixed(2)}
                    {g.target_date ? ` · by ${g.target_date}` : ""}
                  </p>
                </div>
                <button onClick={() => del.mutate(g.id)} className="text-muted-foreground hover:text-destructive">
                  <Trash2 className="h-4 w-4" />
                </button>
              </CardHeader>
              <CardContent className="space-y-3">
                <Progress value={pct} />
                <div className="flex gap-2">
                  {[10, 50, 100].map((v) => (
                    <Button key={v} size="sm" variant="outline"
                      onClick={() => contribute.mutate({ id: g.id, current: g.current_amount, amount: v })}>
                      +${v}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
        {goals.length === 0 && <p className="text-sm text-muted-foreground">No goals yet.</p>}
      </div>
    </div>
  );
}
