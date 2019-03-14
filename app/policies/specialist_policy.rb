class SpecialistPolicy < BasePolicy
  def is_specialist
    record == user
  end
end