module Types::Guild::ReactionInterface
  include Types::BaseInterface
  field_class BaseField

  orphan_types Types::Guild::CommentType

  field :reactions_count, Integer, null: true do
    description 'The number of reactions for the guild resource'
  end
  def reactions_count
    object.reactionable_count
  end

  field :reacted, Boolean, null: false do
    description 'Whether the current_user has reacted to the guild resource'
  end
  def reacted
    object.reactions.exists?(specialist: context[:current_user])
  end
end