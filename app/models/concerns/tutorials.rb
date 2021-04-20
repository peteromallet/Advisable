# frozen_string_literal: true

# Users and specialists have a completed_tutorials attribute which tracks the
# various product tutorials that they have complete.
module Tutorials
  extend ActiveSupport::Concern

  TUTORIALS = {
    "User" => %w[fixed_projects flexible_projects recommendations],
    "Specialist" => %w[fixed_projects flexible_projects guild]
  }.freeze

  included do
    validate :valid_tutorials

    def completed_tutorials=(tutorials)
      super(tutorials.reject(&:empty?))
    end

    # returns the array of completed tutorials
    def completed_tutorials
      super || []
    end

    # Adds a given tutorial to the completed_tutorials array
    def complete_tutorial(tutorial)
      return true if completed_tutorials.include?(tutorial)

      update(completed_tutorials: completed_tutorials + [tutorial])
    end

    def completed_tutorial?(tutorial)
      completed_tutorials.include?(tutorial)
    end

    def available_tutorials
      @available_tutorials ||= TUTORIALS[specialist_or_user.class.name]
    end

    private

    def valid_tutorials
      completed_tutorials.each do |tutorial|
        next if available_tutorials.include?(tutorial)

        errors.add(
          :completed_tutorials,
          "#{tutorial} is not a registered tutorial"
        )
      end
    end
  end
end
