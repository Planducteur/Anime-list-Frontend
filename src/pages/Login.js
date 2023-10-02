import React, { useState } from 'react';
import { Button, Input } from '@nextui-org/react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const LoginContainer = styled.div`
  text-align: center;
  padding: 20px;
  width: 500px;
`;

const SpacedInput = styled(Input)`
  margin-bottom: 1rem;
`;

const Login = () => {
  let navigate = useNavigate() 
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleLogin = async (event) => {
    event.preventDefault();
    axios.post('https://127.0.0.1:8000/api/login_check', formData)
    .then(res => {
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('userid', res.data.userid)
      navigate('/home', {replace: true})
  })
  .catch(error => console.log(error))
  };
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <CenteredContainer>
      <LoginContainer>
        <h1>Connexion</h1>
        <SpacedInput
          label="Email"
          placeholder="Entrez votre email"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
        />
        <SpacedInput
          label="Mot de passe"
          type="password"
          placeholder="Entrez votre mot de passe"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <div style={{ marginTop: '1rem' }}>
          <Button onClick={handleLogin} fullWidth>
            Se connecter
          </Button>
        </div>
      </LoginContainer>
    </CenteredContainer>
  );
};

export default Login;
