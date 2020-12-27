import React from "react";
import { Dialog as MuiDialog } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

const Dialog = (props) => {
  const {
    title,
    scroll = "body",
    children,
    actions,
    onClose,
    disableBackdropClick = false,
    isOpen = false,
    maxWidth = "md",
    isFullScreen = false,
  } = props;
  return (
    <MuiDialog
      open={isOpen}
      maxWidth={maxWidth}
      fullScreen={isFullScreen}
      onClose={onClose}
      scroll={scroll}
      disableBackdropClick={disableBackdropClick}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers={scroll === "paper"}>{children}</DialogContent>
      <DialogActions>{actions}</DialogActions>
    </MuiDialog>
  );
};
export default Dialog;
