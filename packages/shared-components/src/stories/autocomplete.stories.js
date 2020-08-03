import React from "react";
import { action } from "@storybook/addon-actions";

import { storiesOf } from "@storybook/react";
import { muiTheme } from "storybook-addon-material-ui";

import Autocomplete from "../components/Autocomplete";

const options = [
  { label: "a" },
  { label: "aa" },
  { label: "ab" },
  { label: "ac" },
  { label: "ad" },
  { label: "ae" },
  { label: "af" },
  { label: "ag" },
  { label: "ah" },
  { label: "ai" },
  { label: "aj" },
  { label: "ak" },
  { label: "al" },
].map((suggestion) => ({
  value: suggestion.label,
  label: suggestion.label,
}));

storiesOf("Autocomplete", module)
  .addDecorator(muiTheme())
  .add("Loading creatable", () => (
    <Autocomplete
      options={options}
      inputType="single"
      label="Label"
      isLoading
      onInputChange={action("Typed")}
      required
      variant="outlined"
      placeholder="Write anything"
      handleChange={action("Selected")}
    />
  ));

storiesOf("Autocomplete", module)
  .addDecorator(muiTheme())
  .add("Creatable multi select", () => (
    <Autocomplete
      options={options}
      inputType="single"
      label="Label"
      isMulti
      required
      onInputChange={action("Typed")}
      variant="outlined"
      placeholder="Write anything"
      formatCreateLabel={(val) => `Skapa ny ${val}`}
      handleChange={action("Selected")}
    />
  ));
