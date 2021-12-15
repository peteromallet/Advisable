# frozen_string_literal: true

class TobyView < ApplicationRecord
end

# == Schema Information
#
# Table name: toby_views
#
#  id         :integer          not null, primary key
#  name       :string
#  resource   :string
#  filters    :jsonb
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  sort_by    :string
#  sort_order :string
#
# Indexes
#
#  index_toby_views_on_resource  (resource)
#
