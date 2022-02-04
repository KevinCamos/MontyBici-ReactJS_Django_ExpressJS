import { useState } from "react";

const useHeader = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    console.log(handleCloseNavMenu);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pagesLogged = ["Stations"];
  const pagesNoLogged = ["login", "register"];
  const settings = ["profile", "account", "dashboard"];
  return { anchorElNav, anchorElUser, handleOpenNavMenu, handleOpenUserMenu, handleCloseNavMenu, handleCloseUserMenu, pagesLogged, pagesNoLogged, settings };
}

export default useHeader