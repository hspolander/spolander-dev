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
  .addDecorator(muiTheme())
  .add(
    'Async creatable',
    withState({ selectedValue: null })(({ store }) => (
      <Autocomplete
        options={(value, callback) => {
          console.log(value);
          setTimeout(() => {
            callback(options);
          }, 1000);
        }}
        {...store.state}
        inputType="single"
        label="Label"
        required={true}
        variant="outlined"
        placeholder="Write anything"
        handleChange={selectedValue => {
          console.log(store);
          store.set({ selectedValue });
        }}
      />
    )),
  );

storiesOf('Autocomplete', module)
  .addDecorator(muiTheme())
  .add(
    'Async creatable multi select',
    withState({ selectedValue: null })(({ store }) => (
      <Autocomplete
        options={(value, callback) => {
          console.log(value);
          setTimeout(() => {
            callback(options);
          }, 1000);
        }}
        {...store.state}
        inputType="single"
        label="Label"
        isMulti
        required
        variant="outlined"
        placeholder="Write anything"
        formatCreateLabel={val => `Skapa ny ${val}`}
        handleChange={selectedValue => {
          console.log(store);
          store.set({ selectedValue });
        }}
      />
    )),
  );
