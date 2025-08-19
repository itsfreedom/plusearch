import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <img
      src="https://hmartus.vtexassets.com/assets/vtex/assets-builder/hmartus.store-theme/1.135.0/logo-hmart-4x___b24a0904b56dfbd147ad3b1b5b080951.png"
      alt="H Mart Logo"
      className={className}
    />
  );
};

export default Logo;
