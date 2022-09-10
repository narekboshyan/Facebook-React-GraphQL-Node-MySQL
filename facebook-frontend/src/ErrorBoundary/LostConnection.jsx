import React from 'react';
import { makeStyles } from '@material-ui/core';
import { DARK_BLUE_COLOR } from 'constants/colors';

const useStyles = makeStyles({
  unavailableContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  unavailableText: {
    lineHeight: '35px',
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 40,
    textAlign: 'center',
    color: DARK_BLUE_COLOR
  },
  buildernLogo: {
    margin: '48px 0 100px 0'
  },
  unavailableLogo: {
    marginBottom: 34
  }
});

const LostConnection = () => {
  const classes = useStyles();

  return (
    <div className={classes.unavailableContainer}>
      <div className={classes.unavailableText}>Connection lost. Please check your connection.</div>
    </div>
  );
};

export default LostConnection;
