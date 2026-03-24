# 🛡️ BaseGuard - Protect Your Base Trades

Web application to analyze token security on Base blockchain.

## 🚀 Quick Start

### 1. Start Development Server

```bash
cd ~/Desktop/baseguard
npm run dev
```

### 2. Open in Browser

```
http://localhost:3000
```

## ✨ Features (MVP)

- ✅ Clean, professional UI (Base blue theme)
- ✅ Token address input
- ✅ 6-category risk analysis (mock)
- ✅ Risk score and detailed report
- ✅ Responsive design (mobile-first)

## 📋 Current Status

**Frontend ready** - UI is fully functional. Currently uses **mock data** (simulated scan results).

## 🔜 Next Steps (Real Blockchain Integration)

### 1. Token Contract Reading
```typescript
// Create src/lib/tokenScanner.ts
- Call ERC20 functions
- Read owner, totalSupply, decimals
```

### 2. Honeypot Detection
```typescript
- Download contract source code (Basescan API)
- Parse with @solidity-parser/parser
- Check sell function, modifiers, tax
```

### 3. Liquidity Analysis
```typescript
- Find Uniswap/Aerodrome pool
- Check LP tokens
- Verify lock status (Team.Finance, Unicrypt API)
```

### 4. Holder Distribution
```typescript
- Get holder list from Basescan API
- Calculate top 10 percentage
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Blockchain**: wagmi, viem (ready to integrate)
- **Wallet**: Injected (MetaMask, Coinbase Wallet, etc.)

## 💰 Cost

- **Hosting**: $0 (Vercel Hobby)
- **Domain**: ~$15/year (optional)
- **RPC**: $0 (Base public endpoints)
- **APIs**: $0 (Basescan, DexScreener free tiers)

**Total**: Only domain cost!

## 📂 Project Structure

```
baseguard/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout + providers
│   │   ├── page.tsx        # Main page (UI)
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   └── WagmiProvider.tsx  # Blockchain providers
│   ├── lib/
│   │   └── tokenScanner.ts  # (TODO: Real scanning logic)
│   └── types/
│       └── index.ts        # (TODO: TypeScript types)
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🎨 UI Preview

**Home Page**:
- Hero section + search box
- Wallet connect indicator
- "How It Works" section

**Scan Results**:
- Risk score (0-100)
- Traffic light system (🟢🟡🔴)
- 4 categories: Honeypot, Liquidity, Ownership, Holders
- Accordion details

## 🤝 Contributing

1. Fork
2. Create feature branch
3. Commit changes
4. Push
5. Open Pull Request

## 📄 License

MIT

---

**Built with ❤️ on Base**
