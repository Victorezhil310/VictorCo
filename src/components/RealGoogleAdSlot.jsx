import React, { useEffect, useRef } from 'react';

export default function RealGoogleAdSlot({ 
  adSlot = '1234567890', 
  adFormat = 'auto', 
  fullWidthResponsive = true,
  style = { display: 'block', minHeight: '100px' }
}) {
  const adRef = useRef(null);
  const isPushed = useRef(false);

  useEffect(() => {
    try {
      if (window.adsbygoogle && !isPushed.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isPushed.current = true;
      }
    } catch (e) {
      console.warn('Google AdSense Live Ad push notice:', e);
    }
  }, []);

  return (
    <div className="real-google-ad-container" style={{ margin: '1rem 0', textAlign: 'center', background: 'rgba(0, 0, 0, 0.4)', borderRadius: 'var(--radius-md)', padding: '0.5rem', border: '1px border-color' }}>
      <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '4px', letterSpacing: '0.5px' }}>
        Official Google AdSense Live Slot (ca-pub-9747982919206794)
      </div>

      <ins 
        ref={adRef}
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-9747982919206794"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      ></ins>
    </div>
  );
}
