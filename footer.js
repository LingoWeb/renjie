// 頁腳程式碼 - 可重複使用
function createFooter() {
    const footerHTML = `
        <footer class="footer">
            <div class="contact-3col">
                <!-- 左：LOGO -->
                <div class="contact-logo">
                    <img src="img/logo.png" alt="仁傑開發 Logo">
                </div>

                <!-- 中：地址與電話 -->
                <div class="contact-details">
                    <h3>仁傑開發工程有限公司</h3>
                    <p class="contact-address"><a href="https://maps.app.goo.gl/JSmc4ArcYNiwg8hH7" target="_blank" rel="noopener">地址：<span style="color: #2563eb;">高雄市新興區民生一路56號22樓之5</span></a></p>
                    <p class="contact-address"><a href="https://maps.app.goo.gl/ZnqY8ArhCQ4srqDa8" target="_blank" rel="noopener">　　　<span style="color: #2563eb;">台南市東區自由路二段175巷29號</span></a></p>
                    <p class="contact-phone"><a href="tel:075353888">電話：<span style="color: #2563eb;">07-535-3888</span></a></p>
                    <p class="contact-fax"><a href="fax:073359888">傳真：<span style="color: #2563eb;">07-335-9888</span></a></p>
                </div>

                <!-- 右：Google 地圖 -->
                <div class="contact-map">
                    <iframe
                        title="Google Map"
                        src="https://www.google.com/maps?q=台南市東區自由路二段175巷29號&output=embed"
                        style="border:0;"
                        allowfullscreen=""
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            <div class="footer-bottom">
                <p>Copyright © 2025 仁傑開發工程有限公司. All rights reserved.</p>
            </div>
        </footer>
    `;
    
    // 將頁腳插入到 body 的最後
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// 當頁面載入完成後自動創建頁腳
document.addEventListener('DOMContentLoaded', createFooter);
