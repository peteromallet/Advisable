#
# This is mainly for the guild but is not namespaced
#  as such due to a limitation with the underlying acts_as_follower lib.
#  In the future this can be used to follow any advisable resource
#

class Follow < ActiveRecord::Base
  extend ActsAsFollower::FollowerLib
  extend ActsAsFollower::FollowScopes

  # NOTE: Follows belong to the "followable" and "follower" interface
  belongs_to :followable, polymorphic: true
  belongs_to :follower, polymorphic: true

  def block!
    update_attribute(:blocked, true)
  end
end
