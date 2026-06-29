// 主JavaScript文件 - 筑络社区交互功能

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initNavigation();
    initSearch();
    initButtons();
    initScrollEffects();
    initJoinButtons();
    initPostInteractions();
});

// 导航功能
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有active类
            navLinks.forEach(l => l.classList.remove('active'));
            
            // 添加active类到当前点击的链接
            this.classList.add('active');
            
            // 平滑滚动到对应区域
            const targetId = this.textContent.toLowerCase();
            scrollToSection(targetId);
        });
    });
}

// 搜索功能
function initSearch() {
    const searchInput = document.querySelector('.nav-search input');
    const searchButton = document.querySelector('.nav-search button');
    
    searchButton.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            // 模拟搜索功能
            showSearchResults(query);
        }
    }
}

// 按钮交互功能
function initButtons() {
    // 主要按钮点击效果
    const primaryButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    
    primaryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 添加点击动画
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // 根据按钮文本执行不同操作
            const buttonText = this.textContent.trim();
            handleButtonAction(buttonText);
        });
    });
}

// 滚动效果
function initScrollEffects() {
    // 观察器用于滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // 为需要动画的元素添加观察
    const animatedElements = document.querySelectorAll('.feature-card, .tieba-card, .group-card, .post-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// 加入按钮功能
function initJoinButtons() {
    const joinButtons = document.querySelectorAll('.join-btn, .join-group-btn');
    
    joinButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 获取父级卡片信息
            const card = this.closest('.tieba-card, .group-card');
            const title = card.querySelector('h3').textContent;
            
            // 切换按钮状态
            if (this.textContent === '加入贴吧' || this.textContent === '加入群组') {
                this.textContent = '已加入';
                this.style.background = '#27ae60';
                showToast(`成功加入 ${title}`);
            } else {
                this.textContent = this.classList.contains('join-btn') ? '加入贴吧' : '加入群组';
                this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
                showToast(`已退出 ${title}`);
            }
        });
    });
}

// 帖子交互功能
function initPostInteractions() {
    const likeButtons = document.querySelectorAll('.post-actions button:first-child');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const icon = this.querySelector('i');
            const currentText = this.textContent.trim();
            
            if (icon.classList.contains('fa-thumbs-up')) {
                // 点赞功能
                if (currentText === '点赞') {
                    this.innerHTML = '<i class="fas fa-thumbs-up"></i> 1';
                    icon.style.color = '#667eea';
                } else {
                    const count = parseInt(currentText) + 1;
                    this.innerHTML = `<i class="fas fa-thumbs-up"></i> ${count}`;
                }
                
                // 添加动画效果
                this.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 200);
            }
        });
    });
}

// 工具函数
function scrollToSection(sectionName) {
    const sections = {
        '首页': '.hero-section',
        '贴吧': '.tieba-section',
        '群组': '.groups-section',
        '社区': '.community-section'
    };
    
    const targetSelector = sections[sectionName];
    if (targetSelector) {
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

function showSearchResults(query) {
    // 模拟搜索结果显示
    const searchModal = document.createElement('div');
    searchModal.className = 'search-modal';
    searchModal.innerHTML = `
        <div class="modal-content">
            <h3>搜索: "${query}"</h3>
            <p>找到 15 个相关结果</p>
            <ul>
                <li>游戏交流贴吧</li>
                <li>程序员交流群</li>
                <li>音乐分享社区</li>
            </ul>
            <button class="close-modal">关闭</button>
        </div>
    `;
    
    // 添加样式
    searchModal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    `;
    
    searchModal.querySelector('.modal-content').style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        text-align: center;
    `;
    
    document.body.appendChild(searchModal);
    
    // 关闭模态框
    searchModal.querySelector('.close-modal').addEventListener('click', function() {
        document.body.removeChild(searchModal);
    });
    
    searchModal.addEventListener('click', function(e) {
        if (e.target === searchModal) {
            document.body.removeChild(searchModal);
        }
    });
}

function handleButtonAction(buttonText) {
    switch(buttonText) {
        case '立即加入':
            showJoinModal();
            break;
        case '浏览贴吧':
            scrollToSection('贴吧');
            break;
        default:
            // 默认操作
            break;
    }
}

function showJoinModal() {
    const modal = document.createElement('div');
    modal.className = 'join-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>加入筑络社区</h3>
            <p>立即注册账号，开始您的社区之旅</p>
            <form>
                <input type="text" placeholder="用户名" required>
                <input type="email" placeholder="邮箱" required>
                <input type="password" placeholder="密码" required>
                <button type="submit">注册</button>
            </form>
            <button class="close-modal">稍后再说</button>
        </div>
    `;
    
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
    `;
    
    modal.querySelector('.modal-content').style.cssText = `
        background: white;
        padding: 2rem;
        border-radius: 15px;
        max-width: 400px;
        width: 90%;
        text-align: center;
    `;
    
    modal.querySelector('form').addEventListener('submit', function(e) {
        e.preventDefault();
        showToast('注册成功！欢迎加入筑络社区');
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.close-modal').addEventListener('click', function() {
        document.body.removeChild(modal);
    });
    
    document.body.appendChild(modal);
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .search-modal input, .join-modal input {
        width: 100%;
        padding: 1rem;
        margin: 0.5rem 0;
        border: 1px solid #ddd;
        border-radius: 5px;
        font-size: 1rem;
    }
    
    .search-modal button, .join-modal button {
        width: 100%;
        padding: 1rem;
        margin: 0.5rem 0;
        background: #667eea;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
    }
    
    .close-modal {
        background: #95a5a6 !important;
    }
`;

document.head.appendChild(style);