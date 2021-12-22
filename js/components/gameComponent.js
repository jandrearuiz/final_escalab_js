export const gameComponent = `
<div class="wrap">
  <div class="header">
    <h1 class="title">JAN-KEN-PO</h1>
    <button class="btn__logout" id="btn-logout" type="button">Logout</button>
  </div>
      <div class="container">
        <aside class="score">
          <div class="score__content">
            <h2 class="score__title">Game Score</h2>
            <span id="initial-score"></span>
            <ul class="score__list" id="score-item"></ul>
          </div>
          <div id="history-data" class="historical__content">
            <h2 class="score__title">Score Last Games</h2>
          </div>
        </aside>
        <div id="result" class="result">
          <h2 id="result-title" class="result__title"></h2>
          <div class="game">
            <div class="game__player"> 
              <h2 class="title__gamer" >PLAYER</h2>
              <div id="player-selection" class="player">
              </div>
            </div>   
            <div class="game__computer"> 
              <h2 class="title__gamer">COMPUTER</h2>         
              <div id="computer-selection" class="computer">
              </div>
            </div>   
          </div>         
        </div>
      </div>
    </div>
`;
