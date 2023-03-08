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
  