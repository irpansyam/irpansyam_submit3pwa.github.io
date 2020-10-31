const base_url = "https://api.football-data.org/v2/";
const apiKey = "04f6cf67a5ad4f288f0847714771fba4";

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(errors) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + errors);
}

const fetchApi = (url) => {
  return fetch(url, {
    mode: "cors",
    method: "GET",
    headers: {
      "X-Auth-Token": apiKey,
    },
  });
};

// Get all Premier Teams
function getAllTeams() {
  if ("caches" in window) {
    caches.match(base_url + "competitions/PL/teams").then(function (response) {
      if (response) {
        response.json().then(function (data) {
          teamsHtml(data);
        });
      }
    });
  }

  fetchApi(base_url + "competitions/PL/teams")
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data);
      teamsHtml(data);
    })
    .catch(error);
}

function getStandingPoints() {
  if ("caches" in window) {
    caches
      .match(base_url + "competitions/2021/standings")
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            pointsHtml(data);
          });
        }
      });
  }
  fetchApi(base_url + "competitions/2021/standings")
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data);
      pointsHtml(data);
    })
    .catch(error);
}

function getTeamById() {
  return new Promise(function (resolve, reject) {
    // Ambil nilai query parameter (?id=)
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(base_url + "teams/" + idParam).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            console.log(data);
            teamById(data);
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }
    fetchApi(base_url + "teams/" + idParam)
      .then(status)
      .then(json)
      .then(function (data) {
        // Objek JavaScript dari response.json() masuk lewat variabel data.
        console.log(data);
        // Menyusun komponen card artikel secara dinamis
        teamById(data);
        // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
        resolve(data);
      });
  });
}

function getMatchResult() {
  if ("caches" in window) {
    caches
      .match(base_url + "competitions/PL/matches?status=FINISHED")
      .then(function (response) {
        if (response) {
          response.json().then(function (data) {
            matchResult(data);
          });
        }
      });
  }

  fetchApi(base_url + "competitions/PL/matches?status=FINISHED")
    .then(status)
    .then(json)
    .then(function (data) {
      console.log(data);
      matchResult(data);
    })
    .catch(error);
}

function getFavoriteTeams() {
  let info = document.getElementById("info-data-empty");
  getAll().then(function (data) {
    console.log(data);
    if (data == 0) {
      info.style.display = "block";
    }
    favoriteTeams(data);
  });
}

function getTeamFavoriteById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  console.log("idParam = " + idParam);

  getById(idParam)
    .then(function (data) {
      favoriteById(data);
    })
    .catch(error);
}
