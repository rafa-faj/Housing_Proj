import React, { FunctionComponent } from 'react';
import { Subtitle2 } from '@basics';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import cn from 'classnames';
import styles from './Loading.module.scss';

interface LoadingProps {
  text: string;
}

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative',
  },
  bottom: {
    color: '#FDF4F0',
  },
  top: {
    color: '#E7946D',
    animationDuration: '900ms',
    position: 'absolute',
    left: 0,
  },
}));

const Loading: FunctionComponent<LoadingProps> = ({ text }) => {
  const classes = useStyles();
  return (
    <div
      className={cn(
        styles.loadingWrapper,
        'w-100 d-flex flex-column justify-content-center align-items-center',
      )}
    >
      <div className={styles.loadingBackground}></div>
      <div className={classes.root}>
        <CircularProgress
          variant="determinate"
          className={classes.bottom}
          size={40}
          thickness={4}
          value={100}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          className={classes.top}
          size={40}
          thickness={4}
        />
      </div>
      <Subtitle2>{text}</Subtitle2>
    </div>
  );
};

export default Loading;
