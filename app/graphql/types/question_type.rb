class Types::QuestionType < Types::BaseType
  field :id, ID, null: false
  field :content, String, null: false

  def id
    object.uid
  end
end
