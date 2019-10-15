import React from 'react';

import { Container, ImageLogo } from './styles';
import logo from '~/assets/logo.png';

export default function Header() {
  return (
    <Container>
      <ImageLogo source={logo} />
    </Container>
  );
}
