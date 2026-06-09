import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  PlayCircle,
  CheckCircle,
  Lock,
  Clock,
  Star,
  TrendingUp,
  ShieldCheck,
  Wallet,
  Target,
} from "lucide-react";

export const Route = createFileRoute("/_authenticated/learn")({
  head: () => ({ meta: [{ title: "Learning Resources — Tactifin" }] }),
  component: LearnPage,
});

const COURSES = [
  {
    id: 1,
    title: "Personal Finance 101",
    description: "Master the fundamentals — budgeting, saving, debt management and building an emergency fund.",
    icon: Wallet,
    level: "Beginner",
    duration: "45 min",
    lessons: 6,
    completedLessons: 4,
    tags: ["Budgeting", "Savings", "Debt"],
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    lessons_list: [
      { title: "Why budgeting matters", duration: "5 min", done: true },
      { title: "The 50/30/20 rule", duration: "7 min", done: true },
      { title: "Setting up an emergency fund", duration: "8 min", done: true },
      { title: "Understanding debt types", duration: "10 min", done: true },
      { title: "Credit cards: friend or foe?", duration: "8 min", done: false },
      { title: "Automating your finances", duration: "7 min", done: false },
    ],
  },
  {
    id: 2,
    title: "Islamic Finance Fundamentals",
    description: "Understand Shariah-compliant finance: Riba, Zakat, Halal investing, Sukuk and more.",
    icon: ShieldCheck,
    level: "Beginner",
    duration: "60 min",
    lessons: 7,
    completedLessons: 2,
    tags: ["Islamic Finance", "Shariah", "Zakat"],
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
    lessons_list: [
      { title: "What is Shariah-compliant finance?", duration: "8 min", done: true },
      { title: "Riba explained — why interest is prohibited", duration: "10 min", done: true },
      { title: "Calculating Zakat step by step", duration: "10 min", done: false },
      { title: "Halal vs Haram investments", duration: "9 min", done: false },
      { title: "Sukuk: Islamic bonds", duration: "8 min", done: false },
      { title: "Islamic mortgages (Murabaha)", duration: "8 min", done: false },
      { title: "Using Tactifin's compliance checker", duration: "7 min", done: false },
    ],
  },
  {
    id: 3,
    title: "Investing for Beginners",
    description: "From index funds to ETFs — learn how to start investing with confidence regardless of your starting amount.",
    icon: TrendingUp,
    level: "Beginner",
    duration: "55 min",
    lessons: 6,
    completedLessons: 0,
    tags: ["Investing", "ETFs", "Portfolio"],
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    lessons_list: [
      { title: "Why invest at all?", duration: "6 min", done: false },
      { title: "Risk vs return explained", duration: "9 min", done: false },
      { title: "Index funds vs active funds", duration: "10 min", done: false },
      { title: "Dollar-cost averaging", duration: "8 min", done: false },
      { title: "Building a diversified portfolio", duration: "12 min", done: false },
      { title: "Common investing mistakes", duration: "10 min", done: false },
    ],
  },
  {
    id: 4,
    title: "Goal-Based Saving Strategies",
    description: "Practical techniques for saving towards specific goals — house deposit, education, retirement, and more.",
    icon: Target,
    level: "Intermediate",
    duration: "40 min",
    lessons: 5,
    completedLessons: 0,
    tags: ["Goals", "Savings", "Planning"],
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    lessons_list: [
      { title: "Defining your financial goals", duration: "7 min", done: false },
      { title: "Short, medium and long-term buckets", duration: "8 min", done: false },
      { title: "High-yield savings accounts", duration: "8 min", done: false },
      { title: "Saving for a house deposit", duration: "9 min", done: false },
      { title: "Retirement planning basics", duration: "8 min", done: false },
    ],
  },
  {
    id: 5,
    title: "Understanding Your Credit",
    description: "Deep dive into how credit scores work, what damages them, and proven strategies to improve yours.",
    icon: TrendingUp,
    level: "Intermediate",
    duration: "35 min",
    lessons: 5,
    completedLessons: 0,
    tags: ["Credit", "Score", "Borrowing"],
    color: "text-rose-500",
    bgColor: "bg-rose-500/10",
    lessons_list: [
      { title: "How credit scores are calculated", duration: "8 min", done: false },
      { title: "Reading your credit report", duration: "7 min", done: false },
      { title: "Factors that hurt your score", duration: "7 min", done: false },
      { title: "Building credit from scratch", duration: "7 min", done: false },
      { title: "Using credit cards responsibly", duration: "6 min", done: false },
    ],
  },
  {
    id: 6,
    title: "Tax Efficiency for Individuals",
    description: "Legal strategies to reduce your tax bill — deductions, credits, retirement accounts and filing tips.",
    icon: BookOpen,
    level: "Advanced",
    duration: "50 min",
    lessons: 6,
    completedLessons: 0,
    tags: ["Tax", "Deductions", "Planning"],
    color: "text-cyan-500",
    bgColor: "bg-cyan-500/10",
    lessons_list: [
      { title: "Understanding tax brackets", duration: "8 min", done: false },
      { title: "Above-the-line deductions", duration: "9 min", done: false },
      { title: "Itemising vs standard deduction", duration: "8 min", done: false },
      { title: "Tax-advantaged accounts (401k, IRA, HSA)", duration: "10 min", done: false },
      { title: "Estimated quarterly taxes", duration: "8 min", done: false },
      { title: "Working with a tax professional", duration: "7 min", done: false },
    ],
  },
];

