import React, { useState, useEffect } from "react";
import InputTextField from "@spolander/shared-components/src/components/InputRegular";
import InputSelect from "@spolander/shared-components/src/components/SelectRegular";
import ButtonRegular from "@spolander/shared-components/src/components/ButtonRegular";
import GetSystembolaget from "../../api/getSystembolaget";

const SearchSysForm = (props) => {
  const [subTypes, setSubTypes] = useState([])
  const [types, setTypes] = useState([])
  const [countries, setCountries] = useState([])
  const [formdata, setFormData] = useState({
    name: "",
    type: "",
    subType: "",
    country: "",
    vintage: "",
    description: "",
    volume: "",
    productId: "",
  });
const { getSysWines } = props

  const resetForm = () => {
    setFormData({
      name: "",
      type: null,
      subType: null,
      country: "",
      vintage: "",
      description: "",
      volume: "",
      productId: "",
    });
  };

  useEffect(() => {
    GetSystembolaget.getTypes()
    .then((typesResponse) => setTypes(typesResponse))
    GetSystembolaget.getSubTypes()
    .then((subTypesResponse) => setSubTypes(subTypesResponse))
    GetSystembolaget.getCountries()
    .then((countriesResponse) => setCountries(countriesResponse))
  }, []);


  return (
    <div className="addWineForm">
      <InputTextField
        label="Namn"
        variant="outlined"
        value={formdata.name}
        placeholder="ex Spier signature"
        onEnterPress={() => getSysWines(formdata)}
        onChange={(val) => setFormData({ ...formdata, name: val })}
      />
      <InputSelect
        values={countries}
        value={formdata.country}
        label="Land"
        onEnterPress={() => getSysWines(formdata)}
        onChange={(val) => setFormData({ ...formdata, country: val })}
      />
      <InputTextField
        label="Beskrivning"
        variant="outlined"
        value={formdata.description}
        onEnterPress={() => getSysWines(formdata)}
        onChange={(val) => setFormData({ ...formdata, description: val })}
      />
      <InputSelect
        values={types}
        value={formdata.type}
        label="Vinkategori"
        onEnterPress={() => getSysWines(formdata)}
        onChange={(val) => setFormData({ ...formdata, type: val })}
      />
      <InputSelect
        values={subTypes}
        value={formdata.subType}
        label="Vinunderkategori"
        onEnterPress={() => getSysWines(formdata)}
        onChange={(val) => setFormData({ ...formdata, subType: val })}
      />
      <InputTextField
        variant="outlined"
        value={formdata.vintage}
        label="År"
        placeholder="ex. 2012"
        onEnterPress={() => getSysWines(formdata)}
        onChange={(val) =>
          setFormData({ ...formdata, vintage: val.replace(/\D/g, "") })
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
          onClick={() => getSysWines(formdata)}
        >
          <i>Sök</i>
        </ButtonRegular>
      </div>
    </div>
  );
};
SearchSysForm.propTypes = {};


export default SearchSysForm;
