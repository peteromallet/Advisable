class Guild::CommentPolicy < Guild::BasePolicy
  def delete_comment
    is_guild_user? && (record.specialist_id == user.id)
  end
  
  def create_child_comment
    is_guild_user? && record.published?
  end
end
