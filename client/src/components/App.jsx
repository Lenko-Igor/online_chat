import React from "react";
import { Routes, Route } from "react-router-dom";
import '../main.css'
import { Chat } from "./Chat";
import { JoinPage } from "./JoinPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<JoinPage />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App;
