(() => {
    const QUANTIDADE_SEMAFOROS = 3;
    const PONTOS_POR_SEMAFORO = 10;
    function criarDesafio(id, distanciaPorTrechoMetros, tempoFechadoSegundos, duracaoVerdeSegundos) {
        const velocidadeIdealMps = distanciaPorTrechoMetros / tempoFechadoSegundos;

        return Object.freeze({
            id,
            distanciaPorTrechoMetros,
            tempoFechadoSegundos,
            duracaoVerdeSegundos,
            quantidadeSemaforos: QUANTIDADE_SEMAFOROS,
            pontosPorSemaforo: PONTOS_POR_SEMAFORO,
            pontosMaximos: QUANTIDADE_SEMAFOROS * PONTOS_POR_SEMAFORO,
            velocidadeIdealMps,
            velocidadeIdealKmh: velocidadeIdealMps * 3.6
        });
    }

    const DESAFIOS = Object.freeze({
        1: criarDesafio(1, 50, 15, 3),
        2: criarDesafio(2, 300, 15, 3),
        3: criarDesafio(3, 75, 15, 3)
    });

    window.SEMAFORO_GAME = Object.freeze({
        desafios: DESAFIOS,
        velocidadeMaximaKmh: 150
    });
})();
