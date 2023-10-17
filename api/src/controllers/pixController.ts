import { Response, Request } from "express";

export class PixController {

   async create(req: Request, res: Response): Promise<Response> {
      let body = req.body;

      let payload = {
         senderId: body.senderId,
         recipientId: body.recipientId,
         value: body.value,
      }

      let response = await fetch('http://177.44.248.24/pix-api/pix', {
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
            'Accept': 'application/json'
         },
         body: JSON.stringify(payload)
      });

      if (response.ok) {
         let pix = await response.json();
         return res.status(200).json(pix);
      } else {
         return res.status(422).json(await response.json());
      }
   }

   async list(req: Request, res: Response): Promise<Response> {
      let response = await fetch('http://177.44.248.24/pix-api/pix');
      if (response.ok) {
         let transactions = await response.json();
         return res.status(200).json(transactions);
      } else {
         return res.status(422).json({ error: 'Ops, algo deu errado!' });
      }
   }

   async find(req: Request, res: Response): Promise<Response> {
      let params = req.params;

      let response = await fetch(`http://177.44.248.24/pix-api/pix/${params.userId}/${params.type}`);

      if (response.ok) {
         let transaction = await response.json();
         return res.status(200).json(transaction);
      } else {
         return res.status(422).json(await response.json());
      }
   }
}