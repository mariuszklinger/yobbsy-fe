import * as React from 'react';

import { Typography } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';

import './ContractCard.scss';

interface IContractCardProps {
  offer: Contract.IContractShort;
}

class OfferCard extends React.Component<IContractCardProps> {
  render() {
    const { offer } = this.props;

    return (
      <div className="contract-card">
        <Typography
          align="left"
          variant="h5"
        >
          <b>{ offer.title }</b>
        </Typography>

        <div className="contract-card__skills-wrapper">
          { offer.skills && offer.skills.map((skill: any) =>
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
          { offer.salary } { offer.currency }
        </Typography>

        <Typography
          align="left"
          variant="subtitle2"
          style={{ fontWeight: 300 }}
        >
          { offer.description }
        </Typography>

        <Typography
          align="left"
          variant="subtitle2"
        >
          { !!offer.notice && `Notice: ${ offer.notice } month`}
          { !offer.notice && <span>Notice: <b>Immediately</b></span>}
          <br />
          Locations: <ul>
            { offer.locations.map((l: Contract.ILocation) => (
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

export default OfferCard;