import * as React from "react";
import { get } from "lodash-es";
import { Box, Card } from "@advisable/donut";
import Link from "../../components/Link";
import Text from "../../components/Text";
import Avatar from "../../components/Avatar";
import Heading from "../../components/Heading";
import Divider from "../../components/Divider";
import FeaturedBadge from "../../components/FeaturedBadge";
import { OtherApplication } from "./styles";
import useMobile from "../../utilities/useMobile";

export default function MoreApplicants({ data, onClick }) {
  const isMobile = useMobile();
  const specialist = data.project.application.specialist;
  const applications = data.project.applications;
  if (applications.length === 0) return null;

  const handleClick = (application) => () => {
    onClick(application);
  };

  return (
    <Card>
      <Box paddingY="l" paddingLeft="xl">
        <Heading level={4}>More candidates like {specialist.name}</Heading>
      </Box>
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
      <Box paddingLeft="xl" padding="l">
        <Text size="s">
          <Link to={`/projects/${data.project.airtableId}`}>
            View all applications
          </Link>
        </Text>
      </Box>
    </Card>
  );
}
