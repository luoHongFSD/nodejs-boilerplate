import login from "./login"

export function useController(){



  return {
    module:"auth",
    get:login
  }
}