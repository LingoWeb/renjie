// 等待DOM加載完成
document.addEventListener('DOMContentLoaded', function() {
    // 導航欄功能
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // 漢堡選單切換
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // 點擊導航連結時關閉選單
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // 平滑滾動到錨點
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // 檢查是否為同一頁面的錨點連結
            if (targetId.startsWith('#') || targetId.includes('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // 考慮固定導航欄高度
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
            // 如果是外部頁面連結，讓瀏覽器正常處理
        });
    });

    // 滾動時導航欄樣式變化
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        }
    });


    // 電子郵件驗證函數
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 通知函數
    function showNotification(message, type) {
        // 創建通知元素
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // 添加樣式
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        // 根據類型設置背景色
        if (type === 'success') {
            notification.style.background = '#10b981';
        } else if (type === 'error') {
            notification.style.background = '#ef4444';
        }

        // 添加到頁面
        document.body.appendChild(notification);

        // 顯示動畫
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // 自動移除
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // 滾動動畫
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            const isSlide = el.classList.contains('slide-in-left') || el.classList.contains('slide-in-right');

            if (isSlide) {
                // 僅使用左右滑入效果，避免與向上淡入的 transform 衝突
                el.classList.add('in-view');
            } else {
                // 其他元素使用原本的向上淡入
                el.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // 觀察需要動畫的元素
    const animateElements = document.querySelectorAll('.service-card, .stat-item, .contact-item, .slide-in-left, .slide-in-right, .reveal');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // 服務頁：上方分類列點擊滾動到對應區塊
    const topCategoryLinks = document.querySelectorAll('.services-categories a');
    if (topCategoryLinks.length) {
        topCategoryLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // 滾動到對應區塊
                    const offsetTop = targetSection.offsetTop - 100;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
                
                // 高亮上方分類
                document.querySelectorAll('.services-categories a').forEach(a => a.classList.remove('is-active'));
                this.classList.add('is-active');
            });
        });
    }

    // 按鈕點擊效果
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // 創建漣漪效果
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // 數字計數動畫
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-item h3');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent);
            const increment = target / 100;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + '+';
            }, 20);
        });
    }

    // 當關於我們區塊進入視窗時觸發數字動畫
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        aboutObserver.observe(aboutSection);
    }

    // 添加CSS動畫樣式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // 滾動到頂部按鈕
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        transition: all 0.3s ease;
        opacity: 0;
        visibility: hidden;
        z-index: 1000;
    `;

    document.body.appendChild(scrollToTopBtn);

    // 滾動時顯示/隱藏回到頂部按鈕
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });

    // 點擊回到頂部
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 滑鼠懸停效果
    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 20px rgba(37, 99, 235, 0.4)';
    });

    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.3)';
    });

    // 載入動畫
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // 鍵盤導航支援
    document.addEventListener('keydown', function(e) {
        // ESC鍵關閉導航選單
        if (e.key === 'Escape') {
            if (hamburger) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });

    // 點擊外部關閉導航選單
    document.addEventListener('click', function(e) {
        if (hamburger && navMenu) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        }
    });

    // 聯絡表單處理
    const contactFormElement = document.getElementById('contactForm');
    if (contactFormElement) {
        contactFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const successMessage = document.getElementById('successMessage');
            const errorMessage = document.getElementById('errorMessage');
            
            // 隱藏之前的訊息
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            
            // 取得表單資料
            const formData = new FormData(contactFormElement);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // 顯示載入狀態
            submitBtn.textContent = '送出中...';
            submitBtn.disabled = true;
            
            // 使用 mailto 連結發送 Email
            // const mailtoLink = `mailto:info@ren-jie.com.tw?subject=網站聯絡表單 - ${encodeURIComponent(name)}&body=${encodeURIComponent(`姓名：${name}\n電話：${phone}\nEmail：${email}\n\n訊息：\n${message}`)}`;
            const mailtoLink = `mailto:yilinchen0703@gmail.com?subject=網站聯絡表單 - ${encodeURIComponent(name)}&body=${encodeURIComponent(`姓名：${name}\n電話：${phone}\nEmail：${email}\n\n訊息：\n${message}`)}`;
            
            // 嘗試開啟郵件客戶端
            try {
                window.location.href = mailtoLink;
                
                // 顯示成功訊息
                setTimeout(() => {
                    successMessage.style.display = 'flex';
                    contactFormElement.reset();
                    submitBtn.textContent = '送出';
                    submitBtn.disabled = false;
                }, 1000);
                
            } catch (error) {
                // 如果無法開啟郵件客戶端，顯示錯誤訊息
                errorMessage.style.display = 'flex';
                submitBtn.textContent = '送出';
                submitBtn.disabled = false;
            }
        });
    }
});

// 會員登入表單功能
document.addEventListener('DOMContentLoaded', function() {
    // 驗證碼重新生成功能
    const refreshCaptchaBtn = document.querySelector('.refresh-captcha');
    const captchaText = document.querySelector('.captcha-text');
    
    if (refreshCaptchaBtn && captchaText) {
        refreshCaptchaBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 生成新的驗證碼
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let newCaptcha = '';
            for (let i = 0; i < 4; i++) {
                newCaptcha += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            
            captchaText.textContent = newCaptcha;
            
            // 清空驗證碼輸入框
            const captchaInput = document.querySelector('#captcha');
            if (captchaInput) {
                captchaInput.value = '';
            }
        });
    }
    
    // 登入表單提交處理
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const account = document.querySelector('#login-account').value;
            const password = document.querySelector('#password').value;
            const captcha = document.querySelector('#captcha').value;
            const captchaText = document.querySelector('.captcha-text').textContent;
            
            // 基本驗證
            if (!account || !password || !captcha) {
                alert('請填寫所有必填欄位');
                return;
            }
            
            // 驗證碼檢查
            if (captcha.toLowerCase() !== captchaText.toLowerCase()) {
                alert('驗證碼錯誤，請重新輸入');
                // 重新生成驗證碼
                if (refreshCaptchaBtn) {
                    refreshCaptchaBtn.click();
                }
                return;
            }
            
            // 這裡可以添加實際的登入邏輯
            alert('登入功能開發中，請稍後再試');
        });
    }
    
    // 免費註冊按鈕處理
    const registerBtn = document.querySelector('.btn-register');
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            alert('註冊功能開發中，請稍後再試');
        });
    }
    
    // 忘記密碼連結處理
    const forgotPasswordLink = document.querySelector('.forgot-password');
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('忘記密碼功能開發中，請稍後再試');
        });
    }
});