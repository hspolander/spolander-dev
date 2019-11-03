import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

const Table = props => {
  const { title, columns, data, options, detailedContent } = props;
  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={data}
      options={options}
      detailPanel={data => {
        return { detailedContent };
      }}
    />
  );
};

Table.propTypes = {
  titile: PropTypes.string,
  columns: PropTypes.array,
  data: PropTypes.array,
  options: PropTypes.object,
  detailsPane: PropTypes.node,
};

export default Table;
