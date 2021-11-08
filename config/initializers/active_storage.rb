# frozen_string_literal: true

# This helps since we're using disk storage for ActiveStorage
# More info: https://github.com/rails/rails/issues/40855
# A potential fix: https://github.com/rails/rails/pull/42847
# A more in-depth fix: https://github.com/rails/rails/issues/39566

ActiveStorage::Current.host = "http://localhost:3000" if Rails.env.development?
