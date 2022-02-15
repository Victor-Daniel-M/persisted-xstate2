import { assign } from "xstate";

export const machineConfig = {
  id: "dummy-stepper-machine",
  initial: "STEP_1",
  context: {
    currentStepIndex: 1,
    eventTriggeredList: []
  },
  states: {
    STEP_1: {
      on: {
        NEXT: {
          target: "STEP_2",
          actions: "increaseStepIndex"
        }
      }
    },
    STEP_2: {
      on: {
        NEXT: {
          target: "STEP_3",
          actions: "increaseStepIndex"
        },
        BACK: {
          target: "STEP_1",
          actions: "decreaseStepIndex"
        }
      }
    },
    STEP_3: {
      on: {
        NEXT: {
          target: "STEP_4",
          actions: "increaseStepIndex"
        },
        BACK: {
          target: "STEP_2",
          actions: "decreaseStepIndex"
        }
      }
    },
    STEP_4: {
      on: {
        BACK: {
          target: "STEP_3",
          actions: "decreaseStepIndex"
        }
      }
    }
  },
  on: {
    SEND_BUTTON_CLICKED: { actions: "addEventToList" }
  }
};

export const optionsConfig = {
  actions: {
    increaseStepIndex: assign((context) => {
      return { currentStepIndex: context.currentStepIndex + 1 };
    }),
    decreaseStepIndex: assign((context) => {
      return { currentStepIndex: context.currentStepIndex - 1 };
    }),
    addEventToList: assign((context, event) => {
      return {
        eventTriggeredList: [...context.eventTriggeredList, event.data]
      };
    })
  }
};
