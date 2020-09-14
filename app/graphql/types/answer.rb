class Types::Answer < Types::BaseType
  field :id, ID, null: false
  field :content, String, null: false
  field :question, Types::Question, null: true

  def question
    object.question
  end
end
