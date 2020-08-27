module Types::Guild::AuthorInterface
  include Types::BaseInterface 
  field_class BaseField

  orphan_types Types::Guild::CommentType

  field :authored, Boolean, null: false do
    description 'Whether the current user is the author of the resource'
  end
  def authored
    object.specialist_id == context[:current_user]&.id
  end

  field :author, Types::SpecialistType, null: false do
    description "The author of the resource"
  end
  def author
    object.specialist
  end

  # definition_methods do
  #   if object.try(:type) && Guild::Post::POST_TYPES.include?(object.type)
  #     "Types::Guild::Post::#{object.type}Type".constantize
  #   elsif object.is_a?(Guild::Comment)
  #     Types::Guild::CommentType
  #   else
  #     raise "Unexpected Type: #{object.inspect}"
  #   end
  # end
end