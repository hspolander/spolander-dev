import React from 'react';

import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

import SelectRegular from '../src/components/SelectRegular';

const values = [{ value: 'red' }, { value: 'white' }, { value: 'blue' }, { value: 'rosé' }].map(
  value => ({
    value: value.value,
    name: value.value.toUpperCase(),
  }),
);

storiesOf('Select', module).add(
  'Regular',
  withState({ value: '' })(({ store }) => (
    <SelectRegular
      values={values}
      {...store.state}
      onChange={value => store.set({ value })}
      label="Label"
    />
  )),
);
