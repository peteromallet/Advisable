# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Guild resolve post", type: :system do
  let(:author) { create(:specialist) }
  let!(:post) { create(:guild_post, specialist: author, resolved_at: nil, type: "AdviceRequired") }
  let(:resolve_btn) { '//button[@aria-label="Resolve post"]' }

  context "when the viewer is not the author" do
    let(:other) { create(:specialist) }

    it "does not have a resolve button" do
      authenticate_as(other)
      visit "/posts/#{post.id}"
      expect(page).not_to have_selector(:xpath, resolve_btn)
    end
  end

  context "when the viewer is the author" do
    before do
      authenticate_as(author)
    end

    it "resolves a post" do
      visit "/posts/#{post.id}"
      all(:xpath, resolve_btn).first.click
      click_on "Confirm"
      expect(page).to have_content("Your post has been marked as resolved")
      expect(post.reload.resolved_at).not_to be_nil
    end

    it "does not have a resolve button if type is unsupported" do
      post.update!(type: "CaseStudy")
      visit "/posts/#{post.id}"
      expect(page).not_to have_selector(:xpath, resolve_btn)
    end
  end
end
