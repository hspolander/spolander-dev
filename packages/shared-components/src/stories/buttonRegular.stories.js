import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import ButtonRegular from "../components/ButtonRegular";

storiesOf("ButtonRegular", module)
  .add("Contained default", () => (
    <ButtonRegular
      onClick={action("clicked")}
      variant="contained"
      color="default"
    >
      Contained default
    </ButtonRegular>
  ))
  .add("Contained primary", () => (
    <ButtonRegular
      onClick={action("clicked")}
      variant="contained"
      color="primary"
    >
      Contained primary
    </ButtonRegular>
  ))
  .add("Contained secondary", () => (
    <ButtonRegular
      onClick={action("clicked")}
      variant="contained"
      color="secondary"
    >
      Contained secondary
    </ButtonRegular>
  ))
  .add("Outlined default", () => (
    <ButtonRegular
      onClick={action("clicked")}
      variant="outlined"
      color="default"
    >
      Outlined default
    </ButtonRegular>
  ))
  .add("Outlined primary", () => (
    <ButtonRegular
      onClick={action("clicked")}
      variant="outlined"
      color="primary"
    >
      Outlined primary
    </ButtonRegular>
  ))
  .add("Outlined secondary", () => (
    <ButtonRegular
      onClick={action("clicked")}
      variant="outlined"
      color="secondary"
    >
      Outlined secondary
    </ButtonRegular>
  ))
  .add("Text default", () => (
    <ButtonRegular onClick={action("clicked")} variant="text" color="default">
      Text default
    </ButtonRegular>
  ))
  .add("Text primary", () => (
    <ButtonRegular onClick={action("clicked")} variant="text" color="primary">
      Text primary
    </ButtonRegular>
  ))
  .add("Text secondary", () => (
    <ButtonRegular onClick={action("clicked")} variant="text" color="secondary">
      Text secondary
    </ButtonRegular>
  ));
