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

alias IClean.{Repo, Users.User}

default_users = [
  %{ 
    email: "super@iclean.com", 
    password: "password",
    confirm_password: "password",
  },
  %{ 
    email: "uber@iclean.com", 
    password: "password",
    confirm_password: "password",
  },
  %{ 
    email: "basic@iclean.com",
    password: "password",
    confirm_password: "password",
  },
  %{ 
    email: "guest@iclean.com",
    password: "password",
    confirm_password: "password",
  },
]

default_users
|> Enum.each(fn user -> 
  changeset = User.changeset(%User{}, user)
  Repo.insert!(changeset) 
end)
