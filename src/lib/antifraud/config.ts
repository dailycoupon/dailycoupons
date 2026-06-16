/**
 * Server-only module: reads and validates anti-fraud env config at startup.
 * Parsed once and cached for the lifetime of the Node.js process.
 * Do NOT import this in any client component or client-side module.
 */

export interface AntifraudConfig {
  /** 32-byte AES-256 key decoded from ANTIFRAUD_SECRET_KEY */
  keyBytes: Buffer;
  /** Base URL of the SWARM auth service, no trailing slash */
  iframeBaseUrl: string;
  /** Parsed CIDR subnets; empty array means "allow all" */
  subnets: string[];
  /** Query param name for impid (default: "impid") */
  queryParam: string;
  /** Global on/off switch */
  enabled: boolean;
}

function parseConfig(): AntifraudConfig {
  const enabled = process.env.ANTIFRAUD_ENABLED !== 'false';
  const queryParam = process.env.ANTIFRAUD_QUERY_PARAM || 'impid';

  // When disabled, return early without requiring the key or base URL so that
  // ANTIFRAUD_ENABLED=false acts as a clean kill switch in any environment.
  if (!enabled) {
    return {
      keyBytes: Buffer.alloc(32),
      iframeBaseUrl: '',
      subnets: [],
      queryParam,
      enabled: false,
    };
  }

  const secretKeyB64 = process.env.ANTIFRAUD_SECRET_KEY ?? '';
  const iframeBaseUrl = (process.env.ANTIFRAUD_IFRAME_BASE_URL ?? '').replace(/\/$/, '');
  const ipSubnetsRaw = process.env.ANTIFRAUD_IP_SUBNETS ?? '';

  if (!secretKeyB64) {
    throw new Error('[antifraud] ANTIFRAUD_SECRET_KEY is required');
  }
  if (!iframeBaseUrl) {
    throw new Error('[antifraud] ANTIFRAUD_IFRAME_BASE_URL is required');
  }

  const keyBytes = Buffer.from(secretKeyB64, 'base64');
  if (keyBytes.length !== 32) {
    throw new Error(
      `[antifraud] ANTIFRAUD_SECRET_KEY must decode to exactly 32 bytes (got ${keyBytes.length})`
    );
  }

  const subnets = ipSubnetsRaw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  return { keyBytes, iframeBaseUrl, subnets, queryParam, enabled };
}

let _config: AntifraudConfig | null = null;

/** Returns the parsed config, throwing if any required env var is missing/invalid. */
export function getConfig(): AntifraudConfig {
  if (!_config) _config = parseConfig();
  return _config;
}
