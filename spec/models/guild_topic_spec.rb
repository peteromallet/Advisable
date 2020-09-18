# frozen_string_literal: true

require "rails_helper"

RSpec.describe Guild::Topic, type: :model do
  let(:guild_topic) { create(:guild_topic) }

  describe "db columns" do
    it { expect(guild_topic).to have_db_column :id }
    it { expect(guild_topic).to have_db_column :name }
    it { expect(guild_topic).to have_db_column :alias_tag_id }
  end

  describe "relationships" do
    it { expect(guild_topic).to belong_to(:alias_tag).class_name('Guild::Topic').optional(true) }
    it { expect(guild_topic).to have_many(:aliased_tags) }
  end

  describe "root topic tag aliases" do
    let(:new_topic) { build(:guild_topic) }

    it "aliases a root tag" do
      new_topic.alias_tag = guild_topic
      expect(new_topic).to be_valid
      expect { new_topic.save }.to change { Guild::Topic.count }.by(1)
    end

    it "errors when aliasing a tag with an alias" do
      topic_with_alias = create(:guild_topic, alias_tag: guild_topic)
      new_topic.alias_tag = topic_with_alias

      expect(new_topic).to_not be_valid
      expect(new_topic.errors[:base]).to include("Cannot alias another aliased topic")
    end
  end
end
