/**
 * Chaxiubao Trading Configuration
 * 
 * Hard-won rules from 94 trades over 8 days of live paper trading.
 * Built on top of OpenAlice with NVIDIA NIM as the primary LLM provider.
 * 
 * Philosophy: Concentrated momentum holding beats over-diversification.
 * 84% of $10,809 profit came from just 4 concentrated positions.
 */

// ==================== Sector Universe ====================

export const SECTOR_UNIVERSE = {
  aiSemiconductors: [
    'NVDA', 'AMD', 'AVGO', 'MRVL', 'QCOM', 'MU', 'ARM', 'TSM', 'ASML', 'KLAC',
    'LRCX', 'AMAT', 'ON', 'MPWR', 'SMCI', 'MCHP', 'TXN', 'ADI',
  ],
  evBattery: [
    'TSLA', 'RIVN', 'LCID', 'NIO', 'XPEVG', 'CHPT', 'BLNK', 'QS', 'LAZR',
    'LIDR', 'FCEL', 'PLUG', 'CHPT', 'QS', 'RIVN',
  ],
  rareEarthUranium: [
    'CCJ', 'LEU', 'URA', 'DNN', 'EU', 'URG', 'FCUUF', 'NXE', 'LTBR',
    'MP', 'ARARE', 'NOVT', 'LTHM', 'ALB', 'SQM',
  ],
  spaceTech: [
    'RKLB', 'ASTR', 'MNTS', 'RDW', 'ASTS', 'BKSY', 'SPIR', 'SATL',
    'VORB', 'ASTR', 'IONQ', 'QUBT', 'RGTI',
  ],
  aiCrossover: [
    'PLTR', 'SNOW', 'CRWD', 'NET', 'DDOG', 'MDB', 'AI', 'PATH', 'SMAR',
    'U', 'AI', 'BBAI', 'SOUN', 'UPST', 'AFRM',
  ],
} as const

// ==================== Risk Parameters ====================

export const RISK_PARAMS = {
  /** Maximum concurrent positions */
  maxPositions: 6,
  /** Maximum positions per sector */
  maxPerSector: 2,
  /** Base position size as % of portfolio (before signal multiplier) */
  basePositionPct: 5,
  /** Signal type multipliers for position sizing */
  signalMultipliers: {
    momentum: 1.0,
    whale: 1.2,
    squeeze: 1.5,
    breakout: 1.3,
    mean_reversion: 0.8,
  },
  /** ATR-based stop loss configuration */
  atrStopLoss: {
    lookbackDays: 14,
    multiplier: 2.0,
  },
  /** Trailing stop tiers — activate at profit thresholds */
  trailingStops: [
    { profitPct: 15, trailPct: 5 },
    { profitPct: 30, trailPct: 8 },
    { profitPct: 50, trailPct: 12 },
  ],
  /** Partial sell targets */
  profitActivation: [
    { profitPct: 15, sellPct: 25 },
    { profitPct: 30, sellPct: 25 },
    { profitPct: 50, sellPct: 25 },
  ],
  /** Weekly drawdown guard — cut position sizes if portfolio drops */
  weeklyDrawdownGuard: {
    thresholdPct: 3,
    sizeMultiplier: 0.5, // cut to 50% size
  },
} as const

// ==================== Hard-Won Trading Rules ====================

export const TRADING_RULES = [
  {
    id: 'early-entry',
    rule: 'Enter positions at low prices early — this creates home runs',
    evidence: 'AMD +347%, TSLA +317% from early entries',
    priority: 'critical',
  },
  {
    id: 'trailing-stops',
    rule: 'Always use trailing stops on winners — this is the #1 profit protector',
    evidence: 'Multi-tier trailing stops preserved 84% of profits',
    priority: 'critical',
  },
  {
    id: 'no-reentry-after-stop',
    rule: 'Never re-enter a stopped-out ticker for 5 days minimum',
    evidence: 'LLM behavior analysis showed re-entries at tops',
    priority: 'high',
  },
  {
    id: 'no-chasing',
    rule: 'Never buy stocks up >8% intraday — you are chasing momentum at tops',
    evidence: 'LLM consistently bought at momentum peaks',
    priority: 'high',
  },
  {
    id: 'concentration-wins',
    rule: 'Concentrated momentum holding beats over-diversification',
    evidence: '84% of $10,809 profit came from 4 positions',
    priority: 'high',
  },
  {
    id: 'max-positions',
    rule: 'Keep max 6 positions — quality over quantity',
    evidence: 'Portfolio autopsy showed dilution kills returns',
    priority: 'medium',
  },
  {
    id: 'memory-prevents-duplicates',
    rule: 'Give the LLM memory of last 5 trades to prevent duplicate entries',
    evidence: 'LLM re-entered stopped positions without memory',
    priority: 'high',
  },
  {
    id: 'sector-diversification',
    rule: 'Max 2 positions per sector — avoid correlated drawdowns',
    evidence: 'Semiconductor correlation caused cascading stops',
    priority: 'medium',
  },
  {
    id: 'weekly-drawdown-guard',
    rule: 'If portfolio drops >3% in a week, cut all new position sizes by 50%',
    evidence: 'Protects against regime changes',
    priority: 'medium',
  },
  {
    id: 'profit-activation',
    rule: 'Take partial profits at +15%, +30%, +50% — let the rest ride with trailing stops',
    evidence: 'Secures gains while maintaining upside',
    priority: 'medium',
  },
] as const

// ==================== Overnight Schedule (HK timezone) ====================

export const OVERNIGHT_SCHEDULE = {
  /** Pre-market analysis — 1 hour before US market open */
  preMarketAnalysis: '0 20 * * 1-5', // 8 PM HKT = 8 AM ET (summer) / 9 AM ET (winter)
  /** Market open check — US market opens */
  marketOpenCheck: '0 2130 * * 1-5', // 9:30 PM HKT
  /** Mid-session scan — check positions mid-day */
  midSessionScan: '0 0 * * 2-6', // Midnight HKT = 12 PM ET
  /** Market close analysis — after US market closes */
  marketCloseAnalysis: '0 5 * * 2-6', // 5 AM HKT = 5 PM ET (summer)
  /** Weekend review */
  weekendReview: '0 10 * * 6', // Saturday 10 AM HKT
  timezone: 'Asia/Hong_Kong',
  marketTimezone: 'America/New_York',
} as const

// ==================== LLM Configuration ====================

export const LLM_CONFIG = {
  /** Primary model for trading decisions */
  primaryModel: 'meta/llama-3.3-70b-instruct',
  /** Fast model for quick checks */
  fastModel: 'meta/llama-3.1-8b-instruct',
  /** Provider: NVIDIA NIM */
  provider: 'nvidia',
  /** Temperature for trading decisions (low = more consistent) */
  temperature: 0.3,
  /** Max tokens for analysis */
  maxTokens: 2048,
  /** Layered memory configuration */
  memory: {
    /** L0: Market regime (updated daily) */
    L0_regime: 'Bull/Bear/Sideways with confidence score',
    /** L1: Sector rotation (updated every 4 hours) */
    L1_sectors: 'Which sectors are leading/lagging',
    /** L2: Individual ticker state (updated per trade) */
    L2_tickers: 'Entry price, stop level, target, ATR, last 5 trades',
    /** L3: Pattern memory (accumulated) */
    L3_patterns: 'What worked, what failed, behavioral corrections',
  },
} as const

export default {
  SECTOR_UNIVERSE,
  RISK_PARAMS,
  TRADING_RULES,
  OVERNIGHT_SCHEDULE,
  LLM_CONFIG,
}
