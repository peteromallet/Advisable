class AddUidToSkills < ActiveRecord::Migration[5.2]
  def up
    add_column :skills, :uid, :string, index: true

    Skill.all.each do |s|
      s.send(:generate_uid)
      s.save
    end
  end

  def down
    remove_column :skills, :uid, :string, index: true
  end
end
