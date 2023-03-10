// Responsible Function for Data Fetching

const dataFetch = async (searchInput) => {
  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: "f82024a5",
      s: searchInput,
      // i:"tt0375093"
    },
  });

  if (response.data.Response == "False") {
    return [];
  }
  return response.data.Search;
};

// Check if any broken image link has or not
const movieRenderLogic = (item) => {
  const imgSrc =
    item.Poster === "N/A"
      ? "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
      : item.Poster;

  return `
  <div
  id="searchItem"
  class=" cursor-pointer"
>

  <img
    class="max-w-[20px] max-h-[30px] xl:max-w-[30px] xl:max-h-[40px]"
    src="${imgSrc}"
    alt=""
    width="40"
    height="50"
  />
  <span class="text-[18px] text-zinc-900">${item.Title}</span>
</div>
  `;
};

// helper function for fetch eatch item data by id

const onSelectMovie = async (obj, summaryElement) => {
  let id = obj.imdbID;
  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: "f82024a5",
      i: id,
    },
  });


console.log(response.data);
  summaryElement.innerHTML = onMovieTemplate(response.data);
};


const onSelectMovieWrapper = (obj) => {
  onSelectMovie(obj, document.querySelector("#right-summary"));
};
// helper function for doing all task after fetch a single item by id

const onMovieTemplate = (itemObj) => {
  const imgSrc =
    itemObj.Poster === "N/A"
      ? "https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
      : itemObj.Poster;
  return `
  <div id="image-details-box"
            class="flex p-2 gap-5 bg-slate-400 shadow-md hover:shodow-lg rounded-2xl"
          >
          <img src="${imgSrc}" width="150px" height="200px" alt="">
            <div class="flex flex-col">
              <h1 class="text-2xl">${itemObj.Title}</h1>
              <h4 class="py-3 text-xl">${itemObj.Genre}</h4>
              <p class="pt-2">${itemObj.Plot}</p>
              

            </div>
          </div>
  `;
};

const leftSec = document.querySelector("#left_section");
const rightSec = document.querySelector("#right_section");

containerFunc({
  element: leftSec,
  movieRenderLogic,
  dataFetch,
  onSelectMovieWrapper(obj){
    onSelectMovie(obj,document.querySelector('#left-summary'))
   },
  // onSelectMovieWrapper,

  onMovieTemplate,
});
containerFunc({
  element: rightSec,
  movieRenderLogic,
  dataFetch,
  onSelectMovieWrapper(obj){
    onSelectMovie(obj,document.querySelector('#right-summary'))
   },

  onMovieTemplate,
});


//  containerFunc({element:rightSec,
//   movieRenderLogic,
//   dataFetch,
//   onSelectMovie,
//   onMovieTemplate});
// containerFunc({rightSec, movieRenderLogic,dataFetch});
