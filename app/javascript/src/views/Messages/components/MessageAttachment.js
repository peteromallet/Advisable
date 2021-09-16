import React from "react";
import css from "@styled-system/css";
import { Box, Circle, Text } from "@advisable/donut";
import { DocumentText } from "@styled-icons/heroicons-solid/DocumentText";

function AttachmentBox({ attachment, children }) {
  return (
    <Box
      as="a"
      target="_blank"
      href={attachment.url}
      padding={2}
      bg="neutral100"
      borderRadius="12px"
      minWidth="0"
      css={css({
        cursor: "pointer",
        "&:hover": {
          bg: "neutral200",
        },
      })}
    >
      {children}
      <Text
        $truncate
        fontSize="sm"
        fontWeight={450}
        color="neutral800"
        marginBottom={1}
      >
        {attachment.filename}
      </Text>
      <Text display="block" color="blue700" fontWeight={500} fontSize="xs">
        Download
      </Text>
    </Box>
  );
}

function ImageAttachment({ attachment }) {
  return (
    <AttachmentBox attachment={attachment}>
      <Box
        width="100%"
        height="100px"
        display="flex"
        marginBottom={2}
        borderRadius="8px"
        alignItems="center"
        backgroundSize="cover"
        justifyContent="center"
        backgroundPosition="center"
        style={{ backgroundImage: `url(${attachment.url})` }}
      />
    </AttachmentBox>
  );
}

export default function MessageAttachment({ attachment }) {
  if (attachment.isImage) return <ImageAttachment attachment={attachment} />;

  return (
    <AttachmentBox attachment={attachment}>
      <Box
        height="100px"
        width="100%"
        marginBottom={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Circle size="52px" bg="white" color="neutral700">
          <DocumentText size={20} />
        </Circle>
      </Box>
    </AttachmentBox>
  );
}

{
  /* <Box
                width="100%"
                padding={2}
                bg="neutral100"
                paddingRight={3}
                key={attachment.id}
                borderRadius="8px"
                display="flex"
                alignItems="center"
              >
                <Box
                  flexShrink={0}
                  marginTop="-1px"
                  color="neutral600"
                  paddingRight={1.5}
                >
                  <DocumentText size={16} />
                </Box>
                <Box width="100%" minWidth="0">
                  <Text
                    $truncate
                    paddingY={1}
                    fontSize="sm"
                    fontWeight={500}
                    color="neutral900"
                  >
                    {attachment.filename}
                  </Text>
                </Box>
                <Box flexShrink={0}>
                  {attachment.url && (
                    <Text
                      as="a"
                      target="_blank"
                      display="block"
                      href={attachment.url}
                      color="blue700"
                      fontWeight={500}
                      fontSize="xs"
                    >
                      Download
                    </Text>
                  )}
                </Box>
              </Box> */
}
