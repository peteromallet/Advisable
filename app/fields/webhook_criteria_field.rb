require "administrate/field/base"

class WebhookCriteriaField < Administrate::Field::Base
  def each(&block)
    data.each(&block)
  end
end
