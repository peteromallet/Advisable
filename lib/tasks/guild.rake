namespace :guild do
  task add_topics: :environment do
    desc "Add all industries and skills as unrelated guild topics"

    Skill.find_each do |skill|
      puts "Adding skill as topic #{skill.name}"
      Guild::Topic.create(name: skill.name)
    end

    Industry.find_each do |industry|
      puts "Adding industry as topic #{industry.name}"
      Guild::Topic.create(name: industry.name)
    end
  end
end