import { OutputFormat } from "../src/features/printer/StatementPrinter";
import { statement } from "../src/statement";
import {
  createAnExamplePlays,
  createAnotherExamplePlays,
  createAnotherPerformanceSummary,
  createAnPerformanceSummary,
} from "./creators";

test("generates a detailed statement for a given performance summary with mixed play types", () => {
  //arrange
  const aSummary = createAnPerformanceSummary();
  //act
  const plays = createAnExamplePlays();

  //assert
  expect(statement(aSummary, plays, OutputFormat.TEXT)).toEqual(`Statement for BigCo
 Hamlet: $650.00 (55 seats)
 As You Like It: $580.00 (35 seats)
 Othello: $500.00 (40 seats)
Amount owed is $1,730.00
You earned 47 credits
`);
});

test("generates a detailed HTML statement for a given performance summary with unknown play types", () => {
  //arrange
  const aSummary = createAnPerformanceSummary();
  //act
  const plays = createAnExamplePlays();
  //assert
  expect(statement(aSummary, plays, OutputFormat.HTML)).toEqual(`<h1>Statement for BigCo</h1><p>Hamlet: $650.00 (55 seats)</p><p>As You Like It: $580.00 (35 seats)</p><p>Othello: $500.00 (40 seats)</p><p>Amount owed is $1,730.00</p><p>You earned 47 credits</p>`);
});

test("does not allow an performance summary with unknown play types", () => {
  //arrange
  const invoice = createAnotherPerformanceSummary();
  //act
  const plays = createAnotherExamplePlays();
  //assert
  expect(() => statement(invoice, plays, OutputFormat.TEXT)).toThrow(/unknown type/);
});
