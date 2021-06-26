import React from 'react'
import SiteBorderStyles from "../styles/SiteBorderStyles"
import ReactMarkdown from 'react-markdown'

import { makeStyles } from '@material-ui/core/styles'
import { Alert, AlertTitle } from "@material-ui/lab"
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import CloseIcon from '@material-ui/icons/Close'

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    "& .MuiPaper-root": {
      marginTop: `1rem`,
      borderRadius: 12,
      padding: `1rem`,
    },
    "& .MuiAlert-action": {
      alignItems: `flex-start`,
    }
  },
}));

export default function Disclaimer({ disclaimer }) {
  const { heading, description } = disclaimer
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  return (
    <SiteBorderStyles>
      <div className={classes.root}>
        <Collapse in={open}>
          <Alert severity="warning"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>{heading}</AlertTitle>
            <ReactMarkdown>{description}</ReactMarkdown>
          </Alert>
        </Collapse>
      </div>
    </SiteBorderStyles>
  );
}

export { Disclaimer }