import * as React from "react";
import { get } from "lodash-es";
import Link from "../../components/Link";
import Card from "../../components/Card";
import Text from "../../components/Text";
import Avatar from "../../components/Avatar";
import Heading from "../../components/Heading";
import Divider from "../../components/Divider";
import { Padding } from "../../components/Spacing";
import FeaturedBadge from "../../components/FeaturedBadge";
import { OtherApplication } from "./styles";
import useMobile from "../../utilities/useMobile";

export default ({ data, onClick }) => {
  const isMobile = useMobile();
  const specialist = data.project.application.specialist;
  const applications = data.project.applications;
  if (applications.length === 0) return null;

  const handleClick = (application) => () => {
    onClick(application);
  };

  return (
    <Card>
      <Padding left="xl" top="l" bottom="l">
        <Heading level={4}>More candidates like {specialist.name}</Heading>
      </Padding>
      <Divider />
      {applications.map((application) => {
        if (application.id == data.project.application.id) return;

        return (
          <OtherApplication
            key={application.id}
            onClick={handleClick(application)}
          >
            <Avatar
              size="s"
              name={application.specialist.name}
              url={get(application.specialist.image, "url")}
            />
            <Text size="s" weight="semibold" colour="dark">
              {application.specialist.name}
            </Text>
            <Text size="xs">
              {application.specialist.city}{" "}
              {application.specialist.country &&
                `, ${application.specialist.country.name}`}
            </Text>
            {application.featured && <FeaturedBadge hideLabel={isMobile} />}
          </OtherApplication>
        );
      })}
      <Padding left="xl" size="l">
        <Text size="s">
          <Link to={`/projects/${data.project.airtableId}`}>
            View all applications
          </Link>
        </Text>
      </Padding>
    </Card>
  );
};
