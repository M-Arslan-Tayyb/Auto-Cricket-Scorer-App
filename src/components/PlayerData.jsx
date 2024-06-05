import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBowlerName } from '../redux/slices/playerSlice';
import gsap from 'gsap';

const PlayerData = ({ onClose, setShowPlayerData }) => {
  const bowler = useSelector((state) => state.player.bowler); // Get the bowler name from the Redux store
  const dispatch = useDispatch();

  const [bowlerName, setBowlerName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    gsap.to('#bowler', {
      opacity: 1,
      duration: 0.5,
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (bowlerName.trim() === '') {
      setError('Bowler name is required');
    } else {
      setError('');
      dispatch(updateBowlerName(bowlerName));
      gsap.to('#bowler', {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          onClose();
        },
      });
    }
  };

  return (
    <div id="bowler" className="opacity-0 flex items-center justify-center w-screen h-screen fixed inset-0 z-10 bg-gray-100 bg-opacity-70">
      <form
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="bowlerName">Bowler Name</label>
          <input
            type="text"
            id="bowlerName"
            placeholder="Enter Bowler Name"
            value={bowlerName}
            onChange={(e) => setBowlerName(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg ${error ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-green-500`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
        >
          Submit
        </button>
      </form>

    
     
    </div>
  );
};

export default PlayerData;
