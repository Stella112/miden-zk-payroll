# ⬡ Miden Phantom Ledger

A zero-knowledge, on-chain payroll execution dashboard built for the **Miden Testnet**. 

This project combines a sleek, high-contrast glassmorphic React frontend with a Node.js API bridge. It generates real-time ZK-STARK proofs on an edge VPS to send secure, encrypted payroll transactions without exposing company treasury data.

## ✨ Features

* **Zero-Knowledge Execution:** Generates local execution traces and proofs in milliseconds via the Miden VM before submitting transactions to the public network.
* **Ghost Paychecks:** Supports routing funds through both `private` (fully encrypted) and `public` (wallet-detectable) Miden notes.
* **Cyber-Ops UI:** Custom orange-and-white glassmorphic design system featuring a dynamic, responsive `<canvas>` matrix background.
* **Precision Handling:** Built-in underflow protection and automatic decimal routing (6 decimal places) for seamless, human-readable UI inputs.

## 🏗️ Architecture

The application is split into two specialized layers:

1. **The Interface (React + Vite + Tailwind v4):** A fast, client-side dashboard that captures target employee IDs and payload amounts.
2. **The Prover API (Node.js + Express):** A secure backend service sitting on a VPS. It catches requests from the UI, orchestrates the `miden-client` CLI, automatically handles proof-of-work challenges, and executes the payroll.

## 💻 Tech Stack

* **Frontend:** React, Vite, Tailwind CSS v4
* **Backend:** Node.js, Express, Child Process Execution
* **Web3/ZK:** Polygon Miden (`miden-client`), ZK-STARKs

## 🚀 Future Roadmap

- [ ] Implement a live Treasury Balance widget to monitor the sender vault.
- [ ] Add batch-payout capabilities for multi-employee payroll runs.
- [ ] Parse and display historical output notes in a UI ledger.

---
*Built with React, Miden, and heavy vibe coding.*
