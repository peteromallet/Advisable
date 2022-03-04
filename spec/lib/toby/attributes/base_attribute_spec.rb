# frozen_string_literal: true

require "rails_helper"

RSpec.describe Toby::Attributes::BaseAttribute do
  let(:name) { :created_at }
  let(:resource) { Toby::Resources::Account }
  let(:account) { create(:account, created_at: "1.1.2021") }
  let(:options) { {} }
  let(:base) { described_class.new(name, resource, **options) }

  describe "#humanized_name" do
    it "returns humanized name" do
      expect(base.humanized_name).to eq("Created at")
    end
  end

  describe "#field" do
    it "returns field" do
      expect(base.field).to eq("createdAt")
    end
  end

  describe "#readonly" do
    it "defaults to false" do
      expect(base.readonly).to be_falsey
    end

    context "when provided a readonly option" do
      let(:options) { {readonly: true} }

      it "returns readonly option" do
        expect(base.readonly).to be_truthy
      end
    end
  end

  describe "#sortable" do
    it "defaults to true" do
      expect(base.sortable).to be_truthy
    end

    context "when provided a sortable option" do
      let(:options) { {sortable: false} }

      it "returns sortable option" do
        expect(base.sortable).to be_falsey
      end
    end
  end

  describe "#case_insensitive_compare" do
    it "defaults to false" do
      expect(base.case_insensitive_compare).to be_falsey
    end

    context "when provided a case_insensitive_compare option" do
      let(:options) { {case_insensitive_compare: true} }

      it "returns case_insensitive_compare option" do
        expect(base.case_insensitive_compare).to be_truthy
      end
    end
  end

  describe "#read" do
    it "reads from the object" do
      expect(base.read(account)).to eq("1.1.2021")
    end
  end

  describe "#write" do
    it "writes to the object" do
      expect(account.created_at).to eq("1.1.2021")
      base.write(account, "2.2.2021")
      expect(account.created_at).to eq("2.2.2021")
    end
  end
end
