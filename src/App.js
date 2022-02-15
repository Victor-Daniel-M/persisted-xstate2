import { useState } from "react";
import { useStepMachine } from "./machine/machineHook";
import "./styles.css";

export default function App() {
  const [persistedState, setPersistedState] = useState(
    JSON.parse(localStorage.getItem("per_ste"))
  );
  const [state, notifyMachine] = useStepMachine(persistedState);
  const { context, value } = state;

  const onNextClick = () => {
    notifyMachine("NEXT");
  };

  const onPrevClick = () => {
    notifyMachine("BACK");
  };

  const onEventAClick = () => {
    notifyMachine("SEND_BUTTON_CLICKED", { data: "A" });
  };

  const onEventBClick = () => {
    notifyMachine("SEND_BUTTON_CLICKED", { data: "B" });
  };
  const onLogContextButtonClick = () => {
    console.log("CONTEXT:", context.eventTriggeredList);
  };
  const onLogStateButtonClick = () => {
    console.log("CONTEXT:", value);
  };

  const onPersistClick = () => {
    localStorage.setItem("per_ste", JSON.stringify(state));
  };
  const onRehydrateClick = () => {
    const persistedState = localStorage.getItem("per_ste");
    const parsedState = JSON.parse(persistedState);
    setPersistedState(parsedState);
  };

  return (
    <div className="App">
      <h1>Step Machine</h1>
      <h3>Start clicking to see some magic happen!</h3>
      <h2>{`Current Step: ${context.currentStepIndex}`}</h2>
      <div>
        <button onClick={onNextClick}>NEXT</button>
        <button onClick={onPrevClick}>PREV</button>
        <button onClick={onEventAClick}>SEND EVENT A</button>
        <button onClick={onEventBClick}>SEND EVENT B</button>
      </div>
      <br />
      <div>
        <button onClick={onLogContextButtonClick}>console Events</button>
        <button onClick={onLogStateButtonClick}>console Current State</button>
      </div>
      <br />
      <br />
      <div>
        <button onClick={onPersistClick}>PERSIST STATE</button>
        <button onClick={onRehydrateClick}>REHYDRATE STATE</button>
      </div>
    </div>
  );
}
