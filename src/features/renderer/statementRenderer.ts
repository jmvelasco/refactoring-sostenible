import TextRenderer from "./plainTextRenderer";
import HTMLRenderer from "./htmlRenderer";

type OrderDetails = {
  name: string;
  amount: string;
  audience: number;
};

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

const createRenderer = (format: OutputFormat) => {
  switch (format) {
    case OutputFormat.TEXT:
      return new StatementRenderer(new TextRenderer());
    case OutputFormat.HTML:
      return new StatementRenderer(new HTMLRenderer());
  }
};

export {
  OutputFormat,
  OrderDetails,
  createRenderer,
  StatementRendererInterface
};
