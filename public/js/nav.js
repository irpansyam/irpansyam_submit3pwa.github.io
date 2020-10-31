document.addEventListener("DOMContentLoaded", function () {
  // Activate sidebar nav
  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // Daftarkan event listener untuk setiap tautan menu
        document
          .querySelectorAll(".sidenav a, .topnav a")
          .forEach(function (elm) {
            elm.addEventListener("click", function (event) {
              // Tutup sidenav
              let sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();

              page = event.target.getAttribute("href").substr(1);
              console.log("Click " + page);
              if (page == "" || page == "home") {
                document.getElementById("carousel-container").style.display =
                  "block";
              } else if (page == "match" || page == "favorite") {
                document.getElementById("carousel-container").style.display =
                  "none";
              }
              // Muat konten halaman yang dipanggil
              loadPage(page);
            });
          });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }
});

// Load page content
let page = window.location.hash.substr(1);
if (page == "") {
  page = "home";
  document.getElementById("carousel-container").style.display = "block";
} else if (page == "match") {
  document.getElementById("carousel-container").style.display = "none";
} else if (page == "favorite") {
  document.getElementById("carousel-container").style.display = "none";
}
loadPage(page);

function loadPage(page) {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      let content = document.querySelector("#body-content");
      if (page === "home") {
        getAllTeams();
      } else if (page === "match") {
        getMatchResult();
      } else if (page === "favorite") {
        getFavoriteTeams();
      }

      if (this.status == 200) {
        content.innerHTML = xhttp.responseText;
      } else if (this.status == 404) {
        content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
      } else {
        content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
      }
    }
  };
  xhttp.open("GET", "pages/" + page + ".html", true);
  xhttp.send();
}
