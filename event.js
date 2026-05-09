 const input = document.getElementById("myInput");
  const output = document.getElementById("output");

  // Attach an event listener for input change
  input.addEventListener("input", (event) => {
    output.textContent = "You typed: " + event.target.value;
  });