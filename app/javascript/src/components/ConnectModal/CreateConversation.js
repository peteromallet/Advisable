import React from "react";
import { useNotifications } from "../Notifications";
import MessageForm from "./MessageForm";
import { useCreateConversation } from "./queries";

export default function CreateConversation({ state, specialist }) {
  const notifications = useNotifications();
  const [createConversation] = useCreateConversation();

  const handleSubmit = async (values) => {
    const { errors } = await createConversation({
      variables: {
        input: {
          participants: [specialist.account.id],
          content: values.message,
        },
      },
    });

    if (errors) {
      notifications.error("Something went wrong, please try again");
    } else {
      notifications.notify(
        `Your message has been sent to ${specialist.firstName}.`,
      );
      state.modal.hide();
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-medium tracking-tight leading-none mb-2 text-center">
        Message {specialist.firstName}
      </h3>
      <p className="text-center mb-6">
        Connect with {specialist.firstName} by sending them a message.
      </p>
      <MessageForm
        specialist={specialist}
        onSubmit={handleSubmit}
        placeholder="Message..."
        buttonLabel="Send message"
      />
      <div>
        <h5 className="font-medium">Request a call instead?</h5>
        <button onClick={state.requestCall}>Request a call</button>
      </div>
    </div>
  );
}
