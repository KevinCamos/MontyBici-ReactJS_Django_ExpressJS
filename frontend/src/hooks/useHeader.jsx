import { useState } from "react";


export default function useHeader() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  return {isNavCollapsed, handleNavCollapse, }
  
}