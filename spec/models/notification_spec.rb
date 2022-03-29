# frozen_string_literal: true

require "rails_helper"

RSpec.describe Notification, type: :model do
  let(:guild_post) { create(:guild_post) }
  let(:specialist) { create(:specialist) }
  let(:notification) { build(:notification, actor: specialist.account, notifiable: guild_post, action: "suggested_post") }

  describe "db columns" do
    it { expect(notification).to have_db_column(:id) }
    it { expect(notification).to have_db_column(:read_at) }
    it { expect(notification).to have_db_column(:created_at) }
    it { expect(notification).to have_db_column(:updated_at) }
  end

  describe "relationships" do
    it { expect(notification).to belong_to(:account) }
    it { expect(notification).to belong_to(:actor).class_name("Account").optional(true) }
    it { expect(notification).to belong_to(:notifiable) }
  end

  it "is valid" do
    expect(notification.valid?).to be(true)
  end

  describe "actions" do
    it "errors if the action type is invalid" do
      notification.action = "foo"
      expect do
        notification.save!
      end.to raise_error(ActiveRecord::RecordInvalid).with_message(/Action is not included in the list/)
    end
  end

  context "with notifiables" do
    it "is destroyed with the post" do
      notification.save!
      expect do
        guild_post.destroy
      end.to change(described_class, :count).from(1).to(0)
    end

    it "is destroyed with the actor" do
      # bypass unmockable http request from before_destroy in Syncable
      notification.actor.specialist.update!(airtable_id: nil)

      notification.save!

      expect do
        notification.actor.destroy
      end.to change(described_class, :count).from(1).to(0)
    end
  end
end
