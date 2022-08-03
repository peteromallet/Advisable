# frozen_string_literal: true

# rubocop:disable Rails/SkipsModelValidations
class LocalData
  CLASSES = [CaseStudy::InterestArticle, CaseStudy::Interest].freeze
  TABLE_NAMES = CLASSES.map(&:table_name).freeze

  attr_reader :now

  def initialize
    @now = Time.zone.now
  end

  def populate_local_tables(source_dir:)
    production_data = ProductionData.new
    production_data.__send__(:populate, "case_study_interests", source_dir:)
    production_data.__send__(:populate, "case_study_interest_articles", source_dir:)
  end

  def populate_interests!
    puts "Populating interest data..."
    generate_and_find_interests
    populate_topics
    TABLE_NAMES.each { |table| dump_table(table) }
  end

  def destroy_existing_data!
    CLASSES.each(&:delete_all)
  end

  private

  def generate_and_find_interests
    interests = ["Scale Performance Marketing", "Creative PR Strategy", "Long-Form Content Marketing", "Start B2B Podcast", "Improve SEO Rankings", "Creative Growth Marketing", "Develop Value Proposition", "Build SEO Strategy", "Enter German Market", "Test Instagram Ads", "Create Newsletter", "Create Video Content", "Paid Acquisition Strategy", "Enter Middle-Eastern Market", "Build Trade Show Strategy", "Implement Hubspot", "UX Optimisation", "Rebranding Strategy", "Research Target Market", "Improve Content Design", "Create Brand Identity", "Build Marketing Strategy", "B2B Ghostwriting", "Growth Marketing", "Improve Funnel Conversion Rate", "Redesign Website", "Design Paid Marketing Assets", "Run Webinars", "Launch App Ad Campaigns", "Improve Online Reputation", "Build Online Community", "Content Marketing Strategy", "Funny Social Media Content", "Improve User Acquisition Profitability", "Update Strategic Messaging", "Social Media Advertising", "Research Landing Page Usability", "Virtual Event Strategy", "App Store Optimisation", "Creative Design", "Hubspot & Salesforce Integration", "Create Explainer Video", "Create Webflow Website", "Paid Marketing Strategy", "Data-Driven Content", "Outbound Email Campaigns", "Rewrite Web Copy", "Launch in German Market", "Rebuild Marketing Automation", "User Research"]
    i = 0
    interests_data = []
    User.all.each do |user|
      5.times do
        interests_data << {uid: CaseStudy::Interest.generate_uid, account_id: user.account_id, term: interests[i], created_at: now, updated_at: now}
        i += 1
      end
    end
    CaseStudy::Interest.insert_all(interests_data)
    CaseStudy::Interest.find_each(&:find_articles!)
  end

  def populate_topics
    articles = CaseStudy::Article.searchable.pluck(:id)
    CaseStudy::Topic.all.each do |topic|
      topic.update_columns(result_ids: articles.sample(15))
    end
    dump_table("case_study_topics")
  end

  def dump_table(table)
    `psql -d advisable_development -c "\\copy (SELECT * FROM #{table}) TO #{TestData::PRUNED_DIR}/#{table}.csv WITH (FORMAT CSV, HEADER TRUE, FORCE_QUOTE *)"`
  end
end
# rubocop:enable Rails/SkipsModelValidations
