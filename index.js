// Отримуємо масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(users => {
        // Звертаємось до загального контейнера (user-container)
        const generalContainer = document.getElementById('user-container');
        // Запускаємо цикл
        for (const user of users) {
            // Створюємо окремий блок для кожного user та відображаємо id та name всіх user-ів
            const newUser = document.createElement('div');
            newUser.classList.add('user');
            const userId = document.createElement('h2');
            userId.innerText = `Id: ${user.id}`;
            const userName = document.createElement('h2');
            userName.innerText = `Name: ${user.name}`;
            // Додаємо кожному блоку кнопку/посилання (перехід на user-details.html)
            const button = document.createElement('button');
            button.classList.add('button');
            button.innerText = `Detailed information`;
            // Додаємо подію кліку на кнопку
            button.onclick = function () {
                // Зберігаємо об'єкт користувача у localStorage з ключем 'user'
                localStorage.setItem(`user`, JSON.stringify(user));
                // Переходимо на сторінку user-details.html
                window.location.href = `user-details.html?userid=${user.id}`;
            }
            newUser.append(userId, userName, button);
            generalContainer.appendChild(newUser);
        }
    });

