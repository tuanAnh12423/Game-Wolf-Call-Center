function RULES(){return`
<h2>Luật chơi Ma Sói Tổng Đài (bản điện thoại)</h2>
<p>Cả phòng là một <b>ca trực tổng đài</b>. Ẩn trong ca là <b>Mã Lỗi</b> muốn đánh sập ca trực. Không ai phải nhắm mắt: mọi lựa chọn bí mật đều bấm trên điện thoại của mình. <b>Điểm mới:</b> mỗi đêm ai cũng phải trả lời 1 câu hỏi nghiệp vụ, và <b>kỹ năng chỉ có hiệu lực khi trả lời đúng</b>. Ai giỏi nghiệp vụ thì phe đó mạnh.</p>
<h3>Ván chuẩn 5 người</h3>
<p>1 Mã Lỗi, 1 Giám sát QA, 1 Kỹ thuật viên, 2 Tổng đài viên. <b>Hạn chót: hết Ngày 2.</b> MC không chơi, chỉ điều khiển màn hình máy tính (có thể chiếu lên máy chiếu). Bộ vai và hạn chót được công bố trước, chỉ không biết ai giữ vai nào.</p>
${['wolf','seer','guard','villager'].map(k=>`<div class="rl">${svg(k)}<div><b>${ROLE[k].n}</b> <span class="small">· ${ROLE[k].team}</span><div>${ROLE[k].p}</div><div class="small">${ROLE[k].g}</div></div></div>`).join('')}
<h3>Cách chơi</h3>
<ol>
<li><b>Vào phòng:</b> MC tạo phòng, mọi người quét QR và nhập tên. MC bấm "Chia vai". Vai tự hiện trên điện thoại, đọc xong bấm "Úp vai".</li>
<li><b>Nhân vật:</b> chia vai xong, mỗi người được bốc 1 nhân vật riêng (màu áo + phụ kiện như tai nghe, mũ bảo hộ, kính). Nhân vật công khai, không liên quan đến vai.</li>
<li><b>Đêm (60 giây), mỗi đêm một phòng mới:</b> Đêm 1 Kho bảo hành, Đêm 2 Phòng tổng đài, Đêm 3 Xưởng sửa chữa, rồi lặp lại. Chạm sàn để đi, đến gần đồ vật có dấu ! vàng thì bấm "Làm nhiệm vụ": phía trên là kỹ năng theo vai, phía dưới là câu hỏi trắc nghiệm của đồ vật đó. <b>Tầm nhìn có hạn:</b> trên điện thoại chỉ thấy người trong vòng sáng quanh mình; đồ vật ở xa luôn hiện dấu ! vàng, đến gần mới biết đã có người làm hay chưa. Máy chiếu ẩn nhân vật và dấu nhiệm vụ ban đêm. Mã Lỗi chọn người để đánh sập ở bất kỳ đâu, chỉ cần trả lời đúng câu hỏi.</li>
<li><b>Dấu vết:</b> sáng ra, bảng thông báo cho biết lệnh đánh sập được gửi từ khu nào trong phòng (nửa bên trái hoặc nửa bên phải, kèm tên các đồ vật có nhiệm vụ ở nửa đó), tức là nơi Mã Lỗi đã làm nhiệm vụ. Đây là manh mối chính để tranh luận: ai đã làm nhiệm vụ ở khu đó, ai đã thấy ai trong vòng sáng của mình.</li>
<li><b>Trời sáng, thông báo kết quả:</b> mọi điện thoại và màn hình MC cùng hiện bảng kết quả đêm: ai rời ca (lộ vai), hay Kỹ thuật viên đã cứu được người, hay Mã Lỗi trả lời sai nên đêm bình yên; số câu cả ca trả lời đúng; có manh mối được phát hay không; còn mấy ngày đến hạn chót. Tin riêng (kết quả soi, manh mối, đáp án đúng) hiện ngay dưới bảng trên điện thoại của từng người.</li>
<li><b>Ngày, tranh luận ngoài đời (3 phút):</b> điện thoại chỉ hiện "Đặt điện thoại xuống, tranh luận!", dấu vết và vài câu hỏi gợi ý. Cả nhóm nói chuyện trực tiếp: dấu vết chỉ về khu nào, đêm qua ai làm nhiệm vụ ở đâu, câu hỏi là gì, chọn đáp án nào, thấy ai trong vòng sáng. Kể lại câu hỏi và đáp án vừa là bằng chứng ngoại phạm vừa là ôn bài. Được nói dối. Màn hình MC chiếu phòng họp, dấu vết và câu hỏi gợi ý.</li>
<li><b>Bỏ phiếu bí mật (60 giây):</b> người nhiều phiếu nhất (không hoà và nhiều hơn số phiếu bỏ qua) bị đưa ra xử lý. Bảng kết quả phiếu hiện lên cho cả phòng.</li>
<li><b>Phao nghiệp vụ:</b> người bị bầu trả lời 2 câu. Đúng cả 2 thì ở lại ca (vai vẫn bí mật); sai 1 câu là rời ca và lộ vai. Mỗi người chỉ có 1 lần phao.</li>
<li><b>Ngụy trang của Mã Lỗi:</b> mỗi Mã Lỗi có 1 lần ngụy trang. Đêm nào Mã Lỗi trả lời đúng mà bị Giám sát QA soi trúng, Giám sát QA sẽ thấy "không phải Mã Lỗi". Mã Lỗi được báo riêng là đã dùng ngụy trang. Lần soi trúng sau sẽ ra kết quả thật.</li>
<li><b>Thiếu người?</b> Ở phòng chờ, MC bấm "+ Thêm bot". Bot tự đi làm nhiệm vụ, tự trả lời câu hỏi (đúng khoảng 70%), ban ngày "nói" vài câu hiện trên máy chiếu và điện thoại, và tự bỏ phiếu. Mặc định bot không nhận vai Mã Lỗi để cuộc truy tìm diễn ra giữa người thật. Bot có thể là Giám sát QA hoặc Kỹ thuật viên, nên lời bot nói cũng là manh mối.</li>
<li>Lặp lại đêm và ngày đến khi có phe thắng.</li>
</ol>
<h3>Điều kiện thắng</h3>
<ul><li><b>Phe Tổng đài</b> thắng khi loại hết Mã Lỗi trước hạn chót.</li>
<li><b>Phe Mã Lỗi</b> thắng khi: còn ít nhất 1 Mã Lỗi sau khi bỏ phiếu ngày cuối (hạn chót), <b>hoặc</b> số Mã Lỗi bằng số người phe Tổng đài.</li>
<li>Số Mã Lỗi và hạn chót tự động: 4–7 người có 1 Mã Lỗi, hạn chót hết Ngày 2; 8 người có 2 Mã Lỗi, không hạn chót; 9–13 người có 2 Mã Lỗi, hạn chót hết Ngày 6; từ 14 người có 3 Mã Lỗi, không hạn chót. MC có thể tắt hạn chót khi tạo phòng.</li></ul>
<h3>Vì sao chỉnh như vậy (kiểm tra cân bằng)</h3>
<p>Tôi chạy mô phỏng 20.000–40.000 ván cho mỗi cỡ phòng. Mô hình còn thô: người chơi ảo bỏ phiếu ngẫu nhiên trong số người chưa được xác nhận trong sạch và không biết nói dối, nên đây là xu hướng chứ không phải con số chính xác.</p>
<ul>
<li>Luật đầu tiên, 5 người: Mã Lỗi chỉ thắng khoảng 11%, 6 người khoảng 6%, vì phe Tổng đài có quá nhiều thông tin.</li>
<li>Thêm hạn chót và manh mối từ Đêm 2: Mã Lỗi lên khoảng 30% với 5 người.</li>
<li>Thêm Ngụy trang và chỉnh lại số Mã Lỗi theo số người (bản hiện tại): Mã Lỗi thắng khoảng 42% với 5 người, 48–49% với 4, 6 và 8 người, 54% với 7 người, 41–54% với 9–13 người. Ngoài đời Mã Lỗi còn biết nói dối, nên hai phe dự kiến gần ngang nhau.</li>
<li>Hạn chót còn giúp ván ngắn và đều (5 người: tối đa 2 đêm, 2 ngày, khoảng 10–12 phút), nên một buổi training chơi được nhiều ván, mọi người được thử nhiều vai.</li>
<li>Mọi kỹ năng vẫn phụ thuộc vào trả lời đúng: ai giỏi nghiệp vụ thì phe đó mạnh. Người đã rời ca vẫn trả lời câu hỏi để lấy KPI.</li>
</ul>
<h3>Tính điểm cuối ván</h3>
<p>Điểm KPI (mỗi câu đúng +1) + 3 điểm nếu thuộc phe thắng + điểm "nghi đúng" (Tổng đài viên mỗi đêm chọn đúng Mã Lỗi là người mình nghi). Người cao điểm nhất ván được vinh danh, dù thuộc phe nào. <b>Chơi nhiều ván:</b> bấm "Ván tiếp theo (cộng dồn điểm)", điểm các ván tự cộng theo tên người chơi. Cuối buổi, ai tổng điểm cao nhất là <b>TĐV xuất sắc của buổi</b>; bằng điểm thì ai trả lời đúng nhiều câu hơn đứng trên, vẫn bằng thì đồng hạng. Bấm "Xoá tổng điểm" khi sang buổi training khác. Người chơi nên giữ nguyên tên giữa các ván. Màn hình MC có bảng "Câu hỏi khó nhất" để biết nội dung nào cần training lại.</p>
<h3>Điều chỉnh nếu chơi thật thấy lệch</h3>
<ul><li>Mã Lỗi thắng quá nhiều: tăng thời gian thảo luận, hoặc tắt hạn chót cho nhóm mới chơi.</li><li>Phe Tổng đài thắng quá nhiều: giảm thời gian đêm xuống 40 giây, hoặc dùng nhóm câu hỏi khó hơn.</li><li>Ghi lại phe thắng sau mỗi ván; sau khoảng 10 ván sẽ thấy rõ cần chỉnh theo hướng nào.</li></ul>`}
