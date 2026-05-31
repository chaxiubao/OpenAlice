# OpenAlice — Chaxiubao Fork

> Automated overnight paper trading agent built on [OpenAlice](https://github.com/TraderAlice/OpenAlice), powered by NVIDIA NIM.

## What's Different

| Feature | Upstream OpenAlice | This Fork |
|---|---|---|
| LLM Provider | Claude, OpenAI, Gemini, DeepSeek | + **NVIDIA NIM** (first-class) |
| Trading Focus | General-purpose agent | **Multi-sector overnight trading** |
| Risk Management | Basic | **ATR stops, trailing tiers, drawdown guard** |
| Memory | Session-based | **Layered (L0-L3)** — regime → sectors → tickers → patterns |
| Schedule | Manual | **Overnight cron** (HK timezone, US market hours) |
| Stock Universe | User-defined | **5 curated sectors** (~100 tickers) |

## Hard-Won Trading Rules

These rules come from 94 live paper trades over 8 days:

1. **Early entries at low prices → home runs** (AMD +347%, TSLA +317%)
2. **Trailing stops on winners is the killer feature**
3. **Never re-enter a stopped-out ticker for 5 days**
4. **Never buy stocks up >8% intraday** (you're chasing the top)
5. **Max 6 positions, max 2 per sector**
6. **Concentrated momentum holding beats over-diversification** (84% of $10,809 profit from 4 positions)
7. **Give the LLM memory of last 5 trades to prevent duplicates**

## Architecture

```
┌─────────────────────────────────────────────┐
│           OpenAlice Framework                │
│  (Agent SDK, Tools, Memory, Scheduler)       │
├─────────────────────────────────────────────┤
│         Chaxiubao Trading Layer              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │ NVIDIA   │ │ Sector   │ │ Risk     │    │
│  │ NIM LLM  │ │ Universe │ │ Engine   │    │
│  └──────────┘ └──────────┘ └──────────┘    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │ Overnight│ │ Layered  │ │ Telegram │    │
│  │ Scheduler│ │ Memory   │ │ Reports  │    │
│  └──────────┘ └──────────┘ └──────────┘    │
├─────────────────────────────────────────────┤
│              IBKR Integration                │
│  (Paper Trading → Live Trading)              │
└─────────────────────────────────────────────┘
```

## Quick Start

```bash
# Clone
git clone https://github.com/chaxiubao/OpenAlice.git
cd OpenAlice

# Install
pnpm install

# Configure NVIDIA NIM
export NVIDIA_API_KEY=your-key-here

# Start
pnpm dev
```

## Goal

**$1M profit in 2026.** North star documented. Strategy and milestones tracked.

---

*Forked from [TraderAlice/OpenAlice](https://github.com/TraderAlice/OpenAlice) — 4.4k stars, battle-tested agent framework.*
