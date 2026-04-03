import { Moon, Sun, LogOut, TrendingUp } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { profile, signOut, switchRole } = useAuth();

  return (
    <nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-white">
                Finance Dashboard
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Track your finances
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {profile && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <span className="text-sm text-slate-600 dark:text-slate-300">
                  Role:
                </span>
                <select
                  value={profile.role}
                  onChange={(e) => switchRole(e.target.value as 'admin' | 'viewer')}
                  className="bg-transparent border-none text-sm font-semibold text-slate-800 dark:text-white focus:ring-0 cursor-pointer"
                >
                  <option value="admin">Admin</option>
                  <option value="viewer">Viewer</option>
                </select>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              ) : (
                <Sun className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              )}
            </button>

            <button
              onClick={signOut}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium">Sign Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
