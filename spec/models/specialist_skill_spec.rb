# frozen_string_literal: true
require "rails_helper"

RSpec.describe SpecialistSkill do
  it { should belong_to(:skill) }
  it { should belong_to(:specialist) }
end
