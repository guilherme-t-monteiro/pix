import { Response, Request } from "express";

export class UserController {

   async list(req: Request, res: Response): Promise<Response> {
      let response = await fetch('http://177.44.248.24/pix-api/users');
      if (response.ok) {
         let users = await response.json();
         return res.status(200).json(users);
      } else {
         return res.status(422).json({ error: 'Ops, algo deu errado!' });
      }
   }

}