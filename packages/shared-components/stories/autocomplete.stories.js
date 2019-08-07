import React from 'react';

import { storiesOf, addDecorator } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { withState } from '@dump247/storybook-state';

import Autocomplete from '../src/components/Autocomplete';

const options = [
  { label: 'a' },
  { label: 'aa' },
  { label: 'ab' },
  { label: 'ac' },
  { label: 'ad' },
  { label: 'ae' },
  { label: 'af' },
  { label: 'ag' },
  { label: 'ah' },
  { label: 'ai' },
  { label: 'aj' },
  { label: 'ak' },
  { label: 'al' },
].map(suggestion => ({
  value: suggestion.label,
  label: suggestion.label,
}));

storiesOf('Autocomplete', module)
  .add(
    'Loading creatable',
    withState({ selectedValue: null })(({ store }) => (
      <Autocomplete
        options={options}
        {...store.state}
        inputType="single"
        label="Label"
        isLoading
        required
        variant="outlined"
        placeholder="Write anything"
        handleChange={selectedValue => {
          store.set({ selectedValue });
        }}
      />
    )),
  );

storiesOf('Autocomplete', module)
  .addDecorator(muiTheme())
  .add(
    'Creatable multi select',
    withState({ selectedValue: null })(({ store }) => (
      <Autocomplete
        options={options}
        {...store.state}
        inputType="single"
        label="Label"
        isMulti
        required
        onInputChange={(inputValue, actionMeta) => console.log({inputValue, actionMeta, hej:"hej"})}
        variant="outlined"
        placeholder="Write anything"
        formatCreateLabel={val => `Skapa ny ${val}`}
        handleChange={selectedValue => {
          store.set({ selectedValue });
        }}
      />
    )),
  );
