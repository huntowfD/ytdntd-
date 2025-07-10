document.addEventListener('DOMContentLoaded', () => {
    const birthdayMessage = document.getElementById('birthdayMessage');
    const wishMessage = document.getElementById('wishMessage');
    const birthdayMusic = document.getElementById('birthdayMusic'); 
    const playMusicPrompt = document.getElementById('playMusicPrompt'); // Lấy lại phần tử thông báo phát nhạc

    // Đặt ngày sinh nhật: (năm, tháng (0-11), ngày, giờ, phút, giây)
    // Ví dụ: 27 tháng 7 năm 2025
    const birthdayDate = new Date(2025, 6, 27, 0, 0, 0); 
    
    function initializeBirthdayPage() {
        const now = new Date();
        const diff = birthdayDate.getTime() - now.getTime();

        if (diff <= 0) { // Nếu đã đến hoặc qua ngày sinh nhật
            birthdayMessage.classList.remove('hidden'); 
            wishMessage.innerHTML = 'Tớ hi vọng hôm nay sẽ là một trong những ngày hạnh phúc nhất của cậu.<br>'+
                                    'Mong mọi điều tốt đẹp nhất trên thế giới sẽ đến với cậu.<br>'+
                                    '"Trầm ngư lạc nhạn, bế nguyệt tu hoa" tớ nghĩ là rất hợp với cậu.<br>'+
                                    'Chúc Doanh luôn vui vẻ,bình an, hạnh phúc và nhận được thật nhiều tình yêu thương từ những người thân yêu.<br>'+
                                    'Những tâm nguyện của cậu sẽ đạt được trong tương lai gần, hi vọng lúc đấy tớ có thể bên cạnh đồng hành và hỗ trợ cậu.'
            wishMessage.classList.remove('hidden'); 
            
            createBubbles(); 
            createButterflies(); 
            
            if (birthdayMusic) {
                // Thử tự động phát nhạc
                birthdayMusic.play()
                    .then(() => {
                        // Nhạc đã phát thành công, ẩn thông báo
                        playMusicPrompt.classList.add('hidden');
                    })
                    .catch(e => {
                        // Tự động phát bị chặn, hiển thị thông báo để người dùng bấm
                        console.log("Tự động phát nhạc bị chặn:", e);
                        playMusicPrompt.classList.remove('hidden'); // HIỂN THỊ LẠI THÔNG BÁO
                        // Gán sự kiện click cho thông báo để người dùng có thể phát nhạc
                        playMusicPrompt.addEventListener('click', () => {
                            birthdayMusic.play().then(() => {
                                playMusicPrompt.classList.add('hidden'); // Ẩn sau khi phát
                            }).catch(err => console.log("Không thể phát nhạc sau khi click:", err));
                        }, { once: true }); // Chỉ lắng nghe 1 lần
                    });
            }
        } else { // Nếu chưa đến sinh nhật
            birthdayMessage.classList.add('hidden'); 
            wishMessage.innerHTML = 'Cứ tò mò đi nha, chưa đến sinh nhật đâu'; 
            wishMessage.classList.remove('hidden'); 
            playMusicPrompt.classList.add('hidden'); // Đảm bảo ẩn thông báo phát nhạc khi chưa đến sinh nhật
        }
    }

    // Hàm tạo bong bóng (với màu trong suốt hơn)
    function createBubbles() {
        const numberOfBubbles = 60; 
        const colors = [
            'rgba(255, 209, 220, 0.5)', // Hồng pastel (0.5 độ trong suốt)
            'rgba(176, 224, 230, 0.5)', // Xanh nhạt
            'rgba(216, 191, 216, 0.5)', // Tím nhạt
            'rgba(173, 216, 230, 0.5)', // Xanh dương nhạt
            'rgba(240, 255, 240, 0.5)', // Xanh lá cây nhạt
            'rgba(255, 250, 205, 0.5)', // Vàng nhạt
            'rgba(230, 230, 250, 0.5)', // Tím lavender nhạt
            'rgba(255, 160, 122, 0.5)', // Đỏ cam nhạt
            'rgba(143, 188, 143, 0.5)', // Xanh lá cây đậm nhạt
            'rgba(175, 238, 238, 0.5)', // Xanh ngọc
            'rgba(240, 128, 128, 0.5)', // Đỏ san hô
            'rgba(152, 251, 152, 0.5)', // Xanh lá cây tươi
            'rgba(224, 255, 255, 0.5)', // Xanh da trời nhạt
            'rgba(205, 92, 92, 0.5)', // Đỏ đậm nhạt
            'rgba(245, 245, 220, 0.5)', // Kem nhạt
            'rgba(255, 228, 225, 0.5)', // Hồng đào
            'rgba(135, 206, 250, 0.5)', // Xanh da trời
            'rgba(127, 255, 212, 0.5)', // Xanh mint
            'rgba(255, 222, 173, 0.5)'  // Vàng cam nhạt
        ]; 

        for (let i = 0; i < numberOfBubbles; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            
            const size = Math.random() * 40 + 20; 
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${Math.random() * 100}%`; 
            bubble.style.animationDelay = `${Math.random() * 5}s`; 
            bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;

            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            bubble.style.backgroundColor = randomColor; 

            document.body.appendChild(bubble); 
        }
    }

    // Hàm tạo bướm
    // Trong file script.js, tìm hàm createButterflies

function createButterflies() {
    const numberOfButterflies = 35; // ĐẶT LẠI SỐ LƯỢNG BƯỚM TỔNG CỘNG (có thể thay đổi số này)
    const animations = ['fly', 'fly2']; // Giữ nguyên các kiểu bay
    
    // ĐÂY LÀ CHỖ BẠN CẦN THAY ĐỔI: ĐỊNH NGHĨA 4 LOẠI ẢNH BƯỚM KHÁC NHAU
    // Đảm bảo bạn có 4 file ảnh này trong thư mục dự án của mình!
    // Ví dụ: butterfly1.png, butterfly2.png, butterfly3.png, butterfly4.png
    const butterflyImages = [
        'butterfly.png', 
        'butterfly2.png', 
        'butterfly3.png', 
        'butterfly4.png' 
        // Thêm/bớt ảnh bướm khác nếu bạn muốn có nhiều hơn/ít hơn 4 loại
    ];

    for (let i = 0; i < numberOfButterflies; i++) {
        const butterfly = document.createElement('img');
        
        // Chọn ngẫu nhiên một trong 4 loại ảnh bướm đã định nghĩa
        butterfly.src = butterflyImages[Math.floor(Math.random() * butterflyImages.length)];
        
        butterfly.classList.add('butterfly');
        
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight; 
        butterfly.style.left = `${startX}px`;
        butterfly.style.top = `${startY}px`;

        const size = Math.random() * 40 + 40; 
        butterfly.style.width = `${size}px`;
        butterfly.style.height = `auto`; 

        butterfly.style.animationDelay = `${Math.random() * 8}s`; 

        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        butterfly.style.animationName = randomAnimation;
        butterfly.style.animationDuration = `${Math.random() * 10 + 15}s`;

        document.body.appendChild(butterfly); 
    }
}


    initializeBirthdayPage(); 
});