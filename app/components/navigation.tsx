"use client";

import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

const Nav = styled.nav`
  width: 100%;
  height: 60px;
  background-color: ${({ theme }) => theme.colors.slate[100]};
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2.5px solid ${({ theme }) => theme.colors.slate[200]};
`;

const NavContent = styled.div`
  width: 1200px;
  display: flex;
  align-items: center;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  padding: 0 20px;
`;

export default function Navigation() {
  return (
    <Nav>
      <NavContent>
        <LogoLink href="/">
          <Image
            src="/images/logo_full.png"
            alt="로고"
            layout="intrinsic"
            width={151}
            height={40}
          />
        </LogoLink>
      </NavContent>
    </Nav>
  );
}
