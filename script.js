// ============================================
// SUSTENWATER - JAVASCRIPT
// Funcionalidades: Quiz + Gerador de Dicas + Acessibilidade
// ============================================

// ===== 1. DADOS DO QUIZ (5 perguntas sobre água na agricultura) =====
const perguntasQuiz = [
    {
        pergunta: "Qual técnica de irrigação é considerada a mais eficiente para economizar água?",
        alternativas: ["Irrigação por inundação", "Irrigação por aspersão", "Irrigação por gotejamento", "Irrigação por sulcos"],
        correta: 2 // índice da resposta correta (começa em 0)
    },
    {
        pergunta: "Aproximadamente, qual percentual da água doce mundial é utilizada na agricultura?",
        alternativas: ["30%", "50%", "70%", "90%"],
        correta: 2
    },
    {
        pergunta: "Qual destas práticas ajuda a reduzir o desperdício de água no campo?",
        alternativas: ["Plantio em áreas úmidas", "Captação de água da chuva", "Irrigação no meio do dia", "Uso de mangueiras sem controle"],
        correta: 1
    },
    {
        pergunta: "O que é 'estresse hídrico'?",
        alternativas: ["Excesso de chuvas", "Falta de água disponível para consumo", "Poluição dos rios", "Aumento da temperatura da água"],
        correta: 1
    },
    {
        pergunta: "Qual cultura agrícola geralmente consome mais água por quilo produzido?",
        alternativas: ["Soja", "Milho", "Arroz", "Trigo"],
        correta: 2
    }
];

// Variável para armazenar as respostas do usuário
let respostasUsuario = new Array(perguntasQuiz.length).fill(null);

// ===== 2. FUNÇÃO PARA RENDERIZAR O QUIZ =====
function renderizarQuiz() {
    const container = document.getElementById('quiz-container');
    if (!container) return;
    
    let html = '';
    
    for (let i = 0; i < perguntasQuiz.length; i++) {
        const q = perguntasQuiz[i];
        html += `
            <div class="pergunta" data-pergunta-id="${i}">
                <h3>${i + 1}. ${q.pergunta}</h3>
                <div class="opcoes">
        `;
        
        for (let j = 0; j < q.alternativas.length; j++) {
            const isChecked = (respostasUsuario[i] === j);
            html += `
                <div class="opcao">
                    <input type="radio" name="pergunta${i}" id="pergunta${i}_opcao${j}" value="${j}" ${isChecked ? 'checked' : ''}>
                    <label for="pergunta${i}_opcao${j}">${String.fromCharCode(65 + j)}. ${q.alternativas[j]}</label>
                </div>
            `;
        }
        
        html += `
                </div>
            </div>
        `;
    }
    
    html += `<button id="btn-corrigir" class="botao-enviar">✅ Corrigir quiz</button>`;
    container.innerHTML = html;
    
    // Adicionar eventos para salvar as respostas quando o usuário marcar
    for (let i = 0; i < perguntasQuiz.length; i++) {
        const radios = document.querySelectorAll(`input[name="pergunta${i}"]`);
        radios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                respostasUsuario[i] = parseInt(e.target.value);
            });
        });
    }
    
    // Adicionar evento do botão corrigir
    const botaoCorrigir = document.getElementById('btn-corrigir');
    if (botaoCorrigir) {
        botaoCorrigir.addEventListener('click', corrigirQuiz);
    }
}

// ===== 3. FUNÇÃO PARA CORRIGIR O QUIZ =====
function corrigirQuiz() {
    let acertos = 0;
    const resultadoDiv = document.getElementById('resultado-quiz');
    
    for (let i = 0; i < perguntasQuiz.length; i++) {
        if (respostasUsuario[i] === perguntasQuiz[i].correta) {
            acertos++;
        }
    }
    
    const percentual = (acertos / perguntasQuiz.length) * 100;
    let mensagem = '';
    let emoji = '';
    
    if (percentual === 100) {
        mensagem = 'Excelente! Você é um especialista em sustentabilidade da água! 🌟';
        emoji = '🏆';
    } else if (percentual >= 60) {
        mensagem = 'Muito bem! Você já sabe bastante, mas pode aprender mais! 👍';
        emoji = '📚';
    } else {
        mensagem = 'Que tal revisar o conteúdo e tentar novamente? O conhecimento é o primeiro passo! 🌱';
        emoji = '💪';
    }
    
    resultadoDiv.innerHTML = `
        <div style="padding: 15px;">
            <span style="font-size: 2rem;">${emoji}</span>
            <p style="font-size: 1.3rem; margin: 10px 0;">Você acertou ${acertos} de ${perguntasQuiz.length} perguntas (${percentual}%)</p>
            <p>${mensagem}</p>
            <button id="btn-reiniciar-quiz" class="botao-enviar" style="margin-top: 15px;">🔄 Refazer quiz</button>
        </div>
    `;
    
    const botaoReiniciar = document.getElementById('btn-reiniciar-quiz');
    if (botaoReiniciar) {
        botaoReiniciar.addEventListener('click', reiniciarQuiz);
    }
}

