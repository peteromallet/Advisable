# frozen_string_literal: true

class GuildAddFollowablesJob < ApplicationJob
  def perform(specialist_id)
    specialist = Specialist.find(specialist_id)
    interests = specialist.skills
    interests += specialist.previous_projects.flat_map { |pp| pp.industries + pp.skills }
    interests += [specialist.country]

    interests.each do |i|
      specialist.subscribe_to!(i.label)
    end

    # TODO: AATO - Remove this
    Guild::Topic.where(topicable: interests.compact).each do |topic|
      specialist.subscribe_to!(topic)
    end
  end
end
