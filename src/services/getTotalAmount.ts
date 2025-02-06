import type {Performance, PerformanceSummary, Play} from "../statement.types";
import {getAmountPerType} from "./getAmountPerType";

function getTotalAmount(summary: PerformanceSummary, plays: Record<string, Play>) {
    return summary.performances.reduce((totalAmount: number, performance: Performance) => {
        return totalAmount + getAmountPerType(plays[performance.playID].type, performance.audience);
    }, 0);
}

export {getTotalAmount};