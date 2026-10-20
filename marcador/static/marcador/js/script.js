// Estado Inicial da Partida
let gameState = {
    nos: { score: 0, name: "NÓS" },
    eles: { score: 0, name: "ELES" }
};

// Carregar dados salvos no navegador ao iniciar
document.addEventListener("DOMContentLoaded", () => {
    loadState();
    updateUI();
});

// Adicionar/Remover Pontos
function addPoints(team, amount) {
    let newScore = gameState[team].score + amount;
    
    if (newScore < 0) newScore = 0;
    if (newScore > 24) newScore = 24;

    gameState[team].score = newScore;
    saveState();
    updateUI();

    // Verificação de Vitória (24 Tentos)
    if (newScore === 24) {
        setTimeout(() => {
            alert(`🏆 ${gameState[team].name} GANHOU A PARTIDA COM 24 TENTOS!`);
        }, 100);
    }
}

// Atualizar Interface da Tela
function updateUI() {
    ['nos', 'eles'].forEach(team => {
        const score = gameState[team].score;
        document.getElementById(`${team}-value`).textContent = score;
        
        // Atualiza indicação de Malos / Buenas
        const malosBadge = document.getElementById(`${team}-malos-badge`);
        const buenasBadge = document.getElementById(`${team}-buenas-badge`);

        if (score >= 12) {
            malosBadge.classList.remove('active');
            buenasBadge.classList.add('active');
        } else {
            malosBadge.classList.add('active');
            buenasBadge.classList.remove('active');
        }
    });
}

// Salvar no LocalStorage
function saveState() {
    gameState.nos.name = document.getElementById('nos-name').value || "NÓS";
    gameState.eles.name = document.getElementById('eles-name').value || "ELES";
    localStorage.setItem('trucoState', JSON.stringify(gameState));
}

// Carregar do LocalStorage
function loadState() {
    const saved = localStorage.getItem('trucoState');
    if (saved) {
        gameState = JSON.parse(saved);
        document.getElementById('nos-name').value = gameState.nos.name;
        document.getElementById('eles-name').value = gameState.eles.name;
    }
}

// Resetar Jogo
function resetGame() {
    if (confirm("Deseja zerar o placar da partida atual?")) {
        gameState.nos.score = 0;
        gameState.eles.score = 0;
        saveState();
        updateUI();
    }
}

// Modal de Regras
function toggleModal(show) {
    document.getElementById('regrasModal').style.display = show ? 'flex' : 'none';
}

function switchTab(tab) {
    document.getElementById('tab-guia').style.display = tab === 'guia' ? 'block' : 'none';
    document.getElementById('tab-cbtg').style.display = tab === 'cbtg' ? 'block' : 'none';
    
    document.getElementById('btn-tab-guia').classList.toggle('active', tab === 'guia');
    document.getElementById('btn-tab-cbtg').classList.toggle('active', tab === 'cbtg');
}

// Busca rápida nas regras
function filterRules() {
    const query = document.getElementById('searchRules').value.toLowerCase();
    const articles = document.querySelectorAll('.rule-item');

    articles.forEach(art => {
        const text = art.textContent.toLowerCase();
        art.style.display = text.includes(query) ? 'block' : 'none';
    });
}