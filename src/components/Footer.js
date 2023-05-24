import React, { useState, useEffect } from 'react';
import '../css/footer.css';
import { Link } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ScrollToTop from '../utils/scrolltotop';
import urlImg from '../services/urlImg';

const Footer = () => {
  const [isNavTopVisible, setIsNavTopVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      if (scrollPosition >= windowHeight) {
        setIsNavTopVisible(true);
      } else {
        setIsNavTopVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer id="footer" >
      <ScrollToTop />
      <div class="footer__content">
        <div class="footer__logo">
          <img src={urlImg + "logo-bsk.png"}  class="lazyloaded footer__logo_img" alt="logo"/>
        </div>
        <ul class="footer__main_nav">

          <li class="footer__main_item js_footer_item">
            <a href="" class="footer__link footer__animation_link" data-drupal-link-system-path="node/20">NEWSLETTER</a>
          </li>
          <li class="footer__main_item js_footer_item">
            <a href="" class="footer__link footer__animation_link" target="_self" data-drupal-link-system-path="node/22">JOBS</a>
          </li>
          <li class="footer__main_item js_footer_item">
            <a href="" class="footer__link footer__animation_link" rel="noopener" target="_blank">PRESS</a>
          </li>
          <li class="footer__main_item js_footer_item">
            <a href="" class="footer__link footer__animation_link" target="_self" data-drupal-link-system-path="node/21">CONTACT US</a>
          </li>
          <li class="footer__main_item js_footer_item">
            <a href="" class="footer__link footer__animation_link" target="_self" data-drupal-link-system-path="node/25">Services</a>
          </li>
          <li class="footer__main_item js_footer_item">
            <a href="" class="footer__link footer__animation_link">Track an order</a>
          </li>
          <li class="footer__main_item js_footer_item">
            <a href="" class="footer__link footer__animation_link" target="_self" data-drupal-link-system-path="node/23">PRIVACY</a>
          </li>
          <li class="footer__main_item js_footer_item">
            <a href="" class="footer__link footer__animation_link" data-drupal-link-system-path="node/3138">LEGAL NOTICE &amp; TERMS OF USE</a>
          </li>
          <li class="footer__main_item js_footer_item">
            <a href="" class="footer__link footer__animation_link" data-drupal-link-system-path="node/3143">WEBSITE TERMS AND CONDITIONS</a>
          </li>
          <li class="footer__main_item js_footer_item">
            <a href="" class="footer__link footer__animation_link" data-drupal-link-system-path="node/2908">MSA TRANSPARENCY</a>
          </li>

        </ul>
        <ul class="footer__market_nav">
          
          <div div
            className={`footer__main_nav_top js-pd-nav ${
              isNavTopVisible ? 'footer__main_nav_top--visible' : ''
            }`}>
            <a href="#" type="button" class="footer__main_nav_top_button js-pd-nav__top js-pd-nav__trigger " onClick={() => window.scrollTo(0, 0)}>
              <p aria-hidden="true">Back to top</p>
              <ArrowUpwardIcon  aria-hidden="true"    ></ArrowUpwardIcon>
            </a>
          </div>
        </ul>
        <ul class="footer__social">

          <li class="footer__social_item js_footer_item">
            <a href="#" class="footer__link" title="Go to Hublot's page on facebook" aria-label="facebook" data-text="facebook" target="_blank" rel="noopener">
              <FacebookOutlinedIcon aria-hidden="true"></FacebookOutlinedIcon>
            </a>
          </li>
          <li class="footer__social_item js_footer_item">
            <a href="#" class="footer__link" title="Go to Hublot's page on instagram" aria-label="instagram" data-text="instagram" target="_blank" rel="noopener">
              <InstagramIcon aria-hidden="true"></InstagramIcon>
            </a>
          </li>
          
          <li class="footer__social_item js_footer_item">
            <a href="#" class="footer__link" title="Go to Hublot's page on twitter" aria-label="twitter" data-text="twitter" target="_blank" rel="noopener">
              <TwitterIcon  aria-hidden="true"></TwitterIcon>
            </a>
          </li>
          <li class="footer__social_item js_footer_item">
            <a href="#" class="footer__link" title="Go to Hublot's page on youtube" aria-label="youtube" data-text="youtube" target="_blank" rel="noopener">
              <YouTubeIcon  aria-hidden="true"></YouTubeIcon>
            </a>
          </li>

        </ul>
        <div class="footer__copyright quote-14">

          <div><p>© 2023 DLB - All intellectual property rights reserved</p></div>

        </div>


      </div>

    </footer>
  );
}

export default Footer;