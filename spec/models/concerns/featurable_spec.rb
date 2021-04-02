# frozen_string_literal: true

require "rails_helper"

class DummyFeaturable < ApplicationRecord
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
    let(:account) { build_stubbed(:account) }

    it "toggles groups enabled" do
      expect(account.test?).to eq(false)
      account.toggle_test
      expect(account.test?).to eq(true)
    end

    it "sets groups enabled" do
      expect(account.test?).to eq(false)
      account.test = true
      expect(account.test?).to eq(true)
    end
  end
end
