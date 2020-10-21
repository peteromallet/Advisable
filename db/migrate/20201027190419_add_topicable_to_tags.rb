class AddTopicableToTags < ActiveRecord::Migration[6.0]
  disable_ddl_transaction!

  def change
    add_reference :tags, :topicable, polymorphic: true, null: true, index: {algorithm: :concurrently}
  end
end
