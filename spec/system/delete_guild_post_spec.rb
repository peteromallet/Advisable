require 'rails_helper'

RSpec.describe 'Guild post delete action', type: :system do
  let(:specialist) { create(:specialist, :guild) }
  let(:author) { create(:specialist, :guild) }
  let!(:post) { create(:guild_post, specialist: author) }

  before do
    # TODO: twilio-provider Remove once Specialist#guild_unread_messages is removed
    allow(author).to receive(:guild_unread_messages).and_return(false)
    allow(specialist).to receive(:guild_unread_messages).and_return(false)
  end

  it 'allows the author to delete their post' do
    authenticate_as(author)
    visit "/guild/posts/#{post.id}"
    author_name = author.account.first_name
    all("button[aria-label=\"Delete post\"]").first.click
    click_on "Confirm"
    expect(page).to have_content("Deleted guild post")
    expect(Guild::Post.find_by_id(post.id)).to be_nil
  end

  it 'is only shown to the author' do
    authenticate_as(specialist)
    visit "/guild/posts/#{post.id}"
    expect(page).to have_content(post.title)
    expect(page).not_to have_selector("*[data-testid=deletePost]")
  end
end