const GLOSSARY = [
  { term: "Riba", def: "Arabic for usury or interest. Prohibited in Islamic finance as it is considered exploitative." },
  { term: "Zakat", def: "One of the Five Pillars of Islam — an annual charitable donation of 2.5% on wealth exceeding the nisab." },
  { term: "Nisab", def: "The minimum threshold of wealth above which Zakat becomes obligatory (approx. the value of 85g of gold)." },
  { term: "Sukuk", def: "Islamic financial certificates equivalent to bonds, structured to comply with Shariah law (no interest)." },
  { term: "Murabaha", def: "A cost-plus financing arrangement used in Islamic mortgages and trade finance, avoiding interest." },
  { term: "Dollar-Cost Averaging", def: "Investing a fixed amount at regular intervals regardless of price, reducing the impact of volatility." },
  { term: "ETF", def: "Exchange-Traded Fund — a basket of securities traded on an exchange, typically with low fees." },
  { term: "Credit Utilisation", def: "The ratio of your current credit card balances to your total credit limits. Keeping it under 30% helps your score." },
  { term: "Emergency Fund", def: "3–6 months of essential living expenses held in liquid, accessible savings as a financial safety net." },
  { term: "Net Worth", def: "Total assets (what you own) minus total liabilities (what you owe). The core measure of financial health." },
  { term: "Progressive Tax", def: "A tax system where higher income is taxed at higher rates, applied in brackets." },
  { term: "Index Fund", def: "A fund that tracks a market index (e.g. S&P 500), offering broad diversification at low cost." },
];

