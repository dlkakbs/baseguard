'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Search, AlertTriangle, CheckCircle, Lock, Users, TrendingUp } from 'lucide-react';
import { scanToken } from '@/lib/tokenScanner';
import { isAddress } from 'viem';

export default function Home() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Mock connection status
  const isConnected = false;

  const handleScan = async () => {
    if (!tokenAddress) return;
    
    // Validate address
    if (!isAddress(tokenAddress)) {
      setError('Invalid token address. Must be a valid Ethereum address (0x...)');
      return;
    }

    setError(null);
    setIsScanning(true);
    setScanResult(null);

    try {
      // Real blockchain scan
      const result = await scanToken(tokenAddress as `0x${string}`);
      setScanResult(result);
    } catch (err: any) {
      console.error('Scan error:', err);
      setError(err.message || 'Failed to scan token. Make sure it\'s a valid ERC20 token on Base.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-base-light via-white to-base-light">
      {/* Header */}
      <header className="glass sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-8 h-8 text-base-blue" />
            <h1 className="text-2xl font-bold text-base-blue">BaseGuard</h1>
          </div>
          <div className="text-sm text-gray-600">
            {isConnected ? (
              <span className="text-green-600">● Connected</span>
            ) : (
              <span>Connect wallet to scan</span>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold mb-4"
        >
          Protect Your <span className="text-base-blue">Base Trades</span>
        </motion.h2>
        <p className="text-xl text-gray-600 mb-8">
          Detect honeypots, rug pulls, and scams before you invest
        </p>

        {/* Search Box */}
        <div className="glass p-6 rounded-2xl shadow-lg max-w-2xl mx-auto">
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Paste token address (0x...)"
                value={tokenAddress}
                onChange={(e) => setTokenAddress(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-base-blue focus:border-transparent outline-none"
              />
            <button
              onClick={handleScan}
              disabled={isScanning || !tokenAddress}
              className="px-8 py-3 bg-base-blue text-white rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
            >
              {isScanning ? (
                <>
                  <span className="animate-spin">⚡</span>
                  Scanning...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Scan Token
                </>
              )}
            </button>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                {error}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Scanning Animation */}
      {isScanning && (
        <section className="max-w-4xl mx-auto px-4 py-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass p-8 rounded-2xl text-center"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-4">Analyzing Token...</h3>
            <div className="space-y-2 text-gray-600">
              <motion.p 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Checking contract security...
              </motion.p>
              <motion.p 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                Simulating trades...
              </motion.p>
              <motion.p 
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
              >
                Analyzing holders...
              </motion.p>
            </div>
          </motion.div>
        </section>
      )}

      {/* Results */}
      {scanResult && (
        <section className="max-w-4xl mx-auto px-4 py-8">
          {/* Risk Score Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`glass p-8 rounded-2xl mb-6 ${
              scanResult.riskLevel === 'danger' ? 'border-l-4 border-risk-danger' :
              scanResult.riskLevel === 'warning' ? 'border-l-4 border-risk-warning' :
              'border-l-4 border-risk-safe'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {scanResult.riskLevel === 'danger' ? (
                  <AlertTriangle className="w-12 h-12 text-risk-danger" />
                ) : scanResult.riskLevel === 'warning' ? (
                  <AlertTriangle className="w-12 h-12 text-risk-warning" />
                ) : (
                  <CheckCircle className="w-12 h-12 text-risk-safe" />
                )}
                <div>
                  <h3 className="text-3xl font-bold">
                    {scanResult.riskLevel === 'danger' ? 'EXTREME DANGER' :
                     scanResult.riskLevel === 'warning' ? 'CAUTION' : 'SAFE'}
                  </h3>
                  <p className="text-gray-600">Risk Score: {scanResult.riskScore}/100</p>
                </div>
              </div>
            </div>

            {/* Critical Issues */}
            <div className="space-y-3">
              <h4 className="font-semibold text-lg">⚠️ Critical Issues:</h4>
              {scanResult.issues.map((issue: any, idx: number) => (
                <div key={idx} className="flex items-start gap-2 p-3 bg-white rounded-lg">
                  <span className={
                    issue.severity === 'critical' ? 'text-risk-danger' :
                    issue.severity === 'high' ? 'text-risk-warning' : 'text-blue-500'
                  }>
                    ●
                  </span>
                  <div>
                    <span className="font-semibold">{issue.category}:</span> {issue.message}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Detailed Analysis */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* Honeypot Detection */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="glass p-6 rounded-xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <Lock className="w-6 h-6 text-base-blue" />
                <h4 className="font-bold text-lg">Honeypot Detection</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Sell Tax:</span>
                  <span className={scanResult.honeypot.sellTax > 50 ? 'text-risk-danger font-bold' : 'text-risk-safe'}>
                    {scanResult.honeypot.sellTax}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Blacklist:</span>
                  <span className={scanResult.honeypot.hasBlacklist ? 'text-risk-danger' : 'text-risk-safe'}>
                    {scanResult.honeypot.hasBlacklist ? '⚠️ Yes' : '✅ No'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Liquidity */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="glass p-6 rounded-xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6 text-base-blue" />
                <h4 className="font-bold text-lg">Liquidity Analysis</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Locked:</span>
                  <span className={scanResult.liquidity.isLocked ? 'text-risk-safe' : 'text-risk-danger font-bold'}>
                    {scanResult.liquidity.isLocked ? '✅ Yes' : '❌ No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Lock Duration:</span>
                  <span>{scanResult.liquidity.lockDuration} days</span>
                </div>
              </div>
            </motion.div>

            {/* Ownership */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="glass p-6 rounded-xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-6 h-6 text-base-blue" />
                <h4 className="font-bold text-lg">Contract Security</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Owner Renounced:</span>
                  <span className={scanResult.ownership.isRenounced ? 'text-risk-safe' : 'text-risk-warning'}>
                    {scanResult.ownership.isRenounced ? '✅ Yes' : '⚠️ No'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Can Mint:</span>
                  <span className={scanResult.ownership.canMint ? 'text-risk-danger' : 'text-risk-safe'}>
                    {scanResult.ownership.canMint ? '⚠️ Yes' : '✅ No'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Holders */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="glass p-6 rounded-xl"
            >
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-6 h-6 text-base-blue" />
                <h4 className="font-bold text-lg">Holder Analysis</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Top 10 Holders:</span>
                  <span className={scanResult.holders.top10Percent > 70 ? 'text-risk-warning' : 'text-risk-safe'}>
                    {scanResult.holders.top10Percent}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Dev Wallet:</span>
                  <span className={scanResult.holders.devPercent > 20 ? 'text-risk-warning' : 'text-risk-safe'}>
                    {scanResult.holders.devPercent}%
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-base-blue text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
              🔍
            </div>
            <h4 className="font-bold text-xl mb-2">1. Paste Token Address</h4>
            <p className="text-gray-600">Enter any Base token contract address</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-base-blue text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
              ⚡
            </div>
            <h4 className="font-bold text-xl mb-2">2. AI Analysis</h4>
            <p className="text-gray-600">6-layer security scan in seconds</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-base-blue text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl">
              🛡️
            </div>
            <h4 className="font-bold text-xl mb-2">3. Get Risk Score</h4>
            <p className="text-gray-600">Clear verdict with detailed report</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="glass mt-16 py-8 text-center text-gray-600">
        <p>Built on Base • Stay Safe 🛡️</p>
      </footer>
    </main>
  );
}
