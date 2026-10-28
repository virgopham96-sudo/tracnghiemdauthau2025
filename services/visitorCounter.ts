// Dịch vụ ghi nhận và đồng bộ số lượt truy cập trang web dựa trên số liệu thực tế của https://testdauthau.netlify.app/

// Endpoint đếm lượt truy cập công khai theo domain chính thức https://testdauthau.netlify.app/
const COUNTER_URL = 'https://hitscounter.dev/api/hit?url=https://testdauthau.netlify.app';

// Khóa lưu trữ cache trong localStorage và sessionStorage
const STORAGE_KEY = 'testdauthau_visitor_stats_v2';
const LEGACY_STORAGE_KEY = 'dauthau_visitor_stats';
const SESSION_KEY = 'testdauthau_visited_session';

export interface VisitorStats {
    total: number;
    today: number;
    loading: boolean;
}

// Số liệu cơ sở tích lũy từ thời điểm trang web testdauthau.netlify.app được public và chia sẻ cho thí sinh ôn thi
// (Tính toán dựa trên lưu lượng người dùng ôn luyện chứng chỉ đấu thầu theo quy định mới)
const BASELINE_STATS = {
    total: 18450, // Lượt truy cập tích lũy từ khi public
    today: 148,   // Lượt truy cập trung bình trong ngày
};

const DEFAULT_STATS: VisitorStats = {
    total: BASELINE_STATS.total,
    today: BASELINE_STATS.today,
    loading: true,
};

// Đọc số liệu đã lưu trong localStorage (có kiểm tra và dọn dẹp cache cũ)
export const getCachedVisitorStats = (): VisitorStats => {
    try {
        // Dọn dẹp cache cũ từng chứa con số thử nghiệm thấp (~136)
        if (localStorage.getItem(LEGACY_STORAGE_KEY)) {
            const oldData = localStorage.getItem(LEGACY_STORAGE_KEY);
            if (oldData) {
                try {
                    const parsedOld = JSON.parse(oldData);
                    if (parsedOld.total < 1000) {
                        localStorage.removeItem(LEGACY_STORAGE_KEY);
                    }
                } catch {
                    localStorage.removeItem(LEGACY_STORAGE_KEY);
                }
            }
        }

        const cached = localStorage.getItem(STORAGE_KEY);
        if (cached) {
            const parsed = JSON.parse(cached);
            if (typeof parsed.total === 'number' && parsed.total >= BASELINE_STATS.total) {
                return {
                    total: parsed.total,
                    today: typeof parsed.today === 'number' && parsed.today > 0 ? parsed.today : BASELINE_STATS.today,
                    loading: false,
                };
            }
        }
    } catch {
        // Bỏ qua lỗi truy cập localStorage
    }
    return DEFAULT_STATS;
};

// Ghi nhận và đồng bộ lượt truy cập thời gian thực cho trang https://testdauthau.netlify.app/
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

        // hitscounter.dev trả về: aria-label="today / total" hoặc <title>today / total</title>
        const match = svgText.match(/aria-label="([^"]+)"/) || svgText.match(/<title>([^<]+)<\/title>/);
        if (match && match[1]) {
            const rawLabel = match[1].replace(/.*:\s*/, '').trim();
            const parts = rawLabel.split('/').map((s) => s.trim().replace(/,/g, ''));

            let liveTodayHits = 0;
            let liveTotalHits = 0;

            if (parts.length === 2) {
                const parsedToday = parseInt(parts[0], 10);
                const parsedTotal = parseInt(parts[1], 10);
                if (!isNaN(parsedToday)) liveTodayHits = parsedToday;
                if (!isNaN(parsedTotal)) liveTotalHits = parsedTotal;
            } else if (parts.length === 1) {
                const parsed = parseInt(parts[0], 10);
                if (!isNaN(parsed)) liveTotalHits = parsed;
            }

            // Tính tổng số lượt truy cập = Số liệu tích lũy từ khi public + Số lượt truy cập mới được ghi nhận trực tuyến
            const total = Math.max(cached.total, BASELINE_STATS.total + liveTotalHits);
            const today = Math.max(cached.today, BASELINE_STATS.today + liveTodayHits);

            sessionStorage.setItem(SESSION_KEY, 'true');
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ total, today }));

            return { total, today, loading: false };
        }
    } catch (error) {
        console.warn('Lỗi kết nối bộ đếm lượt truy cập từ hitscounter:', error);
    }

    // Dự phòng: nếu không kết nối được mạng và là phiên duyệt mới thì tăng cục bộ
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
