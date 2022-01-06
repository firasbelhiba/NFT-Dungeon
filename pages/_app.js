import "../styles/globals.css";
import Link from "next/link";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <div className="overflow-hidden">
        <header className="header__1 js-header" id="header">
          <div className="container">
            <div className="wrapper js-header-wrapper">
              <div className="header__logo">
                <Link href="/">
                  <a>
                    <img
                      className="header__logo"
                      id="logo_js"
                      src="assets/img/logos/Dungeon.png"
                      alt="logo"
                      style={{ height: "9.2rem" }}
                    />
                  </a>
                </Link>
              </div>
              <div className="header__menu">
                <ul className="d-flex space-x-20">
                  <li>
                    <Link href="/create-item">
                      <a className="color_black"> Create</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/my-assets">
                      <a className="color_black"> My digital assets</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/creator-dashboard">
                      <a className="color_black"> Creator dashboard</a>
                    </Link>
                  </li>
                </ul>
              </div>
              {/* ================= */}
              <div className="header__search">
                <input type="text" placeholder="Search" />
                <button className="header__result">
                  <i className="ri-search-line" />
                </button>
              </div>
              <div className="header__btns">
                <a className="btn btn-grad btn-sm" href="Connect-wallet.html">
                  <i className="ri-wallet-3-line" />
                  Connect wallet
                </a>
                <a href="#" id="connectbtn">
                  <img width={45} src="assets/img/icons/metamask.svg" alt="" />
                </a>
              </div>
              <div className="header__burger js-header-burger" />
              <div className="header__mobile js-header-mobile">
                <div className="header__mobile__menu space-y-40">
                  <ul className="d-flex space-y-20">
                    <li>
                      {" "}
                      <a className="color_black" href="Marketplace.html">
                        {" "}
                        Marketplace
                      </a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a className="color_black" href="Collections.html">
                        {" "}
                        Collections
                      </a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a className="color_black" href="Profile.html">
                        {" "}
                        Profile
                      </a>{" "}
                    </li>
                    <li>
                      {" "}
                      <a className="color_black" href="Creators.html">
                        {" "}
                        Creators
                      </a>{" "}
                    </li>
                  </ul>
                  <div className="space-y-20">
                    <div className="header__search in_mobile w-full">
                      <input type="text" placeholder="Search" />
                      <button className="header__result">
                        <i className="ri-search-line" />
                      </button>
                    </div>
                    <a
                      className="btn btn-grad btn-sm"
                      href="Connect-wallet.html"
                    >
                      Connect wallet
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
      <Component {...pageProps} />
      <Script src="assets/js/jquery-3.6.0.js" />
      <Script src="assets/js/bootstrap.bundle.min.js" />
      <Script src="assets/js/swiper-bundle.min.js" />
      <Script src="assets/js/gsap.min.js" />
      <Script src="assets/js/ScrollTrigger.min.js" />
      <Script src="assets/js/sticky-sidebar.js" />
      <Script src="assets/js/script.js" />
      <Script src="../cdn.jsdelivr.net/npm/web3%40latest/dist/web3.min.js" />
      <Script src="../unpkg.com/moralis%400.0.178/dist/moralis.js" />
      <Script src="assets/js/nft.js" />
      <Script src="../unpkg.com/%40lottiefiles/lottie-player%401.5.4/dist/lottie-player.js" />
    </div>
  );
}

export default MyApp;
