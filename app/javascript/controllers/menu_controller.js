import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["toggleable", "transformable", "button"]

  initialize() {
    this.menuShown = false
  }

  toggle() {
    this.toggleableTargets.forEach((element) => {
      element.classList.toggle("hidden")
    })
  }
}
