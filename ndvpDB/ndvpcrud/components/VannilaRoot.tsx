import React, { useEffect } from 'react';

const VanillaContainer: React.FC = () => {
  useEffect(() => {
    // Import the external HTML file
    const importHTML = async () => {
      const response = await fetch('/public/index.html');
      const htmlContent = await response.text();

      // Inject the HTML content into a container div
      const container = document.getElementById('external-html-container');
      if (container) {
        container.innerHTML = htmlContent;
      }
    };

    importHTML();
  }, []);

  return (
    <div>
      <h2>This is the React Container</h2>
      <div id="external-html-container"></div>
    </div>
  );
};

export default VanillaContainer;