// import { HTMLRenderer, TextRenderer } from "./features/renderer";
import {
  HTMLRenderer,
  OutputFormat,
  PlainTextRenderer,
  StatementRenderer,
  StatementRendererType,
} from "./features/renderer";
import { getAmountPerType, getUSDCurrencyAmount } from "./utils/amount";
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
  outputFormat: StatementRendererType
) {
  
  const rendererFormat = {
    [OutputFormat.TEXT]: new PlainTextRenderer(),
    [OutputFormat.HTML]: new HTMLRenderer(),
  }[outputFormat]

  if (!rendererFormat) {
    throw new Error(`Invalid format: ${outputFormat}`);
  }

  let totalAmount = 0;
  let volumeCredits = 0;
  const renderer = new StatementRenderer(rendererFormat);

  let statementOutput = renderer.header(summary.customer);
  for (const performance of summary.performances) {
    const play = plays[performance.playID];
    const thisAmount = getAmountPerType(play.type, performance.audience);
    volumeCredits += getExtraCredits(play.type, performance.audience);

    statementOutput += renderer.lineOrder({
      name: play.name,
      amount: getUSDCurrencyAmount(thisAmount),
      audience: performance.audience,
    });

    totalAmount += thisAmount;
  }

  statementOutput += renderer.footer(getUSDCurrencyAmount(totalAmount), volumeCredits);

  return statementOutput;
}
