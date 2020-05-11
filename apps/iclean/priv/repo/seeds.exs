# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     IClean.Repo.insert!(%IClean.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

Code.require_file("./seeds/users.exs", __DIR__)
Code.require_file("./seeds/employer.exs", __DIR__)
Code.require_file("./seeds/equipment.exs", __DIR__)
Code.require_file("./seeds/material.exs", __DIR__)
Code.require_file("./seeds/warning.exs", __DIR__)
Code.require_file("./seeds/employment.exs", __DIR__)
Code.require_file("./seeds/employee.exs", __DIR__)
