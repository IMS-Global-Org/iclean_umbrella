defmodule IClean.Users.User do
  use Ecto.Schema
  use Pow.Ecto.Schema

  @derive {Jason.Encoder, only: [:id, :email]}
  schema "users" do
    pow_user_fields()

    has_one :employee, IClean.Employee

    timestamps()
  end
end
