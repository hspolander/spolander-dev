import React, { useState } from "react";
import Dialog from "../components/Dialog";
import ButtonRegular from "../components/ButtonRegular";
import { action } from "@storybook/addon-actions";
import { Paper, Container } from "@material-ui/core";

export default {
  component: Dialog,
  title: "Dialog",
};

export const BodyScroll = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <Dialog
      title="Dialog"
      scroll="body"
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      disableBackdropClick={false}
      maxWidth="lg"
      isFullScreen={false}
      children={
        <Paper variant="outlined">
          {[1, 2, 3, 4, 5].map((number) => (
            <Container key={number}>{number}</Container>
          ))}
        </Paper>
      }
      actions={
        <>
          <ButtonRegular
            onClick={action("clicked")}
            variant="contained"
            color="primary"
          >
            Contained primary
          </ButtonRegular>
          <ButtonRegular
            onClick={action("clicked")}
            variant="contained"
            color="primary"
          >
            Contained primary
          </ButtonRegular>
        </>
      }
    />
  );
};
