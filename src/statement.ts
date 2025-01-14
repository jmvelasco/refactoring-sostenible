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
  plays: Record<string, Play>
) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `Statement for ${summary.customer}\n`;

  for (let perf of summary.performances) {
    const play = plays[perf.playID];
    const thisAmount = getAmountPerType(play.type, perf.audience);
    // add volume credits
    volumeCredits += getExtraCredits(play.type, perf.audience);

    // print line for this order
    result += lineOrderDescription({
      name: play.name,
      amount: thisAmount,
      audience: perf.audience,
    });
    totalAmount += thisAmount;
  }
  result += `Amount owed is ${formatAmount(totalAmount)}\n`;
  result += `You earned ${volumeCredits} credits\n`;
  return result;
}

function getAmountPerType(type: string, performanceAudience: number) {
  let amount = 0;

  switch (type) {
    case "tragedy":
      amount = 40000;
      if (performanceAudience > 30) {
        amount += 1000 * (performanceAudience - 30);
      }
      break;
    case "comedy":
      amount = 30000;
      if (performanceAudience > 20) {
        amount += 10000 + 500 * (performanceAudience - 20);
      }
      amount += 300 * performanceAudience;
      break;
    default:
      throw new Error(`unknown type: ${type}`);
  }

  return amount;
}

function getExtraCredits(type: string, performanceAudience: number) {
  let extraCredits = Math.max(performanceAudience - 30, 0)
  // add extra credit for every ten comedy attendees
  if ("comedy" === type) extraCredits += Math.floor(performanceAudience / 5);

  return extraCredits;
}

function lineOrderDescription({
  name,
  amount,
  audience,
}: {
  name: string;
  amount: number;
  audience: number;
}) {
  return ` ${name}: ${formatAmount(amount)} (${audience} seats)\n`;
}

function formatAmount(amount: number) {
  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;
  return format(amount / 100);
}
