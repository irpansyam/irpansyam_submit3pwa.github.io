document.addEventListener("DOMContentLoaded", function () {
  let urlParams = new URLSearchParams(window.location.search);
  let isFavorite = urlParams.get("favorited");
  let idDelete = urlParams.get("id");
  let favorite = document.getElementById("favorite");
  let deleteFav = document.getElementById("delete-fav");
  let item;
  let elems = document.querySelectorAll(".tooltipped");
  M.Tooltip.init(elems, "top");

  if (isFavorite) {
    favorite.style.display = "none";
    getTeamFavoriteById();
  } else {
    deleteFav.style.display = "none";
    item = getTeamById();
  }

  favorite.onclick = function () {
    console.log("favorite click");
    item.then(function (team) {
      saveFavoriteTeam(team);
      favorite.style.display = "none";
    });
  };

  deleteFav.onclick = function () {
    deleteFavorite(idDelete);
  };
});
