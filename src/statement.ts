import { getAmountPerType } from "./features/performance/getAmountPerType";
import { getCredits } from "./features/performance/getCredits";
import { getTotalAmount } from "./features/performance/getTotalAmount";
import {
  StatementPrinter,
  OutputFormat,
} from "./features/printer/StatementPrinter";
import { formatToUSD } from "./features/printer/formatToUSD";

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

export type Statement = {
  customer: string;
  performances: {
    name: string;
    amount: string;
    audience: number;
  }[];
  amount: string;
  credits: number;
};

export function statement(
  summary: PerformanceSummary,
  plays: Record<string, Play>,
  outputFormat: OutputFormat
) {
  if (!outputFormat) {
    throw new Error(`Invalid format: ${outputFormat}`);
  }

  const statement = createStatement(summary, plays);

  const printer = new StatementPrinter(outputFormat);
  const statementOutput = printer.print(statement);

  return statementOutput;
}

const createStatement = (
  summary: PerformanceSummary,
  plays: Record<string, Play>
): Statement => {
  return {
    customer: summary.customer,
    performances: summary.performances.map((performance) => {
      const play = plays[performance.playID];
      return {
        name: play.name,
        amount: formatToUSD(getAmountPerType(play.type, performance.audience)),
        audience: performance.audience,
      };
    }),
    amount: formatToUSD(getTotalAmount(summary, plays)),
    credits: getCredits(summary, plays),
  };
};
