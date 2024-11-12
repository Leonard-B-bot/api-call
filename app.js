document.addEventListener('DOMContentLoaded', function() {
  // API URL for Monster Hunter World monsters
  const apiUrl = 'https://mhw-db.com/monsters';
  const itemsPerPage = 10; // Number of monsters per page
  let monsters = []; // Array to store monsters
  let currentPage = 1; // Current page

  // DOM elements
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const monsterTable = document.getElementById('monster-table-body');

  // Ensure pagination buttons exist before adding event listeners
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => handlePageChange(-1));
    nextBtn.addEventListener('click', () => handlePageChange(1));
  } else {
    console.error("Pagination buttons not found in the DOM");
  }

  // Function to fetch monsters from the API
  async function fetchMonsters() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error(`API error: ${response.statusText}`);

      monsters = await response.json();
      console.log('Fetched monsters:', monsters); // Log the fetched data

      displayMonsters(currentPage);
    } catch (error) {
      monsterTable.innerHTML = `<tr><td colspan="4" class="text-red-500 text-center">Failed to load monsters. Try again later.</td></tr>`;
      console.error('Fetch error:', error.message);
    }
  }

  // Function to display monsters in the table
  function displayMonsters(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const paginatedMonsters = monsters.slice(startIndex, startIndex + itemsPerPage);

    console.log('Paginated monsters:', paginatedMonsters); // Log paginated monsters

    // Clear the table
    monsterTable.innerHTML = '';

    // Display each monster in the table
    paginatedMonsters.forEach(monster => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td class="border px-4 py-2">${monster.id}</td>
        <td class="border px-4 py-2">${monster.name}</td>
        <td class="border px-4 py-2">${monster.type}</td>
        <td class="border px-4 py-2">
          <button class="bg-green-500 text-white px-2 py-1 rounded" onclick="showMonsterDetails(${monster.id})">Details</button>
        </td>
      `;
      monsterTable.appendChild(row);
    });

    // Disable/Enable buttons based on pagination
    prevBtn.disabled = page === 1;
    nextBtn.disabled = startIndex + itemsPerPage >= monsters.length;
  }

  // Function to handle page change
  function handlePageChange(direction) {
    currentPage += direction;
    displayMonsters(currentPage);
  }

  // Fetch the initial set of monsters
  fetchMonsters();
});
