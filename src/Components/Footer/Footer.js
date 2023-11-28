import React from 'react';

import {
  FooterContainer,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  SocialIcon,
  WebsiteRights,

} from './Footer.elements';

function Footer() {

  const date = new Date();

  return (
    <FooterContainer>
      {/*<FooterSubscription>*/}
      {/*  <FooterSubHeading>*/}
      {/*    Join our exclusive membership to receive the latest news and trends*/}
      {/*  </FooterSubHeading>*/}
      {/*  <FooterSubText>You can unsubscribe at any time.</FooterSubText>*/}
      {/*  <Form>*/}
      {/*    <FormInput name='email' type='email' placeholder='Your Email' />*/}
      {/*    <Button fontBig>Subscribe</Button>*/}
      {/*  </Form>*/}
      {/*</FooterSubscription>*/}
      {/*<FooterLinksContainer>*/}
      {/*  <FooterLinksWrapper>*/}

      {/*    <FooterLinkItems>*/}
      {/*      <FooterLinkTitle>ارتباط با ما</FooterLinkTitle>*/}
      {/*      <FooterLink to='/'>example@gmail.com</FooterLink>*/}
      {/*      <FooterLink to='/'>021-1111111</FooterLink>*/}
      {/*    </FooterLinkItems>*/}
      {/*  </FooterLinksWrapper>*/}
      {/*  <FooterLinksWrapper>*/}
      {/*    <FooterLinkItems>*/}
      {/*      <FooterLinkTitle>شبکه های اجتماعی</FooterLinkTitle>*/}
      {/*      <FooterLink to='/'>لینکدین</FooterLink>*/}
      {/*      <FooterLink to='/'>تویتر</FooterLink>*/}
      {/*    </FooterLinkItems>*/}
      {/*  </FooterLinksWrapper>*/}
      {/*</FooterLinksContainer>*/}
      <SocialMedia>
        <SocialMediaWrap>
          <SocialLogo to='/'>
            <SocialIcon />
            ارزیابی بلوغ سازمانی
          </SocialLogo>
          <WebsiteRights>AIMaturity.ir © {date.getFullYear()} </WebsiteRights>
          {/*<SocialIcons>*/}
          {/*  <SocialIconLink href='/' target='_blank' aria-label='Facebook'>*/}
          {/*    <FaFacebook />*/}
          {/*  </SocialIconLink>*/}
          {/*  <SocialIconLink href='/' target='_blank' aria-label='Instagram'>*/}
          {/*    <FaInstagram />*/}
          {/*  </SocialIconLink>*/}
          {/*  <SocialIconLink href='/' target='_blank' aria-label='YouTube' >*/}
          {/*    <FaYoutube />*/}
          {/*  </SocialIconLink>*/}
          {/*  <SocialIconLink href='/' target='_blank' aria-label='Twitter'>*/}
          {/*    <FaTwitter />*/}
          {/*  </SocialIconLink>*/}
          {/*  <SocialIconLink href='/' target='_blank' aria-label='LinkedIn'>*/}
          {/*    <FaLinkedin />*/}
          {/*  </SocialIconLink>*/}
          {/*</SocialIcons>*/}
        </SocialMediaWrap>
      </SocialMedia>
    </FooterContainer>
  );
}

export default Footer;