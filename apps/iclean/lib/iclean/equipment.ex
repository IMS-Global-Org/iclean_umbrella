defmodule IClean.Equipment do
  use Ecto.Schema
  import Ecto.Changeset

  schema "equipment" do
    field :cost, :float
    field :description, :string
    field :name, :string
    field :operator_license, :boolean, default: false
    field :quantity, :integer

    many_to_many :employments, 
      IClean.Employment, 
      join_through: "employments_equipments"

    timestamps()
  end

  @doc false
  def changeset(equipment, attrs) do
    equipment
    |> cast(attrs, [:name, :description, :quantity, :operator_license, :cost])
    |> validate_required([:name, :description, :quantity, :operator_license, :cost])
  end
end
