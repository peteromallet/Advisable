require 'rails_helper'

RSpec.describe "new guild members query" do
  let(:guild_specialists) { create_list(:specialist, 5, :guild) }
  let(:non_guild_specialists) { create_list(:specialist, 5) }

  let(:context) { {current_user: guild_specialists.first} }
  let(:query) {
    <<-GRAPHQL
    {
      guildNewMembers {
        id
        name
        guildJoinedTimeAgo
        location
      }
    }
    GRAPHQL
  }

  subject(:guild_new_members) do
    resp = AdvisableSchema.execute(query, context: context)
    resp.dig('data', 'guildNewMembers')
  end

  it 'returns the newest members of the guild' do
    expect(guild_new_members.size).to eq(guild_specialists.size)
    expect(guild_new_members[0].keys).to eq(['id', 'name', 'guildJoinedTimeAgo', 'location'])
  end
end





