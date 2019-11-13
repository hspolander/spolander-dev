import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import InputRegular from '../components/InputRegular';

storiesOf('InputRegular', module)
  .add(
    'Standard', () => (
      <InputRegular
        label="Label"
        variant="standard"
        color="default"
        type="text"
        onChange={action('Typed')}
      >
        Standard
      </InputRegular>
    ),
  )
  .add(
    'Outlined', () => (
      <InputRegular
        label="Label"
        variant="outlined"
        color="default"
        type="text"
        onChange={action('Typed')}
      >
        Outlined
      </InputRegular>
    ),
  )
  .add(
    'Filled', () => (
      <InputRegular
        label="Label"
        variant="filled"
        color="default"
        type="text"
        onChange={action('Typed')}
      >
        Filled
      </InputRegular>
    ),
  )
  .add(
    'Standard required error', () => (
      <InputRegular
        required
        error={'a'.length < 1}
        label="Label"
        variant="standard"
        color="default"
        type="text"
        onChange={action('Typed')}
      >
        Standard required
      </InputRegular>
    ),
  )
  .add(
    'Outlined required error', () => (
      <InputRegular
        label="Label"
        required
        error={'a'.length < 1}
        variant="outlined"
        color="default"
        type="text"
        onChange={action('Typed')}
      >
        Outlined required
      </InputRegular>
    ),
  )
  .add(
    'Filled required error', () => (
      <InputRegular
        label="Label"
        required
        error={'a'.length < 1}
        variant="filled"
        color="default"
        type="text"
        onChange={action('Typed')}
      >
        Filled required
      </InputRegular>
    ),
  )
  .add(
    'Multirow(Text area)', () => (
      <InputRegular
        label="Label"
        required
        variant="outlined"
        color="default"
        type="text"
        multiline
        multiRows={5}
        onChange={action('Typed')}
      >
        Filled required
      </InputRegular>
    ),
  )
  .add(
    'Several textfields', () => (
      <div>
        <InputRegular
          label="Label"
          variant="outlined"
          color="default"
          type="text"
          onChange={action('Typed')}
        >
          Outlined
        </InputRegular>
        <InputRegular
          label="Label"
          variant="outlined"
          color="default"
          type="text"
          onChange={action('Typed')}
        >
          Outlined
        </InputRegular>
        <InputRegular
          label="Label"
          variant="outlined"
          color="default"
          type="text"
          onChange={action('Typed')}
        >
          Outlined
        </InputRegular>
        <InputRegular
          label="Label"
          variant="outlined"
          color="default"
          type="text"
          onChange={action('Typed')}
        >
          Outlined
        </InputRegular>
        <InputRegular
          label="Label"
          variant="outlined"
          color="default"
          type="text"
          onChange={action('Typed')}
        >
          Outlined
        </InputRegular>
        <InputRegular
          label="Label"
          variant="outlined"
          color="default"
          type="text"
          onChange={action('Typed')}
        >
          Outlined
        </InputRegular>
      </div>
    ),
  );
