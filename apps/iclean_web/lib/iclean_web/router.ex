defmodule ICleanWeb.Router do
  use ICleanWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
    plug ICleanWeb.APIAuthPlug, 
      otp_app: :iclean
  end

  pipeline :api_protected do
    plug Pow.Plug.RequireAuthenticated, 
      error_handler: ICleanWeb.APIAuthErrorHandler
  end

  scope "/api", ICleanWeb do
    pipe_through :api

    # Auth API endpoints here
    resources "/registration", RegistrationController, 
      singleton: true, 
      only: [:create]
    resources "/session", SessionController, 
      singleton: true, 
      only: [:create, :delete]
    post "/session/renew", SessionController, :renew

    # Your public API endpoints here
  end

  scope "/api", ICleanWeb do
    pipe_through [:api, :api_protected]

    # Employee Routes
    resources "/employees", EmployeesController, except: [:new, :edit]
    get "/employee/active", EmployeesController, :employee_active

    # Employment Routes
    resources "/employment", EmploymentController, except: [:new, :edit]
    post "/employment/search", EmploymentController, :search
  end
end
