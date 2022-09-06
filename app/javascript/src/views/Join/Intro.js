import React, { cloneElement } from "react";
import { Link } from "react-router-dom";
import composeStyles from "src/utilities/composeStyles";
import CandidateIllustration from "src/illustrations/zest/candidate";
import SearchIllustration from "src/illustrations/zest/search";
import { ArrowSmRight } from "@styled-icons/heroicons-outline";
import GridLines from "src/components/GridLines";
import Card from "./Card";

const optionClasses = composeStyles({
  base: `
    transition-all
    hover:-translate-y-1
    bg-white
    rounded-lg
    w-full
    pt-8
    pb-10 sm:pb-10
    px-8 sm:px-6
    cursor-pointer
    ring-1 sm:ring-0 ring-neutral100
    sm:shadow-sm

    flex
    items-center
    flex-row sm:flex-col
  `,
});

function AccountOption({ to, illustration, title, subtext }) {
  return (
    <Link to={to} className="rounded-lg z-10">
      <div className={optionClasses()}>
        <div className="place-items-center w-[144px] h-[144px] mb-4 hidden sm:grid">
          {cloneElement(illustration)}
        </div>
        <div className="sm:text-center flex-1">
          <h5 className="text-lg font-medium text-neutral900">{title}</h5>
          <div className="text-[15px] leading-5 text-neutral700">{subtext}</div>
        </div>
        <div className="block sm:hidden">
          <ArrowSmRight className="w-5 h-5" />
        </div>
      </div>
    </Link>
  );
}

export default function Intro() {
  return (
    <>
      <Card>
        <div className="overflow-hidden relative p-7 pb-16 sm:p-10 sm:pb-32 bg-blue-100 bg-gradient-to-br from-indigo-900 to-violet-900">
          <GridLines color="rgb(255 255 255 / .1)" highlight="#FFFFFF" />
          <div className="relative z-10">
            <h1 className="mb-3 sm:mb-4 font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Are you a full-time employee or freelancer?
            </h1>
            <p className="sm:text-lg text-indigo-50 max-w-[400px]">
              This will help us create the right kind of account for you!
            </p>
          </div>
        </div>
        <div className="grid sm:grid-flow-col auto-cols-fr px-7 pb-7 sm:px-10 sm:pb-10 gap-6 -mt-10 sm:-mt-24">
          <AccountOption
            title="Full-time employee"
            subtext="I work full-time with a single company"
            to="/join/client"
            illustration={
              <SearchIllustration
                primaryColor="var(--color-rose-200)"
                secondaryColor="var(--color-neutral900)"
              />
            }
          />
          <AccountOption
            title="Freelancer"
            subtext="I don't work full-time with any company"
            to="/join/freelancer"
            illustration={
              <CandidateIllustration
                primaryColor="var(--color-teal-300)"
                secondaryColor="var(--color-teal-900)"
              />
            }
          />
        </div>
      </Card>
    </>
  );
}
