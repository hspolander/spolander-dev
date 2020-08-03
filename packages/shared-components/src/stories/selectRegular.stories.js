import React from "react";
import { action } from "@storybook/addon-actions";

import SelectRegular from "../components/SelectRegular";

export default {
  component: SelectRegular,
  title: "Select",
};

const values = [
  { value: "red" },
  { value: "white" },
  { value: "blue" },
  { value: "rosé" },
].map((value) => ({
  value: value.value,
  name: value.value.toUpperCase(),
}));

export const Regular = () => (
  <SelectRegular values={values} onChange={action("Selected")} label="Label" />
);
