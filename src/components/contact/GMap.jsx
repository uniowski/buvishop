import React from 'react';

const GMap = () => (
  <div>
    <iframe
      title="google-map"
      width="100%"
      height="440px"
      src="https://maps.google.com/maps?hl=en&amp;q=Wodzis%C5%82aw%20%C5%9Bl%C4%85ski%20+(Title)&amp;ie=UTF8&amp;t=&amp;z=15&amp;iwloc=B&amp;output=embed"
      frameBorder="0"
      scrolling="no"
      marginHeight="0"
      marginWidth="0"
      style={{ border: 0 }}
    />
    <style>{`
      #gmap_canvas img {
        max-width: none !important;
        background: none !important;
      }
    `}</style>
  </div>
);

export default GMap;