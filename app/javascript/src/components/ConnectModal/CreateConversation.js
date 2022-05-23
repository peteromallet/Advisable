import { ChatAlt } from "@styled-icons/heroicons-solid";
import React from "react";
import { useNotifications } from "../Notifications";
import ConnectedAvatars from "./ConnectedAvatars";
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
    <>
      <div className="p-8">
        <ConnectedAvatars
          specialist={specialist}
          className="mb-4"
          icon={ChatAlt}
        />
        <h3 className="text-2xl font-semibold tracking-tight leading-none mb-2 text-center">
          Message {specialist.firstName}
        </h3>
        <p className="text-center font-inter mb-6">
          Connect with {specialist.firstName} by sending them a message.
        </p>
        <MessageForm
          specialist={specialist}
          onSubmit={handleSubmit}
          placeholder="Message..."
          buttonLabel="Send message"
        />
      </div>
      <div className="py-6 px-8 border-t border-solid border-neutral100">
        <h5 className="font-medium leading-none mb-0.5">
          Want to request a call with {specialist.firstName} instead?
        </h5>
        <button
          className="text-blue600 hover:text-blue800"
          onClick={state.requestCall}
        >
          Request a call
        </button>
      </div>
    </>
  );
}
