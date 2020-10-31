function teamsHtml(data) {
  let teamsHTML = "";
  data.teams.forEach(function (team) {
    teamsHTML += `
                <div class="col s12 m6 l6">
                    <div class="card card-team center blue-grey darken-3">
                        <a href="./team.html?id=${team.id}">
                        <div class="card-image waves-effect waves-light">
                            <img src="${team.crestUrl}" class="image-team center-align" alt="logo team"/>
                        </div>
                        </a>
                        <div class="card-content">
                        <span class="card-title truncate">${team.name}</span>
                        <p class="truncate">${team.venue}</p>
                        </div>
                    </div>
                </div>
            `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("teams").innerHTML = teamsHTML;
  });
}

function pointsHtml(data) {
  let pointsHTML = "";
  data.standings[0].table.forEach(function (standing) {
    pointsHTML += `
                <tr>
                  <td>${standing.position}</td>
                  <td>${standing.team.name}</td>
                  <td class="hide-on-small-only">${standing.playedGames}</td>
                  <td class="hide-on-small-only">${standing.won}</td>
                  <td class="hide-on-small-only">${standing.draw}</td>
                  <td class="hide-on-small-only">${standing.lost}</td>
                  <td class="hide-on-med-and-down">${standing.goalsFor}</td>
                  <td class="hide-on-med-and-down">${standing.goalsAgainst}</td>
                  <td class="hide-on-med-and-down">${standing.goalDifference}</td>
                  <td class="purple-text" style="font-weight:bold">${standing.points}</td>
                </tr>
    `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-table-standings").innerHTML = pointsHTML;
  });
}

function teamById(data) {
  let squadHTML = "";
  let teamHTML = `
              <div class="row">
                <div class="col s12 m4 l6 center">
                  <img
                    src="${data.crestUrl}"
                    class="image-team"
                    alt="logo team"
                  />
                </div>
                <div class="col s12 m8 l6">
                  <h5>${data.name}</h5>
                  <p>
                    ${data.address} <br />
                    ${data.venue} <br />
                    ${data.website}
                  </p>
                </div>
              </div>
              <h4>Squad</h4>
              <div class="row">
                <table class="highlight">
                  <thead class="purple-text text-accent-4">
                    <tr>
                      <th id="">Name</th>
                      <th id="">Position</th>
                      <th id="" class="hide-on-small-only">Date of Birth</th>
                      <th id="" class="hide-on-small-only">Country of Birth</th>
                      <th id="">Nationality</th>
                    </tr>
                  </thead>
                  <tbody id="body-table">  
                  </tbody>
                </table>
              </div>
            `;
  document.getElementById("body-content").innerHTML = teamHTML;
  data.squad.forEach(function (squad) {
    let dateBirth = getDateBirthSquad(squad.dateOfBirth);
    squadHTML += `
                <tr>
                  <td>${squad.name}</td>
                  <td>${squad.position}</td>
                  <td class="hide-on-small-only">${dateBirth}</td>
                  <td class="hide-on-small-only">${squad.countryOfBirth}</td>
                  <td>${squad.nationality}</td>
                </tr>
              `;
    document.getElementById("body-table").innerHTML = squadHTML;
  });
}

function matchResult(data) {
  let matchesHTML = "";
  data.matches.forEach(function (match) {
    let dateMatch = getMyDate(match.utcDate);
    matchesHTML += `
                <div class="card blue-grey darken-3">
                    <div class="card-content">
                      <div class="center-align text-date-match">
                          <h5>${dateMatch}</h5>
                        </div>
                        <div class="center-align">
                          <span> ${match.status} </span>
                        </div>
                        <div class="row center-align">
                          <div class="col s6 m6 l6 row-match">
                            <div>
                              <img
                                src="https://crests.football-data.org/${match.homeTeam.id}.svg"
                                alt="hometeam"
                                class="image-match"
                              />
                            </div>
                            <span class="truncate">
                              ${match.homeTeam.name}                        
                            </span>
                            <p class="card-title title-score">
                              ${match.score.fullTime.homeTeam}
                            </p>
                          </div>
                          <div class="col s6 m6 l6 row-match">
                            <div>
                              <img
                                src="https://crests.football-data.org/${match.awayTeam.id}.svg"
                                alt="awayteam"
                                class="image-match"
                              />
                            </div>
                            <span class="truncate">
                              ${match.awayTeam.name}
                            </span>
                            <p class="card-title title-score">
                              ${match.score.fullTime.awayTeam}
                            </p>
                          </div>
                        </div>
                    </div>    
                </div>
              `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("match-card-content").innerHTML = matchesHTML;
  });
}

function favoriteTeams(data) {
  let teamsHTML = "";
  data.forEach(function (team) {
    teamsHTML += `
            <div class="col s12 m12 l12">
                <div class="card card-team center blue-grey darken-3">
                    <a href="./team.html?id=${team.id}&favorited=true">
                      <div class="card-image waves-effect waves-light">
                          <img src="${team.crestUrl}" class="image-team center-align" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${team.name}</span>
                      <p class="truncate">${team.venue}</p>
                    </div>
                </div>
            </div>
        `;
    // Sisipkan komponen card ke dalam elemen dengan id #teams
    document.getElementById("teams").innerHTML = teamsHTML;
  });
}

function favoriteById(data) {
  let squadHTML;
  let teamHTML = `
      <div class="row">
                <div class="col s12 m4 l6 center">
                  <img
                    src="${data.crestUrl}"
                    class="image-team"
                    alt=""
                  />
                </div>
                <div class="col s12 m8 l6">
                  <h5>${data.name}</h5>
                  <p>
                    ${data.address} <br />
                    ${data.venue} <br />
                    ${data.website}
                  </p>
                </div>
      </div>
      <h4>Squad</h4>
      <div class="row">
                <table class="highlight">
                  <thead class="purple-text text-accent-4">
                    <tr>
                      <th id="">Name</th>
                      <th id="">Position</th>
                      <th id="" class="hide-on-small-only">Date of Birth</th>
                      <th id="" class="hide-on-small-only">Country of Birth</th>
                      <th id="">Nationality</th>
                    </tr>
                  </thead>
                  <tbody id="body-table">  
                  </tbody>
                </table>
      </div>
    `;
  // Sisipkan komponen card ke dalam elemen
  document.getElementById("body-content").innerHTML = teamHTML;
  data.squad.forEach(function (squad) {
    let dateBirth = getDateBirthSquad(squad.dateOfBirth);
    squadHTML += `
            <tr>
              <td>${squad.name}</td>
              <td>${squad.position}</td>
              <td class="hide-on-small-only">${dateBirth}</td>
              <td class="hide-on-small-only">${squad.countryOfBirth}</td>
              <td>${squad.nationality}</td>
            </tr>
          `;
    document.getElementById("body-table").innerHTML = squadHTML;
  });
}

function getMyDate(date) {
  let dt = new Date(date);
  let dateResult = moment(dt).format("LLLL");
  return dateResult;
}
function getDateBirthSquad(date) {
  let dt = new Date(date);
  let dateResult = moment(dt).format("MMM Do YYYY");
  return dateResult;
}