function CourseCard({ course, onOpen }: { course: (typeof COURSES)[0]; onOpen: () => void }) {
  const pct = course.lessons > 0 ? Math.round((course.completedLessons / course.lessons) * 100) : 0;
  return (
    <Card
      className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant"
      onClick={onOpen}
    >
      <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-brand-gradient opacity-0 blur-2xl transition-all duration-300 group-hover:opacity-15" />
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border/60 ${course.bgColor}`}>
            <course.icon className={`h-5 w-5 ${course.color}`} />
          </div>
          <Badge variant="outline" className="text-[10px]">
            {course.level}
          </Badge>
        </div>
        <CardTitle className="mt-3 text-base leading-snug">{course.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{course.description}</p>
        <div className="flex flex-wrap gap-1">
          {course.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px]">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> {course.duration}
            </span>
            <span>{course.completedLessons}/{course.lessons} lessons</span>
          </div>
          <Progress value={pct} className="h-1.5" />
          {pct === 100 ? (
            <div className="flex items-center gap-1 text-xs text-emerald-500">
              <CheckCircle className="h-3 w-3" /> Complete
            </div>
          ) : pct > 0 ? (
            <div className="text-xs text-[color:var(--brand-bolt)]">{pct}% complete — keep going</div>
          ) : null}
        </div>
        <Button size="sm" className="w-full" variant={pct === 0 ? "default" : "outline"}>
          <PlayCircle className="mr-1.5 h-4 w-4" />
          {pct === 0 ? "Start course" : pct === 100 ? "Review" : "Continue"}
        </Button>
      </CardContent>
    </Card>
  );
}

function CourseDetail({ course, onBack }: { course: (typeof COURSES)[0]; onBack: () => void }) {
  const pct = course.lessons > 0 ? Math.round((course.completedLessons / course.lessons) * 100) : 0;
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={onBack}>← Back</Button>
        <h2 className="text-2xl">{course.title}</h2>
      </div>
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {course.duration}</span>
            <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> {course.lessons} lessons</span>
            <Badge variant="outline">{course.level}</Badge>
          </div>
          <p className="text-muted-foreground">{course.description}</p>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{course.completedLessons} of {course.lessons} completed</span>
              <span>{pct}%</span>
            </div>
            <Progress value={pct} />
          </div>
        </CardContent>
      </Card>
      <div className="space-y-2">
        {course.lessons_list.map((lesson, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 rounded-xl border p-4 transition-smooth ${
              lesson.done
                ? "border-emerald-500/30 bg-emerald-500/5"
                : i === course.completedLessons
                ? "border-[color:var(--brand-bolt)]/40 bg-[color:var(--brand-bolt)]/5 cursor-pointer hover:border-[color:var(--brand-bolt)]"
                : "border-border/60 bg-card"
            }`}
          >
            <div className="shrink-0">
              {lesson.done ? (
                <CheckCircle className="h-5 w-5 text-emerald-500" />
              ) : i === course.completedLessons ? (
                <PlayCircle className="h-5 w-5 text-[color:var(--brand-bolt)]" />
              ) : (
                <Lock className="h-5 w-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-medium ${lesson.done ? "line-through text-muted-foreground" : ""}`}>
                {lesson.title}
              </div>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
              <Clock className="h-3 w-3" /> {lesson.duration}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LearnPage() {
  const [selectedCourse, setSelectedCourse] = useState<(typeof COURSES)[0] | null>(null);
  const [glossarySearch, setGlossarySearch] = useState("");

  const totalLessons = COURSES.reduce((a, c) => a + c.lessons, 0);
  const doneLessons = COURSES.reduce((a, c) => a + c.completedLessons, 0);
  const overallPct = Math.round((doneLessons / totalLessons) * 100);

  const filteredGlossary = GLOSSARY.filter(
    (g) =>
      !glossarySearch ||
      g.term.toLowerCase().includes(glossarySearch.toLowerCase()) ||
      g.def.toLowerCase().includes(glossarySearch.toLowerCase()),
  );

  if (selectedCourse) {
    return (
      <div className="space-y-6">
        <CourseDetail course={selectedCourse} onBack={() => setSelectedCourse(null)} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl">Learning Resources</h1>
        <p className="text-sm text-muted-foreground">
          Bite-sized courses to build your financial literacy — from budgeting basics to Islamic finance.
        </p>
      </div>

      {/* Overall progress */}
      <Card className="border-[color:var(--brand-bolt)]/30 bg-[color:var(--brand-bolt)]/5">
        <CardContent className="flex flex-col gap-4 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-[color:var(--brand-bolt)]" />
              <span className="text-sm font-medium">Your learning progress</span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {doneLessons} of {totalLessons} lessons completed across {COURSES.length} courses
            </p>
          </div>
          <div className="sm:w-48 space-y-1">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Overall</span>
              <span>{overallPct}%</span>
            </div>
            <Progress value={overallPct} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="courses">
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="glossary">Glossary</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {COURSES.map((course) => (
              <CourseCard key={course.id} course={course} onOpen={() => setSelectedCourse(course)} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="glossary" className="mt-4 space-y-4">
          <div className="relative">
            <BookOpen className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search terms…"
              value={glossarySearch}
              onChange={(e) => setGlossarySearch(e.target.value)}
              className="flex h-9 w-full rounded-lg border border-input bg-background pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {filteredGlossary.map((g) => (
              <Card key={g.term} className="border-border/60">
                <CardContent className="pt-4 pb-4">
                  <div className="text-sm font-semibold text-[color:var(--brand-bolt)]">{g.term}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{g.def}</p>
                </CardContent>
              </Card>
            ))}
            {filteredGlossary.length === 0 && (
              <p className="text-sm text-muted-foreground col-span-2">No matching terms found.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
