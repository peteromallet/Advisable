import { Controller } from "@hotwired/stimulus"
import { Turbo } from "@hotwired/turbo-rails"

export default class extends Controller {
  static targets = ["form"]

  connect() {
    const results = document.getElementById("search_results")
    if (results?.hasChildNodes()) {
      document.getElementById("search_results").scrollIntoView({ behavior: "smooth" })
    }
  }

  submit() {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => {
      Turbo.navigator.submitForm(this.formTarget)
    }, 200)
  }
}
