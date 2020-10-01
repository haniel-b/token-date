import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

import { Container, HeaderContent, Profile } from './styles';

const Header: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <HeaderContent>
        <Link to="/">
          <h1>Token-date</h1>
        </Link>

        <Link to="/event/create">Criar Eventos</Link>

        <Link to="/event/update">Editar Eventos</Link>
      </HeaderContent>

      <Profile>
        <div>
          <strong>{user.name}</strong>
          <Link to="/">
            <button onClick={signOut} type="button">
              Sair
            </button>
          </Link>
        </div>
      </Profile>
    </Container>
  );
};

export default Header;
