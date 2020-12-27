import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputSelect from "@spolander/shared-components/src/components/SelectRegular";
import InputTextField from "@spolander/shared-components/src/components/InputRegular";
import Autocomplete from "@spolander/shared-components/src/components/Autocomplete";
import SliderRegular from "@spolander/shared-components/src/components/SliderRegular";
import {
  loadFieldAutocomplete,
  getSystembolagetSubTypes,
  getSystembolagetTypes,
  getSystembolagetCountries,
} from "./actions";

const AddReviewForm = ({
  autocompleteFieldData,
  types = [],
  subTypes = [],
  countries = [],
  formdata,
  fetching,
  setFormData,
}) => {
  const [autocompleteResponse, setAutoCompleteResponse] = useState(null);

  useEffect(() => {
    getSystembolagetTypes();
    getSystembolagetSubTypes();
    getSystembolagetCountries();
  }, []);

  const autocompleteField = (field, value, action) => {
    loadFieldAutocomplete(field, value);
  };

  useEffect(() => {
    if (autocompleteFieldData) {
      setAutoCompleteResponse(
        autocompleteFieldData.match.map((val) => ({
          value: val,
          label: val,
        }))
      );
    } else {
      setAutoCompleteResponse(null);
    }
  }, [autocompleteFieldData]);

  return (
    <div className="addWineForm">
      <InputTextField
        onChange={(val) => setFormData({ ...formdata, name: val })}
        label="Namn"
        variant="outlined"
        value={formdata.name}
        required
        placeholder="ex Spier signature"
      />
      <Autocomplete
        onInputChange={(inputValue) =>
          autocompleteField("producer", inputValue)
        }
        handleChange={(selectedValue) =>
          setFormData({
            ...formdata,
            producer: selectedValue ? selectedValue.value : "",
          })
        }
        label="Producent"
        variant="outlined"
        onBlur={(e) =>
          setFormData({
            ...formdata,
            producer: formdata.producer
              ? formdata.producer
              : e.target.value
              ? e.target.value
              : "",
          })
        }
        value={{ value: formdata.producer, label: formdata.producer }}
        placeholder="ex. Freixenet"
        options={autocompleteResponse}
      />
      <InputSelect
        values={types}
        value={formdata.type}
        label={"Vinkategori"}
        onChange={(val) => setFormData({ ...formdata, type: val })}
      />
      <InputSelect
        values={subTypes}
        value={formdata.subType}
        label={"Vinunderkategori"}
        onChange={(val) => setFormData({ ...formdata, subType: val })}
      />
      <InputSelect
        values={countries}
        value={formdata.country}
        label={"Land"}
        onChange={(val) => setFormData({ ...formdata, country: val })}
      />
      <InputTextField
        variant="outlined"
        value={formdata.year}
        label="År"
        placeholder="ex. 2012"
        onChange={(val) =>
          setFormData({ ...formdata, year: val.replace(/\D/g, "") })
        }
      />
      <Autocomplete
        onInputChange={(inputValue) =>
          autocompleteField("boughtFrom", inputValue)
        }
        handleChange={(selectedValue) =>
          setFormData({
            ...formdata,
            boughtFrom: selectedValue ? selectedValue.value : "",
          })
        }
        onBlur={(e) =>
          setFormData({
            ...formdata,
            boughtFrom: formdata.boughtFrom
              ? formdata.boughtFrom
              : e.target.value
              ? e.target.value
              : "",
          })
        }
        variant="outlined"
        value={{ value: formdata.boughtFrom, label: formdata.boughtFrom }}
        label="Inköpsplats"
        placeholder="ex. Systembolaget"
        options={autocompleteResponse}
      />
      {formdata.nr && (
        <InputTextField
          onChange={(val) => setFormData({ ...formdata, nr: val })}
          variant="outlined"
          readOnly
          value={formdata.nr}
          label="Artikelnummer"
        />
      )}
      {formdata.boughtFrom && (
        <InputTextField
          onChange={(val) => setFormData({ ...formdata, price: val })}
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
        value={
          formdata.grapes && formdata.grapes.length > 0
            ? formdata.grapes.map((grape) => ({
                value: grape,
                label: grape,
              }))
            : []
        }
        onBlur={(e) =>
          setFormData({
            ...formdata,
            grapes: e.target.value
              ? formdata.grapes.map((grapes) => grapes.value)
              : formdata.grapes,
          })
        }
        formatCreateLabel={(val) => `${val} (ny)`}
        onInputChange={(inputValue, action) =>
          autocompleteField("grape", inputValue, action)
        }
        handleChange={(selectedValue) =>
          setFormData({
            ...formdata,
            grapes: selectedValue
              ? selectedValue.map((grapes) => grapes.value)
              : [],
          })
        }
        options={autocompleteResponse}
      />
      <SliderRegular
        step={1}
        max={10}
        min={0}
        required
        value={formdata.score}
        displayValue={"auto"}
        onChange={(element, value) =>
          setFormData({ ...formdata, score: value })
        }
        label={`Betyg: ${formdata.score && formdata.score}`}
      />
      <InputTextField
        onChange={(val) => setFormData({ ...formdata, comment: val })}
        variant="outlined"
        value={formdata.comment}
        label="Recension"
        multiline
        required
        wide
        multiRows={7}
      />
    </div>
  );
};

AddReviewForm.propTypes = {
  autocompleteFieldData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  autocompleteFieldData: state.addReducer.fieldData,
  countries: state.addReducer.countries,
  subTypes: state.addReducer.subTypes,
  types: state.addReducer.types,
  fetching: state.addReducer.fetching,
});

export default connect(mapStateToProps, null)(AddReviewForm);
