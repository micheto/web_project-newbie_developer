document.getElementById('new-recipe-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Получаване на данните от формуляра
    const title = document.getElementById('recipe-title').value;
    const description = document.getElementById('recipe-description').value;
    const image = document.getElementById('recipe-image').files[0];

    if (!image) {
        alert("Моля, добавете снимка!");
        return;
    }

    // Създаване на нова рецепта
    const reader = new FileReader();
    reader.onload = function(e) {
        const recipeList = document.getElementById('recipe-list');

        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        recipeCard.innerHTML = `
            <h3>${title}</h3>
            <img src="${e.target.result}" alt="Снимка на рецептата">
            <p>${description}</p>
        `;

        recipeList.appendChild(recipeCard);
    };

    reader.readAsDataURL(image);

    // Нулиране на формуляра
    document.getElementById('new-recipe-form').reset();
});
