# Jogo do Semáforo — Grupo 5

Projeto de Ciências sobre a onda verde. O jogador escolhe uma velocidade e tenta atravessar três semáforos durante a abertura dos sinais.

## Páginas

- `main_file.html`: apresentação do trabalho, integrantes e objetivo do jogo.
- `frontend/game/pagina de  desafios/segunda_pagina.html`: escolha dos desafios e controle das escolhas da rodada.
- `frontend/game/game.html`: página única do jogo; recebe o desafio selecionado pela URL.

`frontend/game/challenge-config.js` centraliza os dados dos desafios e a reserva de escolhas por rodada; a lógica de movimento e semáforos fica na página única do jogo.

## Desafios

Cada desafio usa três semáforos, vale 10 pontos por passagem no verde e permite até 30 pontos.

| Desafio | Distância entre semáforos | Tempo entre aberturas | Velocidade ideal |
| --- | ---: | ---: | ---: |
| 1 | 300 m | 24 s | 45 km/h |
| 2 | 700 m | 60 s | 42 km/h |
| 3 | 100 m | 9 s | 40 km/h |

A velocidade ideal é calculada por `(distância em metros / tempo em segundos) × 3,6`. O seletor aceita velocidades de 2 a 50 km/h e começa em 25 km/h.

Cada semáforo tem um ciclo próprio, com a fase verde alinhada ao tempo ideal de chegada; cada abertura verde dura 1 segundo. O relógio da simulação corre 6 vezes mais rápido que o tempo real, enquanto os cálculos exibidos continuam usando segundos simulados e a velocidade selecionada.

As escolhas da rodada ficam salvas no armazenamento do navegador. Esse controle vale para jogadores usando o mesmo navegador e a mesma origem do site; dispositivos diferentes precisam de um serviço compartilhado para sincronizar as escolhas.
