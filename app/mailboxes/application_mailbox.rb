class ApplicationMailbox < ActionMailbox::Base
  routing /@#{ENV.fetch('GUILD_REPLIES_DOMAIN')}/ => :guild_chat_replies
end
