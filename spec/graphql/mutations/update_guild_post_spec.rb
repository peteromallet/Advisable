require 'rails_helper'

RSpec.describe Mutations::Guild::UpdateGuildPost do
  let(:specialist) { create(:specialist, :guild) }
  let!(:guild_post) { create(:guild_post, specialist: specialist, status: "draft") }
  let(:response_keys) { %w[updateGuildPost guildPost] }

  let(:guild_post_fields) do
    <<-GRAPHQL
      fragment GuildPostFields on PostInterface {
        id
        type
        title
        body
        status
        author {
          id
        }
        guildTopics {
          id
          name
        }
        images {
          id
          url
        }
        coverImage {
          id
          url
        }
      }
    GRAPHQL
  end

  let(:query) {
    <<-GRAPHQL
    #{guild_post_fields}
    mutation {
      updateGuildPost(input: {
        guildPostId: "#{guild_post.id}"
      }) {
        guildPost {
          ...GuildPostFields
        }
      }
    }
    GRAPHQL
  }

  context "with a guild specialist" do
    subject(:create_guild_post) {
      lambda { |query|
        resp = AdvisableSchema.execute(
          query,
          context: {current_user: specialist}
        )
        resp.dig("data", *response_keys)
      }
    }

    it "errors if the post is not found or not scoped to current_user" do
      another = create(:specialist)
      guild_post.update!(specialist: another)
      resp = AdvisableSchema.execute(
        query,
        context: {current_user: specialist}
      )
      expect(resp["errors"][0]).to include({
        "message" => "Resouce was not found"
      })
    end

    describe "updating guild post attributes" do
      let(:guild_topics) { create_list(:guild_topic, 3) }
      let(:mutation) {
        lambda { |input|
          gql = input.map { |k, v| "#{k}: #{v.is_a?(String) ? "\"#{v}\"" : v}" }.join(', ')
          <<-GRAPHQL
        #{guild_post_fields}
        mutation {
          updateGuildPost(input: { #{gql} }) {
            guildPost {
              ...GuildPostFields
            }
          }
        }
          GRAPHQL
        }
      }

      it "updates title body and audience type" do
        input = {
          title: "this is a new title",
          body: "this is a new body",
          audienceType: "skills",
          guildPostId: guild_post.id
        }
        query = mutation[input]

        expect {
          subject.call(query)
          guild_post.reload
        }.to change { guild_post.title }.to("this is a new title").
          and change { guild_post.body }.to("this is a new body").
          and change { guild_post.audience_type }.to("skills")
      end

      it "changes status back to draft if publish is not included" do
        guild_post.published!
        input = {
          title: "this is another title",
          guildPostId: guild_post.id
        }
        query = mutation[input]

        expect {
          subject.call(query)
          guild_post.reload
        }.to change { guild_post.status }.from("published").to("draft").
          and change { guild_post.title }.to("this is another title")
      end

      it "changes the status to published" do
        input = {
          guildPostId: guild_post.id,
          publish: true
        }
        query = mutation[input]

        expect {
          subject.call(query)
          guild_post.reload
        }.to change { guild_post.status }.from("draft").to("published")
      end

      it "updates the topic names" do
        input = {
          guildPostId: guild_post.id,
          guildTopicNames: guild_topics.map(&:name)
        }
        query = mutation[input]

        expect {
          subject.call(query)
          guild_post.reload
        }.to change { guild_post.guild_topics.count }.from(0).to(3)
      end
    end
  end
end
