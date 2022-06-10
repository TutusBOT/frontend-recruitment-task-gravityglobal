import create from "./components/popup.js";

const openButton = document.getElementById("button");
const popup = document.getElementById("popup");
const counter = document.getElementById("module-counter");
const closeButton = document.querySelector(".module__close-button");
const resetButton = document.getElementById("module-reset-button");

create(popup, counter, openButton, closeButton, resetButton);
