const debounceInput = document.getElementById("input");
const defaultData = document.getElementById("default-data");
const debounceData = document.getElementById("debounce-data");
const throttleData = document.getElementById("throttle-data");

debounceInput.addEventListener("input", (e) => {
  defaultData.textContent = e.target.value;
  updateDebounceData(e.target.value);
  updateThrottleData(e.target.value);
});

function debounce(callback, delay = 1000) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}

function throttle(callback, delay = 1000) {
  let timer;
  let waitingArgs;
  let shouldWait = false;

  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false;
    } else {
      callback(...waitingArgs);
      waitingArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args;
      return;
    }

    callback(...args);
    shouldWait = true;
    setTimeout(timeoutFunc, delay);
  };
}

const updateDebounceData = debounce((text) => {
  debounceData.textContent = text;
}, 1000);

const updateThrottleData = throttle((text) => {
  console.log("Text", text);
  throttleData.textContent = text;
}, 1000);
