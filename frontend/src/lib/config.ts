/**
 * Runtime configuration for the frontend.
 * This allows the same Docker image to work in different environments.
 */

import { AppConfig, BackendConfigResponse } from '@/lib/types/config'

// Build timestamp for debugging - set at build time
const BUILD_TIME = new Date().toISOString()

let config: AppConfig | null = null
let configPromise: Promise<AppConfig> | null = null

/**
 * Get the API URL to use for requests.
 *
 * Priority:
 * 1. Runtime config from API server (/api/config endpoint)
 * 2. Environment variable (NEXT_PUBLIC_API_URL)
 * 3. Default fallback (http://localhost:5055)
 */
export async function getApiUrl(): Promise<string> {
  // If we already have config, return it
  if (config) {
    return config.apiUrl
  }

  // If we're already fetching, wait for that
  if (configPromise) {
    const cfg = await configPromise
    return cfg.apiUrl
  }

  // Start fetching config
  configPromise = fetchConfig()
  const cfg = await configPromise
  return cfg.apiUrl
}

/**
 * Get the full configuration.
 */
export async function getConfig(): Promise<AppConfig> {
  if (config) {
    return config
  }

  if (configPromise) {
    return await configPromise
  }

  configPromise = fetchConfig()
  return await configPromise
}

/**
 * Fetch configuration from the API or use defaults.
 */
async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs: number = 8000): Promise<Response> {
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const response = await fetch(url, { ...options, signal: controller.signal })
    return response
  } finally {
    clearTimeout(timeoutId)
  }
}

async function fetchConfig(): Promise<AppConfig> {
  const isDev = process.env.NODE_ENV === 'development'
  const isBrowser = typeof window !== 'undefined'

  if (isDev) {
    console.log('🔧 [Config] Starting configuration detection...')
    console.log('🔧 [Config] Build time:', BUILD_TIME)
  }

  // STEP 1: Try to get runtime config from Next.js server-side endpoint
  // This allows API_URL to be set at runtime (not baked into build)
  // Note: Endpoint is at /config (not /api/config) to avoid reverse proxy conflicts
  let runtimeApiUrl: string | null = null
  try {
    if (isDev) console.log('🔧 [Config] Attempting to fetch runtime config from /config endpoint...')
    const runtimeResponse = await fetchWithTimeout('/config', {
      cache: 'no-store',
    })
    if (runtimeResponse.ok) {
      const runtimeData = await runtimeResponse.json()
      runtimeApiUrl = runtimeData.apiUrl
      // Treat empty string as "not set" to allow fallback to env var or default
      if (runtimeApiUrl === '') {
        runtimeApiUrl = null
      }
      if (isDev) console.log('✅ [Config] Runtime API URL from server:', runtimeApiUrl)
    } else {
      if (isDev) console.log('⚠️ [Config] Runtime config endpoint returned status:', runtimeResponse.status)
    }
  } catch (error) {
    if (isDev) console.log('⚠️ [Config] Could not fetch runtime config:', error)
  }

  // STEP 2: Fallback to build-time environment variable
  const envApiUrl = process.env.NEXT_PUBLIC_API_URL
  if (isDev) console.log('🔧 [Config] NEXT_PUBLIC_API_URL from build:', envApiUrl || '(not set)')

  // STEP 3: Smart default - prefer relative path to use Next.js Rewrites
  // This avoids CORS issues and port mapping complexities by proxying through Next.js
  const defaultApiUrl = ''

  if (isBrowser && isDev) {
    console.log('🔧 [Config] Using relative path (rewrites) as default')
  }

  // Priority: Runtime config > Build-time env var > Smart default
  // IMPORTANT: In browser context, if runtimeApiUrl is a cross-origin URL (like http://localhost:5055),
  // prefer using empty string (relative path) to go through Next.js proxy and avoid CORS issues.
  let baseUrl: string
  if (isBrowser && runtimeApiUrl && runtimeApiUrl.includes(':5055')) {
    // In browser: use relative path to proxy through Next.js, avoiding CORS
    baseUrl = ''
    if (isDev) console.log('🔧 [Config] Browser detected cross-origin API URL, using relative path (proxy) instead')
  } else {
    baseUrl = runtimeApiUrl !== null && runtimeApiUrl !== undefined ? runtimeApiUrl : (envApiUrl || defaultApiUrl)
  }

  if (isDev) {
    console.log('🔧 [Config] Final base URL to try:', baseUrl || '(relative)')
  }

  try {
    if (isDev) console.log('🔧 [Config] Fetching backend config from:', `${baseUrl}/api/config`)
    // Try to fetch runtime config from backend API (with timeout to prevent hanging)
    const response = await fetchWithTimeout(`${baseUrl}/api/config`, {
      cache: 'no-store',
    })

    if (response.ok) {
      const data: BackendConfigResponse = await response.json()
      config = {
        apiUrl: baseUrl, // Use baseUrl (may be empty for proxy mode)
        version: data.version || 'unknown',
        buildTime: BUILD_TIME,
        latestVersion: data.latestVersion || null,
        hasUpdate: data.hasUpdate || false,
        dbStatus: data.dbStatus, // Can be undefined for old backends
      }
      if (isDev) console.log('✅ [Config] Successfully loaded API config:', config)
      return config
    } else {
      throw new Error(`API config endpoint returned status ${response.status}`)
    }
  } catch (error) {
    if (isDev) console.error('❌ [Config] Failed to fetch backend config:', error)
    throw error
  }
}

/**
 * Reset the configuration cache (useful for testing).
 */
export function resetConfig(): void {
  config = null
  configPromise = null
}
