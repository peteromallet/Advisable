import * as React from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import NavBar from "./NavBar";
import { Wrapper } from "./styles";

export default function DatePicker(props) {
  return (
    <Wrapper>
      <DayPicker navbarElement={NavBar} showOutsideDays={true} {...props} />
    </Wrapper>
  );
}
