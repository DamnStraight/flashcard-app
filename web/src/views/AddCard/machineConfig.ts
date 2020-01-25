import { Machine } from "xstate";

interface questionStates {
  states: {
    noError: {};
    error: {};
  };
}

interface solutionStates {
  states: {
    noError: {};
    error: {};
  };
}

interface AddCardStates {
  states: {
    question: questionStates;
    solution: solutionStates;
  };
}

const questionStates = {
  initial: "noError",
  states: {
    noError: {},
    error: {
      initial: "empty",
      states: {
        empty: {}
      },
      onEntry: "focusQuestionInput"
    }
  }
};

const solutionStates = {
  initial: "noError",
  states: {
    noError: {},
    error: {
      initial: "empty",
      states: {
        empty: {}
      },
      onEntry: "focusSolutionInput"
    }
  }
};

const subjectStates = {
  initial: "defaul",
  states: {}
};

const machineConfig = {
  id: "addCardForm",
  context: {
    question: "",
    solution: ""
  },
  initial: "ready",
  states: {
    ready: {
      type: "parallel",
      on: {
        INPUT_QUESTION: {
          actions: "cacheQuestion",
          target: "ready.question.noError"
        },
        INPUT_SOLUTION: {
          actions: "cacheSolution",
          target: "ready.solution.noError"
        },
        SUBMIT: [
          {
            cond: "isQuestionEmpty",
            target: "ready.question.error.empty"
          },
          {
            cond: "isSolutionEmpty",
            target: "ready.solution.error.empty"
          }
        ]
      },
      states: {
        question: {
          ...questionStates
        },
        solution: {
          ...solutionStates
        }
      }
    },
    waitingResponse: {
      on: {},
      invoke: {
        src: "requestSubmission",
        onDone: {
          actions: "onSuccess"
        },
        onError: [
          {
            cond: "isInternalServerError",
            target: "ready.flashCardService.error.internet"
          }
        ]
      }
    }
  }
};
