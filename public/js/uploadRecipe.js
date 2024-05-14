async function upload(event) {
    event.preventDefault();
  
    const recipeName = document.querySelector('#recipe-name').value;
    const recipeIngredients = document.querySelector('#recipe-ingredients').value;
    const recipeInstructions = document.querySelector('#recipe-instructions').value;
  
    const response = await fetch(`/recipe`, {
      method: 'POST',
      body: JSON.stringify({
        name: recipeName,
        ingredients: recipeIngredients,
        instructions: recipeInstructions,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    // if (response.ok) {
    //   document.location.replace('/');
    // } else {
    //   alert('Account creation failed. Please try again.');
    // }
  }

const recipeForm = document.querySelector('#recipe-form')
recipeForm.addEventListener('submit', upload);