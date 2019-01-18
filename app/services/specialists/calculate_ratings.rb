# Calculates the average ratings for a specialist from their reviews.
class Specialists::CalculateRatings < ApplicationService
  attr_accessor :specialist, :ratings

  def initialize(specialist:)
    @specialist = specialist
    @ratings = {}
  end

  def call
    collect_ratings
    calculate_averages
    specialist.save
  end

  private

  # Iterate through each review and add each rating from the reviews ratings
  # hash to the @ratings variable
  def collect_ratings
    specialist.reviews.each do |review|
      review.ratings.each do |name, rating|
        add_rating(name, rating)
      end
    end
  end

  # Adds a rating to the @ratings collection
  def add_rating(name, rating)
    ratings[name] ||= []
    ratings[name] << rating
  end

  # Iterate through the collection of ratings and calculate the averages
  def calculate_averages
    ratings.each do |name, ratings|
      rating = (ratings.sum / ratings.length).to_f
      specialist.ratings[name] = rating
    end
  end
end