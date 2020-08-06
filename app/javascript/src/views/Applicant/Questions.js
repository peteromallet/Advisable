import * as React from "react";
import Linkify from "linkifyjs/react";
import Text from "../../components/Text";
import { Box, Card } from "@advisable/donut";
import Heading from "../../components/Heading";
import Divider from "../../components/Divider";

export default function Questions({ questions }) {
  if (questions.length === 0) return null;

  return (
    <Box paddingBottom="l">
      <Card>
        <Box paddingY="l" paddingLeft="xl">
          <Heading level={4}>Application Questions</Heading>
        </Box>
        <Divider />
        {questions.map((question, i) => (
          <React.Fragment key={i}>
            <Box padding="xl">
              <Box paddingBottom="m">
                <Text size="l" weight="semibold" colour="dark">
                  {question.question}
                </Text>
              </Box>
              <Linkify options={{ attributes: { rel: "nofollow" } }}>
                <Text size="s">
                  {question.answer
                    .replace(/<br\s\/>/g, "\n")
                    .split("\n")
                    .map((item, key) => {
                      return (
                        <React.Fragment key={key}>
                          {item}
                          <br />
                        </React.Fragment>
                      );
                    })}
                </Text>
              </Linkify>
            </Box>
            {i < questions.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Card>
    </Box>
  );
}
