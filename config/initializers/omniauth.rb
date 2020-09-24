Rails.application.config.middleware.use OmniAuth::Builder do
  provider :linkedin,
           ENV['LINKEDIN_KEY'],
           ENV['LINKEDIN_SECRET'],
           scope: 'r_basicprofile rw_ads',
           fields: ['id', 'first-name', 'last-name', 'picture-url']
end
