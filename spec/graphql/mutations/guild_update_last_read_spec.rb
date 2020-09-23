require 'rails_helper'

RSpec.describe Mutations::Guild::UpdateLastRead do
  include ActiveSupport::Testing::TimeHelpers

  let(:specialist) { create(:specialist, :guild) }
  let(:guild_post) { create(:guild_post, specialist: specialist) }
  let(:response_keys) { %w[guildUpdateLastRead viewer] }
  let(:query) {
    <<-GRAPHQL
    mutation {
      guildUpdateLastRead(input: {
        readNotifications: true
      }) {
        viewer {
          ... on Specialist {
            guildUnreadNotifications
          }
        }
      }
    }
    GRAPHQL
  }

  it_behaves_like "guild specialist"

  describe "notifications" do
    subject(:update_last_read) do
      resp = AdvisableSchema.execute(query, context: {current_user: specialist})
      resp.dig("data", *response_keys)
    end

    it "changes the notifications unread state" do
      create(:guild_comment, body: "test", post: guild_post)

      expect { subject }.to change {
        specialist.reload.guild_unread_notifications
      }.from(true).to(false)

      expect(subject['guildUnreadNotifications']).to eq(false)
    end

    it "changes the current time of the read event" do
      freeze_time do
        expect { subject }.to change {
          specialist.reload.guild_notifications_last_read
        }.from(Time.at(0)).to(Time.current)
      end
    end
  end
end