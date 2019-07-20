import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  loadFieldAutocomplete,
  onClearFieldFocus,
  onFieldFocus,
} from './actions';

import InputField from '../formcomponents/inputField';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinusSquare, faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import './add.scss';

export const NewAddWineForm = ({
  navigatedInitialValues,
  autocompleteFieldData,
  systemWineData,
}) => {
  const [formName, setName] = useState('');
  const [formProducer, setProducer] = useState('');
  const [formColor, setColor] = useState('');
  const [formYear, setYear] = useState('');
  const [formCountry, setCountry] = useState('');
  const [formBoughtFrom, setBoughtFrom] = useState('');
  const [formPrice, setPrice] = useState('');
  const [formContainer, setContainer] = useState('');
  const [formNr, setNr] = useState('');
  const [formSizeml, setSizeml] = useState('');
  const [formGrapes, setGrape] = useState(['']);

  const setGrapes = grapes => {};

  const updateGrapeField = (name, indexChanged) => {
    setGrape(() =>
      formGrapes.map((item, index) => {
        if (indexChanged === index) {
          return name;
        }
        return item;
      }),
    );
  };

  const removeGrapeField = () => {
    setGrape(() =>
      formGrapes.filter((item, index) => index !== formGrapes.length - 1),
    );
  };

  const addGrapeField = () => {
    setGrape(() => [...formGrapes, '']);
  };

  const setInitialValues = values => {
    const {
      name,
      producer,
      color,
      year,
      country,
      boughtFrom,
      price,
      container,
      nr,
      sizeml,
      grapes,
    } = values;
    setName(name);
    setProducer(producer);
    setColor(color);
    setYear(year);
    setCountry(country);
    setBoughtFrom(boughtFrom);
    setPrice(price);
    setContainer(container);
    setNr(nr);
    setSizeml(sizeml);
    if (grapes) {
      setGrapes(grapes);
    }
  };

  const resetForm = () => {
    setName('');
    setProducer('');
    setColor('');
    setYear('');
    setCountry('');
    setBoughtFrom('');
    setPrice('');
    setContainer('');
    setNr('');
    setSizeml('');
    setGrapes(['']);
  };

  useEffect(
    () => {
      if (navigatedInitialValues) {
        setInitialValues(navigatedInitialValues);
      }
    },
    [navigatedInitialValues],
  );

  const autocompleteField = (field, value, callback, index) => {
    if (value.length > 3) {
      loadFieldAutocomplete(field, value);
    }
    if (field === 'grape') {
      callback(value, index);
    } else {
      callback(value);
    }
  };

  return (
    <div className="addWineForm">
      <InputField
        onChange={val => autocompleteField('name', val, setName)}
        value={formName}
        label="Namn"
        placeholder="ex Spier signature"
        autocompleteOptions={
          autocompleteFieldData && autocompleteFieldData.name
        }
      />
      <InputField
        onChange={val => autocompleteField('producer', val, setProducer)}
        value={formProducer}
        label="Producent"
        placeholder="ex. Freixenet"
        autocompleteOptions={
          autocompleteFieldData && autocompleteFieldData.producer
        }
      />
      {/* dropdown color */}
      <InputField
        onChange={val => autocompleteField('year', val, setYear)}
        value={formYear}
        label="År"
        placeholder="ex. 2012"
      />
      <InputField
        onChange={val => autocompleteField('country', val, setCountry)}
        value={formCountry}
        label="Land"
        placeholder="ex. Sydafrika"
        autocompleteOptions={
          autocompleteFieldData && autocompleteFieldData.country
        }
      />
      <InputField
        onChange={val => setBoughtFrom(val)}
        value={formBoughtFrom}
        label="Inköpsplats"
        placeholder="ex. Systembolaget"
      />
      {formNr && (
        <InputField
          onChange={val => setNr(val)}
          value={formNr}
          label="Artikelnummer"
        />
      )}
      {formBoughtFrom && (
        <InputField
          onChange={val => setPrice(val)}
          value={formPrice}
          label="Pris"
        />
      )}
      {/* dropdown container */}

      <div className="grape-div">
        <div className="input-div">
          <div className="input-div">
            <span className="input-label noSelect">
              Lägg till druvor
          <FontAwesomeIcon
                onClick={() => removeGrapeField()}
                icon={faMinusSquare}
                size="lg"
                aria-hidden="true"
              />
              <FontAwesomeIcon
                onClick={() => addGrapeField()}
                icon={faPlusSquare}
                size="lg"
                aria-hidden="true"
              />
            </span>
          </div>
        </div>
        {formGrapes &&
          formGrapes.length > 0 &&
          formGrapes.map((grape, index) => (
            <InputField
              onChange={val =>
                autocompleteField('grape', val, updateGrapeField, index)
              }
              value={grape}
              key={index}
              label="Druva"
              placeholder=""
              autocompleteOptions={
                autocompleteFieldData && autocompleteFieldData.grape
              }
            />
          ))}
      </div>
    </div>
  );
};
NewAddWineForm.propTypes = {
  navigatedInitialValues: PropTypes.object,
  autocompleteFieldData: PropTypes.object,
  systemWineData: PropTypes.array,
};

const mapStateToProps = state => ({
  formValues: state.addReducer.initialValue,
  systemWineData: state.addReducer.systemWineData,
  autocompleteFieldData: state.addReducer.fieldData,
});

export default connect(
  mapStateToProps,
  null,
)(NewAddWineForm);
