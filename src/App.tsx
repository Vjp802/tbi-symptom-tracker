import { useState, useEffect } from 'react';
import { Brain, Plus, Save, History, Download, Trash2, Edit2, AlertCircle, BarChart3, Calendar } from 'lucide-react';
import type { SymptomLog } from './types';
import { saveToLocalStorage, loadFromLocalStorage } from './utils/storage';
import { exportToCSV, exportToJSON } from './utils/export';
import Analytics from './components/Analytics';
import { format, subDays, isAfter } from 'date-fns';

const SYMPTOMS = [
  "Headache",
  "Dizziness",
  "Nausea",
  "Sensitivity to Light",
  "Sensitivity to Sound",
  "Memory Fog",
  "Fatigue",
  "Irritability",
  "Sleep Disturbance",
  "Balance Issues",
  "Blurred Vision",
  "Concentration Difficulty"
];

export default function App() {
  const [logs, setLogs] = useState<SymptomLog[]>([]);
  const [activeSymptom, setActiveSymptom] = useState<string>("Headache");
  const [severity, setSeverity] = useState<number>(5);
  const [notes, setNotes] = useState<string>("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAnalytics, setShowAnalytics] = useState<boolean>(false);
  const [dateFilter, setDateFilter] = useState<'all' | '7days' | '30days'>('all');

  // Load logs from localStorage on mount
  useEffect(() => {
    const savedLogs = loadFromLocalStorage();
    setLogs(savedLogs);
  }, []);

  // Save to localStorage whenever logs change
  useEffect(() => {
    if (logs.length > 0) {
      saveToLocalStorage(logs);
    }
  }, [logs]);

  const saveLog = () => {
    if (editingId) {
      // Update existing log
      setLogs(logs.map(log =>
        log.id === editingId
          ? { ...log, symptom: activeSymptom, severity, notes }
          : log
      ));
      setEditingId(null);
    } else {
      // Create new log
      const newLog: SymptomLog = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        symptom: activeSymptom,
        severity: severity,
        notes: notes
      };
      setLogs([newLog, ...logs]);
    }

    // Reset form
    setActiveSymptom("Headache");
    setSeverity(5);
    setNotes("");
  };

  const editLog = (log: SymptomLog) => {
    setActiveSymptom(log.symptom);
    setSeverity(log.severity);
    setNotes(log.notes);
    setEditingId(log.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteLog = (id: string) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      setLogs(logs.filter(log => log.id !== id));
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setActiveSymptom("Headache");
    setSeverity(5);
    setNotes("");
  };

  const filteredLogs = logs.filter(log => {
    if (dateFilter === 'all') return true;
    const logDate = new Date(log.timestamp);
    const cutoff = dateFilter === '7days' ? subDays(new Date(), 7) : subDays(new Date(), 30);
    return isAfter(logDate, cutoff);
  });

  const getSeverityColor = (severity: number) => {
    if (severity >= 8) return 'bg-red-100 text-red-700';
    if (severity >= 5) return 'bg-yellow-100 text-yellow-700';
    return 'bg-green-100 text-green-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-8">
      {/* Header */}
      <header className="max-w-4xl mx-auto mb-8">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-3 rounded-xl text-white shadow-md">
              <Brain size={36} />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900">TBI Symptom Tracker</h1>
              <p className="text-slate-600 text-sm mt-1">Clinical Research Log • Patient Portal</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowAnalytics(!showAnalytics)}
                className={`p-3 rounded-xl font-semibold transition-all ${showAnalytics
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                title="Toggle Analytics"
              >
                <BarChart3 size={20} />
              </button>
            </div>
          </div>

          {/* Clinical Disclaimer */}
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl flex gap-3">
            <AlertCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
            <div className="text-sm text-blue-900">
              <strong>Clinical Notice:</strong> This tool is for symptom tracking only.
              Always consult your healthcare provider for medical advice. Data is stored locally on your device.
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto space-y-6">
        {/* Entry Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 transition-all duration-200 hover:shadow-md animate-fade-in">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Plus size={22} className="text-blue-600" />
            {editingId ? 'Edit Symptom Entry' : 'Log New Symptom'}
          </h2>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Symptom Type</label>
                <select
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  value={activeSymptom}
                  onChange={(e) => setActiveSymptom(e.target.value)}
                >
                  {SYMPTOMS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium text-slate-700">Severity (1-10)</label>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${getSeverityColor(severity)}`}>
                    {severity}
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  value={severity}
                  onChange={(e) => setSeverity(parseInt(e.target.value))}
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>Mild</span>
                  <span>Moderate</span>
                  <span>Severe</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Notes (Optional)
              </label>
              <textarea
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                rows={3}
                placeholder="Add any additional context about this symptom..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={saveLog}
                className="flex-1 py-3 px-6 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-sm hover:shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <Save size={20} /> {editingId ? 'Update Entry' : 'Record Entry'}
              </button>
              {editingId && (
                <button
                  onClick={cancelEdit}
                  className="py-3 px-6 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all duration-200 active:scale-95"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Analytics Toggle */}
        {showAnalytics && logs.length > 0 && (
          <div className="animate-fade-in">
            <Analytics logs={filteredLogs} />
          </div>
        )}

        {/* Activity Log Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <History size={22} className="text-slate-600" />
              Activity History
              <span className="text-sm font-normal text-slate-500">({filteredLogs.length} entries)</span>
            </h2>

            <div className="flex gap-2 flex-wrap">
              {/* Date Filter */}
              <div className="flex gap-1 bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setDateFilter('all')}
                  className={`px-3 py-1.5 text-sm rounded-md transition-all ${dateFilter === 'all' ? 'bg-white text-slate-900 font-semibold shadow-sm' : 'text-slate-600'
                    }`}
                >
                  All
                </button>
                <button
                  onClick={() => setDateFilter('7days')}
                  className={`px-3 py-1.5 text-sm rounded-md transition-all ${dateFilter === '7days' ? 'bg-white text-slate-900 font-semibold shadow-sm' : 'text-slate-600'
                    }`}
                >
                  7 Days
                </button>
                <button
                  onClick={() => setDateFilter('30days')}
                  className={`px-3 py-1.5 text-sm rounded-md transition-all ${dateFilter === '30days' ? 'bg-white text-slate-900 font-semibold shadow-sm' : 'text-slate-600'
                    }`}
                >
                  30 Days
                </button>
              </div>

              {/* Export Buttons */}
              {logs.length > 0 && (
                <>
                  <button
                    onClick={() => exportToCSV(filteredLogs)}
                    className="py-3 px-6 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all duration-200 active:scale-95 flex items-center gap-2 text-sm"
                  >
                    <Download size={16} /> CSV
                  </button>
                  <button
                    onClick={() => exportToJSON(filteredLogs)}
                    className="py-3 px-6 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all duration-200 active:scale-95 flex items-center gap-2 text-sm"
                  >
                    <Download size={16} /> JSON
                  </button>
                </>
              )}
            </div>
          </div>

          {filteredLogs.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 transition-all duration-200 hover:shadow-md text-center py-12">
              <History className="mx-auto text-slate-300 mb-3" size={48} />
              <p className="text-slate-500 font-medium">No entries recorded yet.</p>
              <p className="text-sm text-slate-400 mt-2">Start tracking your symptoms above.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredLogs.map((log, index) => (
                <div
                  key={log.id}
                  className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-slate-900 text-lg">{log.symptom}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getSeverityColor(log.severity)}`}>
                          Level {log.severity}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-500 mb-2">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {format(new Date(log.timestamp), 'MMM dd, yyyy')}
                        </span>
                        <span>•</span>
                        <span>{format(new Date(log.timestamp), 'h:mm a')}</span>
                      </div>
                      {log.notes && (
                        <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg mt-2">
                          {log.notes}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => editLog(log)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => deleteLog(log.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center py-6 text-sm text-slate-500">
          <p>Data is automatically saved to your browser's local storage.</p>
          <p className="mt-1">Export regularly to maintain backups outside your device.</p>
        </footer>
      </main>
    </div>
  );
}
