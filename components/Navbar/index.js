import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/images/logo.png";
import { usePathname } from "next/navigation";

function NavbarPage() {
  const path = usePathname(); // Get the current path to determine active link
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <Link className="navbar-brand" href="/">
              <Image className="navimage me-5" src={Logo} alt="logo" priority />
              NextLevel Food
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarTogglerDemo02">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${path === "/Meals" ? "active" : ""}`}
                    aria-current="page"
                    href="/Meals"
                  >
                    Browse Meals
                  </Link>
                </li>
                <div className=""></div>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${
                      path === "/Community" ? "active" : ""
                    }`}
                    href="/Community"
                  >
                    Community
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default NavbarPage;
