namespace :guild do
  task add_all_specialists_topic_followables: :environment do
    desc "Adds guild topic followables for *all* guild specialists"
    Specialist.guild.find_each do |specialist|
      add_followables(specialist)
    end
  end

  # usage: $> rake guild:add_specialist_topic_followables[1]
  task :add_specialist_topic_followables, [:specialist_id] => [:environment] do |t,args|
    desc "Adds guild topic followables for a single guild specialist"
    specialist = Specialist.find(args[:specialist_id])
    add_followables(specialist)
  end
end

def add_followables(specialist)
  Rails.logger.info "Populating followables for specialist: #{specialist.uid}"

  # Skills
  specialist.skills.each do |skill|
    next unless skill.guild_topic
    specialist.follow(skill.guild_topic)
  end

  # Previous Project industries and skills
  specialist.previous_projects.each do |pp|
    pp.industries.each do |pp_industry|
      next unless pp_industry.guild_topic
      specialist.follow(pp_industry.guild_topic)
    end
    pp.skills.each do |pp_skill|
      next unless pp_skill.guild_topic
      specialist.follow(pp_skill.guild_topic)
    end
  end

  # specialist location
  specialist.follow(specialist.country.guild_topic)
end
