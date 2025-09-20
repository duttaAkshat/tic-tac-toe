# Tic Tac Toe 🎮

A classic Tic Tac Toe game built with **React**, featuring an **AI opponent powered by the Minimax algorithm**.

## Live Demo
👉 [Play Here](https://your-deployed-link.vercel.app/)

## Features
- Two-player mode
- Play against AI (uses **Minimax algorithm** for unbeatable moves)
- Detects winner and highlights winning squares
- Responsive and clean UI
- Floating GitHub button for quick access to repo

## Tech Stack
- **React** (UI)
- **CSS** (styling)
- **JavaScript (ES6)** (game logic & minimax)

## How the AI Works
The AI uses the **Minimax algorithm**, a backtracking algorithm often used in decision-making and game theory:
- Explores all possible game states
- Assigns scores (+10, -10, 0) for win/loss/draw
- Chooses the move that maximizes its chance of winning while minimizing the opponent’s

This makes the AI **unbeatable** — the best you can do is force a draw 😅.

## Run Locally
```bash
git clone https://github.com/duttaAkshat/tic-tac-toe.git
cd tic-tac-toe
npm install
npm start
