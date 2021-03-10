# frozen_string_literal: true

class GuildAddFollowablesJob < ApplicationJob
  def perform(specialist_id)
    s = Specialist.find(specialist_id)
    topicable = s.skills + s.previous_projects.flat_map { |pp| pp.industries + pp.skills } + [s.country]
    Guild::Topic.where(topicable: topicable.compact).each { |topic| s.subscribe_to!(topic) }
  end
end
