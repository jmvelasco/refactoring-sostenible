
type OrderDetails = {
    name: string;
    amount: string;
    audience: number;
};

interface StatementRendererInterface {
    header(customer: string): string;
    lineOrder({name, amount, audience}: OrderDetails): string;
    footer(totalAmount: string, volumeCredits: number): string;
}

export { StatementRendererInterface, OrderDetails };
