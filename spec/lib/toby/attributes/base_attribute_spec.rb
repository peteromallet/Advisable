# frozen_string_literal: true

require "rails_helper"

RSpec.describe Toby::Attributes::BaseAttribute do
  let(:name) { :created_at }
  let(:resource) { Toby::Resources::Application }
  let(:options) { {} }
  let(:base) { described_class.new(name, resource, **options) }

  describe "#humanized_name" do
    it "returns humanized name" do
      expect(base.humanized_name).to eq("Created at")
    end
  end
end
