import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import InputTextField from "@spolander/shared-components/src/components/InputRegular";
import InputSelect from "@spolander/shared-components/src/components/SelectRegular";
import ButtonRegular from "@spolander/shared-components/src/components/ButtonRegular";
import {
  loadSysWines,
  getSystembolagetSubTypes,
  getSystembolagetTypes,
  getSystembolagetCountries,
} from "./actions";

export const SearchNewSysForm = ({
  types = [],
  subTypes = [],
  countries = [],
}) => {
  const [formdata, setFormData] = useState({
    name: "",
    type: "",
    subType: "",
    country: "",
    year: "",
    description: "",
    volume: "",
    productCode: "",
  });
  const resetForm = () => {
    setFormData({
      name: "",
      type: null,
      subType: null,
      country: "",
      year: "",
      description: "",
      volume: "",
      productCode: "",
    });
  };
  useEffect(() => {
    getSystembolagetTypes();
    getSystembolagetSubTypes();
    getSystembolagetCountries();
  }, []);

  return (
    <div className="addWineForm">
      <InputTextField
        label="Namn"
        variant="outlined"
        value={formdata.name}
        placeholder="ex Spier signature"
        onEnterPress={() => loadSysWines(formdata)}
        onChange={(val) => setFormData({ ...formdata, name: val })}
      />
      <InputSelect
        values={countries}
        value={formdata.country}
        label={"Land"}
        onEnterPress={() => loadSysWines(formdata)}
        onChange={(val) => setFormData({ ...formdata, country: val })}
      />
      <InputTextField
        label="Beskrivning"
        variant="outlined"
        value={formdata.description}
        onEnterPress={() => loadSysWines(formdata)}
        onChange={(val) => setFormData({ ...formdata, description: val })}
      />
      <InputSelect
        values={types}
        value={formdata.type}
        label={"Vinkategori"}
        onEnterPress={() => loadSysWines(formdata)}
        onChange={(val) => setFormData({ ...formdata, type: val })}
      />
      <InputSelect
        values={subTypes}
        value={formdata.subType}
        label={"Vinunderkategori"}
        onEnterPress={() => loadSysWines(formdata)}
        onChange={(val) => setFormData({ ...formdata, subType: val })}
      />
      {/*<InputSelect
        values={subTypes}
        value={formdata.subType}
        label={"Volym"}
        onEnterPress={() => loadSysWines(formdata)}
        onChange={(val) => setFormData({ ...formdata, subType: val })}
      />*/}
      <InputTextField
        variant="outlined"
        value={formdata.year}
        label="År"
        placeholder="ex. 2012"
        onEnterPress={() => loadSysWines(formdata)}
        onChange={(val) =>
          setFormData({ ...formdata, year: val.replace(/\D/g, "") })
        }
      />
      <div className="buttonDiv">
        <ButtonRegular
          variant="outlined"
          color="secondary"
          onClick={() => resetForm()}
        >
          <i>Rensa</i>
        </ButtonRegular>
        <ButtonRegular
          variant="contained"
          color="primary"
          onClick={() => loadSysWines(formdata)}
        >
          <i>Sök</i>
        </ButtonRegular>
      </div>
    </div>
  );
};
SearchNewSysForm.propTypes = {
  autocompleteFieldData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  autocompleteFieldData: state.addReducer.fieldData,
  countries: state.addReducer.countries,
  subTypes: state.addReducer.subTypes,
  types: state.addReducer.types,
});

export default connect(mapStateToProps, null)(SearchNewSysForm);
