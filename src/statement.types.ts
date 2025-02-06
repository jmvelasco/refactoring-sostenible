export type Play = {
    name: string;
    type: string;
};

export type Performance = {
    playID: string;
    audience: number;
};

export type PerformanceSummary = {
    customer: string;
    performances: Performance[];
};