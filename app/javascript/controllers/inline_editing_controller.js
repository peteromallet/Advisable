import { Controller } from "@hotwired/stimulus";

// Connects to data-controller="inline-editing"
export default class extends Controller {
  static targets = ["turboFrame"];

  static values = {
    editUrl: String,
  };

  edit() {
    this.turboFrameTarget.src = this.editUrlValue;
  }

  save(e) {
    e.target.form.requestSubmit();
  }
}
