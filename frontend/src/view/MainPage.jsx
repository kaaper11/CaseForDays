import "./MainPage.css";
import TopSkins from "./TopSkins";

const MainPage = () => {
  return (
    <>
      {/* HERO SECTION */}
      <div className="hero">
        <div className="hero-content">
          <h1>
            Otwieraj skrzynki <span>CS2</span>
          </h1>
          <p>
            Najlepsze skrzynki, premium dropy i skiny każdego dnia.
          </p>

          <button className="hero-button">
            <span className="cta-title">OTWÓRZ</span>
            <span className="cta-subtitle">SKRZYNKI</span>
          </button>
        </div>
      </div>

      {/* TOP SKINS SECTION */}
      <TopSkins />
    </>
  );
};

export default MainPage;

