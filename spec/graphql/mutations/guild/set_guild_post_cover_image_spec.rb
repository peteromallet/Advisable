require 'rails_helper'

RSpec.describe Mutations::Guild::SetGuildPostCoverImage do
  let(:specialist) { create(:specialist, :guild) }
  let(:guild_post) { create(:guild_post, specialist: specialist) }
  let(:response_keys) { %w[updateGuildPostImage image] }
  let(:attachment) do
    file = Rails.root.join('spec/support/01.jpg')
    ActiveStorage::Blob.create_and_upload!(
      io: File.open(file),
      filename: '01.jpg',
      content_type: 'image/jpeg'
    )
  end

  let(:query) do
    <<-GRAPHQL
    mutation {
      setGuildPostCoverPhoto(input: {
        guildPost: "#{guild_post.id}",
        attachment: "#{attachment.signed_id}"
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
  end

  context "with an unauthorized specialist" do
    let(:resp) { AdvisableSchema.execute(query, context: {current_user: create(:specialist, :guild)}) }

    it 'returns an error' do
      error = resp['errors'].first['extensions']['code']
      expect(error).to eq('notAuthorized')
    end
  end

  context "with a guild specialist" do
    it "updates a guild post image" do
      guild_post.images.attach(attachment)
      expect(guild_post.cover_photo_id).to eq(nil)
      response = AdvisableSchema.execute(query, context: {current_user: specialist})
      pp response
      expect(guild_post.cover_photo_id).to eq(attachment.id)
    end
  end
end
