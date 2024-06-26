document.getElementById("convert").addEventListener("click", () => {
  const currency = document.getElementById("currency").value;
  const amount = document.getElementById("amount").value;
  const loader = document.getElementById("loader");
  const result = document.getElementById("result");

  if (!amount) {
    alert("Proszę wpisać kwotę.");
    return;
  }

  if (amount <= 0) {
    alert("Wprowadź kwotę większą niż 0.");
    return;
  }

  loader.style.display = "block";
  result.innerHTML = "";

  fetch(`https://api.nbp.pl/api/exchangerates/rates/a/${currency}/?format=json`)
    .then((response) => response.json())
    .then((data) => {
      const rate = data?.rates?.[0]?.mid;
      if(rate) {
        const convertedAmount = (amount * rate).toFixed(2);
        result.innerHTML = `to ${convertedAmount} PLN`;
      } else {
        alert("Nie udało się pobrać kursów wymiany.");
      }
})
    .catch((error) => {
      console.error("Błąd podczas pobierania kursów wymiany:", error);
      alert("Nie udało się pobrać kursów wymiany. Spróbuj ponownie później.");
    })
    .finally(() => {
      loader.style.display = "none";
    });
});
