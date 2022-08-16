# frozen_string_literal: true

require "rails_helper"

RSpec.describe Country do
  it { is_expected.to have_many(:specialists) }
  it { is_expected.to validate_presence_of(:name) }
end
