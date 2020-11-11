require 'rails_helper'

RSpec.describe "guild your posts query" do
  let(:specialists) { create_list(:specialist, 2, :guild) }
  let(:current_user) { specialists[0] }
  let!(:guild_posts) { create_list(:guild_post, 2, status: "published", specialist: current_user) }
  let!(:other_guild_posts) { create_list(:guild_post, 2, specialist: specialists.last) }
  let(:response_keys) { %w[guildYourPosts nodes] }
  let(:query) do
    <<-GRAPHQL
    {
      guildYourPosts(first: 10) {
        nodes {
          status
          author {
            id
          }
        }
      }
    }
    GRAPHQL
  end

  it_behaves_like "guild specialist"

  subject(:guild_your_posts) do
    context = {
      current_user: current_user
    }
    resp = AdvisableSchema.execute(query, context: context)
    resp.dig('data', *response_keys)
  end

  it 'returns posts belonging to the current_user' do
    expect(Guild::Post.count).to eq(4)
    expect(subject.size).to eq(2)
    expect(
      subject.detect { |el| el["author"]["id"] != current_user.uid }
    ).to be_nil
  end

  it 'does not include removed posts' do
    create(:guild_post, status: "removed", specialist: current_user)
    expect(subject).to_not eq(current_user.guild_posts.count)
  end
end
