# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

def food_response(num)
	uri = URI("http://food2fork.com/api/search?key=9bd16e91f2d1df0015d44136298b8536&q=fish&page=#{num}")
	response = Net::HTTP.get(uri)
	JSON.parse(response)
end

def recipe_save(recipe)
	Recipe.create(publisher: recipe['publisher'],ingredients: recipe['ingredients'], source_url: recipe['source_url'], image_url: recipe['image_url'], social_rank: recipe['social_rank'], title: recipe['title'])
end

def recipe_get(recipe_id)
	uri = URI("http://food2fork.com/api/get?key=9bd16e91f2d1df0015d44136298b8536&rId=#{recipe_id}")
	response = Net::HTTP.get(uri)
	parse_res = JSON.parse(response)
	recipe_save(parse_res['recipe'])
end


result = food_response(8)
result['recipes'].each do |recipe|
	recipe_get(recipe['recipe_id'])
end

