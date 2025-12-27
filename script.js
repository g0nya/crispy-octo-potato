// Предупреждаем пользователя при первом посещении
if (!localStorage.getItem('scrimerWarningShown')) {
    setTimeout(() => {
        alert('⚠️ ВНИМАНИЕ! вилена пидорша ⚠️');
        localStorage.setItem('scrimerWarningShown', 'true');
    }, 1000);
}

const logo = document.getElementById('logo');

// Флаг для отслеживания, был ли уже скример
let scrimerTriggered = false;

logo.addEventListener('click', function(event) {
    event.preventDefault();
    
    if (scrimerTriggered) {
        alert('Скример уже был показан! Обновите страницу для повторного просмотра.');
        return;
    }
    
    scrimerTriggered = true;
    
    // Создаем страшную сцену
    const scaryScene = document.createElement('div');
    scaryScene.id = 'scaryScene';
    scaryScene.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: #000;
            z-index: 9999;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            animation: colorFlash 0.5s linear infinite;
        ">
            <!-- Страшное лицо -->
            <div style="
                font-size: 120px;
                text-align: center;
                margin-bottom: 20px;
                animation: shake 0.1s infinite, scalePulse 0.2s infinite alternate;
            ">
                👹
            </div>
            
            <!-- Текст BOO -->
            <h1 style="
                font-size: 100px;
                color: #ff0000;
                text-align: center;
                margin: 0;
                text-shadow: 0 0 20px #ff0000, 0 0 40px #ff0000;
                animation: textPulse 0.1s infinite;
                font-family: 'Arial Black', sans-serif;
            ">
                BOO!
            </h1>
            
            <!-- Дополнительный текст -->
            <p style="
                font-size: 30px;
                color: #ffffff;
                text-align: center;
                margin-top: 20px;
                text-shadow: 0 0 10px #ffffff;
                animation: fadeInOut 1s infinite alternate;
            ">
                Вас напугала Вилена!
            </p>
            
            <!-- Таймер закрытия -->
            <div style="
                position: absolute;
                bottom: 50px;
                color: #ccc;
                font-size: 16px;
            ">
                Автоматическое закрытие через: <span id="countdown">5</span> сек
            </div>
            
            <!-- Кнопка закрытия -->
            <button style="
                position: absolute;
                top: 30px;
                right: 30px;
                background: rgba(255,0,0,0.8);
                color: white;
                border: none;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                font-size: 30px;
                cursor: pointer;
                z-index: 10000;
                box-shadow: 0 0 20px rgba(255,0,0,0.5);
                transition: all 0.3s;
            " id="closeScrimerBtn">
                ×
            </button>
        </div>
        
        <!-- Стили анимаций -->
        <style>
            @keyframes colorFlash {
                0%, 100% { background-color: #000; }
                25% { background-color: #8b0000; }
                50% { background-color: #000; }
                75% { background-color: #660000; }
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0) rotate(0deg); }
                25% { transform: translateX(-20px) rotate(-5deg); }
                50% { transform: translateX(0) rotate(0deg); }
                75% { transform: translateX(20px) rotate(5deg); }
            }
            
            @keyframes textPulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.3); opacity: 0.8; }
                100% { transform: scale(1); opacity: 1; }
            }
            
            @keyframes scalePulse {
                0% { transform: scale(1); }
                100% { transform: scale(1.2); }
            }
            
            @keyframes fadeInOut {
                0% { opacity: 0.3; }
                100% { opacity: 1; }
            }
            
            body { overflow: hidden !important; }
        </style>
    `;
    
    // Добавляем страшный звук
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-horror-scream-389.mp3');
    audio.volume = 1.0;
    
    // Пытаемся воспроизвести звук
    audio.play().catch(e => {
        console.log("Автовоспроизведение заблокировано:", e);
        // Если автовоспроизведение заблокировано, просим пользователя взаимодействовать
        const playSoundBtn = document.createElement('button');
        playSoundBtn.textContent = '🎵 Включить звук скримера';
        playSoundBtn.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #ff0000;
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 30px;
            font-size: 18px;
            cursor: pointer;
            z-index: 10001;
            box-shadow: 0 0 20px rgba(255,0,0,0.7);
        `;
        playSoundBtn.onclick = () => {
            audio.play();
            playSoundBtn.remove();
        };
        scaryScene.querySelector('div').appendChild(playSoundBtn);
    });
    
    // Добавляем скример на страницу
    document.body.appendChild(scaryScene);
    
    // Обновляем логотип после срабатывания
    logo.style.background = 'linear-gradient(45deg, #333, #000)';
    logo.style.boxShadow = '0 4px 15px rgba(0,0,0,0.5)';
    logo.style.cursor = 'not-allowed';
    logo.title = 'Скример уже сработал! Обновите страницу.';
    
    // Таймер обратного отсчета
    let countdown = 5;
    const countdownElement = scaryScene.querySelector('#countdown');
    const countdownInterval = setInterval(() => {
        countdown--;
        if (countdownElement) {
            countdownElement.textContent = countdown;
        }
        if (countdown <= 0) {
            clearInterval(countdownInterval);
            removeScrimer();
        }
    }, 1000);
    
    // Функция удаления скримера
    function removeScrimer() {
        const scene = document.getElementById('scaryScene');
        if (scene) {
            // Анимация исчезновения
            scene.style.animation = 'fadeOut 0.5s forwards';
            
            // Добавляем анимацию исчезновения
            const fadeStyle = document.createElement('style');
            fadeStyle.textContent = `
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(fadeStyle);
            
            // Удаляем через 0.5 секунды
            setTimeout(() => {
                scene.remove();
                fadeStyle.remove();
                document.body.style.overflow = 'auto';
                audio.pause();
                audio.currentTime = 0;
            }, 500);
        }
    }
    
    // Кнопка закрытия
    const closeBtn = scaryScene.querySelector('#closeScrimerBtn');
    if (closeBtn) {
        closeBtn.addEventListener('click', removeScrimer);
    }
    
    // Закрытие по клику на фон
    scaryScene.addEventListener('click', function(event) {
        if (event.target.id === 'scaryScene' || event.target.id === 'closeScrimerBtn') {
            removeScrimer();
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && document.getElementById('scaryScene')) {
            removeScrimer();
        }
    });
});

// Добавляем вибрацию на мобильных устройствах (если поддерживается)
logo.addEventListener('touchstart', function() {
    if (navigator.vibrate) {
        navigator.vibrate([100]); // Короткая вибрация при касании
    }
});