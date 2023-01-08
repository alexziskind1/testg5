import * as React from 'react';
import { Link, withPrefix } from 'gatsby';
import styled from 'styled-components';

const logoSrc = withPrefix('/img/logo_full.svg');
const logoIconSrc = withPrefix('/img/logo_full_icon.svg');

const LogoContainer = styled.div`
  margin-left: 50px;

  @media only screen and (max-width: 624px) {
    margin-left: 20px;
  }
`;

const LogoImg = styled.img`
  height: 60.3px;
  position: relative;
  top: 11px;
  display: inline;

  @media only screen and (max-width: 624px) {
    display: none;
  }
`;

const LogoImgIcon = styled.img`
  height: 60.3px;
  position: relative;
  top: 11px;

  display: none;

  @media only screen and (max-width: 624px) {
    display: inline;
    height: 80px;
  }
`;

interface SiteLogoProps {
  siteName: string;
}

function SiteLogo(props: SiteLogoProps) {
  return (
    <LogoContainer>
      <Link to="/">
        <LogoImg alt={props.siteName} src={logoSrc} />
        <LogoImgIcon alt={props.siteName} src={logoIconSrc} />
      </Link>
    </LogoContainer>
  );
}

export default SiteLogo;
