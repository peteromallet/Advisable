# frozen_string_literal: true

class WebhookEvent
  class Application
    def self.data(application)
      application.attributes
    end

    def self.data_with_user(application, user)
      {
        application: application.attributes,
        user: user_attributes(user)
      }
    end

    def self.user_attributes(user)
      {
        uid: user.uid,
        email: user.account.email,
        first_name: user.account.first_name,
        last_name: user.account.last_name
      }
    end
  end
end
