import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types'; import InputSelect from '@spolander/shared-components/src/components/SelectRegular';
import InputTextField from '@spolander/shared-components/src/components/InputRegular';
import Autocomplete from '@spolander/shared-components/src/components/Autocomplete';
import SliderRegular from '@spolander/shared-components/src/components/SliderRegular';
import ButtonRegular from '@spolander/shared-components/src/components/ButtonRegular';

import {
  loadFieldAutocomplete,
  loadAddReview,
  clearInitialValues,
} from './actions';

const AddReviewForm = ({
  autocompleteFieldData,
  initialValues,
}) => {

  const colors = [
    { name: "Rött", value: "Rött" },
    { name: "Rosé", value: "Rosé" },
    { name: "Vitt", value: "Vitt" },
    { name: "Mousserande vin", value: "Mousserande vin" },
  ];

  const sizes = [
    { name: "Helflaska", value: "Helflaska" },
    { name: "Rött", value: "Rött" },
    { name: "Glas", value: "Glas" },
    { name: "Box", value: "Box" },
    { name: "Halvflaska", value: "Halvflaska" },
    { name: "Liten box", value: "Liten box" },
    { name: "Piccolo", value: "Piccolo" },
    { name: "Magnum", value: "Magnum" },
    { name: "Tetra", value: "Tetra" },
    { name: "Stor flaska", value: "Stor flaska" },
    { name: "Annan", value: "Annan" },
  ];

  const [formdata, setFormData] = useState({
    'name': "",
    'producer': "",
    'color': "",
    'year': null,
    'country': "",
    'boughtFrom': "",
    'price': "",
    'container': "",
    'nr': "",
    'score': '',
    'review': "",
    'sizeml': "",
    'grapes': [],
  });
  const [autocompleteResponse, setAutoCompleteResponse] = useState(null);

  const setInitialValues = values => {
    setFormData(values);
  };

  const resetForm = () => {
    setFormData({
      'name': "",
      'producer': "",
      'color': "",
      'year': null,
      'country': "",
      'boughtFrom': "",
      'price': "",
      'container': "",
      'nr': "",
      'score': "",
      'comment': "",
      'sizeml': "",
      'grapes': [],
    });
  };


  const requiredFields = [
    'name',
    'color',
    'score',
    'comment',
  ];

  const validateInputs = () => {
    for (let key of requiredFields) {
      if (!formdata[key]) {
        alert('Du måste fylla i fälten Namn, Färg, betyg samt Recension.');
        return null;
      }
    };
    loadAddReview(formdata);
    resetForm();
  }

  useEffect(
    () => {
      if (initialValues) {
        setInitialValues(initialValues);
        clearInitialValues();
      }
    },
    [initialValues],
  );

  const autocompleteField = (field, value, action) => {
    loadFieldAutocomplete(field, value);
  };

  useEffect(
    () => {
      if (autocompleteFieldData) {
        setAutoCompleteResponse(autocompleteFieldData.match.map(val => ({
          value: val,
          label: val,
        })));
      } else {
        setAutoCompleteResponse(null);
      }
    },
    [autocompleteFieldData],
  );


  return (
    <div className="addWineForm">
      <InputTextField
        onChange={val => setFormData({ ...formdata, 'name': val })}
        label="Namn"
        variant="outlined"
        value={formdata.name}
        required
        placeholder="ex Spier signature"
      />
      <Autocomplete
        onInputChange={(inputValue) => autocompleteField('producer', inputValue)}
        handleChange={selectedValue => setFormData({ ...formdata, 'producer': selectedValue ? selectedValue.value : "" })}
        label="Producent"
        variant="outlined"
        onBlur={e => setFormData({
          ...formdata, 'producer':
            formdata.producer ? formdata.producer :
              e.target.value ? e.target.value : ""
        })}
        value={{ value: formdata.producer, label: formdata.producer }}
        placeholder="ex. Freixenet"
        options={autocompleteResponse}
      />
      <InputSelect
        values={colors}
        value={formdata.color}
        required
        label={"Färg"}
        onChange={val => setFormData({ ...formdata, 'color': val })}
      />
      <InputTextField
        onChange={val => setFormData({ ...formdata, 'year': val.replace(/\D/g, '') })}
        variant="outlined"
        value={formdata.year}
        label="År"
        placeholder="ex. 2012"
      />
      <Autocomplete
        onInputChange={(inputValue) => autocompleteField('country', inputValue)}
        handleChange={selectedValue => setFormData({ ...formdata, 'country': selectedValue ? selectedValue.value : "" })}
        onBlur={e => setFormData({
          ...formdata, 'country':
            formdata.country ? formdata.country :
              e.target.value ? e.target.value : ""
        })}
        variant="outlined"
        label="Land"
        value={{ value: formdata.country, label: formdata.country }}
        placeholder="ex. Sydafrika"
        options={autocompleteResponse}
      />
      <Autocomplete
        onInputChange={(inputValue) => autocompleteField('boughtFrom', inputValue)}
        handleChange={selectedValue => setFormData({ ...formdata, 'boughtFrom': selectedValue ? selectedValue.value : "" })}
        onBlur={e => setFormData({
          ...formdata, 'boughtFrom':
            formdata.boughtFrom ? formdata.boughtFrom :
              e.target.value ? e.target.value : ""
        })}
        variant="outlined"
        value={{ value: formdata.boughtFrom, label: formdata.boughtFrom }}
        label="Inköpsplats"
        placeholder="ex. Systembolaget"
        options={autocompleteResponse}
      />
      {formdata.nr && (
        <InputTextField
          onChange={val => setFormData({ ...formdata, 'nr': val })}
          variant="outlined"
          readOnly
          value={formdata.nr}
          label="Artikelnummer"
        />
      )}
      {formdata.boughtFrom && (
        <InputTextField
          onChange={val => setFormData({ ...formdata, 'price': val })}
          variant="outlined"
          value={formdata.price}
          label="Pris"
        />
      )}
      <Autocomplete
        variant="outlined"
        label="Druva"
        isMulti
        inputType="single"
        selectedValue={formdata.grapes}
        placeholder="Ex. Chardonnay"
        value={formdata.grapes && formdata.grapes.length > 0 ? formdata.grapes.map(grape => ({ 'value': grape, 'label': grape })) : []}
        onBlur={e => setFormData({ ...formdata, 'grapes': e.target.value ? formdata.grapes.map(grapes => grapes.value) : formdata.grapes })}
        formatCreateLabel={val => `${val} (ny)`}
        onInputChange={(inputValue, action) => autocompleteField('grape', inputValue, action)}
        handleChange={selectedValue => setFormData({ ...formdata, 'grapes': selectedValue ? selectedValue.map(grapes => grapes.value) : [] })}
        options={autocompleteResponse}
      />
      <SliderRegular
        step={1}
        max={10}
        min={0}
        required
        value={formdata.score}
        displayValue={"auto"}
        onChange={(element, value) => setFormData({ ...formdata, 'score': value })}
        label={`Betyg: ${formdata.score && formdata.score}`}
      />
      <InputTextField
        onChange={val => setFormData({ ...formdata, 'comment': val})}
        variant="outlined"
        value={formdata.comment}
        label="Recension"
        multiline
        required
        wide
        multiRows={7}
      />
      <div className="buttonDiv">
        <ButtonRegular variant="outlined" color="secondary" onClick={() => resetForm()}>
          <i>Rensa</i>
        </ButtonRegular>
        <ButtonRegular variant="contained" color="primary" onClick={() => validateInputs()}>
          <i>Lägg till</i>
        </ButtonRegular>
      </div>
    </div>
  );
}

AddReviewForm.propTypes = {
  navigatedInitialValues: PropTypes.object,
  autocompleteFieldData: PropTypes.object,
};

const mapStateToProps = state => ({
  initialValues: state.addReducer.initialValue,
  autocompleteFieldData: state.addReducer.fieldData,
});

export default connect(
  mapStateToProps,
  null,
)(AddReviewForm);;
