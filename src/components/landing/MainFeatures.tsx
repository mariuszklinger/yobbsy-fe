import * as React from 'react';
import Fade from 'react-reveal/Fade';

import { withStyles, StyleRulesCallback, Theme, Typography } from '@material-ui/core';

import { lighten } from '@material-ui/core/styles/colorManipulator';

import { featureSectionStyle } from './common';

import easy_img from './mainFeatures/easy_icon.svg';
import feedback_img from './mainFeatures/feedback_icon.svg';
import time_saver_img from './mainFeatures/time_saver_icon.svg';

interface IProps {
  classes: any;
}

interface IFeature {
  title: string;
  img: any;
  text: string;
}

const content: IFeature[] = [
  {
    img: easy_img,
    title: 'Instant feedback',
    text: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
  },
  {
    img: feedback_img,
    title: 'Easy & intuitive',
    text: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
  },
  {
    img: time_saver_img,
    title: 'Real time saver',
    text: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum',
  },
];

const MainFeatures = ({ classes }: IProps) => {
  return <div className={classes.root}>
    {content.map((feature) => (
        <div className={classes.featureRow}>
          <Fade>
            <div className={classes.featureImgWrapper}>
              <img className={classes.featureImg} src={feature.img} />
            </div>

            <div>
              <Typography className={classes.header} variant="h4" color="primary">{feature.title}</Typography>
              <Typography className={classes.text} variant="h6">{feature.text}</Typography>
            </div>
          </Fade>
        </div>
    ))}
  </div>
}

const styles = (theme: Theme) => ({
  root: {
    ...featureSectionStyle(theme),
  },
  featureRow: {
    alignItems: 'center',
    display: 'flex',
    transition: '0.2s',
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,

    '&:hover': {
      // backgroundColor: lighten(theme.palette.secondary.light, 0.7),
    }
  },
  featureImgWrapper: {
    textAlign: 'center',
    width: 200,
  },
  header: {
    fontWeight: 'bold',

    [theme.breakpoints.down(700)]: {
      fontSize: 24,
    },
  },
  text: {
    [theme.breakpoints.down(700)]: {
      fontSize: 16,
    },
  },
  featureImg: {
    maxHeight: 120,
    width: 135,
    display: 'inline-block',
    marginRight: theme.spacing.unit,

    [theme.breakpoints.down(700)]: {
      width: 100,
    },
  }
});

export default withStyles(styles as StyleRulesCallback<string>)(MainFeatures);