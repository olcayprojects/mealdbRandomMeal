document.addEventListener('DOMContentLoaded', () => {
    fetchRandomMeal();
});

function fetchRandomMeal() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            const meal = data.meals[0];
            updateMealDisplay(meal);
        })
        .catch(error => console.error('Yemek çekme hatası:', error));
}

function updateMealDisplay(meal) {
    const mealContainer = document.getElementById('meal');
    mealContainer.innerHTML = `
        <h2 class="animate__animated animate__fadeIn">${meal.strMeal} (${meal.strCategory})</h2>
        <img class="animate__animated animate__zoomIn" src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h2>Ingredients</h2>
        <ol>
        ${getIngredients(meal)}
        </ol>
        <h2>Instructions</h2>
        <p id="instructions" class="typewriter">${meal.strInstructions}</p>
    `;
}

function getIngredients(meal) {
    let ingredients = '';
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient) {
            // Malzeme adı kullanılarak küçük resim URL'si oluşturuluyor
            const imageUrl = `https://www.themealdb.com/images/ingredients/${encodeURIComponent(ingredient)}-Small.png`;
            ingredients += `
                <li class="animate__animated animate__backInRight" style="animation-duration: ${i}s;">
                    <img src="${imageUrl}" alt="${ingredient}">
                    ${ingredient} ${measure ? "("+measure+")" : ""}
                </li>`;
        }
    }
    return ingredients;
}
