import * as React from 'react';
import { Link } from 'react-router-dom';

import { Typography, StyleRulesCallback, withStyles } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

import Date from './Date';
import OfferForm from './OfferForm';

import userService from '../services/user.service';
import contractService from '../services/contract.service';

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
    const { id } = this.props.contract;
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
          <Link to={`/contract/${contract.id}`}>
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
          { contract.salary } { contract.currency }
        </Typography>

        <Typography
          align="left"
          variant="subtitle2"
          style={{ fontWeight: 300 }}
        >
          { contract.description }
        </Typography>

        <Typography
          align="left"
          variant="subtitle2"
        >
          { !!contract.notice && `Notice: ${ contract.notice } month`}
          { !contract.notice && <span>Notice: <b>Immediately</b></span>}
          <br />
          Locations: <ul>
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

// # TODO: uzyc theme
const styles = {
  card: {
    borderBottom: '1px solid #cacaca',
    maxWidth: 500,
    marginBottom: 30,
    paddingBottom: 30,
    paddingLeft: 60,
    paddingRight: 60,
    textAlign: 'left',

    '& button': {
      minWidth: 200,
    },

    '& a button span': {
      textTransform: 'none',
      textDecoration: 'none',
    },
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
}

const getStyles = () => styles;

export { styles };

export default withStyles(getStyles as StyleRulesCallback<string>)(ContractCard);