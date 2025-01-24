abstract class Renderer {
  formatAmount(amount: number) {
    const format = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format;
    return format(amount / 100);
  }

  abstract renderStatementHeader(customer: string): string;

  abstract renderStatementLineOrder({
    name,
    amount,
    audience,
  }: {
    name: string;
    amount: number;
    audience: number;
  }): string;

  abstract renderFooter(totalAmount: number, volumeCredits: number): string;
}

export class TextRenderer extends Renderer {
  renderStatementLineOrder({
    name,
    amount,
    audience,
  }: {
    name: string;
    amount: number;
    audience: number;
  }): string {
    return ` ${name}: ${this.formatAmount(amount)} (${audience} seats)\n`;
  }

  renderFooter(totalAmount: number, volumeCredits: number): string {
    let footer = `Amount owed is ${this.formatAmount(totalAmount)}\n`;
    footer += `You earned ${volumeCredits} credits\n`;

    return footer;
  }

  renderStatementHeader(customer: string): string {
    return `Statement for ${customer}\n`;
  }
}

export class HTMLRenderer extends Renderer {
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
    return `<p>&nbsp;${name}: ${this.formatAmount(amount)} (${audience} seats)</p>`;
  }
  renderFooter(totalAmount: number, volumeCredits: number): string {
    return `<p>Amount owed is ${this.formatAmount(totalAmount)}</p><p>You earned ${volumeCredits} credits</p>`;
  }
}
