import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { supabase, Transaction } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { DashboardLayout } from '../components/Layout/DashboardLayout';
import { SummaryCards } from '../components/Dashboard/SummaryCards';
import { BalanceTrend } from '../components/Dashboard/BalanceTrend';
import { SpendingBreakdown } from '../components/Dashboard/SpendingBreakdown';
import { TransactionsList } from '../components/Transactions/TransactionsList';
import { InsightsSection } from '../components/Insights/InsightsSection';
import { AddTransactionModal } from '../components/Transactions/AddTransactionModal';

export function Dashboard() {
  const { user, profile } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchTransactions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: false });

      if (error) throw error;
      setTransactions(data || []);
    } catch (err) {
      console.error('Error fetching transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
              Dashboard Overview
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-1">
              Track your financial activity and insights
            </p>
          </div>

          {profile?.role === 'admin' && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              <span>Add Transaction</span>
            </button>
          )}
        </div>

        <SummaryCards transactions={transactions} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BalanceTrend transactions={transactions} />
          <SpendingBreakdown transactions={transactions} />
        </div>

        <InsightsSection transactions={transactions} />

        <TransactionsList transactions={transactions} />
      </div>

      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={fetchTransactions}
      />
    </DashboardLayout>
  );
}
