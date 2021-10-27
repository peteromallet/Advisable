# frozen_string_literal: true

require "rails_helper"

class DummyFeaturable < ApplicationRecord
  self.table_name = :accounts

  include Featurable
  featurize :admin, :guest
  featurize :team_manager, :editor, column: :permissions
end

RSpec.describe Featurable do
  it "generates the expected set of methods" do
    expect(DummyFeaturable.instance_methods(false)).to include(:admin?, :toggle_admin, :toggle_admin!, :guest?, :toggle_guest, :toggle_guest!)
    expect(DummyFeaturable.methods(false)).to include(:all_features, :with_feature)
  end

  it "includes all features" do
    expect(DummyFeaturable.all_features).to match_array(%i[admin guest])
  end

  describe "method functionality" do
    let(:dummy) { DummyFeaturable.new }

    it "toggles admin enabled" do
      expect(dummy.admin?).to eq(false)
      dummy.toggle_admin
      expect(dummy.admin?).to eq(true)
    end

    it "filters by with_feature" do
      dummy.assign_attributes(uid: Account.generate_uid)
      dummy.toggle_admin!
      expect(DummyFeaturable.with_feature(:admin)).to include(dummy)
      dummy.toggle_admin!
      expect(DummyFeaturable.with_feature(:admin)).not_to include(dummy)
    end
  end

  context "with a different column name" do
    it "generates the expected set of methods" do
      expect(DummyFeaturable.instance_methods(false)).to include(:team_manager?, :toggle_team_manager, :toggle_team_manager!, :editor?, :toggle_editor, :toggle_editor!)
      expect(DummyFeaturable.methods(false)).to include(:all_permissions)
    end

    it "includes all features" do
      expect(DummyFeaturable.all_permissions).to match_array(%i[team_manager editor])
    end

    describe "method functionality" do
      let(:dummy) { DummyFeaturable.new }

      it "toggles team_manager enabled" do
        expect(dummy.team_manager?).to eq(false)
        dummy.toggle_team_manager
        expect(dummy.team_manager?).to eq(true)
      end

      it "filters by with_permission" do
        dummy.assign_attributes(uid: Account.generate_uid)
        dummy.toggle_team_manager!
        expect(DummyFeaturable.with_permission(:team_manager)).to include(dummy)
        dummy.toggle_team_manager!
        expect(DummyFeaturable.with_permission(:team_manager)).not_to include(dummy)
      end
    end
  end
end
