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

let conditionCounts = {};

CONDITIONS.forEach(cond => {
  conditionCounts[getConditionKey(cond)] = 0;
});

Empirica.onGameStart(({ game, batch }) => {
  const counts = conditionCounts; // global counts object

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
      duration: 600
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
  const key = game.get("conditionKey");
  if (!key) return;

  const rounds = game.rounds || [];
  const completed = rounds.length > 0 && rounds.every(r => r.hasEnded);

  if (!completed) return;

  conditionCounts[key] = (conditionCounts[key] || 0) + 1;
  console.log("Updated counts:", conditionCounts);
});

