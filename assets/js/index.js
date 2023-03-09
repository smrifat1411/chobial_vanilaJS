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

const leftSec = document.querySelector("#left_section");

leftSec.innerHTML = `
          <div id="searchBox">
          <h1 class="text-3xl text-center" > Search for a Movie</h1>
          <div id="searchBar" class="relative h-3 items-center content-center flex">
          <span class="text-gray-400 absolute left-4 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </span>
          <input
            type="text"
            class="text-lg ring-1 bg-transparent ring-gray-200 dark:ring-zinc-600 focus:ring-blue-700 pl-10 pr-5 text-gray-600 dark:text-zinc-900 py-3 rounded-full w-full outline-none focus:ring-1"
            placeholder="Search ..."
          />

        </div>
        
        

        <div id="resultBox" class="normal bg-green-600">
          <div id="resultContent" class="flex flex-col">
        
          </div>
        </div>
           </div>
`;

const inputSearch = document.querySelector("input");

const resultBox = document.querySelector("#resultBox");
const resultContent = document.querySelector("#resultContent");
const searchContainer = document.querySelector("#searchBox");
// console.log(resultBox);

// Function that look after when user type on searchbox

const onType = async (e) => {
  let allItems = await dataFetch(e.target.value);

  resultContent.innerHTML = "";

  if (!allItems.length) {
    resultBox.classList.remove("isActive");
    return;
  }

  resultBox.classList.add("isActive");

  // play with data that we receive

  allItems.forEach((item) => {
    // individual item looping from fetched data

    const newElement = document.createElement("a");
    // div.classList.add("max-w-[360px]");

    const imgSrc = item.Poster;

    imgSrc === "N/A"
      ? (newElement.innerHTML = `
      <div
      id="searchItem"
      class=""
    >
    <span class="text-[18px] text-zinc-900">${item.Title}</span>
    </div>
    `)
      : (newElement.innerHTML = `
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
              
    `);

    // This eventlistener start doing shit with each item/movie

    newElement.addEventListener("click", (e) => {
      resultBox.classList.remove("isActive");

      inputSearch.value = item.Title;

      onSelectMovie(item);
    });

    resultContent.appendChild(newElement);
  });
};

inputSearch.addEventListener("input", shield(onType, 500));

document.addEventListener("click", (e) => {
  // Aha I see you

  if (!searchContainer.contains(e.target)) {
    resultBox.classList.remove("isActive");
  }
});




// searchBox auto complete main function 


const autoComplete =(element)=>{
  
}





// helper function for fetch eatch item data by id

const onSelectMovie = async (obj) => {
  let id = obj.imdbID
  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: "f82024a5",
      i:id
    },
  });

  document.querySelector("#summary").innerHTML=onMovieTemplate(response.data)

};

// helper function for doing all task after fetch a single item by id 

const onMovieTemplate = (itemObj)=>{
  return `
  <div
            class="flex p-2 gap-5 bg-slate-400 shadow-md hover:shodow-lg rounded-2xl"
          >
          <img src="${itemObj.Poster}" width="150px" height="200px" alt="">
            <div class="flex flex-col">
              <h1 class="text-2xl">${itemObj.Title}</h1>
              <h4 class="py-3 text-xl">${itemObj.Genre}</h4>
              <p class="pt-2">${itemObj.Plot}</p>

            </div>
          </div>
  `

}

// inputSearch.addEventListener("click", (e) => {console.log(e.target);});

//  tmp code
// searchBox.addEventListener("input", (event)=>{
//   onType(event)
// });
