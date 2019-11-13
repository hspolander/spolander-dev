import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

import SliderRegular from '../components/SliderRegular';

const values = [
  { value: 1 },
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  { value: 8 },
  { value: 9 },
  { value: 10 }].map(
  (value) => ({
    value: value.value,
    name: value.value,
  }),
);

storiesOf('Slider', module).add(
  'Regular', () => (
    <SliderRegular
      values={values}
      step={1}
      max={10}
      min={0}
      value={5}
      displayValue="on"
      onChange={action('Letting it slide')}
      label="Label"
    />
  ),
);
