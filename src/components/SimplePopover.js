import React from "react";
import { makeStyles } from "@material-ui/core/styles"
import Popover from "@material-ui/core/Popover";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(() => ({
  popover: {
    "& .MuiPaper-root": {
      marginRight: 20,
      padding: 20,
      maxWidth: 500,
      borderRadius: 12,
    },
  }
}));

export default function SimplePopover({ label, content }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        variant="text"
        // color="primary"
        onClick={handleClick}
      >
        {label}
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left"
        }}
        className={classes.popover}
      >
        <p>{content}</p>
      </Popover>
    </div>
  );
}
