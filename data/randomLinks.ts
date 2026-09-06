// Danh sách các đường link Shopee được mở ngẫu nhiên sang tab mới khi người dùng bấm vào các mục:
// 1. Chế độ luyện tập
// 2. Thi theo bộ đề
// 3. Thi ngẫu nhiên

export const defaultRandomLinks: string[] = [
    'https://s.shopee.vn/6VIeZ9Vn1n',
    'https://s.shopee.vn/2VmZHaVqUC',
    'https://s.shopee.vn/1gDSI9xCOB',
    'https://s.shopee.vn/4fr3rkEgYc',
    'https://s.shopee.vn/7AYOqQU1n0',
    'https://s.shopee.vn/20qIgzGjW6',
];

export const getRandomLinks = (): string[] => {
    try {
        const saved = localStorage.getItem('user_random_links');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch {
        // Fallback nếu có lỗi đọc localStorage
    }
    return defaultRandomLinks;
};

export const openRandomLink = (): void => {
    try {
        const links = getRandomLinks();
        if (!links || links.length === 0) return;

        const randomIndex = Math.floor(Math.random() * links.length);
        const targetUrl = links[randomIndex];
        if (targetUrl) {
            // Mở tab mới với window.open
            const newWindow = window.open(targetUrl, '_blank', 'noopener,noreferrer');
            
            // Fallback an toàn cho một số trình duyệt chặn popup trực tiếp
            if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
                const a = document.createElement('a');
                a.href = targetUrl;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        }
    } catch (error) {
        console.error('Không thể mở liên kết ngẫu nhiên:', error);
    }
};
