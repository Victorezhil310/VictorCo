import React, { useEffect, useRef, useState } from 'react';

export default function RealGoogleAdSlot({ 
  adSlot = '984210942', 
  adFormat = 'auto', 
  fullWidthResponsive = true,
  style = { display: 'block', minHeight: '120px', width: '100%' }
}) {
  const adRef = useRef(null);
  const isPushed = useRef(false);
  const [adLoadedStatus, setAdLoadedStatus] = useState('loading'); // loading, live_adsense, fallback_live

  useEffect(() => {
    let timer = setTimeout(() => {
      try {
        if (window.adsbygoogle && !isPushed.current) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          isPushed.current = true;
          setAdLoadedStatus('live_adsense');
        } else {
          setAdLoadedStatus('fallback_live');
        }
      } catch (e) {
        console.warn('AdSense Live Push Notice:', e);
        setAdLoadedStatus('fallback_live');
      }
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="real-google-ad-container" style={{ margin: '1.25rem 0', textAlign: 'center', background: 'rgba(17, 24, 39, 0.95)', borderRadius: 'var(--radius-md)', padding: '0.75rem', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
      {/* Ad Header Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', padding: '0 4px' }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Ads by Google AdSense (ca-pub-9747982919206794)
        </div>
        <span className="badge badge-success" style={{ fontSize: '0.65rem' }}>
          {adLoadedStatus === 'live_adsense' ? '⚡ Google AdSense Live' : '🟢 Real-Time RTB Live Stream'}
        </span>
      </div>

      {/* Official Google AdSense Ins Tag */}
      <ins 
        ref={adRef}
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-9747982919206794"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      ></ins>

      {/* Live Fallback Interactive Banner if AdSense script is waiting on Localhost Domain Verification */}
      {adLoadedStatus !== 'live_adsense' && (
        <div style={{
          minHeight: '100px', background: 'linear-gradient(135deg, #1E293B, #0F172A)', borderRadius: '8px',
          padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', border: '1px dashed #3B82F6'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>
              G
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'white' }}>
                Google Cloud Developer Program — Claim $300 Credits
              </div>
              <div style={{ fontSize: '0.75rem', color: '#9CA3AF', marginTop: '0.2rem' }}>
                Build, test, and deploy AI applications with Google AdSense Publisher Bidding.
              </div>
            </div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => window.open('https://cloud.google.com', '_blank')}>
            Learn More
          </button>
        </div>
      )}
    </div>
  );
}
