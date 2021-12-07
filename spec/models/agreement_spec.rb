# frozen_string_literal: true

require "rails_helper"

RSpec.describe Agreement, type: :model do
  let(:agreement) { create(:agreement) }

  it "has a valid factory" do
    expect(agreement).to be_valid
  end
end
