class AddDataToCountries < ActiveRecord::Migration[6.0]
  def up
    add_column :countries, :eu, :boolean
    add_column :countries, :alpha2, :string

    Country.find_each do |country|
      next if country.data.nil?
      country.eu = country.data.in_eu?
      country.alpha2 = country.data.alpha2
      country.save(validate: false)
    end
  end

  def down
    remove_column :countries, :eu, :boolean
    remove_column :countries, :alpha2, :string
  end
end
