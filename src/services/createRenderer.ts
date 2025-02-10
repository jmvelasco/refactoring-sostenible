import PlainTextRenderer from "./renderer/plainTextRenderer";
import HTMLRenderer from "./renderer/htmlRenderer";

const enum OutputFormat {
    TEXT = "text",
    HTML = "html",
}

const createRenderer = (format: OutputFormat) => {
    switch (format) {
        case OutputFormat.TEXT:
            return new PlainTextRenderer();
        case OutputFormat.HTML:
            return new HTMLRenderer();
    }
};

export {OutputFormat, createRenderer};

