import renderLineBreaks from "../../utilities/renderLineBreaks";
import { Box, Text, Paragraph } from "@advisable/donut";

export default function SpecialistIntroduction({ application }) {
  return (
    <Box marginBottom="52px">
      <Text
        fontSize="xl"
        color="neutral900"
        fontWeight="medium"
        marginBottom="8px"
      >
        About {application.specialist.firstName}
      </Text>
      <Paragraph autoLink>
        {renderLineBreaks(application.introduction)}
      </Paragraph>
      {application.questions.length > 0 &&
        application.questions.map((q, i) => (
          <Box key={i} marginTop="xl">
            <Text
              fontSize="lg"
              lineHeight="22px"
              color="neutral900"
              marginBottom="8px"
              fontWeight="medium"
            >
              {q.question}
            </Text>
            <Paragraph size="md" autoLink>
              {renderLineBreaks(q.answer)}
            </Paragraph>
          </Box>
        ))}
    </Box>
  );
}
