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


leftSec.innerHTML=`
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
        
        <div id="resultBox" class="">
          <div id="resultContent" class="flex flex-col w-[360px]">
        
          </div>
        </div>
`

const inputSearch = document.querySelector("input")

const resultBox = document.querySelector("#resultBox")
const resultContent = document.querySelector("#resultContent")
// console.log(resultBox);

// Function that look after when user type on searchbox

const onType = async (e) => {
  let allItems = await dataFetch(e.target.value);
 



// play with data that we receive 

  allItems.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("searchitem");

    const imgSrc = item.Poster;

    imgSrc === "N/A"
      ? (div.innerHTML = `
      <div
      id="searchItem"
      class=""
    >
    <span class="text-[18px] text-zinc-900">${item.Title}</span>
    </div>
    `)
      : (div.innerHTML = `
      <div
      id="searchItem"
      class=" "
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

    resultContent.appendChild(div);
  });
};

inputSearch.addEventListener("input", shield(onType, 500));


document.addEventListener("click",e=>{
  if (!leftSec.contains(e.target)) {
    console.log("clicked");
  }
  console.log("also clicked");
})

// inputSearch.addEventListener("click", (e) => {console.log(e.target);});

//  tmp code
// searchBox.addEventListener("input", (event)=>{
//   onType(event)
// });
