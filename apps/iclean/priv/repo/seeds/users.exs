defmodule UserSeed do
  alias IClean.{Repo, Users.User}

  def create_default_users do
    default_registrations()
    |> Enum.each(&register_user/1)
  end

  def register_user(registration) do
    User.changeset(%User{}, registration)
    |> Repo.insert!
  end

  defp default_registrations do
    [
      %{ 
        email: "super@iclean.com", 
        password: "password",
        confirm_password: "password",
        role: "super",
      },
      %{ 
        email: "uber@iclean.com", 
        password: "password",
        confirm_password: "password",
        role: "uber",
      },
      %{ 
        email: "basic@iclean.com",
        password: "password",
        confirm_password: "password",
        role: "basic",
      },
      %{ 
        email: "guest@iclean.com",
        password: "password",
        confirm_password: "password",
        role: "guest",
      },
    ]
  end
end

UserSeed.create_default_users

