async function deleteRecipe(event) {
  event.preventDefault();

  const recipeId = document.querySelector("#recipe-id").innerHTML;
  console.log(recipeId);

  if (recipeId) {
    const response = await fetch(`/api/recipes/${recipeId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("Deleting the recipe failed. Please try again.");
    }
  }
}

const deleteButton = document.querySelector("#delete-recipe-button");
deleteButton.addEventListener("click", deleteRecipe);
