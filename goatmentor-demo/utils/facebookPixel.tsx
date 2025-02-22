const initializePixel = () => {
  const script = (innerHTML: string, tag: "script" | "noscript") => {
    const script = document.createElement(tag);
    script.innerHTML = innerHTML;
    return script;
  };

  const facebookPixel = `!function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'xxxx');
    fbq('init', '6756179104436267');
    fbq('track', 'PageView');`;
  const facebookPixelImage = `<img height="1" width="1" style="display:none"
    src="xxxx"
    />`;

  document.head.appendChild(script(facebookPixelImage, "noscript"));
  document.head.appendChild(script(facebookPixel, "script"));
};

export default initializePixel;
