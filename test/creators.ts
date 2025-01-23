
function createAnPerformanceSummary() {
  return {
    customer: "BigCo",
      performances: [
        {
          playID: "hamlet",
          audience: 55
        },
        {
          playID: "as-like",
          audience: 35
        },
        {
          playID: "othello",
          audience: 40
        }
      ]
    };
}

function createAnExamplePlays() {
  return {
    hamlet: { name: "Hamlet", type: "tragedy" },
    "as-like": { name: "As You Like It", type: "comedy" },
    othello: { name: "Othello", type: "tragedy" }
  };
}

function createAnotherPerformanceSummary() {
  return {
    customer: "BigCoII",
    performances: [
      {
        playID: "henry-v",
        audience: 53
      },
      {
        playID: "as-like",
        audience: 55
      }
    ]
  };
}

function createAnotherExamplePlays() {
  return {
    "henry-v": { name: "Henry V", type: "history" },
    "as-like": { name: "As You Like It", type: "pastoral" }
  };
}

export {
  createAnExamplePlays, createAnotherExamplePlays, createAnotherPerformanceSummary, createAnPerformanceSummary
};
