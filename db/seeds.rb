# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require "csv"

# mst_japans
CSV.foreach('db/mst_japans.csv') do |row|
  Prefecture.create(:name => row[0])
end

# mst_group.csv
CSV.foreach('db/mst_group.csv') do |row|
  Group.create(:name => row[0])
end

# mst_participations.csv
CSV.foreach('db/mst_participations.csv') do |row|
  Participation.create(:name => row[0])
end