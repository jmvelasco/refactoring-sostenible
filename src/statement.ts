
import type {PerformanceSummary, Play} from "./statement.types";
import {getAmountPerType, getTotalAmount, formatToUSD, getCredits, createRenderer, OutputFormat} from "./services";

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

    for (const performance of summary.performances) {
        const play = plays[performance.playID];
        const thisAmount = getAmountPerType(play.type, performance.audience);

        statementOutput += renderer.lineOrder({
            name: play.name,
            amount: formatToUSD(thisAmount),
            audience: performance.audience,
        });

    }

    const totalAmount = getTotalAmount(summary, plays);
    const volumeCredits = getCredits(summary, plays);

    statementOutput += renderer.footer(formatToUSD(totalAmount), volumeCredits);

    return statementOutput;
}
