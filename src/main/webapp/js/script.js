document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.header_burger');
    const menu = document.querySelector('.header_menu');
    const body = document.querySelector('body');
  
    burger.addEventListener('click', function(event) {
      burger.classList.toggle('active');
      menu.classList.toggle('active');
      body.classList.toggle('lock');
    });
  });

async function authorization() {
    var form = document.getElementById("loginForm");

    console.log(form.username.value)

    // Получаем значения полей ввода
    const username = form.username.value
    const password = form.password.value

    // Отправляем данные на сервер
    try {
        const response = await fetch('/login', { // Убедитесь, что путь соответствует вашему серверу
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        });

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('jwtToken', data['jwt']);
            window.location.href = '/'; // Перенаправление на защищенную страницу
        } else {
            const errorData = await response.json();
            alert(errorData.message || 'Ошибка при входе'); // Показываем сообщение об ошибке
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при подключении к серверу');
    }
}