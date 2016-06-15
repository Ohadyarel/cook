# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# def food_response(num)
# 	uri = URI("http://food2fork.com/api/search?key=9bd16e91f2d1df0015d44136298b8536&q=beef&page=#{num}")
# 	response = Net::HTTP.get(uri)
# 	JSON.parse(response)
# end

# def recipe_save(recipe)
# 	Recipe.create(publisher: recipe['publisher'],ingredients: recipe['ingredients'], source_url: recipe['source_url'], image_url: recipe['image_url'], social_rank: recipe['social_rank'], title: recipe['title'])
# end

# def recipe_get(recipe_id)
# 	uri = URI("http://food2fork.com/api/get?key=9bd16e91f2d1df0015d44136298b8536&rId=#{recipe_id}")
# 	response = Net::HTTP.get(uri)
# 	parse_res = JSON.parse(response)
# 	recipe_save(parse_res['recipe'])
# end


# result = food_response(9)
# result['recipes'].each do |recipe|
# 	recipe_get(recipe['recipe_id'])
# end

# oils = ["Olive oil", "Vegetable oil", "Balsamic vinegar", "White vinegar", "Red vinegar","Soy sauce", "Ketchup", "Mayonnaise", "Dijon mustard","Worcestershire", "Hot sauce"]

# seasonings = ["Salt", "Black pepper", "Bay leaves", "Cayenne pepper", "Red pepper flakes", "Cumin", "Oregano", "Paprika", "Rosemary", "Thyme", "Cinnamon", "Nutmeg", "Chili powder", "Curry powder"]
# cans = ["Canned beans", "Capers", "Olives", "Peanut butter", "Chicken stock", "Tomato paste", "Salsa", "Canned Tuna"]
# grains = ["Breadcrumbs", "Couscous", "Pasta", "Rice", "Dried lentils"]
# baking = ["Baking powder", "Baking soda", "Brown sugar", "Cornstarch", "All-purpose flour", "Honey", "Vanilla extract"]
# refrigerator = ["Butter", "Parmesan", "Eggs", "Milk", "Yogurt"]
# freezer = ["Frozen broccoli", "Frozen corn", "Frozen peas", "Frozen spinach"]
# storage = ["Garlic", "Onion", "Potato", "Peanuts"]

# oils.each do |ing|
# 	Ingredient.create(name:ing)
# end

# seasonings.each do |ing|
# 	Ingredient.create(name:ing)
# end

# cans.each do |ing|
# 	Ingredient.create(name:ing)
# end

# grains.each do |ing|
# 	Ingredient.create(name:ing)
# end

# baking.each do |ing|
# 	Ingredient.create(name:ing)
# end

# refrigerator.each do |ing|
# 	Ingredient.create(name:ing)
# end

# freezer.each do |ing|
# 	Ingredient.create(name:ing)
# end

# storage.each do |ing|
# 	Ingredient.create(name:ing)
# end

@ingredients = Ingredient.all
@ingredients.length.times do |i|
	UserIngredient.create(user_id: 1, ingredient_id: @ingredients[i].id)
end