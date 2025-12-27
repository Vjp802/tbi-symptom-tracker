export interface SymptomLog {
    id: string;
    timestamp: string;
    symptom: string;
    severity: number;
    notes: string;
}

export interface SymptomStats {
    symptom: string;
    avgSeverity: number;
    count: number;
    trend: 'up' | 'down' | 'stable';
}

export interface DateRange {
    start: Date;
    end: Date;
    label: string;
}
