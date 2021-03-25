import React from "react";
import { Check } from "@styled-icons/heroicons-outline/Check";
import { useNotifications } from "src/components/Notifications";
import { Modal, Box, Tooltip, Button, Text, Paragraph } from "@advisable/donut";
import { useMutation } from "@apollo/client";
import { RESOLVE_GUILD_POST } from "./mutations";
import PostAction from "./PostAction";
import { useDialogState, DialogDisclosure } from "reakit/Dialog";

function ResolvePost({ post, size }) {
  const modal = useDialogState();
  const notifications = useNotifications();

  const [resolveGuildPost, { loading }] = useMutation(RESOLVE_GUILD_POST, {
    update(cache, { data }) {
      cache.modify({
        id: cache.identify(post),
        fields: {
          resolved() {
            return data.success;
          },
        },
      });
    },
  });

  const handleResolve = async () => {
    await resolveGuildPost({
      variables: {
        input: {
          guildPostId: post.id,
        },
      },
    });
    modal.hide();
    notifications.notify("Your post has been marked as resolved");
  };

  return (
    <>
      <Modal modal={modal} label="Resolve Post" padding="l">
        <Text
          as="h4"
          mb={2}
          color="blue900"
          fontSize="24px"
          lineHeight="26px"
          fontWeight="medium"
          letterSpacing="-0.02em"
        >
          Mark as resolved
        </Text>
        <Paragraph mb={6}>
          Marking this post as resolved will prevent any further connections
          coming from this post.
        </Paragraph>
        <Button
          mr={2}
          size="s"
          loading={loading}
          disabled={loading}
          prefix={<Check />}
          onClick={handleResolve}
        >
          Confirm
        </Button>
        <Button
          size="s"
          variant="subtle"
          disabled={loading}
          onClick={modal.hide}
        >
          Cancel
        </Button>
      </Modal>

      {!post.resolved ? (
        <Tooltip placement="top" content="Resolve">
          <Box
            css={`
              outline: none;
            `}
          >
            <DialogDisclosure {...modal}>
              {(props) => (
                <PostAction
                  {...props}
                  size={size}
                  bg="neutral100"
                  color="neutral600"
                  aria-label="Resolve post"
                  data-testid="resolvePost"
                  icon={<Check />}
                />
              )}
            </DialogDisclosure>
          </Box>
        </Tooltip>
      ) : null}
    </>
  );
}

export default ResolvePost;
