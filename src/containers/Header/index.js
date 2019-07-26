import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { createGlobalStyle } from "styled-components";
import { Link, NavLink } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import NotificationBadge, { Effect } from "react-notification-badge";

import SelectedCourses from "containers/SelectedCourses";
import "./styles.css";

const HideBodyOverflow = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

const LINKS = [
  { to: "/logout", label: "Logout" },
  { to: "/susun", label: "Buat Jadwal" },
  { to: "/jadwal", label: "Riwayat Jadwal" }
];

function renderHeaderLink() {
  return (
    <React.Fragment>
      {LINKS.map(({ to, label }) => (
        <HeaderLink to={to}>{label}</HeaderLink>
      ))}
    </React.Fragment>
  );
}

function Header() {
  const isMobile = useSelector(state => state.appState.isMobile);
  const notifCount = useSelector(state => state.appState.notifCount);
  const [isOpened, setOpen] = useState(false);

  return (
    <Container isMobile={isMobile}>
      <LogoLink to="/" isMobile={isMobile}>
        <h1>
          Susun<span>Jadwal</span>
        </h1>
      </LogoLink>
      {isMobile && (
        <NotificationBadgeContainer>
          <NotificationBadge
            count={notifCount}
            effect={Effect.SCALE}
            frameLength={10.0}
          />
        </NotificationBadgeContainer>
      )}
      {isMobile ? (
        <Menu
          burgerButtonClassName="menu"
          right
          onStateChange={({ isOpen }) => setOpen(isOpen)}
          styles={{
            bmMenuWrap: {
              height: "calc(100vh - 64px)"
            },
            bmItemList: {
              height: "none"
            }
          }}
        >
          {isOpened && <HideBodyOverflow />}
          {LINKS.map(({ to, label }) => (
            <MenuLink to={to}>{label}</MenuLink>
          ))}
          <Spacer />
          <SelectedCourses />
        </Menu>
      ) : (
        renderHeaderLink()
      )}
    </Container>
  );
}

export default Header;

const Container = styled.div`
  width: 100%;
  height: 64px;
  padding: 0.5rem 0 0.5rem 0;
  background: #ffffff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  z-index: 2;
  position: fixed;

  a.active {
    color: #308077 !important;
  }
`;

const MenuLink = styled(NavLink)`
  font-weight: 700;
  color: #fff;
  margin-right: 2rem;
`;

const HeaderLink = styled(NavLink)`
  float: right;
  line-height: 3rem;
  font-weight: 700;
  color: #222222;
  margin-right: 2rem;
`;

const LogoLink = styled(Link)`
  h1 {
    margin: 0 0 0 ${({ isMobile }) => (isMobile ? "1rem" : "3rem")};
    line-height: 3rem;
    font-size: 2rem;
    font-weight: 700;
    display: inline-block;
    color: #ce9d4d;

    span {
      color: #308077;
    }
  }
`;

const NotificationBadgeContainer = styled.div`
  position: absolute;
  width: 1.5rem;
  height: 1.25rem;
  right: 0.75rem;
  top: 1.1rem;
  pointer-events: none;
  z-index: 1001;
`;
const Spacer = styled.div`
  height: 32px;
`;
