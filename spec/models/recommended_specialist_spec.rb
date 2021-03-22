# frozen_string_literal: true

require "rails_helper"

RSpec.describe RecommendedSpecialist, type: :model do
  let(:recommended_specialist) { build(:recommended_specialist) }

  describe "db columns" do
    it { expect(recommended_specialist).to have_db_column :id }
    it { expect(recommended_specialist).to have_db_column :match_category }
    it { expect(recommended_specialist).to have_db_column :specialist_id }
    it { expect(recommended_specialist).to have_db_column :recommendation_id }
  end

  describe "relationships" do
    it { expect(recommended_specialist).to belong_to(:specialist) }
    it { expect(recommended_specialist).to belong_to(:recommendation).class_name('Specialist') }
  end

  it "is valid" do
    expect(recommended_specialist).to be_valid
    expect { recommended_specialist.save! }.to change(described_class, :count).from(0).to(1)
  end

  it "is invalid if recommendation has already been recommended" do
    specialist = create(:specialist, :guild)
    recommendation = create(:specialist, :guild)
    create(:recommended_specialist, specialist: specialist, recommendation: recommendation)

    expect do
      create(:recommended_specialist, specialist: specialist, recommendation: recommendation)
    end.to raise_error(ActiveRecord::RecordInvalid).with_message(/Recommendation has already been recommended/)
  end
end
