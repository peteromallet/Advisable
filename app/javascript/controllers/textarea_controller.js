import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["input"];

  connect() {
    this.inputTarget.style.resize = "none";
    this.resize();
  }

  resize() {
    const input = this.inputTarget;
    const offset = input.offsetHeight - input.clientHeight;
    input.style.height = "auto";
    input.style.height = input.scrollHeight + offset + "px";
  }

  preventLineBreak(e) {
    if (e.code === "Enter") e.preventDefault();
  }
}
