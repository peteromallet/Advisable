# frozen_string_literal: true

class AddArticleToInterview < ActiveRecord::Migration[7.0]
  def change
    add_reference :interviews, :article, foreign_key: {to_table: :case_study_articles}
  end
end
