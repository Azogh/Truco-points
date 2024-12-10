// Função para incrementar o valor
function onIncrement(team) {
    const valueElement = document.getElementById(`${team.toLowerCase()}-value`);
    let currentValue = parseInt(valueElement.textContent, 10);
    currentValue++;
    valueElement.textContent = currentValue;
    updateBolas(team, currentValue);
}

// Função para decrementar o valor
function onDecrement(team) {
    const valueElement = document.getElementById(`${team.toLowerCase()}-value`);
    let currentValue = parseInt(valueElement.textContent, 10);
    if (currentValue > 0) {
        currentValue--;
        valueElement.textContent = currentValue;
        updateBolas(team, currentValue);
    }
}

// Função para atualizar as bolinhas de 12 pontos
function updateBolas(team, points) {
    const bolas = document.querySelectorAll(`#${team} .bola`);
    bolas.forEach((bola, index) => {
        if (points >= (index + 1) * 12) {
            bola.classList.add('filled');
        } else {
            bola.classList.remove('filled');
        }
    });
    
    // Verificar se o time atingiu 36 pontos (3 bolinhas)
    if (points >= 36) {
        alert(`${team} GANHOU O JOGO!`);
        resetGame();
    }
}

// Função para resetar o jogo
function resetGame() {
    // Perguntar se o jogador deseja iniciar uma nova partida
    if (confirm("Deseja iniciar uma nova partida?")) {
        // Resetando os pontos e bolinhas
        const teams = ['Nos', 'Eles'];
        teams.forEach(team => {
            const valueElement = document.getElementById(`${team.toLowerCase()}-value`);
            valueElement.textContent = '0';
            const bolas = document.querySelectorAll(`#${team} .bola`);
            bolas.forEach(bola => {
                bola.classList.remove('filled');
            });
        });
    } else {
        // Se não quiser reiniciar, podemos apenas zerar
        window.location.reload();
    }
}
