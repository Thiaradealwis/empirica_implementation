import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

const CONDITIONS = [
  { scenarioOrder: ['A', 'B'], mediator: [true, false] },
  { scenarioOrder: ['A', 'B'], mediator: [false, true] },
  { scenarioOrder: ['B', 'A'], mediator: [true, false] },
  { scenarioOrder: ['B', 'A'], mediator: [false, true] }
];
function getConditionKey(cond) {
  return `${cond.scenarioOrder.join("")}_${cond.mediator.join("")}`;
}

function getAllConditionKeys() {
  return CONDITIONS.map(getConditionKey);
}

let conditionIndex = 0;

Empirica.on("batch", "start", ({ batch }) => {
  batch.set("groupByArrivalTime", true);
  const counts = {};
  CONDITIONS.forEach(cond => {
    counts[getConditionKey(cond)] = 0;
  });

  batch.set("conditionCounts", counts);

});

Empirica.onGameStart(({ game, batch }) => {
  let counts = batch.get("conditionCounts");
  if (!counts) {
    counts = {};
    CONDITIONS.forEach(cond => {
      counts[getConditionKey(cond)] = 0;
    });
  }

  let minCount = Infinity;
  let lowestCandidates = [];

  for (const cond of CONDITIONS) {
    const key = getConditionKey(cond);
    const count = counts[key] || 0;

    if (count < minCount) {
      minCount = count;
      lowestCandidates = [cond];
    } else if (count === minCount) {
      lowestCandidates.push(cond);
    }
  }

  const selected =
      lowestCandidates[Math.floor(Math.random() * lowestCandidates.length)];

  const selectedKey = getConditionKey(selected);

  game.set("conditionKey", selectedKey);
  game.set('scenarioOrder', selected.scenarioOrder);
  game.set('mediatorSequence', selected.mediator);

  selected.scenarioOrder.forEach((scenario, i) => {
    const round = game.addRound({
      name: `Round ${i + 1}`,
    });

    round.addStage({
      name: "task",
      duration: 120
    });
    if (i === 0) {
      round.addStage({
        name: "between-rounds",
        duration: 60  // 60 seconds to read, or set higher
      });
    }
  });

  game.players.forEach((player, i) => {
    player.set('role', i + 1);
  });
});

Empirica.onGameEnded(({ game, batch }) => {
  let counts = batch.get("conditionCounts") || {};

  const conditionKey = game.get("conditionKey");

  const rounds = game.rounds || [];
  const completed = rounds.length > 0 && rounds.every(r => r.hasEnded);

  if (!completed) {
    console.log("Game not completed, not counting condition.");
    return;
  }

  // Increment count
  counts[conditionKey] = (counts[conditionKey] || 0) + 1;

  batch.set("conditionCounts", counts);

  console.log("Updated condition counts:", counts);
});

