require 'faker'

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
if Rails.env.development?
  AdminUser.first_or_create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password')

  100.times do |i|
    AdminUser.first_or_create!(
      email: Faker::Name.unique.name.underscore + '@example.com',
      password: 'password',
      password_confirmation: 'password'
    )
  end

  5.times do |i|
    Product.create!(
      name: Faker::Name.unique.name,
      description: Faker::Lorem.paragraph,
      summary: Faker::Lorem.sentence,
      sku: "#{ Faker::Lorem.word }-#{ i }",
      price: rand(100)
    )
  end

  100.times do |i|
    Post.create!(
      title: Faker::Name.unique.name,
      content: Faker::Lorem.paragraph,
      admin_user_id: AdminUser.all[rand(AdminUser.all.count)]
    )
  end
end
