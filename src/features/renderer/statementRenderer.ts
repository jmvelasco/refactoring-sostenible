type OrderDetails = {
  name: string;
  amount: string;
  audience: number;
};

type StatementRendererType = OutputFormat;

const enum OutputFormat {
  TEXT = "text",
  HTML = "html",
}

interface StatementRendererInterface {
  header(customer: string): string;
  lineOrder({ name, amount, audience }: OrderDetails): string;
  footer(totalAmount: string, volumeCredits: number): string;
}

class StatementRenderer {
  private renderer: StatementRendererInterface;

  constructor(renderer: StatementRendererInterface) {
    this.renderer = renderer;
  }

  header(customer: string): string {
    return this.renderer.header(customer);
  }

  lineOrder({ name, amount, audience }: OrderDetails): string {
    return this.renderer.lineOrder({ name, amount, audience });
  }

  footer(totalAmount: string, volumeCredits: number): string {
    return this.renderer.footer(totalAmount, volumeCredits);
  }

  
}

export {
  OutputFormat,
  OrderDetails,
  StatementRenderer,
  StatementRendererInterface,
  StatementRendererType,
};
