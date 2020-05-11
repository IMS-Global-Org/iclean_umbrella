defmodule IClean.Employer do
  use Ecto.Schema
  import Ecto.Changeset

  schema "employers" do
    field :description, :string
    field :organization, :string
    field :type, :string

    has_many :employments, IClean.Employment

    many_to_many :addresses,
      IClean.Address,
      join_through: "employers_addresses"

    timestamps()
  end

  @doc false
  def changeset(employer, attrs) do
    employer
    |> cast(attrs, [:organization, :description, :type])
    |> validate_required([:organization, :description, :type])
  end
end
