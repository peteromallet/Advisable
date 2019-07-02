import * as React from "react";
import Linkify from "linkifyjs/react";
import Text from "../../components/Text";
import Card from "../../components/Card";
import Heading from "../../components/Heading";
import Divider from "../../components/Divider";
import { Padding } from "../../components/Spacing";

export default ({ questions }) => {
  if (questions.length === 0) return null;

  return (
    <>
      <Padding bottom="l">
        <Card>
          <Padding left="xl" top="l" bottom="l">
            <Heading level={4}>Application Questions</Heading>
          </Padding>
          <Divider />
          {questions.map((question, i) => (
            <React.Fragment key={i}>
              <Padding size="xl">
                <Padding bottom="m">
                  <Text size="l" weight="semibold" colour="dark">
                    {question.question}
                  </Text>
                </Padding>
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
              </Padding>
              {i < questions.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Card>
      </Padding>
    </>
  );
};
