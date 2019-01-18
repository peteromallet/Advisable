import React from "react";
import BaseStyling from "../../BaseStyling";
import styled from "styled-components";
import { storiesOf } from "@storybook/react";
import Scrollable from "./";

const Container = styled.div`
  width: 500px;
  padding: 30px;
  background: white;
  margin: 40px auto 0 auto;
`;

storiesOf("Scrollable", module)
  .addDecorator(storyFn => (
    <React.Fragment>
      <BaseStyling />
      {storyFn()}
    </React.Fragment>
  ))
  .add("default", () => (
    <Container>
      <Scrollable height={400}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Velit sed
        ullamcorper morbi tincidunt ornare massa eget egestas purus. Auctor
        augue mauris augue neque gravida in fermentum et. Sed vulputate odio ut
        enim blandit volutpat maecenas volutpat blandit. Dui accumsan sit amet
        nulla facilisi morbi tempus iaculis urna. Sagittis purus sit amet
        volutpat. Nisl nisi scelerisque eu ultrices vitae auctor eu augue. Augue
        ut lectus arcu bibendum at varius. Duis at consectetur lorem donec massa
        sapien faucibus et molestie. Egestas erat imperdiet sed euismod nisi
        porta. Morbi non arcu risus quis varius quam. Justo laoreet sit amet
        cursus. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus.
        Odio ut enim blandit volutpat maecenas volutpat blandit aliquam etiam.
        Convallis a cras semper auctor neque vitae tempus quam pellentesque.
        Aenean vel elit scelerisque mauris. Massa placerat duis ultricies lacus.
        Eros in cursus turpis massa tincidunt. Lacinia quis vel eros donec ac.
        Vulputate sapien nec sagittis aliquam malesuada bibendum. Scelerisque eu
        ultrices vitae auctor. Nunc mi ipsum faucibus vitae aliquet. Praesent
        semper feugiat nibh sed pulvinar proin gravida hendrerit lectus. Eu
        lobortis elementum nibh tellus. Sodales ut eu sem integer. Sollicitudin
        nibh sit amet commodo nulla. Tellus id interdum velit laoreet id donec.
        Quam adipiscing vitae proin sagittis. At tempor commodo ullamcorper a
        lacus vestibulum sed arcu non. Ultricies integer quis auctor elit sed
        vulputate. Pellentesque habitant morbi tristique senectus et netus et.
        Viverra nam libero justo laoreet sit amet cursus. Nec feugiat in
        fermentum posuere urna nec tincidunt praesent. Nec sagittis aliquam
        malesuada bibendum arcu. Est ullamcorper eget nulla facilisi etiam.
        Venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam.
      </Scrollable>
    </Container>
  ));
