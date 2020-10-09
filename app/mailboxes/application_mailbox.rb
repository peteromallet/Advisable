class ApplicationMailbox < ActionMailbox::Base
  routing /^chat-replies@guild\./ => :guild_chat_replies
  # routing /@parse\./ => :guild_chat_replies
end
