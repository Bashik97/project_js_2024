// Отримуємо дані з localStorage
const post = JSON.parse(localStorage.getItem('post'));

// Функція для виведення всіх ключів і значень з об'єкта за допомогою циклу
function displayObjectDetails(obj, container) {
    const ul = document.createElement('ul');

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            const li = document.createElement('li');

            // Перевіряємо, чи значення є об'єктом
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                li.innerHTML = `<strong>${key}</strong>:`;
                const nestedUl = document.createElement('ul');
                // Рекурсивно проходимо вкладені об'єкти
                displayObjectDetails(obj[key], nestedUl);
                li.appendChild(nestedUl);
            } else {
                li.innerHTML = `<strong>${key}</strong>: ${obj[key]}`;
            }
            ul.appendChild(li);
        }
    }
    container.appendChild(ul);
}

// Виводимо інформацію про пост
const postContainer = document.getElementById('post-container');
displayObjectDetails(post, postContainer);

// Отримуємо коментарі до поточного поста
fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
    .then(res => res.json())
    .then(comments => {
        const commentsCont = document.getElementById('comments-container');
        comments.forEach(comment => {
            // Виводимо кожен коментар як об'єкт
            const commentDiv = document.createElement('div');
            displayObjectDetails(comment, commentDiv);
            commentsCont.appendChild(commentDiv);
        });
    });
