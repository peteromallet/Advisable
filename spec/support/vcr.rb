require 'vcr'

VCR.configure do |config|
  config.ignore_localhost = true
  config.cassette_library_dir = 'vcr_cassettes'
  config.hook_into :webmock

  ENV['ZOOM_API_KEYS'].split(',').compact.each do |zkey|
    config.filter_sensitive_data("~#{zkey}~") { '~ZOOM_API_KEY~' }
  end

  %w[TALKJS_APP_ID TALKJS_SECRET_KEY].each do |pkey|
    ENV[pkey] ||= 'secret'
    config.filter_sensitive_data("~#{pkey}~") { ENV[pkey] }
  end

  config.filter_sensitive_data('~BEARER_TOKEN~') do |interaction|
    auths = interaction.request.headers['Authorization'].first

    if (match = auths.match /^Bearer\s+([^,\s]+)/ )
      match.captures.first
    end
  end
end
