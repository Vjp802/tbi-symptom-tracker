import { useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { SymptomLog } from '../types';
import { format, subDays } from 'date-fns';
import { TrendingUp, TrendingDown, Minus, BarChart3 } from 'lucide-react';

interface AnalyticsProps {
    logs: SymptomLog[];
}

export default function Analytics({ logs }: AnalyticsProps) {
    const stats = useMemo(() => {
        if (logs.length === 0) return null;

        // Group by symptom
        const symptomGroups = logs.reduce((acc, log) => {
            if (!acc[log.symptom]) {
                acc[log.symptom] = [];
            }
            acc[log.symptom].push(log);
            return acc;
        }, {} as Record<string, SymptomLog[]>);

        // Calculate stats
        const symptomStats = Object.entries(symptomGroups).map(([symptom, group]) => {
            const avgSeverity = group.reduce((sum, log) => sum + log.severity, 0) / group.length;

            // Calculate trend
            const sortedLogs = [...group].sort((a, b) =>
                new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
            );

            let trend: 'up' | 'down' | 'stable' = 'stable';
            if (sortedLogs.length >= 2) {
                const recent = sortedLogs.slice(-Math.ceil(sortedLogs.length / 2));
                const older = sortedLogs.slice(0, Math.floor(sortedLogs.length / 2));
                const recentAvg = recent.reduce((sum, log) => sum + log.severity, 0) / recent.length;
                const olderAvg = older.reduce((sum, log) => sum + log.severity, 0) / older.length;

                if (recentAvg > olderAvg + 0.5) trend = 'up';
                else if (recentAvg < olderAvg - 0.5) trend = 'down';
            }

            return {
                symptom,
                avgSeverity: Math.round(avgSeverity * 10) / 10,
                count: group.length,
                trend
            };
        });

        // Prepare timeline data (last 7 days)
        const timelineData = [];
        for (let i = 6; i >= 0; i--) {
            const date = subDays(new Date(), i);
            const dayLogs = logs.filter(log => {
                const logDate = new Date(log.timestamp);
                return format(logDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
            });

            const avgSeverity = dayLogs.length > 0
                ? dayLogs.reduce((sum, log) => sum + log.severity, 0) / dayLogs.length
                : 0;

            timelineData.push({
                date: format(date, 'MMM dd'),
                severity: Math.round(avgSeverity * 10) / 10,
                count: dayLogs.length
            });
        }

        return { symptomStats, timelineData };
    }, [logs]);

    if (!stats || logs.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
                <BarChart3 className="mx-auto text-slate-300 mb-3" size={48} />
                <p className="text-slate-500">No data available for analytics yet.</p>
                <p className="text-sm text-slate-400 mt-2">Start logging symptoms to see trends and patterns.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 size={24} className="text-blue-600" />
                Analytics Dashboard
            </h2>

            {/* Symptom Frequency */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold mb-4 text-slate-800">Symptom Frequency</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stats.symptomStats}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                            dataKey="symptom"
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            tick={{ fontSize: 12 }}
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* 7-Day Trend */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-lg font-semibold mb-4 text-slate-800">7-Day Severity Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={stats.timelineData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                        <YAxis domain={[0, 10]} />
                        <Tooltip />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="severity"
                            stroke="#0ea5e9"
                            strokeWidth={3}
                            dot={{ fill: '#0ea5e9', r: 5 }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            {/* Symptom Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.symptomStats.map(stat => (
                    <div key={stat.symptom} className="bg-white rounded-xl shadow-sm border border-slate-100 p-4">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-semibold text-slate-800 text-sm">{stat.symptom}</h4>
                            {stat.trend === 'up' && <TrendingUp className="text-red-500" size={18} />}
                            {stat.trend === 'down' && <TrendingDown className="text-green-500" size={18} />}
                            {stat.trend === 'stable' && <Minus className="text-slate-400" size={18} />}
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs text-slate-500">Avg Severity: <span className="font-bold text-blue-600">{stat.avgSeverity}/10</span></p>
                            <p className="text-xs text-slate-500">Occurrences: <span className="font-bold">{stat.count}</span></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
