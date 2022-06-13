# frozen_string_literal: true

require "rails_helper"

RSpec.describe Mutations::UpdateLastReadNotification do
  let(:specialist) { create(:specialist) }
  let(:guild_post) { create(:guild_post, specialist:) }
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
      resp = AdvisableSchema.execute(query, context: {current_user: specialist, current_account:})
      resp.dig("data", "updateLastReadNotification", "viewer")
    end

    let(:current_account) { specialist.account }
    let(:other) { create(:specialist) }

    before do
      Notification.create!(account: specialist.account, action: "suggested_post", guild_post:)
    end

    it "updates unread notifications as read" do
      unread_notification = guild_post.specialist.account.notifications.first

      freeze_time do
        expect { touch_read_at }.to change {
          specialist.account.reload.unread_notifications?
        }.from(true).to(false)

        expect(unread_notification.reload.read_at).to eq(Time.current)
        expect(touch_read_at["unreadNotifications"]).to be(false)
      end
    end

    context "when emulating a user" do
      let(:current_account) { create(:account) }

      it "does not update unread notifications if emulating as admin" do
        unread_notification = guild_post.specialist.account.notifications.first

        freeze_time do
          expect { touch_read_at }.not_to(change { specialist.account.reload.unread_notifications? })
          expect(unread_notification.reload.read_at).not_to eq(Time.current)
          expect(touch_read_at["unreadNotifications"]).to be(true)
        end
      end
    end
  end
end
