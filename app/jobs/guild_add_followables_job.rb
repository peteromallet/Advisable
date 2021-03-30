# frozen_string_literal: true

class GuildAddFollowablesJob < ApplicationJob
  def perform(specialist_id)
    specialist = Specialist.find(specialist_id)
    interests = specialist.skills
    interests += specialist.previous_projects.flat_map { |pp| pp.industries + pp.skills }
    interests += [specialist.country]

    interests.compact.uniq.each do |i|
      next unless i.label

      specialist.subscribe_to!(i.label)
    end
  end
end
