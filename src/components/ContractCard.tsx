import * as React from 'react';

import { Typography } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

import './ContractCard.scss';

interface IContractCardProps {
  contract: Contract.IContractShort;
}

class ContractCard extends React.Component<IContractCardProps> {
  render() {
    const { contract } = this.props;

    return (
      <div className="contract-card">
        <Typography
          align="left"
          variant="h5"
        >
          <b>{ contract.title }</b>
        </Typography>

        <div className="contract-card__skills-wrapper">
          { contract.skills && contract.skills.map((skill: any) =>
            <Chip
              key={ skill.tag.name }
              label={ skill.tag.name }
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
          Notice: { contract.notice } month <br />
          Locations: <ul>
            { contract.locations.map((l: Contract.ILocation) => (
              <li key={l.name}>{ l.name }, {l.country} </li>
            ))}
          </ul>
        </Typography>

        <div style={{ paddingLeft: 0 }}>
          <Button
            variant="outlined"
            color="secondary">
            Request contact
          </Button>
        </div>
      </div>
    );
  }
}

export default ContractCard;