const containerFunc = ({element, movieRenderLogic,dataFetch,onSelectMovieWrapper,onMovieTemplate}) => {
//   console.log(element);
    element.innerHTML = `
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

  const inputSearch = element.querySelector("input");
  const resultBox = element.querySelector("#resultBox");
  const resultContent = element.querySelector("#resultContent");
  const searchContainer = element.querySelector("#searchBox");

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

      newElement.innerHTML = movieRenderLogic(item);

      // This eventlistener start doing shit with each item/movie

      newElement.addEventListener("click", (e) => {
        resultBox.classList.remove("isActive");

        inputSearch.value = item.Title;

        onSelectMovieWrapper(item);
      });

      resultContent.appendChild(newElement);
    });
  };

  inputSearch.addEventListener("input", shield(onType, 500));

   // Aha I see you
  document.addEventListener("click", (e) => {
    if (!searchContainer.contains(e.target)) {
      resultBox.classList.remove("isActive");
    }
  });
};
