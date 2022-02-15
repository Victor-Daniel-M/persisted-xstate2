import { useMachine } from "@xstate/react";
import { createMachine } from "xstate";
import { optionsConfig } from "./machineDefinition";
import { machineConfig } from "./machineDefinition";

export const useStepMachine = (persistedState) => {
  const machine = createMachine(machineConfig);
  return useMachine(() => machine, {
    ...optionsConfig,
    state: persistedState,
    immediate: false
  });
};
