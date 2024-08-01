import debounce from "debounce";
import { useCallback, useState } from "react";

type ChartParameterFormProps = {
  onFormChange: (critChance: number, isCannonWave: boolean) => void;
};

const ChartParameterForm = ({ onFormChange }: ChartParameterFormProps) => {
  const [critChance, setCritChance] = useState(0);
  const [isCannonWave, setIsCannonWave] = useState(false);
  const onChange = useCallback(debounce(onFormChange, 20), [onFormChange]);

  const updateCritChance = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newCritChance = parseFloat(ev.target.value);
    setCritChance(newCritChance);
    onChange(newCritChance, isCannonWave);
  };

  const updateIsCannonWave = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const newIsCannonWave = ev.target.checked;
    setIsCannonWave(newIsCannonWave);
    onChange(critChance, newIsCannonWave);
  };

  return (
    <div className="ChartParameterForm">
      <div className="field">
        <label htmlFor="critChance">Crit chance:</label>
        <input
          name="critChance"
          type="range"
          min="0"
          max="100"
          step="5"
          value={critChance}
          onChange={updateCritChance}
        />
        <span className="critChance">{critChance} %</span>
      </div>
      <div className="field">
        <label htmlFor="isCannonWave">Cannon wave:</label>
        <input
          name="isCannonWave"
          type="checkbox"
          checked={isCannonWave}
          onChange={updateIsCannonWave}
        />
      </div>
    </div>
  );
};

export default ChartParameterForm;
