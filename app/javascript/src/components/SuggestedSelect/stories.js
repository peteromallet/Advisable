// import React from "react";
// import { storiesOf } from "@storybook/react";
// import SuggestedSelect from "./";
// import Padding from "../Spacing/Padding";

// storiesOf("SuggestedSelect", module).add("Single Select", () =>
//   React.createElement(() => {
//     const [value, setValue] = React.useState({
//       label: "Red",
//       value: "Red",
//     });

//     return (
//       <Padding size="l">
//         <SuggestedSelect
//           value={value}
//           label="This is the label"
//           menuIsOpen={true}
//           onChange={selection => setValue(selection)}
//           options={[
//             { label: "Red", value: "Red" },
//             { label: "Blue", value: "Blue" },
//             { label: "Green", value: "Green" },
//           ]}
//         />
//       </Padding>
//     );
//   })
// );

// storiesOf("SuggestedSelect", module).add("Multi Select", () =>
//   React.createElement(() => {
//     const [value, setValue] = React.useState({
//       label: "Red",
//       value: "Red",
//     });

//     return (
//       <Padding size="l">
//         <SuggestedSelect
//           isMulti
//           max={5}
//           value={value}
//           label="This is the label"
//           menuIsOpen={true}
//           onChange={selection => setValue(selection)}
//           options={[
//             { label: "Red", value: "Red" },
//             { label: "Blue", value: "Blue" },
//             { label: "Green", value: "Green" },
//           ]}
//         />
//       </Padding>
//     );
//   })
// );
