import { filter } from "lodash-es";
import { Text, Tabs } from "@advisable/donut";
import ActiveProject from "./ActiveProject";
import { Cards } from "./styles";
import Empty from "./Empty";
import NoStoppedProjects from "./NoStoppedProjects";

export default ({ onClick, applications }) => {
  const active = filter(applications, { status: "Working" });
  const finished = filter(applications, { status: "Stopped Working" });

  return (
    <>
      <Text
        mb="l"
        as="h2"
        fontSize="28px"
        color="neutral900"
        fontWeight="medium"
        letterSpacing="-0.04rem"
      >
        Active Projects
      </Text>
      <Tabs label="Clients">
        <Tabs.Tab title="Active Clients">
          <Cards>
            {active.map((application) => (
              <ActiveProject
                key={application.id}
                application={application}
                onClick={() => onClick(application)}
              />
            ))}
            {active.length === 0 && <Empty />}
          </Cards>
        </Tabs.Tab>
        <Tabs.Tab title="Finished">
          <Cards>
            {finished.map((application) => (
              <ActiveProject
                key={application.id}
                application={application}
                onClick={() => onClick(application)}
              />
            ))}
            {finished.length === 0 && <NoStoppedProjects />}
          </Cards>
        </Tabs.Tab>
      </Tabs>
    </>
  );
};
