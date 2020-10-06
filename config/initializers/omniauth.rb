Rails.application.config.middleware.use OmniAuth::Builder do
  provider :linkedin, ENV['LINKEDIN_KEY'], ENV['LINKEDIN_SECRET'], scope: 'r_basicprofile', fields: ['id', 'first-name', 'last-name', 'picture-url']

  provider :linkedin, ENV['LINKEDIN_KEY'], ENV['LINKEDIN_SECRET'], scope: 'r_liteprofile rw_ads', name: 'linkedin_ads', fields: ['id', 'first-name', 'last-name', 'picture-url']
end
