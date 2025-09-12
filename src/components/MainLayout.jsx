import React, { useState, useEffect } from 'react';
import { useScreenSize } from '../hooks/useScreenSize';
import Sidebar from './Sidebar';
import NavSidebar from './NavSidebar';
import { MainLayoutContext } from './MainLayoutContext';

function MainLayout({ children, menus = [] }) {
  const { isMobile } = useScreenSize();
  const [show, setShow] = useState(!isMobile);

  useEffect(() => {
    setShow(!isMobile);
  }, [isMobile]);

  const mainContentStyle = isMobile
    ? {}
    : {
        marginLeft: show ? '270px' : '0px',
        transition: 'margin-left 0.3s ease-in-out',
      };

  return (
    <MainLayoutContext.Provider value={{ show, setShow, isMobile }}>
      <div style={mainContentStyle} className="min-h-screen bg-gray-50">
        <Sidebar show={show} onSetShow={setShow}>
          <NavSidebar
            className="lg:w-[270px]"
            menus={menus}
            isMobile={isMobile}
            setShow={setShow}
          />
        </Sidebar>
        {children}
      </div>
    </MainLayoutContext.Provider>
  );
}

MainLayout.Context = MainLayoutContext;

export default MainLayout;
