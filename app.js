// Base API URL
const apiUrl = 'https://mhw-db.com/monsters';
const monsterTable = document.getElementById('monster-tbody');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');

let currentPage = 1;
const itemsPerPage = 10; // Items per page
let monsters = []; // To store fetched monsters

// Fetch monsters from API
async function fetchMonsters(page = 1) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`API error: ${response.statusText}`);
    monsters = await response.json();
    displayMonsters(page);
  } catch (error) {
    console.error(error.message);
  }
}

// Display monsters in table
function displayMonsters(page) {
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedMonsters = monsters.slice(startIndex, startIndex + itemsPerPage);
  monsterTable.innerHTML = ''; // Clear table

  paginatedMonsters.forEach(monster => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="border px-4 py-2">${monster.id}</td>
      <td class="border px-4 py-2">${monster.name}</td>
      <td class="border px-4 py-2">${monster.type}</td>
      <td class="border px-4 py-2"><button class="bg-green-500 text-white px-2 py-1 rounded" onclick="showMonsterDetails(${monster.id})">Details</button></td>
    `;
    monsterTable.appendChild(row);
  });

  // Disable/Enable buttons based on pagination
  prevBtn.disabled = page === 1;
  nextBtn.disabled = startIndex + itemsPerPage >= monsters.length;
}

// Show monster details (For now just console log the ID)
function showMonsterDetails(id) {
  const monster = monsters.find(monster => monster.id === id);
  console.log(monster);
}

// Handle next/previous buttons
nextBtn.addEventListener('click', () => {
  currentPage++;
  displayMonsters(currentPage);
});

prevBtn.addEventListener('click', () => {
  currentPage--;
  displayMonsters(currentPage);
});

// Initial fetch
fetchMonsters();
