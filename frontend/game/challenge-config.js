(() => {
    const QUANTIDADE_SEMAFOROS = 3;
    const PONTOS_POR_SEMAFORO = 10;
    const DURACAO_VERDE_SEGUNDOS = 1;

    const DESAFIOS = Object.freeze({
        1: Object.freeze({
            id: 1,
            distanciaEntreSemaforosMetros: 300,
            tempoEntreSemaforosSegundos: 24,
            duracaoVerdeSegundos: DURACAO_VERDE_SEGUNDOS,
            quantidadeSemaforos: QUANTIDADE_SEMAFOROS,
            pontosPorSemaforo: PONTOS_POR_SEMAFORO,
            pontosMaximos: QUANTIDADE_SEMAFOROS * PONTOS_POR_SEMAFORO,
            velocidadeIdealKmh: (300 / 24) * 3.6
        }),
        2: Object.freeze({
            id: 2,
            distanciaEntreSemaforosMetros: 700,
            tempoEntreSemaforosSegundos: 60,
            duracaoVerdeSegundos: DURACAO_VERDE_SEGUNDOS,
            quantidadeSemaforos: QUANTIDADE_SEMAFOROS,
            pontosPorSemaforo: PONTOS_POR_SEMAFORO,
            pontosMaximos: QUANTIDADE_SEMAFOROS * PONTOS_POR_SEMAFORO,
            velocidadeIdealKmh: (700 / 60) * 3.6
        }),
        3: Object.freeze({
            id: 3,
            distanciaEntreSemaforosMetros: 100,
            tempoEntreSemaforosSegundos: 9,
            duracaoVerdeSegundos: DURACAO_VERDE_SEGUNDOS,
            quantidadeSemaforos: QUANTIDADE_SEMAFOROS,
            pontosPorSemaforo: PONTOS_POR_SEMAFORO,
            pontosMaximos: QUANTIDADE_SEMAFOROS * PONTOS_POR_SEMAFORO,
            velocidadeIdealKmh: (100 / 9) * 3.6
        })
    });

    const CHAVE_RODADA = "semaforo-jogo-rodada-v1";
    const CHAVE_RODADA_SESSAO = "semaforo-jogo-rodada-sessao-v1";
    const NOME_TRAVA_RODADA = `${CHAVE_RODADA}:lock`;
    const VELOCIDADE_MAXIMA_KMH = 50;

    function rodadaVazia(numero = 1) {
        return { numero, desafiosEscolhidos: [] };
    }

    function normalizarRodada(valor) {
        if (!valor || !Number.isInteger(valor.numero) || !Array.isArray(valor.desafiosEscolhidos)) {
            return null;
        }

        const desafiosEscolhidos = [...new Set(valor.desafiosEscolhidos.map(Number))]
            .filter(id => Object.prototype.hasOwnProperty.call(DESAFIOS, id));

        return {
            numero: Math.max(1, valor.numero),
            desafiosEscolhidos
        };
    }

    function lerRodada() {
        for (const chave of [CHAVE_RODADA, CHAVE_RODADA_SESSAO]) {
            try {
                const conteudo = window[chave === CHAVE_RODADA ? "localStorage" : "sessionStorage"].getItem(chave);
                if (conteudo) {
                    const rodada = normalizarRodada(JSON.parse(conteudo));
                    if (rodada) return rodada;
                }
            } catch (_) {
                // Tenta o armazenamento da sessão se o armazenamento principal não estiver disponível.
            }
        }
        return rodadaVazia();
    }

    function salvarRodada(rodada) {
        const conteudo = JSON.stringify(rodada);
        for (const chave of [CHAVE_RODADA, CHAVE_RODADA_SESSAO]) {
            try {
                window[chave === CHAVE_RODADA ? "localStorage" : "sessionStorage"].setItem(chave, conteudo);
                return true;
            } catch (_) {
                // Usa o próximo armazenamento disponível.
            }
        }
        return false;
    }

    function comTravaDeRodada(operacao) {
        const travas = window.navigator && window.navigator.locks;
        return travas
            ? travas.request(NOME_TRAVA_RODADA, operacao)
            : Promise.resolve(operacao());
    }

    function prepararSelecaoDeDesafios() {
        const botoes = [...document.querySelectorAll("[data-desafio]")];
        if (botoes.length === 0) return;

        const status = document.getElementById("statusRodada");
        const botaoNovaRodada = document.getElementById("novaRodada");

        function atualizar() {
            const rodada = lerRodada();
            const escolhidos = new Set(rodada.desafiosEscolhidos);
            const completos = escolhidos.size === Object.keys(DESAFIOS).length;

            botoes.forEach(botao => {
                const id = Number(botao.dataset.desafio);
                const indisponivel = escolhidos.has(id);
                botao.disabled = indisponivel;
                botao.textContent = indisponivel ? `DESAFIO ${id} — ESCOLHIDO` : `DESAFIO ${id}`;
            });

            if (status) {
                const restantes = Object.keys(DESAFIOS).length - escolhidos.size;
                status.textContent = completos
                    ? `Rodada ${rodada.numero} completa. Inicie uma nova rodada para liberar os desafios.`
                    : `Rodada ${rodada.numero}: ${restantes} desafio${restantes === 1 ? "" : "s"} ${restantes === 1 ? "disponível" : "disponíveis"}.`;
            }

            if (botaoNovaRodada) botaoNovaRodada.hidden = !completos;
        }

        botoes.forEach(botao => {
            botao.addEventListener("click", async () => {
                const id = Number(botao.dataset.desafio);
                const reservado = await comTravaDeRodada(() => {
                    const rodada = lerRodada();
                    if (!Object.prototype.hasOwnProperty.call(DESAFIOS, id) || rodada.desafiosEscolhidos.includes(id)) {
                        return false;
                    }

                    rodada.desafiosEscolhidos.push(id);
                    return salvarRodada(rodada);
                });

                if (!reservado) {
                    atualizar();
                    return;
                }

                window.location.href = `../game.html?challenge=${id}`;
            });
        });

        if (botaoNovaRodada) {
            botaoNovaRodada.addEventListener("click", async () => {
                await comTravaDeRodada(() => {
                    const rodada = lerRodada();
                    if (rodada.desafiosEscolhidos.length !== Object.keys(DESAFIOS).length) return false;
                    return salvarRodada(rodadaVazia(rodada.numero + 1));
                });
                atualizar();
            });
        }

        window.addEventListener("storage", atualizar);
        atualizar();
    }

    window.SEMAFORO_GAME = Object.freeze({
        desafios: DESAFIOS,
        velocidadeMaximaKmh: VELOCIDADE_MAXIMA_KMH,
        lerRodada,
        salvarRodada
    });

    prepararSelecaoDeDesafios();
})();
