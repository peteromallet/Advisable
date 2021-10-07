# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Mutations::UpdateLastReadNotification do
  let(:specialist) { create(:specialist) }
  let(:guild_post) { create(:guild_post, specialist: specialist) }
  let(:query) do
    <<-GRAPHQL
    mutation {
      updateLastReadNotification(input: {}) {
        viewer {
          ... on Specialist {
            unreadNotifications
          }
        }
      }
    }
    GRAPHQL
  end

  describe "notifications" do
    subject(:touch_read_at) do
      resp = AdvisableSchema.execute(query, context: {current_user: specialist})
      pp resp
      resp.dig("data", "updateLastReadNotification", "viewer")
    end

    let(:other) { create(:specialist) }

    before do
      reaction = guild_post.reactions.create(specialist: other)
      reaction.create_notification!
    end

    it "updates unread notifications as read" do
      unread_notification = guild_post.specialist.account.notifications.first

      freeze_time do
        expect { touch_read_at }.to change {
          specialist.account.reload.unread_notifications?
        }.from(true).to(false)

        expect(unread_notification.reload.read_at).to eq(Time.current)
        expect(touch_read_at['unreadNotifications']).to eq(false)
      end
    end
  end
end
