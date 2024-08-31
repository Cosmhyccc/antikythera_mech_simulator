import React, { useState, useEffect } from 'react';
import { Sun, Moon, Info } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent } from './components/ui/card';
import { Button } from './components/ui/button';
import { Alert, AlertDescription, AlertTitle } from './components/ui/alert';

const AntikytheraMechanism = () => {
  const [rotation, setRotation] = useState(0);
  const [moonPhase, setMoonPhase] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [planetaryPositions, setPlanetaryPositions] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation((prevRotation) => (prevRotation + 1) % 360);
      setMoonPhase((prevPhase) => (prevPhase + 0.1) % 8);
      updatePlanetaryPositions();
    }, 100);

    return () => clearInterval(timer);
  }, []);

  const updatePlanetaryPositions = () => {
    const newPositions = [
      { name: 'Mercury', position: Math.sin(Date.now() / 1000) * 50 + 50 },
      { name: 'Venus', position: Math.sin(Date.now() / 2000) * 50 + 50 },
      { name: 'Mars', position: Math.sin(Date.now() / 3000) * 50 + 50 },
      { name: 'Jupiter', position: Math.sin(Date.now() / 4000) * 50 + 50 },
      { name: 'Saturn', position: Math.sin(Date.now() / 5000) * 50 + 50 },
    ];
    setPlanetaryPositions(newPositions);
  };

  const getMoonPhase = () => {
    const phases = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
    return phases[Math.floor(moonPhase)];
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Antikythera Mechanism Simulator</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card>
          <CardHeader>Main Mechanism</CardHeader>
          <CardContent>
            <div className="relative w-64 h-64 mx-auto bg-yellow-200 rounded-full border-4 border-yellow-600 overflow-hidden">
              <div 
                className="absolute top-0 left-0 w-full h-full"
                style={{ transform: `rotate(${rotation}deg)` }}
              >
                <div className="absolute top-0 left-1/2 w-1 h-1/2 bg-yellow-600 transform -translate-x-1/2 origin-bottom"></div>
              </div>
              <Sun className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-500" size={32} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>Celestial Information</CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg">Moon Phase:</span>
              <span className="text-3xl">{getMoonPhase()}</span>
            </div>
            <div className="mb-4">
              <h3 className="text-lg mb-2">Planetary Positions</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={planetaryPositions}>
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="position" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8 w-full max-w-4xl">
        <Button onClick={() => setShowInfo(!showInfo)} className="mb-4">
          <Info className="mr-2" /> {showInfo ? 'Hide' : 'Show'} Information
        </Button>
        {showInfo && (
          <Alert>
            <AlertTitle>About the Antikythera Mechanism</AlertTitle>
            <AlertDescription>
              The Antikythera mechanism is an ancient Greek hand-powered orrery, described as the first analogue computer, used to predict astronomical positions and eclipses for calendar and astrological purposes decades in advance. It could also be used to track the four-year cycle of athletic games which was similar to an Olympiad, the cycle of the ancient Olympic Games.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default AntikytheraMechanism;