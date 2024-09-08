// Отримуємо дані з localStorage
const user = JSON.parse(localStorage.getItem('user'));

// Отримуємо ID користувача
fetch(`https://jsonplaceholder.typicode.com/users/${user.id}`)
    .then(res => res.json())
    .then(user => {
        // Звертаємось до загального контейнера (info-of-user)
        const infoOfUser = document.getElementById('info-of-user');

        // Ітеруємо ключі об'єкта
        for (const key in user) {
            // Створюємо окремий блок де буде міститись повна інформація про user
            const newUser = document.createElement('div');
            newUser.classList.add('allUserInfo');

            // Перевіряємо, чи не являється значення ключа об'єктом
            if (typeof user[key] !== 'object') {
                const li = document.createElement('li');
                li.innerHTML = `<strong>${key}</strong> ----- ${user[key]}`;

                // Додаємо елемент li
                newUser.appendChild(li);

            } else {
                const ul = document.createElement('ul');

                // Додаємо ключ
                ul.innerHTML = `<strong>${key}</strong>`;

                // Ітеруємо вкладені об'єкти
                for (const subKey in user[key]) {
                    const li = document.createElement('li');
                    li.innerHTML = `<strong>${subKey}</strong> ----- ${user[key][subKey]}`;
                    // Додаємо вкладену інформацію
                    ul.appendChild(li);
                }
                // Додаємо список ul
                newUser.appendChild(ul);
            }
            // Додаємо newUser в контейнер
            infoOfUser.appendChild(newUser);
        }
    });

// Звертаємось до кнопки
const button = document.getElementById('post-title');

// Додаємо подію кліку на кнопку
button.addEventListener('click', () => {
    // Отримуємо POSTS користувача
    fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/posts`)
        .then(res => res.json())
        .then(posts => {
            // Звертаємось до контейнера де міститимуться всі пости користувача
            const postsCont = document.getElementById('posts-container');

            // Очищаємо контейнер перед додаванням нових постів
            postsCont.innerHTML = '';

            // Застосовуємо метод forEach для кожного поста
            posts.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.innerText = `Title: ${post.title}`;

                // Додаємо кнопку/посилання на сторінку post-details.html
                const buttonOfPosts = document.createElement('button');
                buttonOfPosts.classList.add('button');
                buttonOfPosts.innerText = 'Post-details';

                // Додаємо подію кліку на кнопку
                buttonOfPosts.onclick = function () {
                    // Зберігаємо пост у localStorage
                    localStorage.setItem('post', JSON.stringify(post));

                    // Переходимо на сторінку з деталями поста
                    window.location.href = `post-details.html?postId=${post.id}`;
                };

                postDiv.appendChild(buttonOfPosts);
                postsCont.appendChild(postDiv);
            });
        });
});





