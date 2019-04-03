import React from "react";
import { graphql } from "react-apollo";
import Card from "src/components/Card";
import Text from "src/components/Text";
import View from "src/components/View";
import Skills from "../../components/Skills";
import Layout from "src/components/Layout";
import { FadeInUp } from "src/components/Animation";
import { Padding } from "src/components/Spacing";
import Loading from "src/components/Loading";
import Divider from "src/components/Divider";
import Heading from "src/components/Heading";
import AdvisableMessage from "./AdvisableMessage";
import FETCH_APPLICATION from "./fetchApplication.graphql";
import Sidebar from "./Sidebar";
import Questions from "./Questions";
import PreviousProjects from "./PreviousProjects";
import MoreApplicants from "./MoreApplicants";

const Applicant = ({ data, match, history }) => {
  React.useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [match.params.applicationID]);

  if (data.loading) return <Loading />;
  const project = data.project;
  const application = data.project.application;

  return (
    <View>
      <Layout>
        <Sidebar data={data} history={history} />
        <Layout.Main>
          <FadeInUp duration="500ms">
            <Padding bottom="l">
              <Card>
                <Padding left="xl" top="l" bottom="l">
                  <Heading level={4}>Applied to {project.primarySkill}</Heading>
                </Padding>
                <Divider />
                <Padding size="xl">
                  <Padding bottom="l">
                    <Heading level={6}>Introduction</Heading>
                    <Text size="s">
                      {data.project.application.introduction}
                    </Text>
                  </Padding>
                  <Padding bottom="xs">
                    <Heading level={6}>Skills</Heading>
                  </Padding>
                  <Skills skills={data.project.application.specialist.skills} />
                  {application.comment && (
                    <Padding top="l">
                      <AdvisableMessage>{application.comment}</AdvisableMessage>
                    </Padding>
                  )}
                </Padding>
              </Card>
            </Padding>
          </FadeInUp>
          <FadeInUp duration="500ms" delay="100ms">
            <Questions questions={application.questions} />
          </FadeInUp>
          <FadeInUp duration="500ms" delay="200ms">
            <PreviousProjects data={data} />
          </FadeInUp>
          <FadeInUp duration="500ms" delay="300ms">
            <MoreApplicants
              data={data}
              onClick={a => history.push(a.airtableId)}
            />
          </FadeInUp>
        </Layout.Main>
      </Layout>
    </View>
  );
};

export default graphql(FETCH_APPLICATION, {
  options: props => ({
    variables: {
      projectID: props.match.params.projectID,
      applicationID: props.match.params.applicationID,
    },
  }),
})(Applicant);
//               return (
//                 <React.Fragment>
//                   <Back
//                     to={`/projects/${project.airtableId}`}
//                     paddingBottom="s"
//                   >
//                     All Candidates
//                   </Back>
//                   <ApplicantHeader>
//                     <Flex align="center">
//                       <Flex.Item distribute="fill">
//                         <ApplicantAvatar
//                           name={specialist.name}
//                           url={get(specialist.image, "url")}
//                         />
//                       </Flex.Item>
//                       <Flex.Item>
//                         {application.featured && <FeaturedBadge />}
//                       </Flex.Item>
//                     </Flex>
//                     <ApplicantName>{specialist.name}</ApplicantName>
//                     <ApplicantLocation>
//                       {specialist.city}
//                       {specialist.country && `, ${specialist.country.name}`}
//                     </ApplicantLocation>
//                     <AppliedTo>Applied to {project.name}</AppliedTo>
//                   </ApplicantHeader>
//                   <CandidateAttributes
//                     reviewsCount={application.specialist.reviewsCount}
//                     rating={application.specialist.ratings.overall}
//                     rate={currency(application.rate, project.currency)}
//                     availability={application.availability}
//                     linkedin={specialist.linkedin}
//                   />
//                   <Text marginBottom="xl">{application.introduction}</Text>

//                   {application.questions.length > 0 && (
//                     <Heading level="6" marginBottom="s">
//                       Application Questions
//                     </Heading>
//                   )}

//                   <Heading level="6" paddingTop="l" marginBottom="s">
//                     Previous Projects related to "{project.primarySkill}"
//                   </Heading>

//                   <Skills
//                     marginTop="xxl"
//                     marginBottom="xxl"
//                     skills={specialist.skills}
//                   />

//                   <CandidateActions
//                     application={application}
//                     history={this.props.history}
//                   />

//                   {otherApplicants.length > 0 && (
//                     <React.Fragment>
//                       <Divider marginTop="xl" marginBottom="xxl" />

//                       <Spacing marginBottom="l">
//                         <Flex align="baseline">
//                           <Flex.Item distribute="fill">
//                             <Heading size="s" marginBottom="xs">
//                               More candidates like {specialist.name}
//                             </Heading>
//                           </Flex.Item>
//                           <Link to={`/projects/${project.airtableId}`}>
//                             View all candidates
//                           </Link>
//                         </Flex>
//                       </Spacing>

//                       {otherApplicants.map(applicant =>
//                         applicant.specialist ? (
//                           <Card
//                             key={applicant.id}
//                             onClick={() => history.push(applicant.airtableId)}
//                             padding="l"
//                             marginBottom="m"
//                           >
//                             <Flex align="center">

//                               <Flex.Item distribute="fill">
//                                 <Heading size="s">
//                                   {applicant.specialist.name}
//                                 </Heading>
//                                 <Text>
//                                   {applicant.specialist.city}
//                                   {applicant.specialist.country &&
//                                     `, ${applicant.specialist.country.name}`}
//                                 </Text>
//                               </Flex.Item>
//                               {applicant.featured && <FeaturedBadge />}
//                             </Flex>
//                           </Card>
//                         ) : null
//                       )}
//                     </React.Fragment>
//                   )}
//                 </React.Fragment>
//               );
//             }}
//           </Query>
//         </View>
//       </Container>
//     );
//   }
// }

// export default Applicant;
