# Users and specialists have a completed_tutorials attribute which tracks the
# various product tutorials that they have complete.
module Tutorials
  extend ActiveSupport::Concern

  class_methods do
    attr_accessor :tutorials

    # Tutorials must be registered on the User or Specialist model first using
    # the register_tutorial method. The name of the tutorial should be a unique
    # string.
    def register_tutorial(name)
      @tutorials ||= []
      @tutorials << name
    end
  end

  included do
    validate :valid_tutorials

    def completed_tutorials=(tutorials)
      self[:completed_tutorials] = tutorials.reject(&:empty?)
    end

    # returns the array of completed tutorials
    def completed_tutorials
      self[:completed_tutorials] || []
    end

    # Adds a given tutorial to the completed_tutorials array
    def complete_tutorial(tutorial)
      return true if completed_tutorials.include?(tutorial)
      self.completed_tutorials = completed_tutorials + [tutorial]
      save
    end

    def has_completed_tutorial?(tutorial)
      completed_tutorials.include?(tutorial)
    end

    private

    def valid_tutorials
      completed_tutorials.each do |tutorial|
        next if self.class.tutorials.include?(tutorial)
        errors.add(
          :completed_tutorials,
          "#{tutorial} is not a registered tutorial"
        )
      end
    end
  end
end
