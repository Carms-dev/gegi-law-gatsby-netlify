import React from 'react'
import styled from 'styled-components'
import { useStaticQuery, graphql, Link } from 'gatsby'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import SiteBorderStyles from '../styles/SiteBorderStyles'

import IconButton from '@material-ui/core/IconButton'
import FacebookIcon from '@material-ui/icons/Facebook'
import GitHubIcon from '@material-ui/icons/GitHub'
import TwitterIcon from '@material-ui/icons/Twitter'
import InstagramIcon from '@material-ui/icons/Instagram'

export default function Footer({ pausedRef }) {
  const { siteSettings } = useStaticQuery(graphql`
    query {
      siteSettings: file(relativeDirectory: {eq: "settings"}) {
        childMarkdownRemark {
          frontmatter {
            footerNote
            socialMedia {
              facebook
              twitter
              instagram
              github
            }
          }
        }
      }
    }
  `)
  const { footerNote, socialMedia } = siteSettings.childMarkdownRemark.frontmatter

  const scrollToTop = () => {
    // For start page only, where the pausedRef is defined
    if (pausedRef) {
      // Pause the observer effect to scroll into view of each section
      pausedRef.current = true

      window.scrollTo({ top: 0, behavior: "smooth" });

      // Un-pause the effect after the scroll to top is completed
      setTimeout(() => {
        pausedRef.current = false
      }, 1000);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <FooterStyles>
      <IconButton
        onClick={scrollToTop}
      >
        <ArrowUpwardIcon size='medium' />
      </IconButton>
      <SiteBorderStyles>
        <div>
          <p><span role="img" aria-label="copyright">©️</span> law.gegi.ca | <Link to="/privacy">Privacy Policy</Link></p>
          <p>{footerNote}</p>
        </div>
        <div>
          {socialMedia.facebook &&
          <IconButton aria-label="facebook" size="medium" href={socialMedia.facebook}>
            <FacebookIcon fontSize="medium" />
          </IconButton>}

          {socialMedia.instagram &&
          <IconButton aria-label="instagram" size="medium" href={socialMedia.instagram}>
            <InstagramIcon fontSize="medium" />
          </IconButton>}

          {socialMedia.twitter &&
          <IconButton aria-label="twitter" size="medium" href={socialMedia.twitter}>
            <TwitterIcon fontSize="medium" />
          </IconButton>}

          {socialMedia.github &&
          <IconButton aria-label="github" size="medium" href={socialMedia.github}>
            <GitHubIcon fontSize="medium" />
          </IconButton>}
        </div>
      </SiteBorderStyles>
    </FooterStyles>
  )
}

const FooterStyles = styled.footer`
  margin-top: 100px;
  background: var(--aqua-light);
  padding: 2rem 0;
  text-align: center;
  position: relative;

  > button:first-child {
    position: absolute;
    top: -75px;
    left: 50%;
    transform: translateX(-50%);
  }
  p {
    margin-bottom: 1rem;
  }
  @media (min-width: 1024px) {
    > div {
      display: grid;
      grid-gap: 2rem;
      grid-template-columns: 1fr 200px;
      place-items: center;
      text-align: left;
    }
  }

`
