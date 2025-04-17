<script lang="ts">
  import { games } from "./lib/games";
  import { onMount } from "svelte";

  let selectedGame: (typeof games)[0] | null = null;
  let searchId: string = "";
  let result: string | null = null;
  let showLetters: boolean = false;

  onMount(() => {
    // Restore selected game from localStorage
    const savedGameId = localStorage.getItem("selectedGameId");
    if (savedGameId) {
      const game = games.find((g) => g.id === savedGameId);
      if (game) {
        selectedGame = game;
      }
    }
  });

  function selectGame(game: (typeof games)[0]) {
    selectedGame = game;
    searchId = "";
    result = null;
    // Save selected game to localStorage
    localStorage.setItem("selectedGameId", game.id);
  }

  function goBack() {
    selectedGame = null;
    searchId = "";
    result = null;
    // Clear saved game from localStorage
    localStorage.removeItem("selectedGameId");
  }

  function search() {
    if (!searchId || !selectedGame) return;
    const phrase = selectedGame.phrases.find(
      (p) => p.id.toUpperCase() === searchId.toUpperCase()
    );
    result = phrase ? phrase.text : "Phrase not found";
  }

  function appendToInput(value: string) {
    searchId += value;
    if (showLetters) {
      showLetters = false;
    }
  }

  function clearInput() {
    searchId = "";
    result = null;
  }

  function backspace() {
    searchId = searchId.slice(0, -1);
  }

  function toggleLetters() {
    showLetters = !showLetters;
  }

  function handleImageError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src =
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDAgMjAwIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2RkZCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=";
  }
</script>

