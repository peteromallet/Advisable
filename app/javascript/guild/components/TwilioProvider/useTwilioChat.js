import { useContext } from "react";
import { TwilioContext } from "./index";

export default function useTwilioChat() {
  return useContext(TwilioContext);
}
