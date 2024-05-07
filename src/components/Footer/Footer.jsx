import './Footer.css';
import { NavLink } from 'react-router-dom';
import { GitHub } from '../../icons/GitHub';
import { Linkedin } from '../../icons/Linkedin';
import { Mail } from '../../icons/Mail';

function Footer () {
  const handleContact = () => {
    window.location.href = 'mailto:pgomezdev@gmail.com';
  };

  return (
    <footer className='footer'>
      <ul className='footer__list'>
        <li className='footer__item'>
          <NavLink
            to='https://github.com/PaconcioDev'
            target='_blank'
          >
            <GitHub />
          </NavLink>
        </li>
        <li className='footer__item'>
          <NavLink
            to='https://www.linkedin.com/in/franciscogo/'
            target='_blank'
          >
            <Linkedin />
          </NavLink>
        </li>
        <li className='footer__item'>
          <NavLink
            onClick={handleContact}
          >
            <Mail />
          </NavLink>
        </li>
      </ul>
      <p className='footer__text'>By: Francisco Javier Gómez Jiménez</p>
    </footer>
  );
}

export { Footer };
