# app/graph/types/query_type.rb
Types::QueryType = GraphQL::ObjectType.define do
  name "Query"
  description "The query root of this schema"

  field :viewer do
    type UserType
    description "Current user"
    resolve ->(obj, args, ctx) {
      ctx[:current_user]
    }
  end
end
