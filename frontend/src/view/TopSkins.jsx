import "./TopSkins.css";

const topSkins = [
  {
    id: 1,
    name: "AK-47 | Redline",
    price: 54.24,
    image: "/skins/redline.png",
    color: "#c084fc"
  },
  {
    id: 2,
    name: "Glock-18 | Water Elemental",
    price: 61.51,
    image: "/skins/water.png",
    color: "#60a5fa"
  },
  {
    id: 3,
    name: "AWP | Asiimov",
    price: 342.46,
    image: "/skins/asiimov.png",
    color: "#fb923c"
  },
  {
    id: 4,
    name: "Bayonet | Doppler",
    price: 660.34,
    image: "/skins/doppler.png",
    color: "#818cf8"
  },
  {
    id: 5,
    name: "Huntsman | Fade",
    price: 210.04,
    image: "/skins/fade.png",
    color: "#f472b6"
  },
  {
    id: 6,
    name: "AK-47 | Neon Revolution",
    price: 183.33,
    image: "/skins/neon.png",
    color: "#34d399"
  },
  {
    id: 7,
    name: "USP-S | Kill Confirmed",
    price: 95.40,
    image: "/skins/usp.png",
    color: "#f87171"
  }
];

const TopSkins = () => {
  return (
    <div className="topskins-wrapper">
      <h2>Najdroższe skiny CS2</h2>

      <div className="topskins-scroll">
        {topSkins.map(skin => (
          <div key={skin.id} className="skin-card">
            <img src={skin.image} alt={skin.name} />
            <div className="skin-info">
              <span className="skin-name" style={{ color: skin.color }}>
                {skin.name}
              </span>
              <span className="skin-price">
                Od ${skin.price}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopSkins;
