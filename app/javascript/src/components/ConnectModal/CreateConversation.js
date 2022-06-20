import { ArrowLeft, ChatAlt } from "@styled-icons/heroicons-solid";
import CircularButton from "../CircularButton";
import React from "react";
import { useNotifications } from "../Notifications";
import ConnectedAvatars from "./ConnectedAvatars";
import MessageForm from "./MessageForm";
import { useCreateConversation } from "./queries";
import ModalHeading from "./ModalHeading";
import SubHeading from "./SubHeading";
import Button from "../Button";
import MessagesIllustration from "src/illustrations/zest/messages";

function ConversationCreated({ modal, specialist }) {
  return (
    <div className="text-center pb-3">
      <MessagesIllustration
        width="150px"
        className="mx-auto my-4"
        color="var(--color-violet-200)"
        secondaryColor="var(--color-blue900)"
      />
      <h5 className="font-medium text-xl mb-1">Message sent</h5>
      <SubHeading>
        Your message has been sent to {specialist.firstName}. We will let you
        know when they respond.
      </SubHeading>
      <Button variant="secondary" onClick={modal.hide}>
        Okay
      </Button>
    </div>
  );
}

function CreateConversation({ specialist, onSubmit, onBack }) {
  return (
    <>
      {onBack && (
        <div className="absolute top-3 left-3">
          <CircularButton icon={ArrowLeft} onClick={onBack} />
        </div>
      )}
      <>
        <ConnectedAvatars
          specialist={specialist}
          className="mb-4"
          icon={ChatAlt}
        />
        <ModalHeading>Message {specialist.firstName}</ModalHeading>
        <SubHeading>
          Connect with {specialist.firstName} by sending them a message.
        </SubHeading>
        <MessageForm
          onSubmit={onSubmit}
          specialist={specialist}
          placeholder="Message..."
          buttonLabel="Send message"
        />
      </>
    </>
  );
}

export default function ConnectViaMessaging({ modal, specialist, onBack }) {
  const notifications = useNotifications();
  const [createConversation, { data }] = useCreateConversation();

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
    }
  };

  if (data) {
    return <ConversationCreated modal={modal} specialist={specialist} />;
  }

  return (
    <CreateConversation
      onBack={onBack}
      specialist={specialist}
      onSubmit={handleSubmit}
    />
  );
}
