import React from "react";
import { BaseNotification } from ".";
import { DocumentText } from "@styled-icons/heroicons-solid";
import { useNavigate } from "react-router-dom";

export default function SendAgreement({ notification, popover }) {
  const navigate = useNavigate();

  const handleClick = () => {
    popover.hide();
    navigate(`/new_agreement/${notification.user.id}`);
  };

  return (
    <BaseNotification
      onClick={handleClick}
      notification={notification}
      icon={<DocumentText className="w-5 h-5 text-blue600" />}
    >
      <p className="-mt-1 leading-tight">
        Send <strong className="font-medium">{notification.user?.name}</strong>{" "}
        an agreement to start working together.
      </p>
    </BaseNotification>
  );
}
