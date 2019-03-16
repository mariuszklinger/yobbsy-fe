import * as React from 'react';
import { Link } from 'react-router-dom';

import { Typography, StyleRulesCallback, withStyles } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import EventIcon from '@material-ui/icons/Event';
import PlaceIcon from '@material-ui/icons/Place';
import Button from '@material-ui/core/Button';

import Date from './Date';
import OfferForm from './OfferForm';

import userService from '../services/user.service';
import contractService from '../services/contract.service';
import { Theme } from '@material-ui/core/styles';

interface IProps {
  classes: any;
  contract: Contract.IContractShort;
  editable?: boolean;
}

interface IState {
  deleted: boolean;
  requestFormOpened: boolean;
}

class ContractCard extends React.Component<IProps, IState> {
  state = {
    deleted: false,
    requestFormOpened: false,
  }

  deleteContract = () => {
    const { id, title } = this.props.contract;
    const choice = confirm(`Delete offer: ${title}?`);
    if (!choice) {
      return;
    }

    const markAsDeleted = () => this.setState({ deleted: true });

    contractService
      .deleteContract(id as number)
      .then(markAsDeleted)
  }

  toggleRequestForm = () => {
    this.setState((prev) => ({ requestFormOpened: !prev.requestFormOpened }))
  }

  render() {
    const { contract, editable, classes } = this.props;
    const { requestFormOpened } = this.state;
    const isHunter = userService.isHunter;

    if (this.state.deleted) {
      return null;
    }

    return (
      <div className={classes.card}>
        <Typography
          align="left"
          variant="h5"
        >
          <Link to={`/contract/${contract.id}`} className={classes.headerLink}>
            { contract.title }
          </Link>
        </Typography>

        <Date dateStr={ contract.modified as string } />

        <div className={classes.skillsWrapper}>
          { contract.skills && contract.skills.map((skill: any) =>
            <Chip
              key={ skill.label || skill.tag.name }
              label={ skill.label || skill.tag.name }
              color="primary"
              variant="outlined"
            />
          )}
        </div>

        <Typography
          align="left"
          variant="h6"
        >
          <b>{ contract.salary }</b> { contract.currency }
        </Typography>

        <Typography
          align="left"
          variant="subtitle2"
          style={{ fontWeight: 300 }}
        >
          { contract.description }
        </Typography>

        <br />
        <br />

        <Typography
          align="left"
          variant="subtitle2"
        >
          <EventIcon className={classes.dataIcon} /> Notice:
          { !!contract.notice && `    ${ contract.notice } month (s)`}
          { !contract.notice && <b> Immediately</b>}
        </Typography>

        <Typography
          align="left"
          variant="subtitle2"
        >
          <PlaceIcon className={classes.dataIcon} /> Locations:
            <ul>
              { contract.locations.map((l: Contract.ILocation) => (
                <li key={l.name}>{ l.name }, {l.country} </li>
              ))}
            </ul>
        </Typography>

        <div style={{ paddingLeft: 0 }}>
          { isHunter &&
            <Button
              variant="outlined"
              onClick={this.toggleRequestForm}
              color="secondary">
              Request contact
            </Button>
          }

          { editable &&
            <Typography
              align="right"
            >
              <Link to={`/contract/${contract.id}/edit`}>
                Edit
              </Link>
              &nbsp;&nbsp;
              <Link to={'/my-contracts'} onClick={this.deleteContract}>
                Delete
              </Link>
            </Typography>
          }

          { requestFormOpened &&
            <OfferForm
              contract={contract}
              onClose={this.toggleRequestForm}
            />
          }
        </div>
      </div>
    );
  }
}

const styles = (theme: Theme) => ({
  card: {
    borderBottom: '1px solid #cacaca',
    color: theme.palette.primary.main,
    maxWidth: 500,
    marginBottom: 30,
    paddingBottom: 30,
    textAlign: 'left',

    '& button': {
      minWidth: 200,
    },

    '& a button span': {
      textTransform: 'none',
      textDecoration: 'none',
    },
  },

  dataIcon: {
    display: 'inline-block',
    fontSize: 23,
    marginBottom: -5,
  },

  headerLink: {
    fontWeight: 'bold',
    color: theme.palette.secondary.main,
    textDecoration: 'none',
  },

  skillsWrapper: {
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'left',

    '& > div': {
      marginRight: 5,
    },
  },
});


export { styles };

export default withStyles(styles as StyleRulesCallback<string>)(ContractCard);