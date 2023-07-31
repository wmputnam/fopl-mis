import express from "express";
import membersService from "../services/members.service";
import debug from "debug";
import { RestErrorBody } from "../common/interface/RestErrorBody";

const log: debug.IDebugger = debug('app:members-controller');

class MembersController {
  async listMembers(req: express.Request, res: express.Response) {
    const members = await membersService.list(100, 0);
    res.status(200).send(members);
  }
  async getMemberById(req: express.Request, res: express.Response) {
    const member = await membersService.getMemberById(req.body.id);
    log(`getMemberByID(${req.body.id})`)
    res.status(200).send(member);
  }
  async createMember(req: express.Request, res: express.Response) {
    let memberId;
    try {
      memberId = await membersService.create(req.body);
    } catch (error) {
      const errBody:RestErrorBody = { error: [ `${error}` ]};

      res.status(400).send(errBody)
      return;
    }
    res.status(200).send({ id: memberId });
  }
  async patch(req: express.Request, res: express.Response) {
    log(await membersService.patchById(req.body.id, req.body));
    res.status(204).send();
  }
  async put(req: express.Request, res: express.Response) {
    log(await membersService.putById(req.body.id, req.body));
    res.status(204).send();
  };
  async removeMember(req: express.Request, res: express.Response) {
    log(await membersService.deleteById(req.body.id));
    res.status(204).send();
  }
}

export default new MembersController();