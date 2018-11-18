import * as React from 'react';
import { Link } from 'react-router-dom';

import { Typography } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

import userService from '../services/user.service';
import contractService from '../services/contract.service';

import './ContractCard.scss';

interface IContractCardProps {
  contract: Contract.IContractShort;
  editable?: boolean;
}

class ContractCard extends React.Component<IContractCardProps> {
  state = {
    deleted: false,
  }

  deleteContract = () => {
    const { id } = this.props.contract;
    const markAsDeleted = () => this.setState({ deleted: true });

    contractService
      .deleteContract(id)
      .then(markAsDeleted)
  }

  render() {
    const { contract, editable } = this.props;

    // const userId = userService.userData.user.id;
    // const isEmployee = userService.isEmployee;
    const isHunter = userService.isHunter;

    if (this.state.deleted) {
      return null;
    }

    // const isContractOwner = userId === contract.profile.

    return (
      <div className="contract-card">
        <Typography
          align="left"
          variant="h5"
        >
          <Link to={`/contract/${contract.id}`}>
            <b>{ contract.title }</b>
          </Link>
        </Typography>

        <div className="contract-card__skills-wrapper">
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
              color="secondary">
              Request contact
            </Button>
          }

          { editable &&
            <>
              <Link to={`/contract/${contract.id}/edit`}>
                <Button
                  variant="outlined"
                  color="secondary">
                  Edit
                </Button>
              </Link>

              <Button
                variant="outlined"
                onClick={this.deleteContract}
                color="secondary">
                Delete
              </Button>
            </>
          }
        </div>
      </div>
    );
  }
}

export default ContractCard;