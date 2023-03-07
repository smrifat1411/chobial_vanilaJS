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

// Debounced or shield function

const shield = (func,delay=1000) => {
  let remainDelay;

  // when shield called in eventlistener this function(childFunc) back as reference and addEventListener will call it automatically


  const childFunc =(event) => {
    if (remainDelay) {
      clearInterval(remainDelay);
    }
    remainDelay = setTimeout(() => {
      func(event);
    }, delay);
  };

  return childFunc
};

// Function that look after when user type on searchbox

onType = (e) => {
  dataFetch(e.target.value);
};


searchBox.addEventListener("input", shield(onType,500));


//  tmp code
// searchBox.addEventListener("input", (event)=>{
//   onType(event)
// });
