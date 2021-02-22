# frozen_string_literal: true

# cleaning the database using database_cleaner
DatabaseCleaner[:active_record].strategy = :truncation
DatabaseCleaner[:active_record].clean
