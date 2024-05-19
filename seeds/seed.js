const sequelize = require("../config/connection");
const { User, Recipe } = require("../models/index.js");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(
    [
      {
        username: "spidermanfan",
        password: "password",
      },
      {
        username: "chloeprice",
        password: "password",
      },
      {
        username: "monkeyball",
        password: "password",
      },
      {
        username: "iluvskiing",
        password: "password",
      },
    ],
    {
      individualHooks: true,
      returning: true,
    }
  );

  await Recipe.bulkCreate(
    [
      {
        name: "Buffalo Chicken Dip",
        ingredients: "chicken, ranch, hot sauce, cream cheese, shredded cheese",
        instructions:
          "Boil the chicken, Preheat the oven to 350 degrees, Shred the chicken, Combine all ingredients in a bowl, Mix everything up, Bake 20 minutes or until heated through",
        photo:
          "https://res.cloudinary.com/dxmr5ennx/image/upload/v1715901823/forkYeah/aveilbb7i13gio5uags9.jpg",
        user_id: 1,
      },
      {
        name: "Puppy Chow",
        ingredients:
          "chex cereal, chocolate chips, peanut butter, vanilla, powdered sugar, butter",
        instructions:
          "Pour the cereal into large bowl, Heat the chocolate chips, peanut butter, and butter on the stove at low heat, stirring regularly until melted, Remove from heat and stir in the vanilla, Pour over cereal and stir until evenly coated, Add the cereal and powdered sugar into a bag and shake it up, Spread over wax paper to cool",
        photo:
          "https://res.cloudinary.com/dxmr5ennx/image/upload/v1715902044/forkYeah/f6tmwjkaz09rlao9ix6m.jpg",
        user_id: 2,
      },
      {
        name: "Ribs",
        ingredients:
          "brown sugar, paprika, cayenne, garlic powder, salt, pepper, onions, garlic BBQ sauce",
        instructions:
          "Make the rub out of the dry ingredients, Fill the dish with some water, onions, and garlic, Massage the rub into the meat, Cook at 300 degrees for 3 hours, Put ribs on grill and brush sauce onto them",
        photo:
          "https://res.cloudinary.com/dxmr5ennx/image/upload/v1715902319/forkYeah/xp5oa6mssmwa4rf0uxpo.jpg",
        user_id: 3,
      },
      {
        name: "Piña Coladas",
        ingredients:
          "frozen pineapple, pineapple juice, coconut cream, ice, rum",
        instructions:
          "Throw everything in a blender and go ham, Add as much white rum as needed, Enjoy!",
        photo:
          "https://res.cloudinary.com/dxmr5ennx/image/upload/v1715902545/forkYeah/wgybswck1m6gorr032ib.webp",
        user_id: 4,
      },
    ],
    {
      individualHooks: true,
      returning: true,
    }
  );
};

seedDatabase();
