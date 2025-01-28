


import { HTMLRenderer, TextRenderer } from "./features/renderer";
import { getAmountPerType } from "./utils/amount";
import { getExtraCredits } from "./utils/credits";

type Play = {
  name: string;
  type: string;
};

type Performance = {
  playID: string;
  audience: number;
};

type PerformanceSummary = {
  customer: string;
  performances: Performance[];
};



export function statement(
  summary: PerformanceSummary,
  plays: Record<string, Play>,
  outputFormat: "text" | "html" = "text"
) {
  let totalAmount = 0;
  let volumeCredits = 0;

  const renderer = outputFormat === "text" 
    ? new TextRenderer() 
    : new HTMLRenderer();

  let statementOutput = renderer.renderStatementHeader(summary.customer);

  for (const performance of summary.performances) {
    const play = plays[performance.playID];
    const thisAmount = getAmountPerType(play.type, performance.audience);
    volumeCredits += getExtraCredits(play.type, performance.audience);

    statementOutput += renderer.renderStatementLineOrder({
      name: play.name,
      amount: thisAmount,
      audience: performance.audience,
    });

    totalAmount += thisAmount;
  }

  statementOutput += renderer.renderFooter(totalAmount, volumeCredits);

  return statementOutput;
}

