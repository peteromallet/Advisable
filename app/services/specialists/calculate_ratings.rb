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

  def reviews
    @review ||= specialist.reviews.where(
      type: ["On-Platform Job Review", "Off-Platform Project Review"],
    )
  end

  # Iterate through each review and add each rating from the reviews ratings
  # hash to the @ratings variable
  def collect_ratings
    reviews.each do |review|
      review.ratings.each do |name, rating|
        add_rating(name, rating)
      end
    end
  end

  # Adds a rating to the @ratings collection
  def add_rating(name, rating)
    ratings[name] ||= []
    ratings[name] << rating unless rating.nil?
  end

  # Iterate through the collection of ratings and calculate the averages
  def calculate_averages
    ratings.each do |name, collected|
      rating = (collected.sum / ratings.length).to_f
      specialist.ratings[name] = rating
    end
  end
end