import type { SymptomLog } from '../types';
import { format } from 'date-fns';

export const exportToCSV = (logs: SymptomLog[]): void => {
    const headers = ['Date', 'Time', 'Symptom', 'Severity', 'Notes'];
    const rows = logs.map(log => {
        const date = new Date(log.timestamp);
        return [
            format(date, 'yyyy-MM-dd'),
            format(date, 'HH:mm:ss'),
            log.symptom,
            log.severity.toString(),
            `"${log.notes.replace(/"/g, '""')}"` // Escape quotes in notes
        ];
    });

    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.join(','))
    ].join('\n');

    downloadFile(csvContent, `tbi-symptom-log-${format(new Date(), 'yyyy-MM-dd')}.csv`, 'text/csv');
};

export const exportToJSON = (logs: SymptomLog[]): void => {
    const jsonContent = JSON.stringify(logs, null, 2);
    downloadFile(jsonContent, `tbi-symptom-log-${format(new Date(), 'yyyy-MM-dd')}.json`, 'application/json');
};

const downloadFile = (content: string, filename: string, mimeType: string): void => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
};
