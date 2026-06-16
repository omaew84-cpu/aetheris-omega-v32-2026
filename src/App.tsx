import React, { useState, useEffect } from 'react';

// Mock data structures from the video
interface GCPConfig {
  projectId: string;
  serviceAccount: string;
  region: string;
}

interface FlightParameters {
  altitude: number;
  velocity: number;
  heading: number;
  tacticalMode: boolean;
}

interface TacticalCodeLookup {
  code: string;
  description: string;
  clearanceLevel: number;
}

const TACTICAL_CODES: TacticalCodeLookup[] = [
  { code: 'OMEGA-01', description: 'Full System Override', clearanceLevel: 5 },
  { code: 'ALPHA-07', description: 'Navigation Lock', clearanceLevel: 3 },
  { code: 'DELTA-12', description: 'Stealth Mode Engage', clearanceLevel: 4 },
];

export default function App() {
  const [gcpConfig, setGcpConfig] = useState<GCPConfig>({
    projectId: 'omega-control-v6',
    serviceAccount: 'omega-ai@omega-control-v6.iam.gserviceaccount.com',
    region: 'asia-southeast1'
  });

  const [flightParams, setFlightParams] = useState<FlightParameters>({
    altitude: 35000,
    velocity: 850,
    heading: 270,
    tacticalMode: false
  });

  const [tacticalCode, setTacticalCode] = useState('');
  const [systemStatus, setSystemStatus] = useState('STANDBY');
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM] Aetheris Omega Control v6.0 Initialized',
    '[GCP] Connected to project: omega-control-v6',
    '[AUTH] Service Account Verified'
  ]);

  // Mock GCP Service Account Load
  const loadGCPServiceAccount = async () => {
    addLog('[GCP] Loading Service Account...');
    setTimeout(() => {
      addLog('[GCP] Authentication successful');
      setSystemStatus('ACTIVE');
    }, 1000);
  };

  // Tactical Code Validation
  const validateTacticalCode = (code: string) => {
    const found = TACTICAL_CODES.find(c => c.code === code);
    if (found) {
      addLog(`[TACTICAL] Code ${code} accepted - ${found.description}`);
      setSystemStatus(`MODE: ${found.description.toUpperCase()}`);
      if (code === 'OMEGA-01') {
        setFlightParams(prev => ({ ...prev, tacticalMode: true }));
      }
      return true;
    }
    addLog(`[ERROR] Invalid tactical code: ${code}`);
    return false;
  };

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`${timestamp} ${message}`, ...prev.slice(0, 9)]);
  };

  // Flight parameter controls
  const updateAltitude = (value: number) => {
    setFlightParams(prev => ({ ...prev, altitude: value }));
    addLog(`[FLIGHT] Altitude adjusted to ${value} ft`);
  };

  useEffect(() => {
    loadGCPServiceAccount();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="border border-green-400 p-4 mb-4">
          <h1 className="text-3xl font-bold text-center mb-2">
            AETHERIS OMEGA CONTROL v6.0
          </h1>
          <div className="text-center text-sm">
            SOC PRIVACY | AI CONTROL | TACTICAL INTERFACE 2026
          </div>
          <div className="text-center mt-2">
            STATUS: <span className={`font-bold ${systemStatus === 'ACTIVE' ? 'text-green-400' : 'text-yellow-400'}`}>
              {systemStatus}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Left Panel - GCP + Tactical */}
          <div className="space-y-4">
            {/* GCP Config */}
            <div className="border border-green-400 p-4">
              <h2 className="text-xl mb-3 border-b border-green-400 pb-2">GCP CONFIGURATION</h2>
              <div className="text-sm space-y-1">
                <div>Project ID: {gcpConfig.projectId}</div>
                <div>Region: {gcpConfig.region}</div>
                <div className="truncate">SA: {gcpConfig.serviceAccount}</div>
              </div>
            </div>

            {/* Tactical Code */}
            <div className="border border-green-400 p-4">
              <h2 className="text-xl mb-3 border-b border-green-400 pb-2">TACTICAL CODE LOOKUP</h2>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={tacticalCode}
                  onChange={(e) => setTacticalCode(e.target.value.toUpperCase())}
                  placeholder="ENTER CODE"
                  className="flex-1 bg-black border border-green-400 px-2 py-1 text-green-400"
                />
                <button
                  onClick={() => validateTacticalCode(tacticalCode)}
                  className="bg-green-400 text-black px-4 py-1 hover:bg-green-300"
                >
                  EXECUTE
                </button>
              </div>
              <div className="mt-3 text-xs">
                <div>Available Codes: OMEGA-01, ALPHA-07, DELTA-12</div>
              </div>
            </div>

            {/* Flight Parameters */}
            <div className="border border-green-400 p-4">
              <h2 className="text-xl mb-3 border-b border-green-400 pb-2">FLIGHT PARAMETERS</h2>
              <div className="space-y-3">
                <div>
                  <label>Altitude: {flightParams.altitude} ft</label>
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    value={flightParams.altitude}
                    onChange={(e) => updateAltitude(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div>Velocity: {flightParams.velocity} knots</div>
                <div>Heading: {flightParams.heading}°</div>
                <div>
                  Tactical Mode: <span className={flightParams.tacticalMode ? 'text-red-500' : 'text-green-400'}>
                    {flightParams.tacticalMode ? 'ACTIVE' : 'STANDBY'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - System Logs */}
          <div className="border border-green-400 p-4">
            <h2 className="text-xl mb-3 border-b border-green-400 pb-2">SYSTEM LOG</h2>
            <div className="bg-black p-2 h-96 overflow-y-auto text-xs space-y-1">
              {logs.map((log, i) => (
                <div key={i} className="break-words">{log}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-4 text-xs text-gray-600">
          AETHERIS OMEGA SOC AI CONTROL SYSTEM - CLASSIFIED LEVEL 5
        </div>
      </div>
    </div>
  );
}
