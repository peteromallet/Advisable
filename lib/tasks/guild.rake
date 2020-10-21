namespace :guild do
  task add_topics: :environment do
    desc "Add all industries and skills as guild topics"

    Skill.where(active: true, original: nil).find_each do |skill|
      puts "Adding skill #{skill.name}"
      Guild::Topic.create(name: skill.name, topicable: skill)
    end

    Industry.active.order(name: :asc).find_each do |industry|
      puts "Adding industry #{industry.name}"
      Guild::Topic.create(name: industry.name, topicable: industry)
    end

    Country.find_each do |country|
      puts "Adding country #{country.name}"
      Guild::Topic.create(name: country.name, topicable: country)
    end
  end
end
