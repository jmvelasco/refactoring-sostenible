import type { Performance, PerformanceSummary, Play } from "../../statement";

function getCredits(summary: PerformanceSummary, plays: Record<string, Play>) {
  return summary.performances.reduce(
    (credits: number, performance: Performance) => {
      const baseCredits = credits + Math.max(performance.audience - 30, 0);
      return "comedy" === plays[performance.playID].type
        ? baseCredits + Math.floor(performance.audience / 5)
        : baseCredits;
    },
    0
  );
}

export { getCredits };
