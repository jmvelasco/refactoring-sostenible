function getExtraCredits(type: string, performanceAudience: number) {
  let extraCredits = Math.max(performanceAudience - 30, 0)
  // add extra credit for every ten comedy attendees
  if ("comedy" === type) extraCredits += Math.floor(performanceAudience / 5);

  return extraCredits;
}

export { getExtraCredits };
