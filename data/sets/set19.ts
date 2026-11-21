import { Question } from "../../types";

export const set19: Question[] = [
  {
    "id": 181,
    "question": "Ông A là người đại diện hợp pháp của nhà thầu B ký đơn kiến nghị về kết quả lựa chọn nhà thầu. Trong trường hợp này, anh C là con đẻ của ông A có được tham gia là thành viên Hội đồng giải quyết kiến nghị hay không?",
    "options": {
      "A": "Không được tham gia",
      "B": "Được tham gia nếu đủ năng lực, kinh nghiệm",
      "C": "Được tham gia khi Chủ tịch Hội đồng giải quyết kiến nghị chấp thuận",
      "D": "Được tham gia khi người có thẩm quyền chấp thuận"
    },
    "correctAnswer": "A",
    "explanation": "Căn cứ pháp lý: Điểm a Khoản 2 Điều 139 Nghị định số 214/2025/NĐ-CP. Thành viên Hội đồng giải quyết kiến nghị không được là người có quan hệ gia đình (con đẻ) với người ký đơn kiến nghị.",
    "category": "Trách nhiệm và Xử lý vi phạm"
  },
  {
    "id": 182,
    "question": "Đơn vị nào có trách nhiệm tiếp nhận và quản lý chi phí do nhà thầu có kiến nghị nộp?",
    "options": {
      "A": "Người có thẩm quyền",
      "B": "Chủ đầu tư",
      "C": "Bộ phận thường trực giúp việc cho Chủ tịch Hội đồng giải quyết kiến nghị",
      "D": "Tổ chuyên gia"
    },
    "correctAnswer": "C",
    "explanation": "Căn cứ pháp lý: Điểm c Khoản 2 Điều 139 Nghị định số 214/2025/NĐ-CP. Bộ phận thường trực giúp việc cho Chủ tịch Hội đồng giải quyết kiến nghị có nhiệm vụ tiếp nhận và quản lý chi phí do nhà thầu có kiến nghị nộp.",
    "category": "Trách nhiệm và Xử lý vi phạm"
  },
  {
    "id": 183,
    "question": "Gói thầu mua thuốc áp dụng phương thức một giai đoạn hai túi hồ sơ có giá gói thầu 100 tỷ đồng. Trong quá trình tham dự thầu, nhà thầu X không đạt về kỹ thuật có kiến nghị về kết quả lựa chọn nhà thầu của gói thầu gửi Hội đồng giải quyết kiến nghị (trong đơn kiến nghị nhà thầu nêu giá dự thầu của mình là 90 tỷ đồng). Chi phí giải quyết kiến nghị nhà thầu X phải nộp là?",
    "options": {
      "A": "Nhà thầu X phải nộp 25 triệu đồng",
      "B": "Nhà thầu X phải nộp 22,5 triệu đồng",
      "C": "Nhà thầu X phải nộp 20 triệu đồng",
      "D": "Nhà thầu X phải nộp 15 triệu đồng"
    },
    "correctAnswer": "A",
    "explanation": "Căn cứ điểm c, K8, Đ14, NĐ 214/2025/NĐ-CP: Giá dự thầu từ 50.000.000.000 đồng đến dưới 100.000.000.000 đồng, tỷ lệ 0,025% nhưng tối thiểu là 15.000.000 đồng; Theo giá gói thầu, áp dụng gói thầu 1 GĐ, hai túi Hồ sơ. (Do không đạt kỹ thuật nên không mở HSĐXTC → tính theo giá gói thầu 100 tỷ × 0,025% = 25 triệu đồng).",
    "category": "Trách nhiệm và Xử lý vi phạm"
  },
  {
    "id": 184,
    "question": "Trường hợp hồ sơ mời thầu cho phép nhà thầu đề xuất biện pháp thi công khác với biện pháp thi công nêu trong hồ sơ mời thầu thì phần sai khác giữa khối lượng công việc theo biện pháp thi công nêu trong hồ sơ mời thầu và khối lượng công việc theo biện pháp thi công do nhà thầu đề xuất được xem xét thế nào?",
    "options": {
      "A": "Bị hiệu chỉnh sai lệch, phần sai khác được tính là sai lệch thừa",
      "B": "Không bị hiệu chỉnh sai lệch, phần sai khác không được tính là sai lệch thừa",
      "C": "Bị hiệu chỉnh sai lệch, phần sai khác được tính là sai lệch thiếu",
      "D": "Không bị hiệu chỉnh sai lệch, phần sai khác không bị tính là sai lệch thiếu"
    },
    "correctAnswer": "D",
    "explanation": "Căn cứ pháp lý: Khoản 13 Điều 140 Nghị định số 214/2025/NĐ-CP. Khi hồ sơ mời thầu cho phép đề xuất biện pháp thi công khác, phần sai khác về khối lượng do thay đổi biện pháp thi công sẽ không bị hiệu chỉnh sai lệch và không bị tính là sai lệch thiếu.",
    "category": "Hồ sơ mời thầu và Đánh giá HSDT"
  },
  {
    "id": 185,
    "question": "Trường hợp hồ sơ dự thầu có giá dự thầu sau sửa lỗi, hiệu chỉnh sai lệch, trừ đi giá trị giảm giá (nếu có) thấp khác thường thì chủ đầu tư có thể quy định giá trị bảo đảm thực hiện hợp đồng tối đa là bao nhiêu để đề phòng rủi ro?",
    "options": {
      "A": "30% giá hợp đồng",
      "B": "35% giá hợp đồng",
      "C": "40% giá hợp đồng",
      "D": "45% giá hợp đồng"
    },
    "correctAnswer": "A",
    "explanation": "Căn cứ pháp lý: Điểm b Khoản 11 Điều 140 Nghị định số 214/2025/NĐ-CP. Trong trường hợp giá dự thầu thấp khác thường, để đề phòng rủi ro, chủ đầu tư có thể quy định giá trị bảo đảm thực hiện hợp đồng lớn hơn 10% nhưng không quá 30% giá hợp đồng.",
    "category": "Hợp đồng"
  },
  {
    "id": 186,
    "question": "Đối với gói thầu chia phần, chủ đầu tư có thể phê duyệt kết quả lựa chọn nhà thầu cho từng phần hay không?",
    "options": {
      "A": "Không thể",
      "B": "Có thể nhưng phải bảo đảm điều kiện giá đề nghị trúng thầu không vượt giá gói thầu",
      "C": "Có thể nhưng phải bảo đảm tỷ lệ tiết kiệm tối thiểu 5%",
      "D": "Có thể nhưng phải bảo đảm điều kiện giá đề nghị trúng thầu không vượt giá của phần đó trong giá gói thầu"
    },
    "correctAnswer": "D",
    "explanation": "Căn cứ pháp lý: Điểm d Khoản 10 Điều 140 Nghị định số 214/2025/NĐ-CP. Đối với gói thầu chia phần, trong trường hợp cần thiết, chủ đầu tư có thể phê duyệt kết quả cho từng phần với điều kiện giá đề nghị trúng thầu không vượt giá của phần đó trong giá gói thầu.",
    "category": "Kế hoạch và Quy trình LCNT"
  },
  {
    "id": 187,
    "question": "Đối với gói thầu chia phần, trường hợp một phần của gói thầu không có nhà thầu tham dự thầu thì chủ đầu tư xử lý thế nào?",
    "options": {
      "A": "Tách phần đó ra thành gói thầu riêng biệt để tổ chức lựa chọn nhà thầu theo quy định",
      "B": "Hủy thầu",
      "C": "Đàm phán với nhà thầu trúng thầu của phần khác để thực hiện",
      "D": "Phương án B và C đều đúng"
    },
    "correctAnswer": "A",
    "explanation": "Căn cứ pháp lý: Điểm a Khoản 10 Điều 140 Nghị định số 214/2025/NĐ-CP. Trường hợp một phần của gói thầu không có nhà thầu tham dự hoặc không có nhà thầu đáp ứng, chủ đầu tư tách phần đó ra thành gói thầu riêng biệt để tổ chức lựa chọn lại.",
    "category": "Kế hoạch và Quy trình LCNT"
  },
  {
    "id": 188,
    "question": "Thẩm quyền xử lý tình huống phức tạp trong đấu thầu?",
    "options": {
      "A": "Chủ đầu tư quyết định xử lý tình huống sau khi có ý kiến của người có thẩm quyền",
      "B": "Người có thẩm quyền quyết định xử lý tình huống sau khi có ý kiến của Tổ chuyên gia",
      "C": "Người có thẩm quyền quyết định xử lý tình huống sau khi có ý kiến của chủ đầu tư",
      "D": "Người có thẩm quyền quyết định xử lý tình huống sau khi có ý kiến của chủ đầu tư và Tổ chuyên gia"
    },
    "correctAnswer": "A",
    "explanation": "Căn cứ pháp lý: Điểm a Khoản 3 Điều 88 Luật Đấu thầu. Đối với tình huống phức tạp trong lựa chọn nhà thầu, Chủ đầu tư quyết định xử lý tình huống sau khi có ý kiến của Người có thẩm quyền.",
    "category": "Trách nhiệm và Xử lý vi phạm"
  },
  {
    "id": 189,
    "question": "Trường hợp phải chấm dứt hợp đồng với nhà thầu vi phạm hợp đồng để thay thế nhà thầu mới thì phần công việc chưa thực hiện được áp dụng hình thức chỉ định thầu cho nhà thầu khác với giá trị được tính như nào?",
    "options": {
      "A": "Bằng giá trị ghi trong hợp đồng trừ đi giá trị của phần công việc đã thực hiện, được nghiệm thu trước đó",
      "B": "Bằng giá trị ghi trong hợp đồng được cập nhật giá tại thời điểm áp dụng hình thức chỉ định thầu",
      "C": "Bằng giá trị của phần công việc còn lại được cập nhật giá tại thời điểm áp dụng hình thức chỉ định thầu",
      "D": "Bằng giá trị ghi trong hợp đồng trừ đi giá trị của phần công việc đã thực hiện trước đó theo dự toán được duyệt"
    },
    "correctAnswer": "A",
    "explanation": "Căn cứ pháp lý: Khoản 23 Điều 140 Nghị định số 214/2025/NĐ-CP. Khi chỉ định thầu cho nhà thầu khác thay thế nhà thầu vi phạm, giá trị được tính bằng giá trị ghi trong hợp đồng cũ trừ đi giá trị phần công việc đã thực hiện, nghiệm thu trước đó.",
    "category": "Hợp đồng"
  },
  {
    "id": 190,
    "question": "Đối với nhà thầu liên danh, trường hợp trong quá trình thực hiện hợp đồng cần đẩy nhanh tiến độ thực hiện so với hợp đồng đã ký (cần sửa đổi hợp đồng) thì cần thực hiện như thế nào?",
    "options": {
      "A": "Các thành viên liên danh thỏa thuận, điều chỉnh về phạm vi công việc, tiến độ được rút ngắn và không phải thông báo cho chủ đầu tư",
      "B": "Các thành viên liên danh thỏa thuận, điều chỉnh về phạm vi công việc, tiến độ được rút ngắn và thông báo cho chủ đầu tư",
      "C": "Phải được người có thẩm quyền cho phép chủ đầu tư và nhà thầu thỏa thuận, điều chỉnh phạm vi công việc giữa các thành viên liên danh phù hợp với tiến độ hoặc tiến độ được rút ngắn",
      "D": "Chủ đầu tư và nhà thầu được thỏa thuận điều chỉnh phạm vi công việc giữa các thành viên liên danh phù hợp với tiến độ hoặc tiến độ được rút ngắn"
    },
    "correctAnswer": "D",
    "explanation": "Căn cứ pháp lý: Khoản 24 Điều 140 Nghị định số 214/2025/NĐ-CP. Khi cần đẩy nhanh tiến độ, Chủ đầu tư và nhà thầu được thỏa thuận điều chỉnh phạm vi công việc giữa các thành viên liên danh.",
    "category": "Hợp đồng"
  }
];
