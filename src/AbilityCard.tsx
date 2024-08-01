const AbilityCard = () => (
  <div className="AbilityCard">
    <p>
      Whenever <strong>Twisted Fate</strong> kills an enemy, he generates{" "}
      <span className="gold">1 - 6 gold</span>. He also has a chance equal to
      his <span className="critChance">critical strike chance</span> to generate
      an additional <span className="gold">1 - 6 gold</span>.
    </p>
    <p className="aside">
      As you'd expect, <strong>Twisted Fate</strong> plays with loaded dice. His
      initial dice roll is weighted to have an increased chance of granting{" "}
      <span className="gold">6 gold</span>, while his critical dice roll is
      weighted against him and has an increased chance of granting{" "}
      <span className="gold">1 gold</span>.
    </p>
    <div className="probabilityTable">
      <div style={{ gridColumn: 2, gridRow: 1 }}>1</div>
      <div style={{ gridColumn: 3, gridRow: 1 }}>2</div>
      <div style={{ gridColumn: 4, gridRow: 1 }}>3</div>
      <div style={{ gridColumn: 5, gridRow: 1 }}>4</div>
      <div style={{ gridColumn: 6, gridRow: 1 }}>5</div>
      <div style={{ gridColumn: 7, gridRow: 1 }}>6</div>
      <div style={{ gridColumn: 1, gridRow: 2 }}>Initial Roll</div>
      <div style={{ gridColumn: 2, gridRow: 2 }}>13.33%</div>
      <div style={{ gridColumn: 3, gridRow: 2 }}>13.33%</div>
      <div style={{ gridColumn: 4, gridRow: 2 }}>13.33%</div>
      <div style={{ gridColumn: 5, gridRow: 2 }}>13.33%</div>
      <div style={{ gridColumn: 6, gridRow: 2 }}>13.33%</div>
      <div style={{ gridColumn: 7, gridRow: 2 }}>33.33%</div>
      <div style={{ gridColumn: 1, gridRow: 3 }}>Critical Roll</div>
      <div style={{ gridColumn: 2, gridRow: 3 }}>33.33%</div>
      <div style={{ gridColumn: 3, gridRow: 3 }}>13.33%</div>
      <div style={{ gridColumn: 4, gridRow: 3 }}>13.33%</div>
      <div style={{ gridColumn: 5, gridRow: 3 }}>13.33%</div>
      <div style={{ gridColumn: 6, gridRow: 3 }}>13.33%</div>
      <div style={{ gridColumn: 7, gridRow: 3 }}>13.33%</div>
    </div>
  </div>
);

export default AbilityCard;
