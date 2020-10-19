import { Machine } from "xstate";

export const offerMachine = Machine({
  id: "offerStates",
  initial: "pending",
  on: {
    RESET: "pending",
    SENT: "sent",
    MESSAGE: "message",
    CALL: "call",
  },
  states: { pending: {}, call: {}, message: {}, sent: {} },
});
