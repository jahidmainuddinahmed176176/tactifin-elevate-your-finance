import { useState } from 'react'
import {
  LayoutDashboard,
  ArrowLeftRight,
  Wallet,
  Target,
  Receipt,
  RotateCcw,
  Calculator,
  ShieldCheck,
  Bot,
  GraduationCap,
  Newspaper,
  FileBarChart,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  BookOpen,
  Scale,
  TrendingUp,
  FileSpreadsheet,
} from 'lucide-react'
import './App.css'

type MenuItem = {
  id: string
  label: string
  icon: React.ReactNode
  description: string
  children?: { id: string; label: string; icon: React.ReactNode; description: string }[]
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, description: 'Overview of your financial health' },
  { id: 'transactions', label: 'Transactions', icon: <ArrowLeftRight size={20} />, description: 'Track all your income and expenses' },
  { id: 'budgets', label: 'Budgets', icon: <Wallet size={20} />, description: 'Manage spending limits by category' },
  { id: 'goals', label: 'Goals', icon: <Target size={20} />, description: 'Set and track financial goals' },
  { id: 'bills', label: 'Bills', icon: <Receipt size={20} />, description: 'Track recurring payments and due dates' },
  { id: 'rewinder', label: 'Rewinder', icon: <RotateCcw size={20} />, description: 'Review past financial decisions' },
  { id: 'calculators', label: 'Calculators', icon: <Calculator size={20} />, description: 'Financial planning tools' },
  { id: 'compliance', label: 'Compliance', icon: <ShieldCheck size={20} />, description: 'Regulatory and tax compliance' },
  { id: 'ai-assistant', label: 'AI Assistant', icon: <Bot size={20} />, description: 'Get personalized financial advice' },
  { id: 'learning', label: 'Learning', icon: <GraduationCap size={20} />, description: 'Financial education resources' },
  { id: 'news', label: 'News', icon: <Newspaper size={20} />, description: 'Market updates and financial news' },
  {
    id: 'reports',
    label: 'Reports',
    icon: <FileBarChart size={20} />,
    description: 'Accounting reports and statements',
    children: [
      { id: 'journal-ledger', label: 'Journal Ledger', icon: <BookOpen size={18} />, description: 'Chronological record of all transactions' },
      { id: 'trial-balance', label: 'Trial Balance', icon: <FileSpreadsheet size={18} />, description: 'Verify debits equal credits' },
      { id: 'income-statement', label: 'Income Statement', icon: <TrendingUp size={18} />, description: 'Revenue, expenses, and net income' },
      { id: 'balance-sheet', label: 'Balance Sheet', icon: <Scale size={18} />, description: 'Assets, liabilities, and equity' },
    ],
  },
]

