import './Footer.css';
import { NavLink } from 'react-router-dom';
import { GitHub } from '../../icons/GitHub';
import { Linkedin } from '../../icons/Linkedin';
import { Mail } from '../../icons/Mail';

function Footer () {
  const handleContact = () => {
    const email = 'pgomezdev@gmail.com';
    const subject = encodeURIComponent('Quiero contactarte');
    const body = encodeURIComponent('Hola Francisco! He visto tu página "Sho-P" y estoy interesado en contactarte.');

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`;
    window.open(gmailUrl, '_blank');
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
