const dataFetch = async (searchInput) => {
  const response = await axios.get("https://www.omdbapi.com/", {
    params: {
      apikey: "f82024a5",
      s: searchInput,
      // i:"tt0375093"
    },
  });

  console.log(response.data);
};

const searchBox = document.querySelector("#searchbox");

// Function that look after when user type on searchbox
let remainDelay;
const onType = (e) => {
  if (remainDelay) {
    clearInterval(remainDelay);
  }

  remainDelay = setTimeout((e) => {
    dataFetch(e.target.value);
  }, 1000);
};

searchBox.addEventListener("input", onType);
