# frozen_string_literal: true

require "rails_helper"

RSpec.describe SpecialistSkill do
  it { is_expected.to belong_to(:skill) }
  it { is_expected.to belong_to(:specialist) }
end
