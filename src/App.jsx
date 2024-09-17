import React, { useState } from 'react';
import Popup from './components/task/popup';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsOpen(true);
  };

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  return (
    <div className="App">
      <button onClick={handleOpenPopup}>Save segment</button>
      {isOpen && <Popup onClose={handleClosePopup} />}
    </div>
  );
}

export default App;
