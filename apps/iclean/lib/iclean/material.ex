defmodule IClean.Material do
  use Ecto.Schema
  import Ecto.Changeset

  schema "materials" do
    field :applicator_license, :boolean, default: false
    field :cost, :float
    field :description, :string
    field :name, :string
    field :quantity, :integer
    field :volume, :float
    field :volume_unit, :string

    many_to_many :employments,
      IClean.Employment,
      join_through: "employments_materials"

    timestamps()
  end

  @doc false
  def changeset(material, attrs) do
    material
    |> cast(attrs, [:name, :description, :quantity, :cost, :volume, :volume_unit, :applicator_license])
    |> validate_required([:name, :description, :quantity, :cost, :volume, :volume_unit, :applicator_license])
  end
end
