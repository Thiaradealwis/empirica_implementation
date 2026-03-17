import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

const CONDITIONS = [
  { scenarioOrder: ['A', 'B'], mediator: [true, false] },
  { scenarioOrder: ['A', 'B'], mediator: [false, true] },
  { scenarioOrder: ['B', 'A'], mediator: [true, false] },
  { scenarioOrder: ['B', 'A'], mediator: [false, true] }
];

let conditionIndex = 0;

Empirica.onGameStart(({ game }) => {
  const condition = CONDITIONS[conditionIndex % CONDITIONS.length];
  conditionIndex++;

  game.set('scenarioOrder', condition.scenarioOrder);
  game.set('mediatorSequence', condition.mediator);

  condition.scenarioOrder.forEach((scenario, i) => {
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

Empirica.on("batch", "start", ({ batch }) => {
  batch.set("groupByArrivalTime", true);

});