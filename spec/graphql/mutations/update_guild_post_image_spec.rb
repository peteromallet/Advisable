require 'rails_helper'

RSpec.describe Mutations::Guild::UpdateGuildPostImage do
  let(:specialist) { create(:specialist, :guild) }
  let(:guild_post) { create(:guild_post, specialist: specialist) }
  let(:guild_post_image) { create(:guild_post_image, post: guild_post, image: attachment) }
  let(:response_keys) { %w[updateGuildPostImage image] }
  let(:attachment) do
    file = Rails.root.join('spec/support/01.jpg')
    ActiveStorage::Blob.create_and_upload!(
      io: File.open(file),
      filename: '01.jpg',
      content_type: 'image/jpeg'
    )
  end

  let(:query) {
    <<-GRAPHQL
    mutation {
      updateGuildPostImage(input: {
        guildPostImageId: "#{guild_post_image.uid}",
        cover: false
        position: 2
      }) {
        image {
          id
          url
          cover
          position
        }
      }
    }
    GRAPHQL
  }

  context "with an unauthorized specialist" do
    let(:resp) { AdvisableSchema.execute(query, context: {current_user: create(:specialist, :guild)}) }
    it 'returns an error' do
      error = resp['errors'].first['extensions']['code']
      expect(error).to eq('notAuthorized')
    end
  end

  context "with a guild specialist" do
    it "updates a guild post image" do
      expect {
        r = AdvisableSchema.execute(query, context: {current_user: specialist})
        puts r.inspect
        guild_post_image.reload
      }.to change { guild_post_image.cover }.from(true).to(false).
        and change { guild_post_image.position }.from(1).to(2)
    end
  end
end
