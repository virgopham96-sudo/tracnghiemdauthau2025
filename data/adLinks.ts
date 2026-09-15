export const adLinks: string[] = [
    'https://s.shopee.vn/6VIeZ9Vn1n',
    'https://s.shopee.vn/2VmZHaVqUC',
    'https://s.shopee.vn/1gDSI9xCOB',
    'https://s.shopee.vn/4fr3rkEgYc',
    'https://s.shopee.vn/7AYOqQU1n0',
    'https://s.shopee.vn/20qIgzGjW6',
];

export const openRandomAdLink = (): void => {
    try {
        if (!adLinks || adLinks.length === 0) return;
        const randomIndex = Math.floor(Math.random() * adLinks.length);
        const targetUrl = adLinks[randomIndex];
        if (targetUrl) {
            const newWindow = window.open(targetUrl, '_blank', 'noopener,noreferrer');
            // Fallback nếu trình duyệt chặn window.open trực tiếp
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
        console.error('Không thể mở liên kết quảng cáo:', error);
    }
};
