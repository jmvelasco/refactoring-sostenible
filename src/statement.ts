import {
  createRenderer,
  OutputFormat,
} from "./features/renderer";
import { getAmountPerType, formatToUSD } from "./utils/amount";
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
  outputFormat: OutputFormat
) {
  
  if (!outputFormat) {
    throw new Error(`Invalid format: ${outputFormat}`);
  }

  const renderer = createRenderer(outputFormat);

  let statementOutput = renderer.header(summary.customer);

  let totalAmount = 0;
  let volumeCredits = 0;
  for (const performance of summary.performances) {
    const play = plays[performance.playID];
    const thisAmount = getAmountPerType(play.type, performance.audience);
    volumeCredits += getExtraCredits(play.type, performance.audience);

    statementOutput += renderer.lineOrder({
      name: play.name,
      amount: formatToUSD(thisAmount),
      audience: performance.audience,
    });

    totalAmount += thisAmount;
  }

  statementOutput += renderer.footer(formatToUSD(totalAmount), volumeCredits);

  return statementOutput;
}
