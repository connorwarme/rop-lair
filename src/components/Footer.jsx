const Footer = () => {


  return ( 
    <>
      <div className="footer-container">
        <a className="back-top" href="#top">Back to Top</a>
        <div className="copywright-container">
          <p>some line about all rights belonging to LOTR and Amazon</p>
          <p>Watch the show on <a href="https://www.amazon.com">Amazon</a></p>
        </div>
        <div className="credit-container">
          <p>Built by Connor Warme</p>
          <a href="https://www.linkedin.com/in/connor-warme-13c8">
            <img alt="LinkedIn"/>
          </a>
          <a href="https://github.com/connorwarme">
            <img alt="GitHub"/>
          </a>
        </div>

      </div>
    </>
   );
}
 
export default Footer;