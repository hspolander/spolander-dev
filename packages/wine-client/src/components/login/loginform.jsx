import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputTextField from '@spolander/shared-components/src/components/InputRegular';
import ButtonRegular from '@spolander/shared-components/src/components/ButtonRegular';

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
        <ButtonRegular variant="outlined" color="primary" onClick={() => handleSubmit({ username, password })}>
          <i>Logga in</i>
        </ButtonRegular>
      </div>
    </div>
  );
};
LoginForm.propTypes = {
  handleSubmit: PropTypes.func,
};

export default LoginForm;
