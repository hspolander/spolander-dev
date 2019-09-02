import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InputTextField from '@spolander/shared-components/src/components/InputRegular';
import Autocomplete from '@spolander/shared-components/src/components/Autocomplete';
import InputSelect from '@spolander/shared-components/src/components/SelectRegular';
import ButtonRegular from '@spolander/shared-components/src/components/ButtonRegular';

import {
  loadSysWines,
} from './actions';

import './add.scss';

export const SearchSysForm = () => {

  const [formdata, setFormData] = useState({
    'name': "",
    'color': "",
    'year': "",
    'price': "",
    'nr': "",
  });

  const resetForm = () => {
    setFormData({
      'name': "",
      'color': "",
      'year': "",
      'price': "",
      'nr': "",
    });
  };

  const colors = [
    {name: "Rött", value: "Rött"},
    {name: "Rosé", value: "Rosé"},
    {name: "Vitt", value: "Vitt"},
    {name: "Mousserande vin", value: "Mousserande vin"},
  ];

  return (
    <div className="addWineForm">
      <InputTextField
        onChange={val => setFormData({...formdata, 'name': val})}
        label="Namn"
        variant="outlined"
        value={formdata.name}
        onEnterPress={() => loadSysWines(formdata)}
        placeholder="ex Spier signature"
      />
      <InputSelect
        values={colors}
        value={formdata.color}
        label={"Färg"}
        onEnterPress={() => loadSysWines(formdata)}
        onChange={val => setFormData({...formdata, 'color': val})}
      />
      <InputTextField
        onChange={val => setFormData({...formdata, 'year': val})}
        variant="outlined"
        value={formdata.year}
        label="År"
        onEnterPress={() => loadSysWines(formdata)}
        placeholder="ex. 2012"
      />
      <InputTextField
        onChange={val => setFormData({...formdata, 'nr': val})}
        variant="outlined"
        value={formdata.nr}
        onEnterPress={() => loadSysWines(formdata)}
        label="Artikelnummer"
      />
      <InputTextField
        onChange={val => setFormData({...formdata, 'price': val})}
        variant="outlined"
        value={formdata.price}
        onEnterPress={() => loadSysWines(formdata)}
        label="Pris"
      />
      <div className="buttonDiv">
        <ButtonRegular variant="outlined" color="secondary" onClick={() => resetForm()}>
          <i>Rensa</i>
        </ButtonRegular>
        <ButtonRegular variant="contained" color="primary" onClick={() => loadSysWines(formdata)}>
          <i>Sök</i>
        </ButtonRegular>
      </div>
    </div>
  );
};
SearchSysForm.propTypes = {
  autocompleteFieldData: PropTypes.object,
};

export default connect(
  null,
  null,
)(SearchSysForm);
