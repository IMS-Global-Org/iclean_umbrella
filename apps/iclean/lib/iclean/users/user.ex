defmodule IClean.Users.User do
  use Ecto.Schema
  use Pow.Ecto.Schema

  @derive {Jason.Encoder, only: [:id, :email]}
  schema "users" do
    field :role, :string, default: "basic"

    pow_user_fields()

    has_one :employee, IClean.Employee

    timestamps()
  end

  @spec changeset_role(Ecto.Schema.t() | Ecto.Changeset.t(), map()) :: Ecto.Changeset.t()
  def changeset_role(user_or_changeset, attrs) do
    user_or_changeset
    |> Ecto.Changeset.cast(attrs, [:role])
    |> Ecto.Changeset.validate_inclusion(:role, ~w(guest basic admin uber super))
  end
end
