require 'rails_helper'

RSpec.describe "guild featured members query" do
  let(:guild_specialists) { create_list(:specialist, 5, :guild, guild_featured_member_at: Time.current) }
  let(:non_guild_specialists) { create_list(:specialist, 5) }
  let(:context) { {current_user: guild_specialists.first} }
  let(:query) {
    <<-GRAPHQL
    {
      guildFeaturedMembers {
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
    resp.dig('data', 'guildFeaturedMembers')
  end

  it 'returns the newest featured members of the guild' do
    expect(guild_new_members.size).to eq(guild_specialists.size)
    expect(guild_new_members[0].keys).to eq(['id', 'name', 'guildJoinedTimeAgo', 'location'])
  end
end
