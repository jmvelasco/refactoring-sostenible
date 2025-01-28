import { formatAmount } from "../../utils/amount";
import Renderer from "./renderer";

class HTMLRenderer implements Renderer {
  renderStatementHeader(customer: string): string {
    return `<h1>Statement for ${customer}</h1>`;
  }
  renderStatementLineOrder({
    name,
    amount,
    audience,
  }: {
    name: string;
    amount: number;
    audience: number;
  }): string {
    return `<p>&nbsp;${name}: ${formatAmount(amount)} (${audience} seats)</p>`;
  }
  renderFooter(totalAmount: number, volumeCredits: number): string {
    return `<p>Amount owed is ${formatAmount(totalAmount)}</p><p>You earned ${volumeCredits} credits</p>`;
  }
}

export default HTMLRenderer;