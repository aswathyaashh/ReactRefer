import { Redirect } from "react-router";
export function Loginredirect(){
    return(
        <div>
          <Redirect  to ="/login" />
        </div>
      );
}