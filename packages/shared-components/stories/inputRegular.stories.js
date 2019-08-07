import React from 'react';

import { storiesOf } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { withState } from '@dump247/storybook-state';

import InputRegular from '../src/components/InputRegular';

storiesOf('InputRegular', module)
  .add(
    'Standard',
    withState({ value: '' })(({ store }) => (
      <InputRegular
        label="Label"
        variant="standard"
        color="default"
        type="text"
        {...store.state}
        onChange={value => store.set({ value })}
      >
        Standard
      </InputRegular>
    )),
  )
  .add(
    'Outlined',
    withState({ value: '' })(({ store }) => (
      <InputRegular
        label="Label"
        variant="outlined"
        color="default"
        type="text"
        {...store.state}
        onChange={value => store.set({ value })}
      >
        Outlined
      </InputRegular>
    )),
  )
  .add(
    'Filled',
    withState({ value: '' })(({ store }) => (
      <InputRegular
        label="Label"
        variant="filled"
        color="default"
        type="text"
        {...store.state}
        onChange={value => store.set({ value })}
      >
        Filled
      </InputRegular>
    )),
  )
  .add(
    'Standard required error',
    withState({ value: '' })(({ store }) => (
      <InputRegular
        required
        error={store.state.value.length < 1}
        label="Label"
        variant="standard"
        color="default"
        type="text"
        {...store.state}
        onChange={value => store.set({ value })}
      >
        Standard required
      </InputRegular>
    )),
  )
  .add(
    'Outlined required error',
    withState({ value: '' })(({ store }) => (
      <InputRegular
        label="Label"
        required
        error={store.state.value.length < 1}
        variant="outlined"
        color="default"
        type="text"
        {...store.state}
        onChange={value => store.set({ value })}
      >
        Outlined required
      </InputRegular>
    )),
  )
  .add(
    'Filled required error',
    withState({ value: '' })(({ store }) => (
      <InputRegular
        label="Label"
        required
        error={store.state.value.length < 1}
        variant="filled"
        color="default"
        type="text"
        {...store.state}
        onChange={value => store.set({ value })}
      >
        Filled required
      </InputRegular>
    )),
  )
  .add(
    'Several textfields',
    withState({ value: '' })(({ store }) => (
      <div>
        <InputRegular
        label="Label"
        variant="outlined"
        color="default"
        type="text"
        {...store.state}
        onChange={value => store.set({ value })}
      >
        Outlined
      </InputRegular>
      <InputRegular
        label="Label"
        variant="outlined"
        color="default"
        type="text"
        {...store.state}
        onChange={value => store.set({ value })}
      >
        Outlined
      </InputRegular>
      <InputRegular
        label="Label"
        variant="outlined"
        color="default"
        type="text"
        {...store.state}
        onChange={value => store.set({ value })}
      >
        Outlined
      </InputRegular>
      <InputRegular
        label="Label"
        variant="outlined"
        color="default"
        type="text"
        {...store.state}
        onChange={value => store.set({ value })}
      >
        Outlined
      </InputRegular>
      <InputRegular
        label="Label"
        variant="outlined"
        color="default"
        type="text"
        {...store.state}
        onChange={value => store.set({ value })}
      >
        Outlined
      </InputRegular>
      <InputRegular
        label="Label"
        variant="outlined"
        color="default"
        type="text"
        {...store.state}
        onChange={value => store.set({ value })}
      >
        Outlined
      </InputRegular>
      </div>
    )),
  );
