# Calculates the average ratings for a specialist from their reviews.
class Specialists::Search < ApplicationService
  attr_accessor :skill

  def initialize(skill:)
    @skill = skill
  end

  def call
    specialists = (by_skills + by_projects + by_off_platform_projects).uniq
    specialists.sort_by { |s| s.average_score || 0 }.reverse
  end

  private

  def by_skills
    Specialist.joins(:skills).where(skills: { name: skill })
  end

  def by_projects
    Specialist.joins(projects: :skills).where(projects: { skills: { name: skill }})
  end

  def by_off_platform_projects
    Specialist.joins(off_platform_projects: :skills).where(off_platform_projects: { skills: { name: skill }})
  end
end