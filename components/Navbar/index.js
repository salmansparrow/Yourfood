import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/images/logo.png";
import { useState } from "react";
import { usePathname } from "next/navigation";

function NavbarPage() {
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname(); // Get the current path to determine the active link

  const toggle = () => setIsOpen(!isOpen);

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
              aria-controls="navbarTogglerDemo02"
              aria-expanded={isOpen}
              aria-label="Toggle navigation"
              onClick={toggle}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
              id="navbarTogglerDemo02"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${path === "/Meals" ? "active" : ""}`}
                    aria-current="page"
                    href="/Meals"
                  >
                    Browse Meals
                  </Link>
                </li>
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
