async function upload(event) {
    event.preventDefault();

    console.log("worked");
  
    const recipeName = document.querySelector('#recipe-name').value;
    const recipeIngredients = document.querySelector('#recipe-ingredients').value;
    const recipeInstructions = document.querySelector('#recipe-instructions').value;
    const recipePhoto = document.querySelector('#recipe-photo').files[0]

    console.log(recipeName);
    console.log(recipeIngredients);
    console.log(recipeInstructions);
    console.log(recipePhoto);
  
    // const response = await fetch(`/upload`, {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     recipeIngredients: recipeIngredients,
    //     recipeInstructions: recipeInstructions,
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
  
    // if (response.ok) {
    //   document.location.replace('/');
    // } else {
    //   alert('Account creation failed. Please try again.');
    // }
  }

const recipeForm = document.querySelector('#recipe-form')
recipeForm.addEventListener('submit', upload);