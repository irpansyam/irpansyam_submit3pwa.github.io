let dbPromised = idb.open("premier-league", 1, function (upgradeDb) {
  let favoritesObjectStore = upgradeDb.createObjectStore("teamFavorites", {
    keyPath: "id",
  });
  favoritesObjectStore.createIndex("name", "name", {
    unique: false,
  });
});

function saveFavoriteTeam(team) {
  dbPromised
    .then(function (db) {
      let tx = db.transaction("teamFavorites", "readwrite");
      let store = tx.objectStore("teamFavorites");
      console.log(team);
      store.put(team);
      return tx.complete;
    })
    .then(function () {
      M.toast({
        html: `${team.name} success add to favorites!`,
        classes: "rounded",
      });
      console.log("Team favorite berhasil di simpan.");
    });
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        let tx = db.transaction("teamFavorites", "readonly");
        let store = tx.objectStore("teamFavorites");
        return store.getAll();
      })
      .then(function (favorites) {
        resolve(favorites);
      });
  });
}

function getById(id) {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("teamFavorites", "readonly");
        var store = tx.objectStore("teamFavorites");
        return store.get(parseInt(id));
      })
      .then(function (data) {
        resolve(data);
      });
  });
}

function deleteFavorite(id) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("teamFavorites", "readwrite");
      var store = tx.objectStore("teamFavorites");
      store.delete(parseInt(id));
      return tx.complete;
    })
    .then(function () {
      M.toast({ html: "Item success deleted!", classes: "rounded" });
      console.log("Item deleted");
    });
}
