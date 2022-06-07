import React, { useState, useEffect } from "react";

import InputSelect from "@spolander/shared-components/src/components/SelectRegular";
import InputTextField from "@spolander/shared-components/src/components/InputRegular";
import Autocomplete from "@spolander/shared-components/src/components/Autocomplete";
import SliderRegular from "@spolander/shared-components/src/components/SliderRegular";
import GetSystembolaget from "../../api/getSystembolaget";
import GetWine from "../../api/getWine";

const AddReviewForm = ({
  formdata,
  setFormData,
}) => {
  const [subTypes, setSubTypes] = useState([])
  const [types, setTypes] = useState([])
  const [countries, setCountries] = useState([])
  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    GetSystembolaget.getTypes()
    .then((typesResponse) => setTypes(typesResponse))
    GetSystembolaget.getSubTypes()
    .then((subTypesResponse) => setSubTypes(subTypesResponse))
    GetSystembolaget.getCountries()
    .then((countriesResponse) => setCountries(countriesResponse))
  }, []);

  const autocompleteField = (field, value) => {
    GetWine.autocomplete(value, field)
    .then((autocompleteResponse) => {
      if (autocompleteResponse?.match?.length) {   
        setAutocomplete(
          autocompleteResponse.match.map((val) => ({
            value: val,
            label: val,
          }))
          );
        } else {
          setAutocomplete(null)
        }
    })
  };

  const {
    name,
    producer,
    type,
    subType,
    year,
    country,
    boughtFrom,
    price,
    nr,
    grapes,
    comment,
    score } = formdata

  return (
    <div className="addWineForm">
      <InputTextField
        onChange={(val) => setFormData({ ...formdata, name: val })}
        label="Namn"
        variant="outlined"
        value={name}
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
            producer: producer || (e.target.value
              ? e.target.value
              : ""),
          })
        }
        value={{ value: producer, label: producer }}
        placeholder="ex. Freixenet"
        options={autocomplete}
      />
      <InputSelect
        values={types}
        value={type}
        label="Vinkategori"
        onChange={(val) => setFormData({ ...formdata, type: val })}
      />
      <InputSelect
        values={subTypes}
        value={subType}
        label="Vinunderkategori"
        onChange={(val) => setFormData({ ...formdata, subType: val })}
      />
      <InputSelect
        values={countries}
        value={country}
        label="Land"
        onChange={(val) => setFormData({ ...formdata, country: val })}
      />
      <InputTextField
        variant="outlined"
        value={year}
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
            boughtFrom: boughtFrom || (e.target.value
              ? e.target.value
              : ""),
          })
        }
        variant="outlined"
        value={{ value: boughtFrom, label: boughtFrom }}
        label="Inköpsplats"
        placeholder="ex. Systembolaget"
        options={autocomplete}
      />
      {nr && (
        <InputTextField
          onChange={(val) => setFormData({ ...formdata, nr: val })}
          variant="outlined"
          readOnly
          value={nr}
          label="Artikelnummer"
        />
      )}
      {boughtFrom && (
        <InputTextField
          onChange={(val) => setFormData({ ...formdata, price: val })}
          variant="outlined"
          value={price}
          label="Pris"
        />
      )}
      <Autocomplete
        variant="outlined"
        label="Druva"
        isMulti
        inputType="single"
        selectedValue={grapes}
        placeholder="Ex. Chardonnay"
        value={
          grapes && grapes.length > 0
            ? grapes.map((grape) => ({
                value: grape,
                label: grape,
              }))
            : []
        }
        onBlur={(e) =>
          setFormData({
            ...formdata,
            grapes: e.target.value
              ? grapes.map((newGrapes) => newGrapes.value)
              : grapes,
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
              ? selectedValue.map((newGrapes) => newGrapes.value)
              : [],
          })
        }
        options={autocomplete}
      />
      <SliderRegular
        step={1}
        max={10}
        min={0}
        required
        value={score}
        displayValue="auto"
        onChange={(element, value) =>
          setFormData({ ...formdata, score: value })
        }
        label={`Betyg: ${score && score}`}
      />
      <InputTextField
        onChange={(val) => setFormData({ ...formdata, comment: val })}
        variant="outlined"
        value={comment}
        label="Recension"
        multiline
        required
        wide
        multiRows={7}
      />
    </div>
  );
};


export default AddReviewForm;
