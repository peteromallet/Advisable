import React from "react";
import Text from "../Text";
import RoundedButton from "../RoundedButton";
import Modal, { useModal } from "./";

export default {
  title: "Modal",
};

export const basicModal = () => {
  const modal = useModal();

  return (
    <>
      <RoundedButton
        margin="l"
        {...modal}
        onClick={modal.show}
        as={Modal.Disclosure}
      >
        Open Modal
      </RoundedButton>
      <Modal modal={modal} padding="l" label="An example modal">
        <Text lineHeight="m">
          Start Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Maecenas gravida dolor vitae ullamcorper tempor. Aenean interdum leo
          leo, eget tincidunt ante laoreet at. Vivamus eu nunc erat. Nullam
          congue volutpat nunc sit amet rutrum. Suspendisse eu convallis nibh.
          Integer nec semper ante. Sed a mattis metus. Morbi dui tellus, tempor
          eget est ut. Start Lorem ipsum dolor sit amet, consectetur adipiscing
          elit.
        </Text>
      </Modal>
    </>
  );
};

export const nestedModals = () => {
  const modalA = useModal();
  const modalB = useModal();

  return (
    <>
      <RoundedButton
        margin="l"
        {...modalA}
        onClick={modalA.show}
        as={Modal.Disclosure}
      >
        Open Modal
      </RoundedButton>
      <Modal modal={modalA} padding="l" label="An example modal">
        This is the first modal.
        <br />
        <RoundedButton
          {...modalB}
          marginTop="l"
          onClick={modalB.show}
          as={Modal.Disclosure}
        >
          Open Modal
        </RoundedButton>
        <Modal
          modal={modalB}
          backdrop={false}
          padding="l"
          label="An example modal"
        >
          <Text lineHeight="m">
            Start Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Maecenas gravida dolor vitae ullamcorper tempor. Aenean interdum leo
            leo, eget tincidunt ante laoreet at. Vivamus eu nunc erat. Nullam
            congue volutpat nunc sit amet rutrum. Suspendisse eu convallis nibh.
            Integer nec semper ante. Sed a mattis metus. Morbi dui tellus,
            tempor eget est ut. Start Lorem ipsum dolor sit amet, consectetur
            adipiscing elit.
          </Text>
        </Modal>
      </Modal>
    </>
  );
};

export const scrolling = () => {
  const modal = useModal();

  return (
    <>
      <RoundedButton
        margin="l"
        {...modal}
        onClick={modal.show}
        as={Modal.Disclosure}
      >
        Open Modal
      </RoundedButton>
      <Modal modal={modal} padding="l" label="An example modal">
        <Text mb="m" lineHeight="m">
          Start Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Maecenas gravida dolor vitae ullamcorper tempor. Aenean interdum leo
          leo, eget tincidunt ante laoreet at. Vivamus eu nunc erat. Nullam
          congue volutpat nunc sit amet rutrum. Suspendisse eu convallis nibh.
          Integer nec semper ante. Sed a mattis metus. Morbi dui tellus, tempor
          eget est ut. Start Lorem ipsum dolor sit amet, consectetur adipiscing
          elit.
        </Text>
        <Text mb="m" lineHeight="m">
          Start Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Maecenas gravida dolor vitae ullamcorper tempor. Aenean interdum leo
          leo, eget tincidunt ante laoreet at. Vivamus eu nunc erat. Nullam
          congue volutpat nunc sit amet rutrum. Suspendisse eu convallis nibh.
          Integer nec semper ante. Sed a mattis metus. Morbi dui tellus, tempor
          eget est ut. Start Lorem ipsum dolor sit amet, consectetur adipiscing
          elit.
        </Text>
        <Text mb="m" lineHeight="m">
          Start Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Maecenas gravida dolor vitae ullamcorper tempor. Aenean interdum leo
          leo, eget tincidunt ante laoreet at. Vivamus eu nunc erat. Nullam
          congue volutpat nunc sit amet rutrum. Suspendisse eu convallis nibh.
          Integer nec semper ante. Sed a mattis metus. Morbi dui tellus, tempor
          eget est ut. Start Lorem ipsum dolor sit amet, consectetur adipiscing
          elit.
        </Text>
        <Text lineHeight="m">
          Start Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Maecenas gravida dolor vitae ullamcorper tempor. Aenean interdum leo
          leo, eget tincidunt ante laoreet at. Vivamus eu nunc erat. Nullam
          congue volutpat nunc sit amet rutrum. Suspendisse eu convallis nibh.
          Integer nec semper ante. Sed a mattis metus. Morbi dui tellus, tempor
          eget est ut. Start Lorem ipsum dolor sit amet, consectetur adipiscing
          elit.
        </Text>
      </Modal>
    </>
  );
};
