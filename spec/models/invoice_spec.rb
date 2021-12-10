# frozen_string_literal: true

require "rails_helper"

RSpec.describe Invoice, type: :model do
  let(:invoice) { create(:invoice) }

  it "has a valid factory" do
    expect(invoice).to be_valid
  end

  describe "#first_day" do
    it "returns the first day of the invoice" do
      expect(invoice.first_day).to eq(Date.new(2021, 9, 1))
    end
  end

  describe "#date_range" do
    it "returns the date range of the invoice" do
      expect(invoice.date_range).to eq(Date.new(2021, 9, 1)...(Date.new(2021, 10, 1)))
    end
  end

  describe "#payments" do
    let!(:previous_month) { create(:payment, status: "succeeded", company: invoice.company, created_at: Date.new(2021, 8, 31)) }
    let!(:first_day) { create(:payment, status: "succeeded", company: invoice.company, created_at: Date.new(2021, 9, 1)) }
    let!(:mid_day) { create(:payment, status: "succeeded", company: invoice.company, created_at: Date.new(2021, 9, 15)) }
    let!(:last_second) { create(:payment, status: "succeeded", company: invoice.company, created_at: DateTime.new(2021, 10, 1).to_time - 1) }
    let!(:next_month) { create(:payment, status: "succeeded", company: invoice.company, created_at: DateTime.new(2021, 10, 1)) }

    it "includes only payments of current month" do
      expect(invoice.payments).to match_array([first_day, mid_day, last_second])
      expect(invoice.payments).not_to include(previous_month)
      expect(invoice.payments).not_to include(next_month)
    end
  end
end
