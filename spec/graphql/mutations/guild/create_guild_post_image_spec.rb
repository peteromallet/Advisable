# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::Guild::CreateGuildPostImage do
  let(:specialist) { create(:specialist, :guild) }
  let(:guild_post) { create(:guild_post, specialist: specialist) }
  let(:response_keys) { %w[createGuildPostImage image] }

  let(:attachment) do
    file = Rails.root.join('spec/support/01.jpg')
    ActiveStorage::Blob.create_and_upload!(
      io: File.open(file),
      filename: '01.jpg',
      content_type: 'image/jpeg'
    ).signed_id
  end

  let(:query) do
    <<-GRAPHQL
    mutation {
      createGuildPostImage(input: {
        guildPostId: "#{guild_post.id}"
        attachment: "#{attachment}"
        cover: true
        position: 0
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
    subject(:create_guild_post_image) do
      resp = AdvisableSchema.execute(
        query,
        context: {current_user: specialist}
      )
      resp.dig("data", *response_keys)
    end

    it "creates a new guild post image" do
      expect do
        create_guild_post_image
        guild_post.reload
      end.to change { guild_post.images.count }.from(0).to(1)
    end
  end
end
