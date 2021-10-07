# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::Guild::UpdateLastRead do
  let(:specialist) { create(:specialist, :guild) }
  let(:guild_post) { create(:guild_post, specialist: specialist) }
  let(:response_keys) { %w[guildUpdateLastRead viewer] }
  let(:query) do
    <<-GRAPHQL
    mutation {
      guildUpdateLastRead(input: {}) {
        viewer {
          ... on Specialist {
            guildUnreadNotifications
          }
        }
      }
    }
    GRAPHQL
  end

  it_behaves_like "guild specialist"

  describe "notifications" do
    subject(:touch_read_at) do
      resp = AdvisableSchema.execute(query, context: {current_user: specialist})
      resp.dig("data", *response_keys)
    end

    let(:other) { create(:specialist, :guild) }

    before do
      reaction = guild_post.reactions.create(specialist: other)
      reaction.create_notification!
    end

    it "updates guild unread notifications as read" do
      unread_notification = guild_post.specialist.account.notifications.first

      freeze_time do
        expect { touch_read_at }.to change {
          specialist.account.reload.unread_notifications?
        }.from(true).to(false)

        expect(unread_notification.reload.read_at).to eq(Time.current)
        expect(touch_read_at['guildUnreadNotifications']).to eq(false)
      end
    end
  end
end
