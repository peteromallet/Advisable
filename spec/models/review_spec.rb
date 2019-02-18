require 'rails_helper'

describe Review do
  it 'has a valid factory' do
    review = build(:review)
    expect(review).to be_valid
  end

  describe '#update_specialist_reviews_count' do
    it 'is called after save' do
      review = build(:review)
      expect(review).to receive(:update_specialist_reviews_count)
      review.save
    end

    it 'updates the specialists reviews_count column' do
      specialist = create(:specialist, reviews_count: 0)
      expect {
        create(:review, specialist: specialist, type: "On-Platform Job Review")
      }.to change { specialist.reload.reviews_count }.by(1)
    end

    it 'is called after_destroy' do
      review = create(:review)
      expect(review).to receive(:update_specialist_reviews_count)
      review.destroy
    end
  end

  describe '#update_specialist_ratings' do
    it 'is called after_save' do
      review = build(:review)
      expect(review).to receive(:update_specialist_ratings)
      review.save
    end

    it 'is called after_destroy' do
      review = create(:review)
      expect(review).to receive(:update_specialist_ratings)
      review.destroy
    end

    it 'Calls Specialists::CalculateRatings.call' do
      review = create(:review)
      expect(Specialists::CalculateRatings).to receive(:call).with(specialist: review.specialist)
      review.send(:update_specialist_ratings)
    end
  end
end