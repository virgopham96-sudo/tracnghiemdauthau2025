
import { Question } from '../../types';

export const set12: Question[] = [
    {
        "id": 111,
        "question": "Gói thầu xây lắp tổ chức đấu thầu qua mạng có thời điểm đóng thầu là ngày 20/3/2025, năm tài chính của nhà thầu là 01/01-31/12, nhà thầu là công ty cổ phần được thành lập vào năm 2018 và E-HSMT yêu cầu nhà thầu nộp báo cáo tài chính của 03 năm gần nhất thì nhà thầu phải nộp báo cáo tài chính của các năm nào sau đây?",
        "options": {
            "A": "2020, 2021, 2022",
            "B": "2021, 2022, 2023",
            "C": "2021, 2022, 2024",
            "D": "2019, 2020, 2021"
        },
        "correctAnswer": "B",
        "explanation": "Đóng thầu ngày 20/3/2025. Hạn nộp quyết toán thuế năm 2024 thường là 31/3/2025. Do đó tại thời điểm đóng thầu, báo cáo tài chính năm 2024 chưa bắt buộc phải hoàn thành. Vì vậy, 3 năm tài chính gần nhất có báo cáo đầy đủ thường là 2023, 2022, và 2021.",
        "category": "Đấu thầu qua mạng"
    },
    {
        "id": 112,
        "question": "Đối với công trình đang xét là công trình xây dựng có loại kết cấu dạng nhà cấp II với giá trị công trình là 60 tỷ đồng, E-HSMT có yêu cầu về kinh nghiệm thực hiện hợp đồng xây lắp tương tự, trường hợp nào sau đây được đánh giá là một công trình xây lắp tương tự?",
        "options": {
            "A": "Nhà thầu có 2 công trình xây dựng có loại kết cấu dạng nhà cấp III với giá trị đã hoàn thành toàn bộ lần lượt là 30 tỷ đồng, 50 tỷ đồng",
            "B": "Nhà thầu có 2 công trình xây dựng có loại kết cấu dạng nhà cấp III với giá trị đã hoàn thành toàn bộ lần lượt là 30 tỷ đồng, 20 tỷ đồng",
            "C": "Nhà thầu có 3 công trình xây dựng có loại kết cấu dạng nhà cấp III với giá trị đã hoàn thành toàn bộ lần lượt là 30 tỷ đồng, 20 tỷ đồng, 10 tỷ đồng",
            "D": "Nhà thầu có 1 công trình xây dựng có loại kết cấu dạng nhà cấp III với giá trị đã hoàn thành toàn bộ là 60 tỷ đồng"
        },
        "correctAnswer": "A",
        "explanation": "Theo hướng dẫn mới tại Thông tư 79, nhà thầu có thể sử dụng 02 công trình có cấp thấp hơn liền kề với cấp của công trình đang xét (cấp III so với cấp II), với điều kiện giá trị mỗi công trình cấp thấp hơn này phải bằng hoặc lớn hơn 50% giá trị công trình đang xét (>= 30 tỷ đồng). Trong trường hợp A, nhà thầu có 2 công trình cấp III giá trị 30 tỷ và 50 tỷ, cả hai đều >= 30 tỷ, nên được đánh giá là tương tự 01 công trình cấp II giá trị 30 tỷ. Căn cứ: Mẫu số 3A Thông tư 79/2025/TT-BTC.",
        "category": "Hồ sơ mời thầu và Đánh giá HSDT"
    },
    {
        "id": 113,
        "question": "Gói thầu cung cấp dịch vụ vệ sinh tòa nhà do Sở Tài chính tỉnh X làm chủ đầu tư có giá gói thầu 01 tỷ đồng, thời gian thực hiện là 12 tháng, hợp đồng tương tự yêu cầu 30% giá gói thầu. Trường hợp nào sau đây nhà thầu được coi là đáp ứng về giá trị của hợp đồng tương tự?",
        "options": {
            "A": "Nhà thầu cung cấp hợp đồng A (chưa hoàn thành, chưa được thanh lý) có giá trị công việc dịch vụ vệ sinh tòa nhà (đã được nghiệm thu) là 100 triệu đồng; hợp đồng B (chưa hoàn thành, chưa được thanh lý) có giá trị công việc dịch vụ vệ sinh tòa nhà (đã được nghiệm thu) là 250 triệu đồng",
            "B": "Nhà thầu cung cấp hợp đồng A (đã nghiệm thu, đã được thanh lý) có giá trị công việc dịch vụ vệ sinh tòa nhà là 300 triệu đồng",
            "C": "Nhà thầu cung cấp hợp đồng A (chưa hoàn thành, chưa được thanh lý) có giá trị công việc dịch vụ vệ sinh tòa nhà (chưa được nghiệm thu) là 100 triệu đồng; hợp đồng B (chưa hoàn thành, chưa được thanh lý) có giá trị công việc dịch vụ vệ sinh tòa nhà (đã được nghiệm thu) là 400 triệu đồng",
            "D": "Tất cả đáp án trên đều đúng"
        },
        "correctAnswer": "D",
        "explanation": "Giá trị hợp đồng tương tự được tính bằng tổng giá trị các phần công việc đã thực hiện và được nghiệm thu của các hợp đồng (kể cả hợp đồng đang thực hiện chưa kết thúc). Yêu cầu là 30% x 1 tỷ = 300 triệu.\n- A: Tổng nghiệm thu = 100 + 250 = 350 > 300 (Đạt).\n- B: 300 (Đạt).\n- C: 400 (phần nghiệm thu) > 300 (Đạt). Căn cứ: Mẫu số 5A Thông tư 79/2025/TT-BTC.",
        "category": "Hồ sơ mời thầu và Đánh giá HSDT"
    },
    {
        "id": 114,
        "question": "Gói thầu mua sắm trang thiết bị do Sở Tư pháp tỉnh X làm chủ đầu tư có giá gói thầu 03 tỷ đồng, thời gian thực hiện là 12 tháng, trong đó có 02 hạng mục: máy điều hòa (mã HS 8415) giá dự toán 01 tỷ đồng, máy tính xách tay (mã HS 8507) giá dự toán 02 tỷ đồng, hợp đồng tương tự yêu cầu 50% giá gói thầu. Trường hợp nào sau đây nhà thầu được coi là không đáp ứng về giá trị của hợp đồng tương tự?",
        "options": {
            "A": "Nhà thầu cung cấp 02 hợp đồng, trong đó: 01 hợp đồng đã thực hiện việc cung cấp mã hàng hóa 8415 với giá trị 400 triệu đồng, 01 hợp đồng đã thực hiện việc cung cấp mã hàng hóa 8415 với giá trị 100 triệu đồng và mã hàng hóa 8507 với giá trị 01 tỷ đồng",
            "B": "Nhà thầu cung cấp 01 hợp đồng có đầy đủ các mã hàng hóa 8415 và 8507 và tổng giá trị của mã hàng hóa 8415, 8507 trong hợp đồng đã hoàn thành với giá trị 1,6 tỷ đồng",
            "C": "Nhà thầu cung cấp 02 hợp đồng, trong đó: 01 hợp đồng đã thực hiện việc cung cấp mã hàng hóa 8415 với giá trị 600 triệu đồng và 01 hợp đồng đã thực hiện việc cung cấp mã hàng hóa 8507 với giá trị 01 tỷ đồng",
            "D": "Phương án A và B đều không đáp ứng về giá trị hợp đồng tương tự"
        },
        "correctAnswer": "A",
        "explanation": "Yêu cầu hợp đồng tương tự là 50% giá gói thầu, tức là 1,5 tỷ đồng. Thông thường, yêu cầu này áp dụng cho quy mô của một hợp đồng duy nhất hoặc tổng các hợp đồng nhưng phải đảm bảo tính tương tự của từng phần. Phương án A có tổng giá trị các hợp đồng là 400 + 100 + 1000 = 1.5 tỷ, tuy nhiên việc phân tán nhỏ lẻ (đặc biệt là 8415) có thể khiến việc đánh giá không đạt về quy mô hợp đồng điển hình. Căn cứ: Mẫu số 4A Thông tư 79/2025/TT-BTC.",
        "category": "Hồ sơ mời thầu và Đánh giá HSDT"
    },
    {
        "id": 115,
        "question": "Gói thầu cung cấp dịch vụ giặt là thực hiện đấu thầu qua mạng, E-HSMT có quy định cho phép sử dụng nhà thầu phụ tối đa 20% trên giá dự thầu của nhà thầu. Nhà thầu liên danh A-B, trong đó nhà thầu Công ty A đảm nhận 30% giá trị công việc, Công ty B đảm nhận 70% giá trị công việc. Việc sử dụng nhà thầu phụ đối với từng thành viên liên danh được thực hiện như thế nào?",
        "options": {
            "A": "Công ty A được sử dụng nhà thầu phụ tối đa 20% trên 30% giá trị công việc mà công ty A đảm nhận, Công ty B được sử dụng nhà thầu phụ tối đa 20% trên 70% giá trị công việc mà công ty B đảm nhận",
            "B": "Công ty A được sử dụng nhà thầu phụ tối đa 20% trên tổng giá trị (100%) công việc và Công ty B được sử dụng nhà thầu phụ tối đa 20% trên tổng giá trị (100%) công việc mà Công ty A và Công ty B đảm nhận",
            "C": "Thực hiện theo thỏa thuận giữa Công ty A và Công ty B, Công ty A hoặc Công ty B được sử dụng nhà thầu phụ tối đa 20% trên tổng giá trị (100%) công việc nhưng phải bảo đảm tổng khối lượng công việc của nhà thầu phụ của liên danh A-B tối đa 20% trên tổng giá trị (100%) công việc mà Công ty A và Công ty B đảm nhận",
            "D": "Tất cả đáp án trên đều đúng"
        },
        "correctAnswer": "A",
        "explanation": "Tỷ lệ sử dụng nhà thầu phụ được tính trên phần công việc mà mỗi thành viên liên danh đảm nhận, chứ không phải trên tổng giá trị gói thầu. Điều này đảm bảo mỗi thành viên vẫn phải chịu trách nhiệm chính cho phần việc của mình. Căn cứ: Mẫu số 5A Thông tư 79/2025/TT-BTC.",
        "category": "Quy định chung"
    },
    {
        "id": 116,
        "question": "Nhà thầu liên danh A-B tham dự thầu và nộp bảo đảm dự thầu riêng rẽ, trong quá trình đánh giá hồ sơ dự thầu tổ chuyên gia có bằng chứng cho thấy nhà thầu A có hành vi gian lận, thuộc hành vi bị cấm trong đấu thầu, trong trường hợp này bảo đảm dự thầu của nhà thầu liên danh xử lý như thế nào?",
        "options": {
            "A": "Không hoàn trả bảo đảm dự thầu của cả nhà thầu liên danh A-B",
            "B": "Không hoàn trả bảo đảm dự thầu của nhà thầu A",
            "C": "Không hoàn trả bảo đảm dự thầu của nhà thầu B",
            "D": "Nhà thầu A và nhà thầu B vẫn được hoàn trả bảo đảm dự thầu"
        },
        "correctAnswer": "A",
        "explanation": "Theo Khoản 7 Điều 14 Luật Đấu thầu, nếu một thành viên trong liên danh vi phạm quy định dẫn đến không được hoàn trả bảo đảm dự thầu, thì bảo đảm dự thầu của tất cả thành viên trong liên danh sẽ không được hoàn trả.",
        "category": "Trách nhiệm và Xử lý vi phạm"
    },
    {
        "id": 117,
        "question": "Gói thầu đang xét là gói thầu giặt cho bệnh viện công lập (có tính chất công việc lặp lại theo chu kỳ qua các năm), có thời gian thực hiện gói thầu trong 3 năm với giá gói thầu là 12 tỷ đồng. Nhà thầu nào được xác định đáp ứng yêu cầu về giá trị hợp đồng tương tự khi tham dự gói thầu này?",
        "options": {
            "A": "Nhà thầu A có 01 hợp đồng giặt là X cho bệnh viện công lập có thời gian thực hiện gói thầu là 48 tháng (đang trong quá trình thực hiện, chưa hoàn thành, chưa được thanh lý), nhưng tính đến thời điểm tham dự thầu, nhà thầu A đã thực hiện được 24 tháng, trong đó giá trị công việc đã được nghiệm thu 12 tháng đầu là 1,2 tỷ đồng;",
            "B": "Nhà thầu B cung cấp 02 hợp đồng, trong đó có hợp đồng giặt X cho khách sạn tư nhân, thời gian thực hiện hợp đồng trong 06 tháng với giá trị là 300 triệu đồng; Hợp đồng giặt là Y cho bệnh viện công lập, thời gian thực hiện hợp đồng trong 24 tháng với giá trị là 3 tỷ đồng, trong đó giá trị công việc đã được nghiệm thu 12 tháng đầu là 1 tỷ đồng.",
            "C": "Nhà thầu A và B đều đáp ứng",
            "D": "Nhà thầu A và B đều không đáp ứng"
        },
        "correctAnswer": "C",
        "explanation": "Giá trị gói thầu theo chu kỳ 1 năm là 4 tỷ đồng. Yêu cầu về giá trị hợp đồng tương tự thường là 50-70% giá trị này (2-2.8 tỷ). Tuy nhiên, đối với các gói thầu có tính chất lặp lại, quy định có thể linh hoạt hơn. Giá trị công việc đã nghiệm thu của nhà thầu A là 1.2 tỷ. Của nhà thầu B (chỉ tính hợp đồng với bệnh viện) là 1 tỷ. Nếu quy định cho phép cộng dồn giá trị hoặc có một ngưỡng yêu cầu thấp hơn (ví dụ 1 tỷ), cả hai nhà thầu có thể được xem là đáp ứng.",
        "category": "Hồ sơ mời thầu và Đánh giá HSDT"
    },
    {
        "id": 118,
        "question": "Trường hợp E-HSMT gói thầu xây lắp yêu cầu về cam kết cung cấp tín dụng, nhà thầu được chứng minh bằng cách nào?",
        "options": {
            "A": "Bằng số dư tài khoản hoặc tiền gửi tiết kiệm từ ngân hàng",
            "B": "Bằng cam kết cung cấp tín dụng của ngân hàng",
            "C": "Bằng xác nhận số dư hạn mức tín dụng khả dụng từ ngân hàng",
            "D": "Tất cả các phương án trên đều đúng"
        },
        "correctAnswer": "D",
        "explanation": "Nhà thầu có thể chứng minh nguồn lực tài chính bằng: Số dư tài khoản, Cam kết tín dụng của ngân hàng, hoặc Xác nhận hạn mức tín dụng. Tất cả đều được chấp nhận là tài liệu chứng minh hợp lệ. Căn cứ: Mẫu số 3A Thông tư 79/2025/TT-BTC.",
        "category": "Hồ sơ mời thầu và Đánh giá HSDT"
    },
    {
        "id": 119,
        "question": "Hợp đồng theo tỷ lệ phần trăm có thể được áp dụng đối với gói thầu nào sau đây?",
        "options": {
            "A": "Mua sắm thiết bị y tế",
            "B": "Xây dựng công trình",
            "C": "Bảo hiểm công trình mà giá trị hợp đồng được xác định chính xác trên cơ sở giá trị công trình thực tế được nghiệm thu",
            "D": "Tư vấn giám sát"
        },
        "correctAnswer": "C",
        "explanation": "Loại hợp đồng này chỉ áp dụng cho gói thầu bảo hiểm công trình. Căn cứ: Khoản 7 Điều 64 Luật Đấu thầu.",
        "category": "Hợp đồng"
    },
    {
        "id": 120,
        "question": "Cơ sở để thanh toán hợp đồng cho nhà thầu là gì?",
        "options": {
            "A": "Giá hợp đồng và các điều khoản cụ thể về thanh toán được ghi trong hợp đồng",
            "B": "Dự toán gói thầu và các điều khoản cụ thể về thanh toán được ghi trong hợp đồng",
            "C": "Dự toán gói thầu",
            "D": "Phương án A và C đều sai"
        },
        "correctAnswer": "A",
        "explanation": "Thanh toán dựa trên Giá hợp đồng và các điều khoản thanh toán trong hợp đồng. Không căn cứ vào dự toán hay định mức nhà nước (trừ trường hợp chỉ định thầu rút gọn hoặc quy định đặc thù). Căn cứ: Khoản 1 Điều 119 Nghị định 214/2025/NĐ-CP.",
        "category": "Hợp đồng"
    }
];
