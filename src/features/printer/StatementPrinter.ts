import { Statement } from "../../statement";
import PlainTextRenderer from "./plainTextRenderer";
import HTMLRenderer from "./htmlRenderer";

export type OrderDetails = {
  name: string;
  amount: string;
  audience: number;
};

export interface StatementRenderer {
  header(customer: string): string;
  orderLines(lines: OrderDetails[]): string;
  footer(totalAmount: string, volumeCredits: number): string;
}

const enum OutputFormat {
  TEXT = "text",
  HTML = "html",
}

class StatementPrinter {
  renderer;
  constructor(format: OutputFormat) {
    this.renderer =
      format === OutputFormat.TEXT
        ? new PlainTextRenderer()
        : new HTMLRenderer();
  }
  print(statement: Statement) {
    let output = this.renderer.header(statement.customer);
    output += this.renderer.orderLines(statement.performances);
    output += this.renderer.footer(statement.amount, statement.credits);
    
    return output;
  }
}

export { OutputFormat, StatementPrinter };
