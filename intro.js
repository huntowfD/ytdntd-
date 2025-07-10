document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('introScreen');
    const introHeart = document.getElementById('introHeart');
    const progressBarFill = document.getElementById('progressBarFill');
    const introMessage = document.getElementById('introMessage');

    const animationDuration = 5000; // 5 giây (tính bằng mili giây)
    let startTime = null;
    let animationFrameId; // Để quản lý requestAnimationFrame

    // Hàm thực hiện chuyển trang chính
    function proceedToMainPage() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId); // Dừng animation nếu đang chạy
        }
        introScreen.classList.add('fade-out'); // Thêm class để kích hoạt hiệu ứng mờ dần
        
        // Chờ hiệu ứng mờ dần kết thúc (thời gian này khớp với transition trong CSS)
        introScreen.addEventListener('transitionend', () => {
            window.location.href = 'index.html'; // Chuyển hướng sang trang chính
        }, { once: true }); // Đảm bảo listener chỉ chạy một lần
    }

    // Vòng lặp animation để cập nhật thanh tiến trình và vị trí trái tim
    function animateProgress(currentTime) {
        if (!startTime) startTime = currentTime; // Ghi lại thời điểm bắt đầu animation
        const elapsedTime = currentTime - startTime; // Thời gian đã trôi qua
        const progress = Math.min(elapsedTime / animationDuration, 1); // Tính tiến độ từ 0 đến 1

        // Cập nhật chiều rộng của thanh tiến trình
        progressBarFill.style.width = `${progress * 100}%`;

        // Cập nhật vị trí của trái tim
        // Lấy chiều rộng thực tế của thanh container và trái tim
        const progressBarContainerWidth = progressBarFill.parentElement.offsetWidth;
        const heartWidth = introHeart.offsetWidth;
        // Tính toán vị trí tối đa mà trái tim có thể di chuyển
        const maxHeartLeft = progressBarContainerWidth - heartWidth;
        // Di chuyển trái tim
        introHeart.style.left = `${progress * maxHeartLeft}px`;

        if (progress < 1) {
            // Tiếp tục vòng lặp animation nếu chưa hoàn thành
            animationFrameId = requestAnimationFrame(animateProgress);
        } else {
            // Nếu animation đã hoàn tất, chuyển trang
            proceedToMainPage();
        }
    }

    // Xử lý sự kiện click vào trái tim
    introHeart.addEventListener('click', () => {
        if (!startTime) { // Chỉ bắt đầu animation nếu chưa chạy
            introHeart.classList.add('moving'); // Thêm class 'moving' để thay đổi style (ví dụ: dừng pulse)
            introHeart.style.cursor = 'default'; // Thay đổi con trỏ chuột
            introMessage.textContent = 'Đang tải...'; // Cập nhật thông điệp
            
            startTime = performance.now(); // Bắt đầu tính thời gian animation
            animationFrameId = requestAnimationFrame(animateProgress); // Bắt đầu vòng lặp animation
        }
    });

    // Lúc ban đầu, không có đếm ngược tự động. Người dùng phải bấm vào trái tim.
    // Thông điệp ban đầu được hiển thị trong HTML.
});
