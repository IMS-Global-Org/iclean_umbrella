defmodule IClean.Address do
  use Ecto.Schema
  import Ecto.Changeset

  schema "addresses" do
    field :street1, :string
    field :street2, :string

    many_to_many :employees,
      IClean.Employee,
      join_through: "employees_addresses"

    many_to_many :employers,
      IClean.Employer,
      join_through: "employers_addresses"

    timestamps()
  end

  @doc false
  def changeset(address, attrs) do
    address
    |> cast(attrs, [:street1, :street2])
    |> validate_required([:street1, :street2])
  end
end
