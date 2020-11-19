namespace :guild do
  task add_all_specialists_topic_followables: :environment do
    desc "Adds guild topic followables for *all* guild specialists"
    Specialist.guild.find_each(&:guild_add_topic_followables!)
  end
end
