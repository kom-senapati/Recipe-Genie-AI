export const TourSteps = [
  {
    id: "intro",
    attachTo: { element: "#main", on: "bottom" },
    buttons: [
      {
        classes: "btn btn-error btn-sm mr-2",
        text: "🚪 Exit",
        action() {
          return this.cancel();
        },
      },
      {
        classes: "btn btn-success btn-sm",
        text: "➡️ Next",
        action() {
          return this.next();
        },
      },
    ],
    title: "<span class='text-lg font-bold'>👋 Welcome to Recipe Genie</span>",
    text: [
      "<p>Recipe Genie is your go-to platform for discovering <b>delicious recipes</b> for all your favorite meals! 🍲</p>",
    ],
  },
  {
    id: "search",
    attachTo: { element: "#searchBar", on: "bottom" },
    buttons: [
      {
        classes: "btn btn-error btn-sm mr-2",
        text: "🚪 Exit",
        action() {
          return this.cancel();
        },
      },
      {
        classes: "btn btn-success btn-sm",
        text: "➡️ Next",
        action() {
          return this.next();
        },
      },
    ],
    title: "<span class='text-lg font-bold'>🔍 Search</span>",
    text: [
      "<p>Use the search bar to find <b>your favorite meals</b> and their recipes. Happy cooking! 🥘</p>",
    ],
  },
  {
    id: "random",
    attachTo: { element: "#randomMeal", on: "bottom" },
    buttons: [
      {
        classes: "btn btn-error btn-sm mr-2",
        text: "🚪 Exit",
        action() {
          return this.cancel();
        },
      },
      {
        classes: "btn btn-success btn-sm",
        text: "➡️ Next",
        action() {
          return this.next();
        },
      },
    ],
    title: "<span class='text-lg font-bold'>🎲 Random Meal</span>",
    text: [
      "<p>Feeling adventurous? Click here to get a <b>random meal recipe</b> and surprise yourself! 🍛</p>",
    ],
  },
  {
    id: "categories",
    attachTo: { element: ".categories", on: "bottom" },
    buttons: [
      {
        classes: "btn btn-error btn-sm mr-2",
        text: "🚪 Exit",
        action() {
          return this.cancel();
        },
      },
      {
        classes: "btn btn-success btn-sm",
        text: "🎉 Finish",
        action() {
          return this.complete();
        },
      },
    ],
    title: "<span class='text-lg font-bold'>📚 Categories</span>",
    text: [
      "<p>Explore our <b>diverse categories</b> to find the perfect meal for any occasion. Bon appétit! 🍽️</p>",
    ],
  },
];
