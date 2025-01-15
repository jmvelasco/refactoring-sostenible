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

export { getAmountPerType };
