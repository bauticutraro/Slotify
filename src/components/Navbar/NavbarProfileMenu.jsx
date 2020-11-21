import React from 'react';
import { ProfileMenuContainer, ProfileMenuLink } from './navbarStyles';

const NavbarProfileMenu = ({ open }) => {
  return open ? (
    <ProfileMenuContainer>
      <ProfileMenuLink href='https://open.spotify.com' target='_blank'>
        Cuenta
      </ProfileMenuLink>
      {/* <ProfileMenuButton onClick={handleLogout}>Cerrar Sesión</ProfileMenuButton> */}
    </ProfileMenuContainer>
  ) : null;
};

export default NavbarProfileMenu;