// ===== 4. FUNÇÃO PARA REINICIAR O QUIZ =====
function reiniciarQuiz() {
    respostasUsuario = new Array(perguntasQuiz.length).fill(null);
    renderizarQuiz();
    document.getElementById('resultado-quiz').innerHTML = '';
}

// ===== 5. GERADOR DE DICAS SUSTENTÁVEIS =====
const dicasSustentaveis = [
    "💧 Use irrigação por gotejamento: ela leva água direto à raiz da planta, reduzindo perda por evaporação em até 50%.",
    "🌧️ Capture água da chuva em cisternas para usar na irrigação em períodos de estiagem.",
    "⏰ Irrigue no início da manhã ou no final da tarde para evitar perda por evaporação.",
    "🌾 Utilize cobertura morta (palha) sobre o solo para manter a umidade por mais tempo.",
    "🔧 Faça manutenção regular nos sistemas de irrigação para evitar vazamentos.",
    "📊 Monitore a umidade do solo com sensores para irrigar somente quando necessário.",
    "🌱 Plante espécies nativas e adaptadas ao clima da sua região, que exigem menos água.",
    "🔄 Reutilize a água da lavagem de equipamentos para irrigação, se for apropriado."
];

function gerarDicaAleatoria() {
    const indiceAleatorio = Math.floor(Math.random() * dicasSustentaveis.length);
    return dicasSustentaveis[indiceAleatorio];
}

// ===== 6. FUNÇÃO PARA EXIBIR DICA =====
function exibirDica() {
    const dicaDiv = document.getElementById('dica-exibida');
    if (dicaDiv) {
        const novaDica = gerarDicaAleatoria();
        dicaDiv.innerHTML = `<span style="font-size: 1.5rem;">💡</span><br>${novaDica}`;
    }
}

// ===== 7. FUNÇÕES DE ACESSIBILIDADE =====
let tamanhoFonteAtual = 100; // percentual
let altoContrasteAtivo = false;

function aumentarFonte() {
    if (tamanhoFonteAtual < 130) {
        tamanhoFonteAtual += 10;
        document.body.style.fontSize = tamanhoFonteAtual + '%';
    }
}

function diminuirFonte() {
    if (tamanhoFonteAtual > 70) {
        tamanhoFonteAtual -= 10;
        document.body.style.fontSize = tamanhoFonteAtual + '%';
    }
}

function toggleAltoContraste() {
    altoContrasteAtivo = !altoContrasteAtivo;
    if (altoContrasteAtivo) {
        document.body.classList.add('alto-contraste');
        localStorage.setItem('altoContraste', 'true');
    } else {
        document.body.classList.remove('alto-contraste');
        localStorage.setItem('altoContraste', 'false');
    }
}

// ===== 8. FUNÇÕES DO MENU DE ACESSIBILIDADE =====
function toggleMenuAcessibilidade() {
    const menu = document.getElementById('menu-acessibilidade');
    if (menu) {
        menu.classList.toggle('escondido');
    }
}

// ===== 9. CARREGAR PREFERÊNCIAS SALVAS =====
function carregarPreferencias() {
    const contrasteSalvo = localStorage.getItem('altoContraste');
    if (contrasteSalvo === 'true') {
        altoContrasteAtivo = true;
        document.body.classList.add('alto-contraste');
    }
}

// ===== 10. SCROLL SUAVE PARA LINKS DO MENU =====
function configurarScrollSuave() {
    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== 11. INICIALIZAÇÃO DA PÁGINA =====
document.addEventListener('DOMContentLoaded', function() {
    // Renderizar o quiz
    renderizarQuiz();
    
    // Configurar gerador de dicas
    const botaoDica = document.getElementById('btn-gerar-dica');
    if (botaoDica) {
        botaoDica.addEventListener('click', exibirDica);
    }
    
    // Configurar botões de acessibilidade
    const btnAcessibilidade = document.getElementById('btn-acessibilidade');
    if (btnAcessibilidade) {
        btnAcessibilidade.addEventListener('click', toggleMenuAcessibilidade);
    }
    
    const btnAumentar = document.getElementById('aumentar-fonte');
    if (btnAumentar) {
        btnAumentar.addEventListener('click', aumentarFonte);
    }
    
    const btnDiminuir = document.getElementById('diminuir-fonte');
    if (btnDiminuir) {
        btnDiminuir.addEventListener('click', diminuirFonte);
    }
    
    const btnContraste = document.getElementById('alto-contraste');
    if (btnContraste) {
        btnContraste.addEventListener('click', toggleAltoContraste);
    }
    
    // Carregar preferências salvas
    carregarPreferencias();
    
    // Configurar scroll suave
    configurarScrollSuave();
    
    // Fechar menu de acessibilidade se clicar fora
    document.addEventListener('click', function(e) {
        const menu = document.getElementById('menu-acessibilidade');
        const btn = document.getElementById('btn-acessibilidade');
        if (menu && !menu.classList.contains('escondido')) {
            if (!menu.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
                menu.classList.add('escondido');
            }
        }
    });
});
