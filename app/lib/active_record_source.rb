# frozen_string_literal: true

class ActiveRecordSource < GraphQL::Dataloader::Source
  def initialize(model_class)
    super()
    @model_class = model_class
  end

  def fetch(ids)
    records = @model_class.where(id: ids).index_by(&:id)
    records.slice(*ids).values
  end
end
