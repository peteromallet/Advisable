class AddUidToInterviews < ActiveRecord::Migration[6.0]
  def up
    add_column :interviews, :uid, :string, index: true
    Interview.where(uid: nil).find_each do |interview|
      interview.send(:generate_uid)
      interview.save(touch: false, validate: false)
    end
  end

  def down
    remove_column :interviews, :uid, :string, index: true
  end
end
