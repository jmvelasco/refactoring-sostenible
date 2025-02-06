import {
    createRenderer,
    OutputFormat,
} from "./features/renderer";
import {getAmountPerType, formatToUSD} from "./utils/amount";

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

function getCredits(summary: PerformanceSummary, plays: Record<string, Play>) {
    return getCreditsRefactored(summary, plays);
    // let volumeCredits = 0;
    // for (const performance of summary.performances) {
    //     const play = plays[performance.playID];
    //     volumeCredits += getExtraCredits(play.type, performance.audience);
    // }
    // return volumeCredits;
}


function getCreditsRefactored(summary: PerformanceSummary, plays: Record<string, Play>) {


    return summary.performances.reduce((credits: number, performance: Performance)=> {

        const baseCredits = credits + Math.max(performance.audience - 30, 0);
        return ("comedy" === plays[performance.playID].type)
            ? baseCredits + Math.floor(performance.audience / 5)
            : baseCredits;


    }, 0);
}

function getTotalAmount(summary: PerformanceSummary, plays: Record<string, Play>) {
    return getTotalAmountRefactored(summary, plays);
    // let totalAmount = 0;
    // for (const performance of summary.performances) {
    //     const play = plays[performance.playID];
    //     const thisAmount = getAmountPerType(play.type, performance.audience);
    //     totalAmount += thisAmount;
    // }
    // return totalAmount;
}

function getTotalAmountRefactored(summary: PerformanceSummary, plays: Record<string, Play>) {
    return summary.performances.reduce((totalAmount: number, performance: Performance) => {
        const amount = getAmountPerType(plays[performance.playID].type, performance.audience);
        return totalAmount += amount;
    }, 0);
}

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
