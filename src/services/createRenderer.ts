import {StatementRendererInterface, OrderDetails} from "./renderer/interface";
import PlainTextRenderer from "./renderer/plainTextRenderer";
import HTMLRenderer from "./renderer/htmlRenderer";

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

const enum OutputFormat {
    TEXT = "text",
    HTML = "html",
}

const createRenderer = (format: OutputFormat) => {
    switch (format) {
        case OutputFormat.TEXT:
            return new StatementRenderer(new PlainTextRenderer());
        case OutputFormat.HTML:
            return new StatementRenderer(new HTMLRenderer());
    }
};

export {OutputFormat, createRenderer};

