import React from 'react';

import { storiesOf, addDecorator } from '@storybook/react';
import { muiTheme } from 'storybook-addon-material-ui';
import { withState } from '@dump247/storybook-state';

import Table from '../src/components/Table';

const data = [
];

const columns = [
];

storiesOf('Table', module)
  .addDecorator(muiTheme())
  .add(
    'Async creatable',
    withState({ data })(({ store }) => (
      <Table

      />
    )),
  );
