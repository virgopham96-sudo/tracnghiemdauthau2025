// Service for tracking and fetching website visitor counts across sessions

const COUNTER_URL = 'https://hitscounter.dev/api/hit?url=https://on-thi-chung-chi-dau-thau.phambinh.vn';
const STORAGE_KEY = 'dauthau_visitor_stats';
const SESSION_KEY = 'dauthau_visited_session';

export interface VisitorStats {
    total: number;
    today: number;
    loading: boolean;
}

const DEFAULT_STATS: VisitorStats = {
    total: 108, // Baseline count from publish date
    today: 12,
    loading: true,
};

// Retrieve cached stats from localStorage if available
export const getCachedVisitorStats = (): VisitorStats => {
    try {
        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
            const parsed = JSON.parse(cached);
            if (typeof parsed.total === 'number' && parsed.total > 0) {
                return {
                    total: parsed.total,
                    today: typeof parsed.today === 'number' ? parsed.today : 1,
                    loading: false,
                };
            }
        }
    } catch {
        // Ignore localStorage error
    }
    return DEFAULT_STATS;
};

// Fetch latest visitor count and increment on new session
export const recordAndFetchVisitorCount = async (): Promise<VisitorStats> => {
    const cached = getCachedVisitorStats();
    const hasVisitedThisSession = sessionStorage.getItem(SESSION_KEY) === 'true';

    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 6000);

        const response = await fetch(COUNTER_URL, {
            signal: controller.signal,
            cache: 'no-cache',
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const svgText = await response.text();
        
        // hitscounter.dev outputs: aria-label="today / total" or <title>today / total</title>
        const match = svgText.match(/aria-label="([^"]+)"/) || svgText.match(/<title>([^<]+)<\/title>/);
        if (match && match[1]) {
            const rawLabel = match[1].replace(/.*:\s*/, '').trim();
            const parts = rawLabel.split('/').map((s) => s.trim().replace(/,/g, ''));
            
            let today = cached.today;
            let total = cached.total;

            if (parts.length === 2) {
                const parsedToday = parseInt(parts[0], 10);
                const parsedTotal = parseInt(parts[1], 10);
                if (!isNaN(parsedToday)) today = parsedToday;
                if (!isNaN(parsedTotal)) total = parsedTotal;
            } else if (parts.length === 1) {
                const parsed = parseInt(parts[0], 10);
                if (!isNaN(parsed)) total = parsed;
            }

            // Ensure baseline count is respected
            if (total < DEFAULT_STATS.total) {
                total = DEFAULT_STATS.total + total;
                today = Math.max(today, DEFAULT_STATS.today);
            }

            sessionStorage.setItem(SESSION_KEY, 'true');
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ total, today }));

            return { total, today, loading: false };
        }
    } catch (error) {
        console.warn('Lỗi kết nối bộ đếm lượt truy cập:', error);
    }

    // Fallback: if first visit in this session and network failed, simulate local increment
    let total = cached.total;
    let today = cached.today;
    if (!hasVisitedThisSession) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        total += 1;
        today += 1;
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ total, today }));
    }

    return { total, today, loading: false };
};
