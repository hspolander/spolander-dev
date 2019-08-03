import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputTextField from '@spolander/shared-components/src/components/InputRegular';

const LoginForm = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { handleSubmit } = props;

  return (
    <div>
      <InputTextField
        onChange={val => setUsername(val)}
        value={username}
        variant="outlined"
        label="Användarnamn"
        onEnterKeyPress={() => handleSubmit({ username, password })}
      />
      <InputTextField
        onChange={val => setPassword(val)}
        variant="outlined"
        type="password"
        value={password}
        label="Lösenord"
        onEnterKeyPress={() => handleSubmit({ username, password })}
      />

      <div className="button-div">
        <button
          onClick={() => handleSubmit({ username, password })}
          type="submit"
        >
          Logga in
        </button>
      </div>
    </div>
  );
};
LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default LoginForm;
