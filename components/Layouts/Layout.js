// components/Layout.js

import NavbarPage from "../Navbar";
import HeaderPage from "../common/Header";

function Layout({ children }) {
  return (
    <div>
      <HeaderPage />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
