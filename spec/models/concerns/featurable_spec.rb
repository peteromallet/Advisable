# frozen_string_literal: true

require "rails_helper"

class DummyFeaturable < ApplicationRecord
  self.table_name = :accounts

  include Featurable
  featurize :admin, :guest
end

RSpec.describe Featurable do
  it "generates the expected set of methods" do
    expect(DummyFeaturable.instance_methods(false)).to include(:admin?, :admin=, :admin=, :toggle_admin, :toggle_admin!, :guest?, :guest=, :toggle_guest, :toggle_guest!)
    expect(DummyFeaturable.methods(false)).to include(:feature_flags)
  end

  it "includes all feature flags" do
    expect(DummyFeaturable.feature_flags).to match_array(%i[admin guest])
  end

  describe "method functionality" do
    let(:dummy) { DummyFeaturable.new }

    it "toggles groups enabled" do
      expect(dummy.admin?).to eq(false)
      dummy.toggle_admin
      expect(dummy.admin?).to eq(true)
    end

    it "sets groups enabled" do
      expect(dummy.admin?).to eq(false)
      dummy.admin = true
      expect(dummy.admin?).to eq(true)
    end
  end
end
