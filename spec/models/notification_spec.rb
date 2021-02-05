# frozen_string_literal: true

require "rails_helper"

RSpec.describe Notification, type: :model do
  let(:guild_post) { create(:guild_post) }
  let(:specialist) { create(:specialist, :guild) }
  let(:notification) { build(:notification, actor: specialist.account, notifiable: guild_post, action: "suggested_post") }

  describe "db columns" do
    it { expect(notification).to have_db_column :id }
    it { expect(notification).to have_db_column :read_at }
    it { expect(notification).to have_db_column :created_at }
    it { expect(notification).to have_db_column :updated_at }
  end

  describe "relationships" do
    it { expect(notification).to belong_to(:account) }
    it { expect(notification).to belong_to(:actor).class_name('Account').optional(true) }
    it { expect(notification).to belong_to(:notifiable) }
  end

  it "is valid" do
    expect(notification.valid?).to eq(true)
  end

  describe "actions" do
    it "errors if the action type is invalid" do
      notification.action = "foo"
      expect do
        notification.save!
      end.to raise_error(ActiveRecord::RecordInvalid).with_message(/Action is not included in the list/)
    end
  end
end
