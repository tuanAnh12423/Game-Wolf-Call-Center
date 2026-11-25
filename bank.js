/* ================= ngân hàng câu hỏi ================= */
/* Định dạng: Câu hỏi | Đáp án đúng | Sai 1 | Sai 2 | Sai 3 | g:Nhóm | s:Nguồn */
const GENERAL=`Khách gọi đến đang rất bực tức. Việc đầu tiên nên làm là gì? | Lắng nghe hết ý và ghi nhận cảm xúc của khách | Giải thích ngay quy định bảo hành | Chuyển máy cho cấp trên | Đề nghị khách bình tĩnh rồi gọi lại sau | g:Kỹ năng tổng đài | s:Câu mẫu chung, cần đối chiếu quy trình nội bộ
Thông tin nào ít liên quan nhất khi tiếp nhận yêu cầu sửa chữa? | Nghề nghiệp của khách | Số điện thoại liên hệ | Địa chỉ đặt sản phẩm | Model sản phẩm và mô tả lỗi | g:Kỹ năng tổng đài | s:Câu mẫu chung, cần đối chiếu quy trình nội bộ
Vì sao nên đọc lại thông tin trước khi kết thúc cuộc gọi? | Tránh sai địa chỉ, số điện thoại và giảm cuộc gọi lại | Để kéo dài thời gian cuộc gọi | Vì khách hay quên tên mình | Để ghi âm rõ hơn | g:Kỹ năng tổng đài | s:Câu mẫu chung, cần đối chiếu quy trình nội bộ
Chưa chắc câu trả lời kỹ thuật, Tổng đài viên nên làm gì? | Xin phép khách giữ máy hoặc hẹn gọi lại để kiểm tra tài liệu | Đoán câu trả lời gần đúng nhất | Nói không biết rồi kết thúc cuộc gọi | Bảo khách tự tìm trên mạng | g:Kỹ năng tổng đài | s:Câu mẫu chung, cần đối chiếu quy trình nội bộ
Câu nào chuyên nghiệp nhất khi yêu cầu không thuộc bộ phận mình? | Em sẽ chuyển yêu cầu đến bộ phận phụ trách và báo lại anh/chị | Cái đó không phải việc của em | Anh/chị gọi số khác giúp em | Em cũng không rõ ai làm việc đó | g:Kỹ năng tổng đài | s:Câu mẫu chung, cần đối chiếu quy trình nội bộ
Khi cần để khách chờ máy, nên làm gì? | Xin phép, nêu lý do và thời gian chờ dự kiến | Bấm giữ máy ngay, không cần nói | Im lặng để tra cứu | Bảo khách gọi lại sau 30 phút | g:Kỹ năng tổng đài | s:Câu mẫu chung, cần đối chiếu quy trình nội bộ
Kết thúc cuộc gọi nên có bước nào? | Hỏi khách còn cần hỗ trợ gì thêm rồi cảm ơn | Cúp máy ngay khi xong việc | Nhắc khách đánh giá 5 sao | Đọc lại toàn bộ chính sách bảo hành | g:Kỹ năng tổng đài | s:Câu mẫu chung, cần đối chiếu quy trình nội bộ
Khách báo máy hiển thị mã lỗi. Nên hỏi thêm điều gì trước tiên? | Model sản phẩm và mã lỗi chính xác đang hiển thị | Khách mua ở cửa hàng nào | Khách dùng nhà mạng nào | Màu sắc của sản phẩm | g:Kỹ năng tổng đài | s:Câu mẫu chung, cần đối chiếu quy trình nội bộ
Khách phàn nàn KTV đến trễ hẹn. Phản hồi phù hợp nhất? | Xin lỗi, ghi nhận và kiểm tra lịch hẹn để báo lại cụ thể | Nói do kẹt xe nên không ai có lỗi | Bảo khách tự liên hệ KTV | Bỏ qua và chuyển sang việc khác | g:Kỹ năng tổng đài | s:Câu mẫu chung, cần đối chiếu quy trình nội bộ
Khách đọc số điện thoại. Cách xác nhận tốt nhất là gì? | Đọc lại từng cụm số để khách xác nhận | Ghi nhanh rồi chuyển ý | Không cần xác nhận nếu khách nói rõ | Hỏi lại tên khách là đủ | g:Kỹ năng tổng đài | s:Câu mẫu chung, cần đối chiếu quy trình nội bộ`;

