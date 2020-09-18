require 'rails_helper'

RSpec.describe Types::Guild::PostInterface do
  include ActionView::Helpers::DateHelper

  let(:specialist) { build(:specialist, :guild) }
  let(:non_guild_specialist) { build(:specialist) }
  let(:context) {
    {
      current_user: specialist
    }
  }
  let(:guild_post) { create(:guild_post) }
  let(:advice_required) { create(:advice_required_guild_post) }

  let(:query) {
    ->(id) {
      <<-GRAPHQL
      {
        guildPost(id: "#{id}") {
          id
          type
          commented
          createdAtTimeAgo
          ... on GuildPostAdviceRequired {
            needHelp
          }
          guildTopics {
            id
            name
          }
        }
      }
      GRAPHQL
    }
  }

  context "with a non guild specialist" do
    let(:non_guild_specialist) { build(:specialist) }

    it "returns a null guildPost" do
      resp = AdvisableSchema.execute(
        query[guild_post.id],
        context: {
          current_user: non_guild_specialist
        }
      )
      expect(resp.dig('data', 'guildPost')).to be_nil
    end
  end

  it 'includes additional fields for other guild_post types' do
    resp = AdvisableSchema.execute(
      query[advice_required.id],
      context: context
    )
    node = resp.dig('data', 'guildPost')
    expect(node).to include(
      {
        "id" => advice_required.id,
        "needHelp" => false,
        "type" => "Advice Required"
      }
    )
  end

  context "with a guild_post query" do
    let(:response) {
      AdvisableSchema.execute(
        query[guild_post.id],
        context: context
      )
    }
    let(:node) { response.dig('data', 'guildPost') }

    it 'includes interface fields for a Guild::Post' do
      expect(node).to include({"id" => guild_post.id})
      expect(node).to_not have_key("needHelp")
    end

    it "includes the normalized type instead of type" do
      expect(node["type"]).to eq(guild_post.normalized_type)
    end

    it "includes the created_at date in words" do
      expect(node["createdAtTimeAgo"]).to eq(
        time_ago_in_words(guild_post.created_at)
      )
    end

    it "includes the tagged guild topics" do
      topic = create(:guild_topic)
      guild_post.guild_topic_list << topic.name
      guild_post.save

      expect(node['guildTopics'][0]['name']).to eq(topic.name)
    end
  end
end