<main class="container">
  {#if !selectedGame}
    <div class="game-selection">
      <h1>Adventure Games Companion</h1>
      <div class="games-grid">
        {#each games as game}
          <button
            class="game-card {game.disabled ? 'disabled' : ''}"
            on:click={() => !game.disabled && selectGame(game)}
            disabled={game.disabled}
          >
            <img
              src={`/adventure-games${game.imageUrl}`}
              alt={game.name}
              on:error={handleImageError}
            />
            <h3>{game.name.split("(")[0].trim()}</h3>
          </button>
        {/each}
      </div>
    </div>
  {:else}
    <div class="search-interface">
      <div class="header">
        <button class="back-btn" on:click={goBack}>← Back to Games</button>
        <h1>{selectedGame.name}</h1>
      </div>

      <div class="search-layout">
        <div class="text-column">
          {#if result}
            <div class="result">
              <h2>Result:</h2>
              <p>{result}</p>
            </div>
          {:else}
            <div class="placeholder-text">
              <p>Enter a phrase ID to search for its corresponding text.</p>
            </div>
          {/if}
        </div>

        <div class="search-column">
          <div class="search-container">
            <div class="input-display">
              <div class="input-wrapper">
                <input
                  type="text"
                  bind:value={searchId}
                  placeholder="Enter phrase ID"
                  readonly
                />
                <button class="clear-btn" on:click={clearInput}>×</button>
              </div>
            </div>
          </div>

          <div class="keypad-container">
            <div class="numeric-keypad">
              {#if showLetters}
                <div class="phone-keypad">
                  <div class="phone-row">
                    <button class="key" on:click={() => appendToInput("A")}
                      >A</button
                    >
                    <button class="key" on:click={() => appendToInput("B")}
                      >B</button
                    >
                    <button class="key" on:click={() => appendToInput("C")}
                      >C</button
                    >
                    <button class="key" on:click={() => appendToInput("D")}
                      >D</button
                    >
                  </div>
                  <div class="phone-row">
                    <button class="key" on:click={() => appendToInput("E")}
                      >E</button
                    >
                    <button class="key" on:click={() => appendToInput("F")}
                      >F</button
                    >
                    <button class="key" on:click={() => appendToInput("G")}
                      >G</button
                    >
                    <button class="key" on:click={() => appendToInput("H")}
                      >H</button
                    >
                  </div>
                  <div class="phone-row">
                    <button class="key" on:click={() => appendToInput("I")}
                      >I</button
                    >
                    <button class="key" on:click={() => appendToInput("J")}
                      >J</button
                    >
                    <button class="key" on:click={() => appendToInput("K")}
                      >K</button
                    >
                    <button class="key" on:click={() => appendToInput("L")}
                      >L</button
                    >
                  </div>
                  <div class="phone-row">
                    <button class="key" on:click={() => appendToInput("M")}
                      >M</button
                    >
                    <button class="key" on:click={() => appendToInput("N")}
                      >N</button
                    >
                    <button class="key" on:click={() => appendToInput("O")}
                      >O</button
                    >
                    <button class="key" on:click={() => appendToInput("P")}
                      >P</button
                    >
                  </div>
                  <div class="phone-row">
                    <button class="key" on:click={() => appendToInput("Q")}
                      >Q</button
                    >
                    <button class="key" on:click={() => appendToInput("R")}
                      >R</button
                    >
                    <button class="key" on:click={() => appendToInput("S")}
                      >S</button
                    >
                    <button class="key" on:click={() => appendToInput("T")}
                      >T</button
                    >
                  </div>
                </div>
              {:else}
                <div class="phone-keypad">
                  <div class="phone-row">
                    <button class="key" on:click={() => appendToInput("1")}
                      >1</button
                    >
                    <button class="key" on:click={() => appendToInput("2")}
                      >2</button
                    >
                    <button class="key" on:click={() => appendToInput("3")}
                      >3</button
                    >
                  </div>
                  <div class="phone-row">
                    <button class="key" on:click={() => appendToInput("4")}
                      >4</button
                    >
                    <button class="key" on:click={() => appendToInput("5")}
                      >5</button
                    >
                    <button class="key" on:click={() => appendToInput("6")}
                      >6</button
                    >
                  </div>
                  <div class="phone-row">
                    <button class="key" on:click={() => appendToInput("7")}
                      >7</button
                    >
                    <button class="key" on:click={() => appendToInput("8")}
                      >8</button
                    >
                    <button class="key" on:click={() => appendToInput("9")}
                      >9</button
                    >
                  </div>
                  <div class="phone-row">
                    <button class="key" on:click={toggleLetters}>ABC</button>
                    <button class="key" on:click={() => appendToInput("0")}
                      >0</button
                    >
                    <button class="key backspace" on:click={backspace}>⌫</button
                    >
                  </div>
                  <div class="phone-row">
                    <button class="search-btn" on:click={search}>Search</button>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
</main>

<style>
  .container {
    max-width: 1074px;
    margin: 0 auto;
    padding: 0.25rem;
    font-family:
      system-ui,
      -apple-system,
      sans-serif;
  }

  h1 {
    text-align: center;
    color: #2c3e50;
    margin-bottom: 0.5rem;
    font-size: 1.8rem;
  }

  .game-selection {
    text-align: center;
  }

  .games-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .game-card {
    cursor: pointer;
    transition: transform 0.2s;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    height: 350px;
    padding: 0;
    border: none;
  }

  .game-card.disabled {
    cursor: not-allowed;
    opacity: 0.5;
    filter: grayscale(100%);
  }

  .game-card:hover:not(.disabled) {
    transform: translateY(-5px);
  }

  .game-card img {
    width: 100%;
    height: 290px;
    object-fit: cover;
    border-radius: 7px 7px 0 0;
  }

  .game-card h3 {
    margin: 0.5rem;
    font-size: 0.9rem;
    color: #333;
    line-height: 1.2;
    text-align: center;
  }

  /* Search Interface Styles */
  .header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .back-btn {
    padding: 0.3rem 0.6rem;
    background-color: #f8f9fa;
    border: 2px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.2s;
  }

  .back-btn:hover {
    background-color: #e9ecef;
  }

  .search-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    flex-grow: 1;
    margin-top: 0.5rem;
  }

  .text-column {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .placeholder-text {
    text-align: center;
    color: #666;
    font-size: 1.1rem;
  }

  .search-column {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .search-container {
    margin: 0.5rem 0;
  }

  .input-display {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    flex-grow: 1;
  }

  input {
    padding: 0.3rem 2rem 0.3rem 0.6rem;
    font-size: 1.2rem;
    border: 2px solid #ddd;
    border-radius: 4px;
    width: 100%;
    text-align: center;
  }

  .clear-btn {
    position: absolute;
    right: 0.5rem;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #666;
    cursor: pointer;
    padding: 0;
    line-height: 1;
  }

  .clear-btn:hover {
    color: #333;
  }

  .keypad-container {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;
  }

  .numeric-keypad {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.25rem;
    width: 100%;
    max-width: 400px;
  }

  .letter-buttons {
    display: grid;
    grid-template-columns: repeat(13, 1fr);
    gap: 0.15rem;
    width: 100%;
    max-width: 400px;
  }

  .key,
  .letter-key {
    aspect-ratio: 1;
    font-size: 1.2rem;
    padding: 0.3rem;
  }

  .toggle-letters {
    padding: 0.4rem 0.8rem;
    font-size: 1rem;
  }

  .search-btn {
    padding: 0.6rem 1.2rem;
    font-size: 1.2rem;
    margin-top: 0.5rem;
  }

  .result {
    padding: 0;
    margin: 0;
  }

  .result h2 {
    margin-top: 0;
    margin-bottom: 0.5rem;
  }

  .result p {
    margin: 0;
    font-size: 1.1rem;
    line-height: 1.4;
    white-space: pre-line;
  }

  .phone-keypad {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    max-width: 300px;
  }

  .phone-row {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
  }

  .phone-row .key {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  .phone-row .backspace {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  .phone-row .search-btn {
    width: 190px;
    height: 60px;
    font-size: 1.5rem;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 4px;
  }

  .phone-row .search-btn:hover {
    background-color: #45a049;
  }

  @media (max-width: 768px) {
    .container {
      padding: 0.25rem;
    }

    .games-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.5rem;
    }

    .game-card {
      height: 250px;
    }

    .game-card img {
      height: 200px;
    }

    .game-card h3 {
      font-size: 0.8rem;
      margin: 0.4rem;
    }

    .letter-buttons {
      grid-template-columns: repeat(7, 1fr);
    }

    .search-layout {
      grid-template-columns: 1fr;
    }

    .text-column {
      min-height: 100px;
    }
  }
</style>
