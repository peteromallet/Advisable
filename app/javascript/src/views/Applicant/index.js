import React from "react";
import get from "lodash/get";
import Card from "src/components/Card";
import Flex from "src/components/Flex";
import Text from "src/components/Text";
import Skills from "src/components/Skills";
import Button from "src/components/Button";
import Avatar from "src/components/Avatar";
import Spacing from "src/components/Spacing";
import Loading from "src/components/Loading";
import Divider from "src/components/Divider";
import { Query } from "react-apollo";
import AdvisableMessage from "./components/AdvisableMessage";
import FETCH_APPLICATION from "./fetchApplication.graphql";

const Applicant = ({ match }) => {
  return (
    <Query
      query={FETCH_APPLICATION}
      variables={{
        id: match.params.applicationID
      }}>
      {({ data, loading }) => {
        if (loading) return <Loading />;

        return (
          <React.Fragment>
            <Avatar
              size="l"
              name={data.application.specialist.name}
              url={get(data.application.specialist.image, "url")}
            />
            <Divider marginTop="xl" marginBottom="xl" />
            <Flex distribute="equalSpacing">
              <div>
                <Text marginRight="m" inline>
                  Hourly Rate
                </Text>
                <Text weight="bold" colour="dark" inline>
                  €250
                </Text>
              </div>
              <div>
                <Text marginRight="m" inline>
                  Availability
                </Text>
                <Text weight="bold" colour="dark" inline>
                  1 - 2 Weeks
                </Text>
              </div>
              <div>
                <Text inline>View on Linkedin</Text>
              </div>
            </Flex>
            <Divider marginTop="xl" marginBottom="xl" />
            <Text marginBottom="xl">
              Senior level marketing automation specialist with 20 years of
              experience in data-driven digital marketing.
            </Text>
            <AdvisableMessage>
              This is a placeholder comment from the advisable team. Looks like
              a great hire due to his previous experience in project research.
            </AdvisableMessage>
            <Card padding="xl" marginBottom="l">
              <Text marginBottom="m" weight="strong" colour="dark">
                Give an example of your campaign management experience marketing
                to a diverse client base in the IT Services Industry (please
                mention any success metrics).
              </Text>
              <Text>
                I have developed integrated marketing campaigns utilizing
                everything from social media to television. My expertise lies in
                digital marketing and specifically in marketing automation
                platforms for email campaigns. The budgets and projects have
                varied from minimal to as high as 6 million per campaign.
                Success metrics include both qualitative and quantitative values
                that range from brand perception to increasing sales pipeline
                velocity. In terms of IT services, I have worked with
                telecommunications providers along with many other B2B sectors.
              </Text>
            </Card>
            <Card padding="xl" marginBottom="l">
              <Text marginBottom="m" weight="strong" colour="dark">
                Give a short outline of your views on best practice campaign
                management in the IT Services Industry and, given this, how you
                would approach this project for Elca.
              </Text>
              <Text>
                To use the term, campaign, is too narrow. From a strategic POV,
                best practice dictates that a comprehensive Campaign Framework
                should be designed. From this, a structure of programs and
                tactics are developed. Each with a focus on driving the message
                along one of the core strategies. A campaign, as such, is
                actually a program designed to achieve a specific objective of
                the overall campaign. From that point, the structure needs to
                take into account everything from the target audience and
                message to the tactics to reach and communicate with the
                audience. The structure also needs to contain specific
                qualitative and quantitative KPIs along with a delivery
                timeline. When leveraging technology such as MAP, DMP, SRM,
                etc., the best practice is to start simple, keep it easy to
                manage and maintain, and then let data guide the way.
              </Text>
            </Card>
            <Skills
              marginTop="xxl"
              marginBottom="xxl"
              skills={[
                "Sales Compensation",
                "Software As A Service (SaaS) Marketing"
              ]}
            />
            <Button marginRight="m" primary>
              Request Introduction
            </Button>
            <Button>Decline</Button>
            <Divider marginTop="xxl" />
          </React.Fragment>
        );
      }}
    </Query>
  );
};

export default Applicant;
