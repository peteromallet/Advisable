import { ArrowLeft, ChatAlt } from "@styled-icons/heroicons-solid";
import CircularButton from "../CircularButton";
import React from "react";
import { useNotifications } from "../Notifications";
import ConnectedAvatars from "./ConnectedAvatars";
import MessageForm from "./MessageForm";
import { useCreateConversation } from "./queries";

export default function CreateConversation({ specialist, onBack }) {
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
      // state.modal.hide();
    }
  };

  return (
    <>
      {onBack && (
        <div className="absolute top-3 left-3">
          <CircularButton icon={ArrowLeft} onClick={onBack} />
        </div>
      )}
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
    </>
  );
}
