require 'rails_helper'

RSpec.describe 'Create post flow', type: :system do
  let(:specialist) { create(:specialist, :guild) }
  let(:title) { Faker::Lorem.sentence(word_count: 12) }
  let(:content) { Faker::Lorem.sentence(word_count: 50) }

  before do
    create(:skill, name: "Design")
    create(:skill, name: "Development")
    create(:skill, name: "Marketing")
    # TODO: twilio-provider Remove once Specialist#guild_unread_messages is removed
    allow(specialist).to receive(:guild_unread_messages).and_return(false)
  end

  it 'allows specialist to create a post' do
    authenticate_as(specialist)
    visit "/guild/feed"
    find("*[aria-label=\"Create a Post\"]").click

    # Post type
    choose 'Looking for advice'

    # Post content
    fill_in :title, with: title
    find('.public-DraftEditor-content').base.send_keys(content)
    click_on 'Continue'

    # Images
    attach_file(
      'upload-image',
      Rails.root.join("spec/support/01.jpg"),
      make_visible: true
    )

    attach_file(
      'upload-image',
      Rails.root.join("spec/support/02.jpg"),
      make_visible: true
    )

    expect(page).not_to have_css('*[data-uploading]') # wait for uploads

    # set cover
    second_image = find_all('*[class^=Images__StyledImageTile-]')[1]
    second_image.click

    # test remove image
    within(second_image) { click_on 'Remove image' }
    images = find_all('*[class^=Images__StyledImageTile-]')
    expect(images.count).to eq(1)

    click_on 'Continue'

    # audience type
    choose 'Target by skill'

    # audience settings
    skills = find_field('Search for a Skill')
    skills.send_keys 'Develop', :down, :enter
    skills.send_keys 'Desi', :down, :enter
    click_on 'Continue'

    # publish
    click_on 'Publish Post'

    expect(page).to have_current_path(%r{/guild/posts/.*})
    post = specialist.guild_posts.first
    expect(post.title).to eq(title)
    expect(post.images.count).to eq(1)
  end
end
