let contentSearch = [];
const searchBar = document.getElementById("search");
searchBar.addEventListener("submit", (e) => {
  e.preventDefault();
  const valuesearch = document
    .querySelector('input[name="search"]')
    .value.toLowerCase();

  const filtersearch = contentSearch.filter((value) => {
    return value[0].questionTitle.toLowerCase().includes(valuesearch);
  });
  console.log(filtersearch);

  localStorage.setItem("search", JSON.stringify(filtersearch));
  window.location.href = `./search.html?search=${valuesearch}`;
});
const btnsearchMobile = document.querySelector(".btn-search-mobile");
if (btnsearchMobile) {
  btnsearchMobile.addEventListener("click", () => {
    const valuesearch = document
      .querySelector('input[name="search-mobile"]')
      .value.toLowerCase();
    const filtersearch = contentSearch.filter((value) => {
      return value[0].questionTitle.toLowerCase().includes(valuesearch);
    });
    localStorage.setItem("search", JSON.stringify(filtersearch));
    window.location.href = `./search.html?search=${valuesearch}`;
  });
} else {
}

var docRef = db.collection("userCreatedQuiz").doc("SF");

db.collection("userCreatedQuiz").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    let quizzes = Object.keys(doc.data());
    let quizset = doc.data();
    quizzes.forEach((quiz) => {
      if (!(quiz === "email" || quiz === "displayName" || quiz === "profilePic")) {
        quizset[quiz][0].search = quiz;
        console.log(quizset[quiz][0].search);
        contentSearch.push(quizset[quiz]);
        console.log(quizset[quiz][0]);
        // customQuizzes.push
      }
    });
  });
});

fetch("https://apiquizizz.herokuapp.com/quizzes")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    Object.keys(data).forEach((element) => {
      // console.log(data[element]);
      contentSearch.push(data[element]);
    });
  });
const searchMobile = document.getElementById("search-mobile");
const btnSearch = document.querySelector(".btn-search");
if (searchMobile && btnSearch) {
  btnSearch.addEventListener("click", () => {
    btnSearch.classList.toggle("fa-times");
    searchMobile.classList.toggle("active");
  });
}