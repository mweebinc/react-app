import React, { useState, useEffect, useRef } from 'react';

function Sidebar({
  show = false,
  onSetShow,
  position = 'left',
  children,
  className = '',
  dragToggleDistance = 30,
  touchHandleWidth = 20,
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchCurrentX, setTouchCurrentX] = useState(null);
  const [sidebarWidth, setSidebarWidth] = useState(0);
  const [touchSupported, setTouchSupported] = useState(false);
  const sidebarRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    setTouchSupported(typeof window === 'object' && 'ontouchstart' in window);
  }, []);

  useEffect(() => {
    if (sidebarRef.current) setSidebarWidth(sidebarRef.current.offsetWidth);
  }, [children]);

  const getMovePercent = () => {
    if (!touchStartX || !touchCurrentX || !sidebarWidth) return 0;
    if (position === 'right') {
      return show
        ? Math.max(
            0,
            Math.min(
              100,
              ((touchStartX - touchCurrentX + sidebarWidth) / sidebarWidth) * 100
            )
          )
        : Math.max(
            0,
            Math.min(
              100,
              ((window.innerWidth - touchCurrentX) / sidebarWidth) * 100
            )
          );
    }
    return show
      ? Math.max(
          0,
          Math.min(
            100,
            ((touchCurrentX - touchStartX + sidebarWidth) / sidebarWidth) * 100
          )
        )
      : Math.max(0, Math.min(100, (touchCurrentX / sidebarWidth) * 100));
  };

  const percentage = getMovePercent();

  useEffect(() => {
    if (!touchSupported) return;

    const handleTouchMove = (e) => {
      if (isDragging) {
        e.preventDefault();
        if (animationFrameRef.current)
          cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = requestAnimationFrame(() =>
          setTouchCurrentX(e.touches[0].clientX)
        );
      }
    };

    const handleTouchEnd = () => {
      if (isDragging) {
        if (
          (show && percentage < 100 - dragToggleDistance) ||
          (!show && percentage > dragToggleDistance)
        ) {
          onSetShow(!show);
        }
        setIsDragging(false);
        setTouchStartX(null);
        setTouchCurrentX(null);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
      }
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
    };
  }, [
    touchSupported,
    isDragging,
    show,
    onSetShow,
    dragToggleDistance,
    percentage,
  ]);

  const handleTouchStart = (e) => {
    if (!touchSupported || isDragging) return;
    const touch = e.touches[0];
    if (show && sidebarRef.current) {
      const rect = sidebarRef.current.getBoundingClientRect();
      const isNearEdge =
        position === 'left'
          ? touch.clientX >= rect.right - 40
          : touch.clientX <= rect.left + 40;
      if (!isNearEdge) return;
    }
    setIsDragging(true);
    setTouchStartX(touch.clientX);
    setTouchCurrentX(touch.clientX);
  };

  const getTransform = () => {
    if (isDragging)
      return position === 'right'
        ? `translateX(${100 - percentage}%)`
        : `translateX(-${100 - percentage}%)`;
    return position === 'right'
      ? show
        ? 'translateX(0%)'
        : 'translateX(100%)'
      : show
      ? 'translateX(0%)'
      : 'translateX(-100%)';
  };

  const shouldShowDragHandle = touchSupported && !show;
  const isRight = position === 'right';

  return (
    <>
      {shouldShowDragHandle && (
        <div
          className={`fixed top-0 bottom-0 z-50 touch-manipulation lg:hidden ${
            isRight ? 'right-0' : 'left-0'
          }`}
          style={{ width: touchHandleWidth }}
          onTouchStart={handleTouchStart}
        />
      )}
      {touchSupported && (
        <div
          className={`fixed inset-0 z-50 transition-opacity duration-300 ease-in-out ${
            show
              ? 'opacity-100 visible pointer-events-auto'
              : 'opacity-0 invisible pointer-events-none'
          }`}
          style={
            isDragging
              ? {
                  opacity: percentage / 100,
                  transition: 'none',
                  visibility: 'visible',
                  pointerEvents: 'auto',
                  backgroundColor: 'rgba(0,0,0,0.3)',
                }
              : { backgroundColor: 'rgba(0,0,0,0.3)' }
          }
          onClick={() => onSetShow?.(false)}
        />
      )}

      <div
        ref={sidebarRef}
        className={`fixed top-0 h-full z-50 lg:z-30 shadow-lg overflow-y-auto ${
          isRight ? 'right-0' : 'left-0'
        } ${className}`}
        style={{
          transform: getTransform(),
          WebkitTransform: getTransform(),
          transition: isDragging
            ? 'transform 0s ease-in-out'
            : 'transform 300ms ease-in-out',
        }}
        onTouchStart={shouldShowDragHandle ? undefined : handleTouchStart}
      >
        {children}
      </div>
    </>
  );
}

export default Sidebar;