function App() {
  const [activeItem, setActiveItem] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedMenus, setExpandedMenus] = useState<string[]>([])

  const toggleMenu = (menuId: string) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    )
  }

  const getActiveItemData = () => {
    for (const item of menuItems) {
      if (item.id === activeItem) return item
      if (item.children) {
        const child = item.children.find(c => c.id === activeItem)
        if (child) return child
      }
    }
    return menuItems[0]
  }

  const activeData = getActiveItemData()

  return (
    <div className="app">
      <header className="header">
        <button className="menu-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="logo">
          <span className="logo-icon">T</span>
          <span className="logo-text">Tactifin</span>
        </div>
        <div className="header-actions">
          <div className="notification-badge">
            <span>3</span>
          </div>
          <div className="avatar">JD</div>
        </div>
      </header>

      <div className="main-container">
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h2>Workplace</h2>
            <p>Manage your finances</p>
          </div>
          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <div key={item.id}>
                <button
                  className={`nav-item ${activeItem === item.id ? 'active' : ''} ${item.children ? 'has-children' : ''}`}
                  onClick={() => {
                    if (item.children) {
                      toggleMenu(item.id)
                    } else {
                      setActiveItem(item.id)
                      setSidebarOpen(false)
                    }
                  }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                  {item.children && (
                    <span className="nav-expand">
                      {expandedMenus.includes(item.id) ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </span>
                  )}
                  {activeItem === item.id && !item.children && <ChevronRight size={16} className="nav-arrow" />}
                </button>
                {item.children && expandedMenus.includes(item.id) && (
                  <div className="nav-children">
                    {item.children.map((child) => (
                      <button
                        key={child.id}
                        className={`nav-child-item ${activeItem === child.id ? 'active' : ''}`}
                        onClick={() => {
                          setActiveItem(child.id)
                          setSidebarOpen(false)
                        }}
                      >
                        <span className="nav-child-icon">{child.icon}</span>
                        <span className="nav-child-label">{child.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </aside>

        {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

        <main className="content">
          <div className="content-header">
            <div className="content-title">
              <span className="content-icon">{activeData?.icon}</span>
              <h1>{activeData?.label}</h1>
            </div>
            <p className="content-description">{activeData?.description}</p>
          </div>

          <div className="content-body">
            {activeItem === 'dashboard' && <DashboardContent />}
            {activeItem === 'transactions' && <TransactionsContent />}
            {activeItem === 'budgets' && <BudgetsContent />}
            {activeItem === 'goals' && <GoalsContent />}
            {activeItem === 'bills' && <BillsContent />}
            {activeItem === 'rewinder' && <RewinderContent />}
            {activeItem === 'calculators' && <CalculatorsContent />}
            {activeItem === 'compliance' && <ComplianceContent />}
            {activeItem === 'ai-assistant' && <AIAssistantContent />}
            {activeItem === 'learning' && <LearningContent />}
            {activeItem === 'news' && <NewsContent />}
            {activeItem === 'reports' && <ReportsContent />}
            {activeItem === 'journal-ledger' && <JournalLedgerContent />}
            {activeItem === 'trial-balance' && <TrialBalanceContent />}
            {activeItem === 'income-statement' && <IncomeStatementContent />}
            {activeItem === 'balance-sheet' && <BalanceSheetContent />}
          </div>
        </main>
      </div>
    </div>
  )
}

function DashboardContent() {
  return (
    <div className="dashboard-grid">
      <div className="stat-card">
        <div className="stat-label">Total Balance</div>
        <div className="stat-value success">$24,580.00</div>
        <div className="stat-change positive">+2.5% from last month</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Monthly Income</div>
        <div className="stat-value">$8,200.00</div>
        <div className="stat-change positive">+1.2% from last month</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Monthly Expenses</div>
        <div className="stat-value warning">$3,420.00</div>
        <div className="stat-change negative">+5.8% from last month</div>
      </div>
      <div className="stat-card">
        <div className="stat-label">Savings Rate</div>
        <div className="stat-value success">58.3%</div>
        <div className="stat-change positive">Above target (50%)</div>
      </div>
      <div className="card wide">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <div className="activity-icon income">+</div>
            <div className="activity-details">
              <span className="activity-name">Salary Deposit</span>
              <span className="activity-date">Jul 1, 2024</span>
            </div>
            <span className="activity-amount positive">+$5,800.00</span>
          </div>
          <div className="activity-item">
            <div className="activity-icon expense">-</div>
            <div className="activity-details">
              <span className="activity-name">Rent Payment</span>
              <span className="activity-date">Jul 1, 2024</span>
            </div>
            <span className="activity-amount negative">-$1,200.00</span>
          </div>
          <div className="activity-item">
            <div className="activity-icon expense">-</div>
            <div className="activity-details">
              <span className="activity-name">Grocery Store</span>
              <span className="activity-date">Jun 30, 2024</span>
            </div>
            <span className="activity-amount negative">-$156.32</span>
          </div>
        </div>
      </div>
      <div className="card">
        <h3>Budget Status</h3>
        <div className="budget-bars">
          <div className="budget-item">
            <div className="budget-header">
              <span>Housing</span>
              <span>$1,200 / $1,500</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '80%', background: 'var(--success-500)' }} />
            </div>
          </div>
          <div className="budget-item">
            <div className="budget-header">
              <span>Food</span>
              <span>$420 / $500</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '84%', background: 'var(--warning-500)' }} />
            </div>
          </div>
          <div className="budget-item">
            <div className="budget-header">
              <span>Entertainment</span>
              <span>$180 / $200</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '90%', background: 'var(--error-500)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TransactionsContent() {
  return (
    <div className="placeholder-content">
      <div className="placeholder-icon"><ArrowLeftRight size={48} /></div>
      <h2>Transactions</h2>
      <p>View and manage all your financial transactions in one place.</p>
      <button className="primary-btn">Add Transaction</button>
    </div>
  )
}

function BudgetsContent() {
  return (
    <div className="placeholder-content">
      <div className="placeholder-icon"><Wallet size={48} /></div>
      <h2>Budgets</h2>
      <p>Create and manage budgets to control your spending.</p>
      <button className="primary-btn">Create Budget</button>
    </div>
  )
}

function GoalsContent() {
  return (
    <div className="placeholder-content">
      <div className="placeholder-icon"><Target size={48} /></div>
      <h2>Financial Goals</h2>
      <p>Set savings goals and track your progress.</p>
      <button className="primary-btn">Add Goal</button>
    </div>
  )
}

function BillsContent() {
  return (
    <div className="placeholder-content">
      <div className="placeholder-icon"><Receipt size={48} /></div>
      <h2>Bills & Subscriptions</h2>
      <p>Track upcoming bills and never miss a payment.</p>
      <button className="primary-btn">Add Bill</button>
    </div>
  )
}

function RewinderContent() {
  return (
    <div className="placeholder-content">
      <div className="placeholder-icon"><RotateCcw size={48} /></div>
      <h2>Rewinder</h2>
      <p>Review past financial decisions and learn from them.</p>
      <button className="primary-btn">Start Review</button>
    </div>
  )
}

function CalculatorsContent() {
  return (
    <div className="calculators-grid">
      <div className="calculator-card">
        <Calculator size={32} />
        <h3>Loan Calculator</h3>
        <p>Calculate payments for mortgages, auto loans, and more.</p>
      </div>
      <div className="calculator-card">
        <Calculator size={32} />
        <h3>Investment Calculator</h3>
        <p>Project growth of your investments over time.</p>
      </div>
      <div className="calculator-card">
        <Calculator size={32} />
        <h3>Retirement Calculator</h3>
        <p>Plan for retirement and estimate needed savings.</p>
      </div>
      <div className="calculator-card">
        <Calculator size={32} />
        <h3>Savings Calculator</h3>
        <p>See how small savings can grow over time.</p>
      </div>
    </div>
  )
}

function ComplianceContent() {
  return (
    <div className="placeholder-content">
      <div className="placeholder-icon"><ShieldCheck size={48} /></div>
      <h2>Compliance Center</h2>
      <p>Stay on top of tax deadlines and regulatory requirements.</p>
      <button className="primary-btn">View Checklist</button>
    </div>
  )
}

function AIAssistantContent() {
  return (
    <div className="ai-chat">
      <div className="chat-messages">
        <div className="chat-message ai">
          <div className="message-avatar"><Bot size={20} /></div>
          <div className="message-content">
            <p>Hello! I'm your AI financial assistant. I can help you with budgeting, investment questions, expense analysis, and more. What would you like to know?</p>
          </div>
        </div>
      </div>
      <div className="chat-input-container">
        <input type="text" className="chat-input" placeholder="Ask me anything about your finances..." />
        <button className="send-btn">Send</button>
      </div>
    </div>
  )
}

function LearningContent() {
  return (
    <div className="learning-grid">
      <div className="course-card">
        <div className="course-badge">Beginner</div>
        <h3>Budgeting 101</h3>
        <p>Learn the fundamentals of personal budgeting.</p>
        <span className="course-duration">12 lessons</span>
      </div>
      <div className="course-card">
        <div className="course-badge intermediate">Intermediate</div>
        <h3>Investment Basics</h3>
        <p>Understand stocks, bonds, and portfolio management.</p>
        <span className="course-duration">18 lessons</span>
      </div>
      <div className="course-card">
        <div className="course-badge advanced">Advanced</div>
        <h3>Tax Planning</h3>
        <p>Maximize deductions and minimize tax burden.</p>
        <span className="course-duration">8 lessons</span>
      </div>
    </div>
  )
}

function NewsContent() {
  return (
    <div className="news-grid">
      <div className="news-card featured">
        <div className="news-category">Markets</div>
        <h3>Fed Signals Potential Rate Cut in Coming Months</h3>
        <p>Markets rally as Federal Reserve hints at upcoming policy shift...</p>
        <span className="news-time">2 hours ago</span>
      </div>
      <div className="news-card">
        <div className="news-category">Crypto</div>
        <h3>Bitcoin Reaches New High</h3>
        <span className="news-time">4 hours ago</span>
      </div>
      <div className="news-card">
        <div className="news-category">Economy</div>
        <h3>Job Market Remains Strong</h3>
        <span className="news-time">6 hours ago</span>
      </div>
      <div className="news-card">
        <div className="news-category">Personal Finance</div>
        <h3>Best High-Yield Savings Accounts</h3>
        <span className="news-time">8 hours ago</span>
      </div>
    </div>
  )
}

function ReportsContent() {
  return (
    <div className="reports-grid">
      <div className="report-card">
        <FileBarChart size={32} />
        <h3>Monthly Summary</h3>
        <p>Complete overview of your monthly finances.</p>
        <button className="secondary-btn">Generate</button>
      </div>
      <div className="report-card">
        <FileBarChart size={32} />
        <h3>Tax Report</h3>
        <p>Income and deductions for tax filing.</p>
        <button className="secondary-btn">Generate</button>
      </div>
      <div className="report-card">
        <FileBarChart size={32} />
        <h3>Net Worth Statement</h3>
        <p>Assets, liabilities, and net worth tracking.</p>
        <button className="secondary-btn">Generate</button>
      </div>
      <div className="report-card">
        <FileBarChart size={32} />
        <h3>Spending Analysis</h3>
        <p>Detailed breakdown by category.</p>
        <button className="secondary-btn">Generate</button>
      </div>
    </div>
  )
}

const journalEntries = [
  { date: '2024-07-01', account: 'Cash', debit: 5800.00, credit: null, description: 'Salary Deposit' },
  { date: '2024-07-01', account: 'Income - Salary', debit: null, credit: 5800.00, description: 'Salary Deposit' },
  { date: '2024-07-01', account: 'Rent Expense', debit: 1200.00, credit: null, description: 'Monthly Rent' },
  { date: '2024-07-01', account: 'Cash', debit: null, credit: 1200.00, description: 'Monthly Rent' },
  { date: '2024-06-30', account: 'Groceries Expense', debit: 156.32, credit: null, description: 'Grocery Store' },
  { date: '2024-06-30', account: 'Cash', debit: null, credit: 156.32, description: 'Grocery Store' },
  { date: '2024-06-28', account: 'Utilities Expense', debit: 85.00, credit: null, description: 'Electric Bill' },
  { date: '2024-06-28', account: 'Cash', debit: null, credit: 85.00, description: 'Electric Bill' },
  { date: '2024-06-25', account: 'Entertainment Expense', debit: 45.00, credit: null, description: 'Streaming Services' },
  { date: '2024-06-25', account: 'Cash', debit: null, credit: 45.00, description: 'Streaming Services' },
]

function JournalLedgerContent() {
  return (
    <div className="report-table-container">
      <div className="report-actions">
        <button className="secondary-btn">Export CSV</button>
        <button className="secondary-btn">Print</button>
      </div>
      <table className="report-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Account</th>
            <th>Description</th>
            <th className="text-right">Debit</th>
            <th className="text-right">Credit</th>
          </tr>
        </thead>
        <tbody>
          {journalEntries.map((entry, idx) => (
            <tr key={idx}>
              <td>{entry.date}</td>
              <td>{entry.account}</td>
              <td>{entry.description}</td>
              <td className="text-right debit">{entry.debit ? `$${entry.debit.toFixed(2)}` : '-'}</td>
              <td className="text-right credit">{entry.credit ? `$${entry.credit.toFixed(2)}` : '-'}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}><strong>Totals</strong></td>
            <td className="text-right debit"><strong>$7,286.32</strong></td>
            <td className="text-right credit"><strong>$7,286.32</strong></td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

const trialBalanceData = [
  { account: 'Cash', debit: 4313.68, credit: null },
  { account: 'Income - Salary', debit: null, credit: 5800.00 },
  { account: 'Rent Expense', debit: 1200.00, credit: null },
  { account: 'Groceries Expense', debit: 156.32, credit: null },
  { account: 'Utilities Expense', debit: 85.00, credit: null },
  { account: 'Entertainment Expense', debit: 45.00, credit: null },
]

function TrialBalanceContent() {
  const totalDebit = trialBalanceData.reduce((sum, item) => sum + (item.debit || 0), 0)
  const totalCredit = trialBalanceData.reduce((sum, item) => sum + (item.credit || 0), 0)
  const isBalanced = Math.abs(totalDebit - totalCredit) < 0.01

  return (
    <div className="report-table-container">
      <div className="report-actions">
        <span className={`balance-status ${isBalanced ? 'balanced' : 'unbalanced'}`}>
          {isBalanced ? 'Balanced' : 'Unbalanced'}
        </span>
        <button className="secondary-btn">Export</button>
      </div>
      <table className="report-table">
        <thead>
          <tr>
            <th>Account</th>
            <th className="text-right">Debit</th>
            <th className="text-right">Credit</th>
          </tr>
        </thead>
        <tbody>
          {trialBalanceData.map((item, idx) => (
            <tr key={idx}>
              <td>{item.account}</td>
              <td className="text-right debit">{item.debit ? `$${item.debit.toFixed(2)}` : '-'}</td>
              <td className="text-right credit">{item.credit ? `$${item.credit.toFixed(2)}` : '-'}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td><strong>Totals</strong></td>
            <td className="text-right debit"><strong>${totalDebit.toFixed(2)}</strong></td>
            <td className="text-right credit"><strong>${totalCredit.toFixed(2)}</strong></td>
          </tr>
        </tfoot>
      </table>
      {isBalanced && (
        <div className="balance-confirmation">
          <span className="check-icon">✓</span>
          Debits equal credits. Your books are balanced.
        </div>
      )}
    </div>
  )
}

function IncomeStatementContent() {
  const revenue = [
    { name: 'Salary Income', amount: 5800.00 },
    { name: 'Interest Income', amount: 12.50 },
  ]
  const expenses = [
    { name: 'Rent Expense', amount: 1200.00 },
    { name: 'Groceries Expense', amount: 156.32 },
    { name: 'Utilities Expense', amount: 85.00 },
    { name: 'Entertainment Expense', amount: 45.00 },
    { name: 'Transportation', amount: 120.00 },
  ]
  const totalRevenue = revenue.reduce((sum, item) => sum + item.amount, 0)
  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0)
  const netIncome = totalRevenue - totalExpenses

  return (
    <div className="report-table-container income-statement">
      <div className="report-actions">
        <select className="period-select">
          <option>July 2024</option>
          <option>June 2024</option>
          <option>Q2 2024</option>
          <option>YTD 2024</option>
        </select>
        <button className="secondary-btn">Export</button>
      </div>

      <div className="statement-section">
        <h3>Revenue</h3>
        <table className="report-table">
          <tbody>
            {revenue.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td className="text-right">${item.amount.toFixed(2)}</td>
              </tr>
            ))}
            <tr className="subtotal">
              <td><strong>Total Revenue</strong></td>
              <td className="text-right"><strong>${totalRevenue.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="statement-section">
        <h3>Expenses</h3>
        <table className="report-table">
          <tbody>
            {expenses.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td className="text-right">${item.amount.toFixed(2)}</td>
              </tr>
            ))}
            <tr className="subtotal">
              <td><strong>Total Expenses</strong></td>
              <td className="text-right"><strong>${totalExpenses.toFixed(2)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="net-income-result">
        <div className={`net-income ${netIncome >= 0 ? 'positive' : 'negative'}`}>
          <span className="label">Net Income</span>
          <span className="amount">${netIncome.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

function BalanceSheetContent() {
  const assets = [
    { name: 'Cash & Bank Accounts', amount: 24580.00 },
    { name: 'Investments', amount: 15000.00 },
    { name: 'Accounts Receivable', amount: 500.00 },
  ]
  const liabilities = [
    { name: 'Credit Card', amount: 1200.00 },
    { name: 'Student Loan', amount: 8500.00 },
  ]
  const equity = [
    { name: 'Retained Earnings', amount: 29880.00 },
    { name: 'Current Earnings', amount: 500.00 },
  ]
  const totalAssets = assets.reduce((sum, item) => sum + item.amount, 0)
  const totalLiabilities = liabilities.reduce((sum, item) => sum + item.amount, 0)
  const totalEquity = equity.reduce((sum, item) => sum + item.amount, 0)
  const isBalanced = Math.abs(totalAssets - (totalLiabilities + totalEquity)) < 0.01

  return (
    <div className="report-table-container balance-sheet">
      <div className="report-actions">
        <span className="as-of-date">As of July 9, 2024</span>
        <button className="secondary-btn">Export</button>
      </div>

      <div className="balance-columns">
        <div className="balance-column">
          <h3>Assets</h3>
          <table className="report-table">
            <tbody>
              {assets.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td className="text-right">${item.amount.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="subtotal">
                <td><strong>Total Assets</strong></td>
                <td className="text-right"><strong>${totalAssets.toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="balance-column">
          <h3>Liabilities</h3>
          <table className="report-table">
            <tbody>
              {liabilities.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td className="text-right">${item.amount.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="subtotal">
                <td><strong>Total Liabilities</strong></td>
                <td className="text-right"><strong>${totalLiabilities.toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ marginTop: '24px' }}>Equity</h3>
          <table className="report-table">
            <tbody>
              {equity.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td className="text-right">${item.amount.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="subtotal">
                <td><strong>Total Equity</strong></td>
                <td className="text-right"><strong>${totalEquity.toFixed(2)}</strong></td>
              </tr>
            </tbody>
          </table>

          <div className="total-liabilities-equity">
            <table className="report-table">
              <tbody>
                <tr className="grand-total">
                  <td><strong>Total Liabilities + Equity</strong></td>
                  <td className="text-right"><strong>${(totalLiabilities + totalEquity).toFixed(2)}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className={`balance-verification ${isBalanced ? 'balanced' : 'unbalanced'}`}>
        <span className="check-icon">{isBalanced ? '✓' : '✗'}</span>
        {isBalanced
          ? `Assets (${totalAssets.toFixed(2)}) = Liabilities + Equity (${(totalLiabilities + totalEquity).toFixed(2)})`
          : 'Balance sheet does not balance'
        }
      </div>
    </div>
  )
}

export default App
