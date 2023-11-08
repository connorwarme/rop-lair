import github from "../images/icons/github.svg"
import linkedin from "../images/icons/linkedin.svg"
import "../styles/footerStyle.css"


const Footer = () => {


  return ( 
    <>
      <div className="footer-container">
        <div className="back-container">
          <a className="back-top" href="#top">Back to Top</a>
        </div>
        <div className="copywright-container">
          <p>Credit to J.R.R. Tolkien. All rights belong to Amazon and Middle-Earth Enterprises.</p>
          <p>Watch now:<a className="watch-link" href="https://www.amazon.com/gp/video/detail/B09QH98YG1/ref=atv_dp_share_cu_r">The Rings of Power</a></p>
        </div>
        <div className="credit-container">
          <p><em>Fan Lair:</em> Built by Connor Warme</p>
          <a href="https://www.linkedin.com/in/connor-warme-13c8">
            <img src={linkedin} alt="LinkedIn"/>
          </a>
          <a href="https://github.com/connorwarme">
            <img src={github} alt="GitHub"/>
          </a>
        </div>

      </div>
    </>
   );
}
 
export default Footer;