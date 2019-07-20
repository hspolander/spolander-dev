import React, { useState } from 'react';
import PropTypes from 'prop-types';
import InputField from '../formcomponents/inputField.jsx';

const LoginForm = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { handleSubmit } = props;

  return (
    <div>
      <InputField
        onChange={val => setUsername(val)}
        value={username}
        placeholder="Användarnamn"
        onEnterKeyPress={() => handleSubmit({ username, password })}
      />
      <InputField
        onChange={val => setPassword(val)}
        value={password}
        placeholder="Lösenord"
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
