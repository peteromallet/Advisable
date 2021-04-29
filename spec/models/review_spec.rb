# frozen_string_literal: true

require "rails_helper"

RSpec.describe Review do
  it "has a valid factory" do
    review = build(:review)
    expect(review).to be_valid
  end

  describe "#update_specialist_reviews_count" do
    it "is called after save" do
      review = build(:review)
      expect(review).to receive(:update_specialist_reviews_count)
      review.save
    end

    it "updates the specialists reviews_count column" do
      specialist = create(:specialist, reviews_count: 0)
      expect do
        create(:review, specialist: specialist, type: "On-Platform Job Review")
      end.to change { specialist.reload.reviews_count }.by(1)
    end

    it "is called after_destroy" do
      review = create(:review)
      expect(review).to receive(:update_specialist_reviews_count)
      review.destroy
    end
  end

  describe "#update_specialist_ratings" do
    let(:specialist) { create(:specialist) }

    it "is called after_save" do
      review = build(:review)
      expect(review).to receive(:update_specialist_ratings)
      review.save!
    end

    it "updates the rating" do
      create(:review, specialist: specialist, ratings: {overall: 6})
      create(:review, specialist: specialist.reload, ratings: {overall: 7})
      expect(specialist.reload.ratings["overall"]).to eq(6.5)
    end

    it "is called after_destroy" do
      review = create(:review)
      expect(review).to receive(:update_specialist_ratings)
      review.destroy
    end
  end
end
