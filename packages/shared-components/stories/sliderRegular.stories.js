import React from 'react';

import { storiesOf } from '@storybook/react';
import { withState } from '@dump247/storybook-state';

import SliderRegular from '../src/components/SliderRegular';

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
    value => ({
        value: value.value,
        name: value.value,
    }),
);

storiesOf('Slider', module).add(
    'Regular',
    withState({ value: 5 })(({ store }) => (
        <SliderRegular
            values={values}
            step={1}
            max={10}
            min={0}
            displayValue={"on"}
            {...store.state}
            onChange={(element, value) => store.set({ value })}
            label="Label"
        />
    )),
);
