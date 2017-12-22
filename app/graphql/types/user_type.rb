UserType = GraphQL::ObjectType.define do
  name "User"
  description "A user"

  field :id, types.Int
  field :email, types.String
  field :updated_at do
    type types.Int

    resolve -> (obj, args, ctx) {
      obj.updated_at.to_i
    }
  end
  field :created_at do
    type types.Int

    resolve -> (obj, args, ctx) {
      obj.created_at.to_i
    }
  end
en
