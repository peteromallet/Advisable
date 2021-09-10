# frozen_string_literal: true

class TobyView < ApplicationRecord
end

# == Schema Information
#
# Table name: toby_views
#
#  id         :bigint           not null, primary key
#  filters    :jsonb
#  name       :string
#  resource   :string
#  sort_by    :string
#  sort_order :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_toby_views_on_resource  (resource)
#