/* Bộ máy giặt: chỉ gồm thông tin có trong sách HDSD và trang sản phẩm chính thức của Toshiba Việt Nam */
const WASHER=`Máy giặt cửa trên AW-T08DU1600LV báo lỗi E1. Theo HDSD, cần kiểm tra điều gì? | Vòi nước đã được mở chưa | Nắp máy đã đóng chặt chưa | Đầu ống thoát nước có bị tắc không | Quần áo có bị lệch một bên không | g:Máy giặt - Mã lỗi | s:HDSD AW-T08DU1600LV
AW-T08DU1600LV báo E2 (chưa xả nước xong). Nên kiểm tra gì? | Đầu ống thoát nước có đặt quá cao, bị nhúng trong nước hoặc bị tắc không | Vòi cấp nước đã mở hết cỡ chưa | Bộ lọc xơ vải đã được rửa chưa | Phích cắm đã cắm vào ổ nối đất chưa | g:Máy giặt - Mã lỗi | s:HDSD AW-T08DU1600LV
Mã lỗi E3 trên máy giặt cửa trên Toshiba cảnh báo điều gì? | Chưa đóng nắp máy trước khi giặt và vắt | Cấp nước vào máy bất thường | Chưa xả nước xong | Đồ giặt phân bố không đều khi vắt | g:Máy giặt - Mã lỗi | s:HDSD AW-T08DU1600LV
Máy báo E4 trong lúc vắt. Cách xử lý theo HDSD là gì? | Dùng tay dàn đều quần áo trong lồng giặt | Mở hết vòi nước rồi chạy lại | Hạ thấp đầu ống thoát nước | Đóng nắp máy lại | g:Máy giặt - Mã lỗi | s:HDSD AW-T08DU1600LV
Nhóm mã E7-1 đến E7-5 trong HDSD thể hiện loại sự cố nào? | Trạng thái bất thường với lỗi nguy hiểm | Cấp nước vào máy bất thường | Chưa đóng nắp máy | Đồ giặt phân bố không đều | g:Máy giặt - Mã lỗi | s:HDSD AW-T08DU1600LV
Mã E7-x hiện ngay sau khi nhấn nút nguồn, người dùng nên làm gì? | Liên hệ trung tâm bảo hành | Nhấn Start/Hold rồi chạy lại | Mở vòi nước và kiểm tra ống cấp | Dàn đều quần áo trong lồng | g:Máy giặt - Mã lỗi | s:HDSD AW-T08DU1600LV
Mã E7-x xuất hiện khi máy đang vận hành, HDSD hướng dẫn thao tác nào? | Nhấn nút nguồn để dừng máy | Nhấn Start/Hold để chạy tiếp | Mở nắp máy ra ngay | Rút ống thoát nước khỏi máy | g:Máy giặt - Mã lỗi | s:HDSD AW-T08DU1600LV
Mã FXX trong HDSD thuộc nhóm nào? | Lý do khác, gọi trung tâm bảo hành nếu không tìm được giải pháp | Cảnh báo chưa đóng nắp máy | Cảnh báo cấp nước bất thường | Đồ giặt bố trí không đều | g:Máy giặt - Mã lỗi | s:HDSD AW-T08DU1600LV
Sau khi kiểm tra xong, thao tác nào dùng để hủy hiển thị mã lỗi? | Nhấn nút Start/Hold | Rút phích cắm 1 phút | Nhấn giữ nút khóa trẻ em 3 giây | Chọn chương trình vệ sinh lồng giặt | g:Máy giặt - Mã lỗi | s:HDSD AW-T08DU1600LV
Máy báo không có nước vào máy. Mục nào nằm trong danh sách cần kiểm tra của HDSD? | Cầu chì, nguồn nước và bộ lọc ngõ vào cấp nước | Hẹn giờ giặt và mực nước đã chọn | Độ phẳng của nền đặt máy | Ống thoát nước có đặt quá cao không | g:Máy giặt - Mã lỗi | s:HDSD AW-T08DU1600LV
Máy không giặt. HDSD yêu cầu kiểm tra mục nào? | Nguồn điện, mực nước, chế độ hẹn giờ và đã nhấn Start/Hold chưa | Cầu chì, vòi nước và bộ lọc ngõ vào | Độ phẳng của nền và ống thoát nước | Bộ lọc xơ vải đã được vệ sinh chưa | g:Máy giặt - Mã lỗi | s:HDSD AW-T08DU1600LV
Máy xả nước hoặc quay vắt bất thường. HDSD yêu cầu kiểm tra mục nào? | Đầu ra ống xả, độ phẳng của máy, nắp đã đóng, đồ giặt có bị lệch không | Vòi nước và bộ lọc ngõ vào cấp nước | Cầu chì và nguồn điện | Chế độ hẹn giờ giặt | g:Máy giặt - Mã lỗi | s:HDSD AW-T08DU1600LV
Máy giặt sấy cửa trước TWD-T35BP160MWV báo cấp nước quá lâu. Cần kiểm tra gì? | Áp lực nước thấp, ống cấp bị gập, bộ lọc van đầu vào bị nghẹt | Ống xả có bị nghẹt không | Quần áo có kẹt ở cửa không | Bulông vận chuyển đã tháo chưa | g:Máy giặt - Mã lỗi | s:HDSD TWD-T35BP160MWV
TWD-T35BP160MWV báo xả nước quá lâu. Điều cần kiểm tra là gì? | Ống xả có bị nghẹt không | Bộ lọc van đầu vào có bị nghẹt không | Áp lực nước có quá thấp không | Cửa đã đóng chặt chưa | g:Máy giặt - Mã lỗi | s:HDSD TWD-T35BP160MWV
TWD-T35BP160MWV báo cửa chưa đóng chặt. Cách xử lý là gì? | Đóng lại cửa, khởi động lại và kiểm tra quần áo có kẹt ở cửa không | Nắn thẳng ống cấp nước | Vệ sinh bộ lọc bơm xả | Ngừng sử dụng máy và liên hệ bảo hành | g:Máy giặt - Mã lỗi | s:HDSD TWD-T35BP160MWV
TWD-T35BP160MWV báo nước quá nhiều. HDSD hướng dẫn gì? | Ngừng sử dụng máy và liên hệ trung tâm bảo hành | Nắn thẳng ống cấp nước | Dàn đều quần áo trong lồng | Vệ sinh gioăng cửa | g:Máy giặt - Mã lỗi | s:HDSD TWD-T35BP160MWV
Trước khi bảo dưỡng máy giặt, việc đầu tiên cần làm là gì? | Rút phích cắm và khóa nguồn nước cấp | Mở nắp và để máy khô 24 giờ | Chạy chương trình vệ sinh lồng giặt | Tháo bộ lọc xơ vải | g:Máy giặt - Vệ sinh, bảo dưỡng | s:HDSD AW-T08DU1600LV
Nên lau vỏ ngoài máy giặt AW-T08DU1600LV bằng gì? | Chất giặt loãng, trung tính, không ăn mòn | Cồn | Dung môi pha loãng | Axit formic | g:Máy giặt - Vệ sinh, bảo dưỡng | s:HDSD AW-T08DU1600LV
Khi nào cần vệ sinh bộ lọc ngõ vào cấp nước của AW-T08DU1600LV? | Khi áp lực cấp nước giảm | Sau mỗi lần giặt | Khi máy báo lỗi E3 | Mỗi tuần một lần | g:Máy giặt - Vệ sinh, bảo dưỡng | s:HDSD AW-T08DU1600LV
Bộ lọc xơ vải bên trong AW-T08DU1600LV nên được vệ sinh sau khoảng bao nhiêu lần giặt? | Khoảng 10 lần giặt | 3 lần giặt | 30 lần giặt | 100 lần giặt | g:Máy giặt - Vệ sinh, bảo dưỡng | s:HDSD AW-T08DU1600LV
Trước lần giặt đầu tiên, HDSD khuyến nghị chạy chương trình nào? | Vệ sinh lồng giặt, không cho đồ giặt vào | Giặt thường với đầy tải | Giặt nhanh có nước xả | Đồ dày với nước nóng | g:Máy giặt - Vệ sinh, bảo dưỡng | s:HDSD AW-T08DU1600LV
Chương trình VỆ SINH LỒNG GIẶT trên máy cửa trên hoạt động ra sao? | Xoay ngắt quãng để làm sạch lồng và mâm giặt | Giữ nước nóng liên tục trên 90°C | Vắt liên tục 60 phút | Xả nước liên tục không cấp thêm | g:Máy giặt - Vệ sinh, bảo dưỡng | s:HDSD AW-T08DU1600LV
Bộ lọc bơm xả của TWD-T35BP160MWV nên vệ sinh bao lâu một lần? | 3 tháng một lần | Sau mỗi lần giặt | Mỗi tuần một lần | Mỗi năm một lần | g:Máy giặt - Vệ sinh, bảo dưỡng | s:HDSD TWD-T35BP160MWV
Mở bộ lọc bơm xả của TWD-T35BP160MWV bằng cách xoay thế nào? | Ngược chiều kim đồng hồ | Cùng chiều kim đồng hồ | Kéo thẳng ra không xoay | Nhấn giữ nút khóa 3 giây | g:Máy giặt - Vệ sinh, bảo dưỡng | s:HDSD TWD-T35BP160MWV
Muốn xả nước còn trong máy trước khi tháo bộ lọc bơm xả, TWD dùng bộ phận nào? | Ống thoát khẩn cấp | Nút Start giữ 3 giây | Mở cửa để nước tự chảy | Chương trình chỉ vắt | g:Máy giặt - Vệ sinh, bảo dưỡng | s:HDSD TWD-T35BP160MWV
Khi nào không được tháo nắp bộ lọc bơm xả của TWD? | Khi máy còn nước nóng | Khi đã rút phích cắm | Khi đã xả nước bằng ống thoát khẩn cấp | Khi vừa lau gioăng cửa | g:Máy giặt - Vệ sinh, bảo dưỡng | s:HDSD TWD-T35BP160MWV
Gioăng và kính cửa của TWD nên được vệ sinh như thế nào? | Lau sau mỗi lần giặt và vệ sinh kỹ hàng tháng | Chỉ lau 3 tháng một lần | Chỉ lau khi có mùi | Lau bằng cồn mỗi tuần | g:Máy giặt - Vệ sinh, bảo dưỡng | s:HDSD TWD-T35BP160MWV
Xơ vải đọng nhiều ở gioăng cửa của TWD có thể gây hậu quả gì? | Máy có thể bị rò nước | Máy báo lỗi E3 | Tự tăng mực nước | Cửa tự khóa vĩnh viễn | g:Máy giặt - Vệ sinh, bảo dưỡng | s:HDSD TWD-T35BP160MWV
Cách vệ sinh ngăn đựng bột giặt, nước giặt, nước xả của TWD là gì? | Rửa dưới vòi nước, dùng bàn chải mềm làm sạch các khe, 3 tháng một lần | Ngâm cồn 1 giờ | Lau bằng dung môi | Dùng miếng chà kim loại | g:Máy giặt - Vệ sinh, bảo dưỡng | s:HDSD TWD-T35BP160MWV
Lồng giặt của TWD bị gỉ do vật kim loại, xử lý thế nào? | Dùng chất tẩy không chứa clo, không dùng miếng chà kim loại | Dùng miếng chà kim loại | Dùng chất tẩy chứa clo đậm đặc | Để tự hết sau vài lần giặt | g:Máy giặt - Vệ sinh, bảo dưỡng | s:HDSD TWD-T35BP160MWV
Với TWD-T35BP160MWV, có thể thêm quần áo vào chương trình VỆ SINH LỒNG GIẶT không? | Không thể thêm quần áo vào chương trình này | Có, nhưng chỉ đồ mỏng | Có, nếu mở cửa trong 5 phút đầu | Có, nhưng chỉ khăn tắm | g:Máy giặt - Vệ sinh, bảo dưỡng | s:HDSD TWD-T35BP160MWV
Bộ lọc cấp nước đầu vào của TWD nên vệ sinh khi nào? | 3 tháng một lần hoặc khi nước cấp yếu | Sau mỗi lần giặt | Mỗi năm một lần | Khi máy báo FXX | g:Máy giặt - Vệ sinh, bảo dưỡng | s:HDSD TWD-T35BP160MWV
Trước khi dùng TWD-T35BP160MWV cần làm gì với bulông vận chuyển? | Tháo 4 ốc cố định ở mặt sau rồi lắp nắp che vào các lỗ | Siết chặt cả 4 ốc | Giữ nguyên bulông | Tháo 2 ốc ở mặt trước | g:Máy giặt - Lắp đặt, an toàn | s:HDSD TWD-T35BP160MWV
Ống xả của TWD-T35BP160MWV có chiều dài trong khoảng nào? | 60 cm đến 100 cm | 20 cm đến 40 cm | 120 cm đến 150 cm | Càng dài càng tốt | g:Máy giặt - Lắp đặt, an toàn | s:HDSD TWD-T35BP160MWV
Áp lực nước cấp cho TWD-T35BP160MWV nằm trong khoảng nào? | Tối thiểu 0,05 MPa, tối đa 1 MPa | 0,03 MPa đến 0,8 MPa | Tối thiểu 0,5 MPa | Dưới 0,01 MPa | g:Máy giặt - Lắp đặt, an toàn | s:HDSD TWD-T35BP160MWV
Áp lực nước tiêu chuẩn của máy cửa trên AW-T08DU1600LV là bao nhiêu? | 0,03 MPa đến 0,8 MPa | 0,05 MPa đến 1 MPa | 1 MPa đến 2 MPa | Trên 1,5 MPa | g:Máy giặt - Lắp đặt, an toàn | s:HDSD AW-T08DU1600LV
Nhiệt độ nước cấp vào AW-T08DU1600LV được dùng tối đa là bao nhiêu? | Không dùng nước trên 50°C | Không trên 70°C | Không trên 90°C | Không giới hạn | g:Máy giặt - Lắp đặt, an toàn | s:HDSD AW-T08DU1600LV
Khi cân bằng máy cửa trên AW-T08DU1600LV, chênh lệch a - b không được vượt quá bao nhiêu? | 1 cm | 2 cm | 5 cm | 10 cm | g:Máy giặt - Lắp đặt, an toàn | s:HDSD AW-T08DU1600LV
Khi có ống thoát nước ở bên cạnh, máy AW-T08DU1600LV cần chừa khoảng trống bao nhiêu? | 50 mm | 5 mm | 200 mm | 500 mm | g:Máy giặt - Lắp đặt, an toàn | s:HDSD AW-T08DU1600LV
Máy giặt Toshiba phải được cắm vào loại ổ điện nào? | Ổ ba chấu có nối đất đáng tin cậy | Ổ cắm nhiều lỗ có dây nối dài | Ổ cắm qua bộ hẹn giờ | Ổ hai chấu không nối đất | g:Máy giặt - Lắp đặt, an toàn | s:HDSD AW-T08DU1600LV
Dây nguồn của máy bị hỏng thì ai được thay? | Nhà sản xuất, trung tâm bảo hành hoặc người có chuyên môn tương đương | Người dùng tự thay bằng dây bất kỳ | Nhân viên giao hàng | Người thân trong gia đình | g:Máy giặt - Lắp đặt, an toàn | s:HDSD AW-T08DUH1800MV
Khi lắp máy mới, nên dùng loại ống cấp nước nào? | Bộ ống mới đi kèm máy | Ống cũ của máy trước | Ống mua ngoài rẻ nhất | Ống bất kỳ miễn vừa ren | g:Máy giặt - Lắp đặt, an toàn | s:HDSD AW-T08DUH1800MV
Món nào không được giặt bằng máy giặt Toshiba? | Quần áo đã dính xăng, dầu hoặc dung môi giặt khô | Áo thun cotton | Quần jeans | Khăn tắm | g:Máy giặt - Lắp đặt, an toàn | s:HDSD AW-T08DUH1800MV
Vật dụng nào sau đây không được cho vào máy giặt cửa trên Toshiba? | Thảm dày, cứng | Áo sơ mi cotton | Quần áo mỏng | Khăn mặt | g:Máy giặt - Lắp đặt, an toàn | s:HDSD AW-T08DUH1800MV
Khi máy đang hoạt động, hành động nào bị cấm? | Đưa tay vào lồng giặt | Quan sát đèn trên bảng điều khiển | Nhấn Start/Hold để tạm dừng | Kiểm tra mực nước đang hiển thị | g:Máy giặt - Lắp đặt, an toàn | s:HDSD AW-T08DUH1800MV
Điều nào không được làm với nắp kính của máy giặt cửa trên AW-T08DUH1800MV? | Trèo hoặc ngồi lên nắp kính | Lau nắp bằng vải ẩm | Mở nắp khi máy đã dừng hẳn | Đóng nắp trước khi giặt | g:Máy giặt - Lắp đặt, an toàn | s:HDSD AW-T08DUH1800MV
Trước khi di chuyển máy giặt cần làm gì? | Xả hết nước còn đọng trong máy | Đổ đầy nước để máy nặng và ổn định | Cầm vào phần nhô ra để nâng cho chắc | Tháo ống thoát nước khi còn nước | g:Máy giặt - Lắp đặt, an toàn | s:HDSD AW-T08DUH1800MV
Có được cấp điện cho máy giặt thông qua bộ hẹn giờ hoặc công tắc ngoài không? | Không, vì liên quan đến việc cài lại bảo vệ quá nhiệt | Có, để tiết kiệm điện | Có, nếu dùng ban đêm | Có, nếu công suất đủ lớn | g:Máy giặt - Lắp đặt, an toàn | s:HDSD AW-T08DUH1800MV
Khi nào không được vận hành máy giặt cửa trên AW-T08DUH1800MV? | Khi máy còn đặt trên tấm xốp đệm dưới đáy | Khi có tiếng nước chảy vào máy | Khi đã bật khóa trẻ em | Khi đang giặt đồ mỏng | g:Máy giặt - Lắp đặt, an toàn | s:HDSD AW-T08DUH1800MV
Nhiệt độ phòng để đặt TWD-T35BP160MWV nằm trong khoảng nào? | 5°C đến 40°C | 15°C đến 25°C | 30°C đến 50°C | Không giới hạn | g:Máy giặt - Lắp đặt, an toàn | s:HDSD TWD-T35BP160MWV
Khối lượng tối đa của TWD-T35BP160MWV khi giặt và khi sấy là bao nhiêu? | Giặt 15 kg, sấy 9 kg | Giặt 9 kg, sấy 15 kg | Giặt 15 kg, sấy 15 kg | Giặt 8 kg, sấy 5 kg | g:Máy giặt - Lắp đặt, an toàn | s:HDSD TWD-T35BP160MWV
Chế độ sấy nhiệt độ thấp của TWD khuyến nghị tối đa bao nhiêu kg đồ? | 2 kg | 5 kg | 9 kg | 15 kg | g:Máy giặt - Lắp đặt, an toàn | s:HDSD TWD-T35BP160MWV
Món nào không được sấy trong TWD-T35BP160MWV? | Đồ len và lụa | Khăn tắm cotton đã vắt kỹ | Áo thun cotton đã giặt | Quần áo đã giặt xong | g:Máy giặt - Lắp đặt, an toàn | s:HDSD TWD-T35BP160MWV
Khi giặt rất ít đồ trong máy cửa trên Toshiba, vấn đề có thể xảy ra là gì? | Lệch tâm; nên thêm một hoặc hai món để máy vận hành êm | Báo E1; nên mở vòi nước | Rò nước; nên giảm mực nước | Quá nhiệt; nên tăng thời gian vắt | g:Máy giặt - Lắp đặt, an toàn | s:HDSD AW-T08DU1600LV
Chương trình GIẶT NHANH phù hợp với loại đồ nào? | Quần áo bẩn nhẹ và quần áo mùa hè | Chăn mền | Quần áo dày nhiều vết bẩn | Quần jeans | g:Máy giặt - Chương trình, chức năng | s:HDSD AW-T08DU1600LV
Chương trình ĐỒ MỎNG có đặc điểm gì? | Tốc độ giặt và vắt chậm để giảm hư hỏng, biến dạng | Giặt bằng hơi nước nóng | Vắt cực khô | Lực nước mạnh nhất | g:Máy giặt - Chương trình, chức năng | s:HDSD AW-T08DU1600LV
Chương trình GIẶT THƯỜNG phù hợp loại vải nào và có quy trình ra sao? | Vải cotton; giặt 1 lần, xả 2 lần | Đồ len; giặt 2 lần, xả 1 lần | Chăn mền; giặt 3 lần | Đồ mỏng; không xả | g:Máy giặt - Chương trình, chức năng | s:HDSD AW-T08DU1600LV
Cài hẹn giờ giặt trên AW-T08DU1600LV, sau khi chọn chương trình cần làm gì? | Nhấn giữ nút WASH 3 giây đến khi đèn hẹn giờ sáng | Nhấn giữ nút Start/Hold 10 giây | Nhấn hai lần nút nguồn | Nhấn giữ nút khóa trẻ em | g:Máy giặt - Chương trình, chức năng | s:HDSD AW-T08DU1600LV
Khóa trẻ em trên AW-T08DU1600LV được bật bằng cách nhấn giữ trong bao lâu? | 3 giây | 1 giây | 10 giây | 30 giây | g:Máy giặt - Chương trình, chức năng | s:HDSD AW-T08DU1600LV
Khi bật Khóa trẻ em, những nút nào bị khóa? | Tất cả các nút trừ On/Off | Chỉ nút Start/Hold | Chỉ các nút chọn chương trình | Chỉ nút hẹn giờ | g:Máy giặt - Chương trình, chức năng | s:HDSD AW-T08DU1600LV
Khóa trẻ em đang bật mà nắp bị mở khi máy đang chạy, điều gì xảy ra? | Máy kêu bíp, đèn nhấp nháy, ngừng cấp nước, dừng giặt hoặc vắt và xả nước khoảng 5 giây | Máy vẫn chạy bình thường | Máy tự tắt nguồn và khóa vĩnh viễn | Máy chuyển sang chế độ vệ sinh lồng | g:Máy giặt - Chương trình, chức năng | s:HDSD AW-T08DU1600LV
Muốn mở nắp khi máy đang chạy (khóa nắp đang bật), cần làm gì? | Nhấn Start/Hold để tạm dừng, chờ đèn khóa tắt sau khi máy dừng hoàn toàn | Kéo mạnh nắp ra | Rút phích cắm rồi mở ngay | Nhấn giữ nút nguồn 10 giây rồi mở | g:Máy giặt - Chương trình, chức năng | s:HDSD AW-T08DU1600LV
Trên AW-T08DU1600LV, mực nước nào chỉ có thể chọn bằng tay? | Mức 1 | Mức 8 | Mức 4 | Mọi mức đều chọn tự động được | g:Máy giặt - Chương trình, chức năng | s:HDSD AW-T08DU1600LV
Thời gian giặt tùy chỉnh trên AW-T08DU1600LV cài được trong khoảng nào? | 0 đến 20 phút | 0 đến 60 phút | 5 đến 10 phút | 30 đến 90 phút | g:Máy giặt - Chương trình, chức năng | s:HDSD AW-T08DU1600LV
Số lần xả tùy chỉnh trên AW-T08DU1600LV cài được từ bao nhiêu đến bao nhiêu? | 0 đến 4 lần | 1 đến 10 lần | Chỉ 1 lần | 5 đến 8 lần | g:Máy giặt - Chương trình, chức năng | s:HDSD AW-T08DU1600LV
Chương trình ĐÃ NHỚ trên AW-T08DUH1800MV có tác dụng gì? | Lưu lại chương trình vừa giặt để chạy lại lần sau | Tự động tải chương trình mới | Nhớ lượng bột giặt đã dùng | Đếm số lần giặt đã hoàn thành | g:Máy giặt - Chương trình, chức năng | s:HDSD AW-T08DUH1800MV
Sau khi nhấn nút STEAM trên AW-T08DUH1800MV, máy làm gì đầu tiên? | Cấp nước đến mức L1 rồi bắt đầu gia nhiệt | Xả hết nước rồi gia nhiệt | Vắt khô rồi cấp hơi | Chạy chương trình vệ sinh lồng giặt | g:Máy giặt - Chương trình, chức năng | s:HDSD AW-T08DUH1800MV
Khi giặt bằng hơi nước nóng, người dùng cần lưu ý điều gì? | Phần bên ngoài thiết bị rất nóng, cần thận trọng | Phải mở nắp liên tục | Bên ngoài máy luôn mát | Chỉ được giặt đồ mỏng | g:Máy giặt - Chương trình, chức năng | s:HDSD AW-T08DUH1800MV
Chương trình nào của TWD-T35BP160MWV chỉ chọn được qua ứng dụng TSmartLife? | Đồ trẻ em | Đồ cotton | Giặt nhanh 12 phút | Vệ sinh lồng giặt | g:Máy giặt - Chương trình, chức năng | s:HDSD TWD-T35BP160MWV
UFB (Ultra Fine Bubble) trên AW-T08DU1600LV có vai trò gì? | Bọt khí siêu nhỏ hỗ trợ loại bỏ vết bẩn, áp dụng cho tất cả chương trình | Chế độ sấy nhiệt thấp | Tia nước phun xả sạch dư lượng | Hơi nước nóng diệt khuẩn | g:Máy giặt - Chương trình, chức năng | s:HDSD AW-T08DU1600LV
Chế độ I-Clean của Toshiba hoạt động thế nào? | Giữ lại 1/4 lượng nước cuối chu trình, cùng lồng và mâm quay nhanh tạo luồng nước áp lực cao loại bỏ mảng bám | Xả sạch nước rồi sấy khô lồng giặt | Phun hơi nước nóng 100°C vào lồng | Chiếu tia UV vào lồng giặt | g:Máy giặt - Công nghệ | s:toshiba-lifestyle.com/vn
Công nghệ GreatWaves hoạt động dựa trên điều gì? | Các tia nước chuyển động ngược và đảo chiều mạnh để giặt nhanh hơn, sạch hơn | Bọt khí siêu nhỏ bám vào sợi vải | Cánh quạt nhỏ hòa tan chất giặt tẩy | Giữ lại 1/4 lượng nước cuối chu trình | g:Máy giặt - Công nghệ | s:toshiba-lifestyle.com/vn
Công nghệ Aroma+ giúp gì cho quần áo? | Tối ưu thời gian tiếp xúc với nước xả, giúp quần áo mềm và lưu hương lâu gấp 2 lần | Diệt khuẩn bằng nano bạc | Giặt bằng hơi nước nóng | Hòa tan bột giặt bằng cánh quạt | g:Máy giặt - Công nghệ | s:toshiba-lifestyle.com/vn
Động cơ Origin Inverter của Toshiba có đặc điểm gì? | Truyền động trực tiếp, vận hành êm ái, bền bỉ và tiết kiệm năng lượng | Tạo hơi nước nóng diệt khuẩn | Bộ lọc xơ vải diện tích lớn | Hệ thống tia nước phun xả sạch | g:Máy giặt - Công nghệ | s:toshiba-lifestyle.com/vn
Trong công nghệ Ag+ của Toshiba, các phân tử nano bạc được giải phóng từ đâu? | Mâm giặt | Ngăn đựng bột giặt | Ống cấp nước | Gioăng cửa | g:Máy giặt - Công nghệ | s:toshiba-lifestyle.com/vn
Công nghệ CycloneMix hoạt động như thế nào? | Dòng nước mạnh làm quay cánh quạt nhỏ trong ngăn chứa, hòa tan chất giặt tẩy và tạo bọt siêu mịn | Tia nước phun giúp xả sạch dư lượng | Luồng nước đảo chiều giúp giặt nhanh | Giữ hương nước xả lâu gấp đôi | g:Máy giặt - Công nghệ | s:toshiba-lifestyle.com/vn
Công nghệ Rain Spray có tác dụng gì? | Các tia nước đưa chất giặt tẩy thấm sâu vào sợi vải và xả sạch dư lượng còn sót lại | Cánh quạt nhỏ hòa tan chất giặt tẩy | Giặt bằng hơi nước nóng | Giữ lại 1/4 lượng nước cuối chu trình | g:Máy giặt - Công nghệ | s:toshiba-lifestyle.com/vn
Theo trang sản phẩm, AW-T08D1600LV(MK) có dung tích giặt, số mực nước và loại động cơ nào? | 15 kg, 8 mực nước, truyền động trực tiếp | 10 kg, 4 mực nước, truyền động trực tiếp | 15 kg, 8 mực nước, động cơ có dây đai | 8 kg, 8 mực nước, truyền động trực tiếp | g:Máy giặt - Công nghệ | s:toshiba-lifestyle.com/vn
Tiện ích nắp máy trợ lực trên máy giặt cửa trên Toshiba giúp tránh điều gì? | Kẹt tay | Tràn nước | Rung lắc khi vắt | Trẻ em bật máy | g:Máy giặt - Công nghệ | s:toshiba-lifestyle.com/vn`;

