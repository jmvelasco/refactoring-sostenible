import { getAmountPerType } from "./utils/amount";
import { getExtraCredits } from "./utils/credits";
import { renderFooter, renderStatementHeader, renderStatementLineOrder } from "./utils/render";

export function statement(
  summary: PerformanceSummary,
  plays: Record<string, Play>
) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let statementOutput = renderStatementHeader(summary.customer);

  for (const performance of summary.performances) {
    const play = plays[performance.playID];
    const thisAmount = getAmountPerType(play.type, performance.audience);
    // add volume credits
    volumeCredits += getExtraCredits(play.type, performance.audience);

    // print line for this order
    statementOutput += renderStatementLineOrder({
      name: play.name,
      amount: thisAmount,
      audience: performance.audience,
    });
    totalAmount += thisAmount;
  }
  statementOutput += renderFooter(totalAmount, volumeCredits);

  return statementOutput;
}
