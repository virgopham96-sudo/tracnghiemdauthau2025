import { Question } from '../types';

export const NEW_QUESTIONS_IDS = Array.from({ length: 50 }, (_, i) => 341 + i); // 341 to 390

export const BASE_CATEGORY_MAPPING: Record<string, number[]> = {
    "17. 50 Câu hỏi mới bổ sung (2025)": NEW_QUESTIONS_IDS,
    "1. Phạm vi, Đối tượng áp dụng & Khái niệm cơ bản": [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 337],
    "2. Hình thức lựa chọn nhà thầu": [31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 142, 297],
    "3. Kế hoạch lựa chọn nhà thầu (KHLCNT)": [41, 42, 43, 45, 46, 151, 154],
    "4. Bảo đảm cạnh tranh trong đấu thầu": [28, 47, 48, 49, 50, 81, 102],
    "5. Lập & Đánh giá hồ sơ mời thầu": [23, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 69, 74, 75, 76, 77, 78, 83, 84, 85, 86, 91, 92, 93, 94, 95, 112, 114, 117, 118],
    "6. Gói thầu qua mạng (E-bidding)": [64, 65, 66, 68, 72, 98, 99, 100, 213, 214, 215, 216, 217, 218, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239, 240, 257, 258, 262, 263, 265, 267, 269, 272, 273, 274, 275, 298, 299, 301],
    "7. Thương thảo & Trúng thầu": [87, 104, 106, 135, 208, 279, 280, 281, 282, 283],
    "8. Lưu trữ hồ sơ": [16, 17, 18, 19],
    "9. Các loại hợp đồng trong đấu thầu": [119, 286, 290, 292],
    "10. Bảo đảm dự thầu & Thực hiện hợp đồng": [67, 110, 116, 121, 122, 277, 278, 285, 287, 303, 314, 316],
    "11. Quản lý hợp đồng & Thanh toán": [120, 125, 126, 196, 197, 211, 284, 288, 289, 291, 293, 302],
    "12. Hủy thầu, Hủy kết quả & Xử lý vi phạm": [153, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 201, 202, 205, 219, 245],
    "13. Xử lý tình huống trong đấu thầu": [24, 25, 26, 27, 70, 88, 90, 96, 97, 105, 111, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 198, 199, 200, 203, 204, 206, 207, 209, 210, 212, 241, 242, 244, 246, 247, 248, 249, 250, 261, 266, 268, 308, 309, 310, 311, 312, 313, 315, 317],
    "14. Mua sắm tập trung": [136, 137, 138, 139, 140, 141, 143, 144, 145, 146, 147, 148, 149, 150, 251, 252, 253, 306, 307],
    "15. Đấu thầu theo quy chuẩn quốc tế & ODA": [319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 338, 339, 340]
};

export const getFullCategoryMapping = (questions: Question[]): Record<string, number[]> => {
    const assignedIds = new Set<number>();
    Object.values(BASE_CATEGORY_MAPPING).forEach((ids) => {
        ids.forEach(id => assignedIds.add(id));
    });
    
    const unassignedIds = questions
        .map(q => q.id)
        .filter(id => !assignedIds.has(id))
        .sort((a, b) => a - b);

    return {
        ...BASE_CATEGORY_MAPPING,
        "16. Chủ đề tổng hợp": unassignedIds
    };
};

export const getOrderedCategories = (mapping: Record<string, number[]>): string[] => {
    const cats = Object.keys(mapping);
    return cats.sort((a, b) => {
        const numA = parseInt(a.split('.')[0]);
        const numB = parseInt(b.split('.')[0]);
        return numA - numB;
    });
};
