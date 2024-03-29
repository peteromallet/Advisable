import SimpleBar from "simplebar-react";
import { Adjustments } from "@styled-icons/heroicons-solid";
import React, { useEffect, useMemo, useState } from "react";
import { Modal, useModal } from "src/../../../donut/src";
import Button from "src/components/Button";
import InterestInput from "../UserOnboarding/InterestInput";
import { YourInterests } from "../UserOnboarding/Interests";
import SUGGESTED_TOPICS from "src/views/UserOnboarding/suggestedInterests";
import { useCreateInterests, useDeleteInterest } from "./queries";
import { useApolloClient } from "@apollo/client";
import SuggestedInterest from "../UserOnboarding/SuggestedInterest";
import { useBreakpoint } from "@advisable/donut";
import CircularButton from "src/components/CircularButton";

export default function CustomizeInterests({
  interests,
  refreshFeed,
  awaitFeedUpdate,
}) {
  const modal = useModal();
  const apollo = useApolloClient();
  const isDesktop = useBreakpoint("mUp");
  const [deleteInterest] = useDeleteInterest();
  const [createInterests, { loading }] = useCreateInterests();
  const [terms, setTerms] = useState([]);
  const hasAddedInterests = useMemo(
    () => terms.length !== interests?.length,
    [terms, interests],
  );

  useEffect(() => {
    setTerms((interests || []).map((i) => i.term));
  }, [interests]);

  const handleAdd = (interest) => {
    setTerms([...terms, interest]);
  };

  const handleRemove = (interest) => {
    setTerms(terms.filter((i) => i !== interest));
    const savedInterest = interests.find((i) => i.term === interest);

    if (savedInterest) {
      apollo.cache.modify({
        id: "ROOT_QUERY",
        fields: {
          interests(existingRefs, { readField }) {
            return existingRefs.filter(
              (ref) => savedInterest.id !== readField("id", ref),
            );
          },
        },
      });

      deleteInterest({
        variables: {
          input: { id: savedInterest.id },
        },
      });
    }
  };

  const handleSave = async () => {
    if (hasAddedInterests) {
      await createInterests({
        variables: {
          input: { terms },
        },
      });
      awaitFeedUpdate();
    } else {
      refreshFeed();
    }

    modal.hide();
  };

  return (
    <>
      <Modal modal={modal} showCloseButton={false} width={600} padding={0}>
        <div className="h-[100vh] md:max-h-[74vh] flex flex-col">
          <div className="flex-1 min-h-0">
            <SimpleBar className="h-full overflow-y-scroll p-5  md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight leading-tighter mb-1">
                Customize your feed
              </h1>
              <p className="text-neutral-700 text-lg mb-8">
                We'll show you projects based on the topics you are interested
                in. You can add anything you like.
              </p>
              <InterestInput
                name="interest"
                onAdd={handleAdd}
                className="mb-8"
              />
              <YourInterests interests={terms} onRemove={handleRemove} />

              <div>
                <h4 className="uppercase text-sm font-medium mb-2">
                  More topics to follow
                </h4>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTED_TOPICS.map((topic, i) => {
                    const selected = terms.includes(topic);

                    return (
                      <SuggestedInterest
                        key={i}
                        className="text-sm"
                        isSelected={selected}
                        aria-label={`${selected ? "Remove" : "Add"} ${topic}`}
                        onClick={() =>
                          selected ? handleRemove(topic) : handleAdd(topic)
                        }
                      >
                        {topic}
                      </SuggestedInterest>
                    );
                  })}
                </div>
              </div>
            </SimpleBar>
          </div>

          <div className="flex gap-2 justify-end border-t border-solid border-neutral-200 p-5">
            <Button
              variant="outlined"
              onClick={modal.hide}
              className="w-full md:w-auto"
            >
              Cancel
            </Button>
            <Button
              loading={loading}
              onClick={handleSave}
              className="w-full md:w-auto"
            >
              Save
            </Button>
          </div>
        </div>
      </Modal>

      {isDesktop ? (
        <Button
          prefix={<Adjustments />}
          size="sm"
          variant="outlined"
          onClick={modal.show}
        >
          Customize
        </Button>
      ) : (
        <CircularButton onClick={modal.show} icon={Adjustments} />
      )}
    </>
  );
}
