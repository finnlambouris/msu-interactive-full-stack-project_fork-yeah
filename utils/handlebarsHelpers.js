module.exports = {
    to_json: (data) => {
        return JSON.stringify(data);
    },

    // This function takes a string of ingredients separated by commas and returns a list of ingredients.
    makeList: (ingredientsOrInstructions) => {
        const array = [];
        array.push(...ingredientsOrInstructions.split(", "));
        return array;
    }
}