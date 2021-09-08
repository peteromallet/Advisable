# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Invoice, type: :model do
  let(:invoice) { create(:invoice) }

  it "has a valid factory" do
    expect(invoice).to be_valid
  end

  describe "#first_day" do
    it "returns the first day of the invoice" do
      expect(invoice.first_day).to eq("1.9.2021".to_date)
    end
  end

  describe "#date_range" do
    it "returns the date range of the invoice" do
      expect(invoice.date_range).to eq(("1.9.2021".to_date)...("1.10.2021".to_date))
    end
  end

  describe "#payments" do
    let!(:previous_month) { create(:payment, status: "succeeded", company: invoice.company, created_at: "31.8.2021") }
    let!(:first_day) { create(:payment, status: "succeeded", company: invoice.company, created_at: "1.9.2021") }
    let!(:mid_day) { create(:payment, status: "succeeded", company: invoice.company, created_at: "15.9.2021") }
    let!(:last_second) { create(:payment, status: "succeeded", company: invoice.company, created_at: "1.10.2021".to_time - 1) }
    let!(:next_month) { create(:payment, status: "succeeded", company: invoice.company, created_at: "1.10.2021") }

    it "includes only payments of current month" do
      expect(invoice.payments).to match_array([first_day, mid_day, last_second])
      expect(invoice.payments).not_to include(previous_month)
      expect(invoice.payments).not_to include(next_month)
    end
  end
end