const nk=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/[^a-z0-9 ]+/g,' ').replace(/\s+/g,' ').trim();
const wordSet=s=>new Set(nk(s).split(' ').filter(w=>w.length>1));
const jac=(a,b)=>{const A=wordSet(a),B=wordSet(b);let i=0;A.forEach(w=>{if(B.has(w))i++});const u=A.size+B.size-i;return u?i/u:0};
function parseLines(t){
  const items=[],bad=[];
  String(t).split('\n').forEach(l=>{
    l=l.trim();if(!l||l.startsWith('#'))return;
    const p=l.split('|').map(x=>x.trim()).filter(Boolean);let g='',s='';const o=[];
    p.forEach((x,i)=>{if(i>1&&/^g:/i.test(x))g=x.slice(2).trim();else if(i>1&&/^s:/i.test(x))s=x.slice(2).trim();else o.push(x)});
    if(o.length<3){bad.push(l);return}
    const a=o[1],w=o.slice(2,5),opts=[a,...w];
    if(new Set(opts.map(nk)).size<opts.length){bad.push(l);return}
    items.push({q:o[0],a,w,g:g||'Khác',s})
  });
  return{items,bad}
}
const isDup=(a,b)=>nk(a.q)===nk(b.q)||jac(a.q,b.q)>=.8;
function addItems(bank,items){const added=[],dups=[];for(const it of items){const hit=bank.find(b=>isDup(b,it));if(hit)dups.push({it,hit});else{bank.push(it);added.push(it)}}return{added,dups}}
function findDups(bank){const out=[];for(let i=0;i<bank.length;i++)for(let j=i+1;j<bank.length;j++)if(isDup(bank[i],bank[j]))out.push([i,j]);return out}
const toText=b=>b.map(x=>[x.q,x.a,...x.w,'g:'+x.g,...(x.s?['s:'+x.s]:[])].join(' | ')).join('\n');
function getBank(){
  let b=LS.get('msTD_bank3',null);if(Array.isArray(b))return b;
  b=[];addItems(b,parseLines(GENERAL).items);addItems(b,parseLines(WASHER).items);
  const old=LS.get('msTD_bank2',null);if(typeof old==='string')addItems(b,parseLines(old).items);
  LS.set('msTD_bank3',b);return b
}
const setBank=b=>LS.set('msTD_bank3',b);

