import React from "react";
import CandidateIllustration from "src/illustrations/zest/candidate";
import ListIllustration from "src/illustrations/zest/list";
import SearchIllustration from "src/illustrations/zest/search";

export default function ClientEmptyState() {
  return (
    <div className="max-w-[500px] lg:max-w-full mx-auto py-8">
      <div className="max-w-[560px] mx-auto text-center mb-20">
        <h1 className="text-4xl tracking-tight font-bold mb-2">Collaborate</h1>
        <p className="text-lg">
          It looks like you don't have any active agreements yet. Once you start
          working with a specialist you can manage them from here.
        </p>
      </div>

      <div className="grid gap-16 lg:grid-cols-3">
        <div>
          <SearchIllustration width="160px" className="mx-auto mb-8" />
          <h5 className="text-lg font-semibold">1. Discover</h5>
          <p className="text-neutral-700">
            Explore hundreds of projects in a wide range of marketing topics
            executed by our vetted specialists.
          </p>
        </div>
        <div>
          <CandidateIllustration width="160px" className="mx-auto mb-8" />
          <h5 className="text-lg font-semibold">2. Connect</h5>
          <p className="text-neutral-700">
            Connect with the people behind the projects you like the most to
            discuss working together.
          </p>
        </div>
        <div>
          <ListIllustration width="160px" className="mx-auto mb-8" />
          <h5 className="text-lg font-semibold">3. Collaborate</h5>
          <p className="text-neutral-700">
            Once you've found someone you would like to work with, create an
            agreement and start working together.
          </p>
        </div>
      </div>
    </div>
  );
}
