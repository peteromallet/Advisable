import React, { Suspense } from "react";
import Sticky from "react-stickynode";
import { useBreakpoint } from "@advisable/donut";
import Page from "src/components/Page";
import AccountConfirmationPrompt from "src/components/AccountConfirmationPrompt";
import Welcome from "../components/Welcome";
import Profile from "../components/Profile";
import UpcomingEvents from "../components/UpcomingEvents";
import LatestProjects from "../components/LatestProjects";
import CollaborationRequests from "../components/CollaborationRequests";
import { useDashboardData } from "../queries";
import DashboardLoading from "../components/DashboardLoading";
import Availability from "../components/Availability";
import composeStyles from "src/utilities/composeStyles";

const headerClasses = composeStyles({
  base: `
    block lg:grid
    grid-cols-[52%_auto]
    lg:gap-[48px] xl:gap-[96px]

    mx-auto
    max-w-[720px] lg:max-w-[1080px]
    py-12 lg:py-14
    px-4 md:px-8
  `,
});

export default function Dashboard() {
  const { data, loading } = useDashboardData();
  const lUp = useBreakpoint("lUp");

  return (
    <>
      <div className="bg-neutral50">
        <div className={headerClasses()}>
          <div className="space-y-4 mb-16 lg:mb-0">
            <Welcome />
            <Availability />
          </div>
          <Profile
            loading={loading}
            caseStudies={data?.viewer?.caseStudiesCount}
            reviews={data?.viewer?.reviews?.length}
          />
        </div>
      </div>
      <Page width="1080px">
        <div className="py-8 md:py-12 px-4 md:px-8 max-w-[720px] lg:max-w-none mx-auto">
          <AccountConfirmationPrompt />
          <div
            id="dashboardContainer"
            className="block lg:grid grid-cols-[52%_auto] lg:gap-[48px] xl:gap-[96px]"
          >
            {loading ? (
              <DashboardLoading />
            ) : (
              <Suspense fallback={<DashboardLoading />}>
                <Sticky
                  enabled={lUp}
                  top={84}
                  bottomBoundary="#dashboardContainer"
                >
                  <div className="col-start-2 row-start-1 space-y-16 pb-8 mb-10">
                    <LatestProjects topCaseStudies={data.topCaseStudies} />
                    <UpcomingEvents upcomingEvents={data.upcomingEvents} />
                  </div>
                </Sticky>
              </Suspense>
            )}
            <div className="col-start-1 row-start-1">
              <CollaborationRequests />
            </div>
          </div>
        </div>
      </Page>
    </>
  );
}
