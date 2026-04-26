(function () {
    console.log("Блокировка рекламы активирована");

    // Подменяем проверку подписки (премиум аккаунт)
    window.Account = window.Account || {};
    window.Account.hasPremium = () => true;

    // Ломаем создание <video> для рекламы
    document.createElement = new Proxy(document.createElement, {
        apply(target, thisArg, args) {
            if (args[0] === "video") {
                console.log("Перехватываем создание <video> для рекламы!");

                let fakeVideo = target.apply(thisArg, args);

                // Запрещаем рекламе воспроизводиться
                fakeVideo.play = function () {
                    console.log("Рекламное видео заблокировано!");
                    setTimeout(() => {
                        fakeVideo.ended = true;
                        fakeVideo.dispatchEvent(new Event("ended")); // Эмулируем завершение рекламы
                    }, 500);
                };
