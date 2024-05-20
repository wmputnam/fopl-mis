import express from "express";
import { membersService } from "../services/index.js";
import debug from "debug";
import { type RestErrorBody } from "../common/index.js";

const log: debug.IDebugger = debug('app:members-controller');

const DEFAULT_LIST_LIMIT = 100;
const LIST_FIRST_PAGE = 0

export class MembersController {

  static listQueryParams(req: express.Request, defaultFilterObj: Object = {}): { limit: number, page: number, filter: Object, sort: string } {
    const limit = (req.query.limit && !Number.isNaN(req.query.limit))
      ? Number(req.query.limit) : DEFAULT_LIST_LIMIT;
    const page = (req.query.page && !Number.isNaN(req.query.page))
      ? (Number(req.query.page) - 1)
      : LIST_FIRST_PAGE;
    const filter: Object = req.query.filter
      ? MembersController.createFilterObject(req.query.filter as string)
      : defaultFilterObj;
    const sort: string = req.query.sort !== undefined && req.query.sort !== ""
      ? MembersController.createSortObject(req.query.sort as string)
      : "lastName firstName";
    return { limit: limit, page: page, filter: filter, sort: sort }
  }

  async listMembers(req: express.Request, res: express.Response) {
    const members = await membersService.list(DEFAULT_LIST_LIMIT, 0);
    res.status(200).send(members);
  }

  async listMembersV1(req: express.Request, res: express.Response) {
    const { limit, page, sort, filter } = MembersController.listQueryParams(req, { isActive: true })
    // jscpd:ignore-start
    const count = await membersService.countV1(filter);

    const members = await membersService.listV1(limit, page, sort, filter);

    res.status(200).send({ data: members, page: page, limit: limit, count: count });
    // jscpd:ignore-end
  }

  async listNewMembersV1(req: express.Request, res: express.Response) {
    const { limit, page, sort, filter } = MembersController.listQueryParams(req, { isActive: true, isNewMember: true });

    // jscpd:ignore-start
    const count = await membersService.countV1(filter);

    const members = await membersService.listV1(limit, page, sort, filter);

    res.status(200).send({ data: members, page: page, limit: limit, count: count });
    // jscpd:ignore-end
  }

  async getMemberById(req: express.Request, res: express.Response) {

    const member = await membersService.getMemberById(req.body.id);

    if (member !== null) {
      res.status(200).send(member);
    } else {
      res.status(404).send({ error: [`Member with id ${req.body.id} not found`] });
    }
  }

  async createMember(req: express.Request, res: express.Response) {
    let memberId;
    try {
      memberId = await membersService.create(req.body);
    } catch (error) {
      const errBody: RestErrorBody = { error: [`${error}`] };

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
    log(`put body ${JSON.stringify(req.body)}`)
    log(await membersService.putById(req.body.id, req.body));
    res.status(204).send();
  };

  async removeMember(req: express.Request, res: express.Response) {
    log(await membersService.deleteById(req.body.id));
    res.status(204).send();
  }

  async patchStatus(req: express.Request, res: express.Response) {
    log(await membersService.patchById(req.body.id, req.body));
    res.status(204).send();
  }

  static createSortObject = (sortQueryParam: string) => {
    const termArr: string[] = [];
    if (sortQueryParam && typeof sortQueryParam === 'string') {

      const items = sortQueryParam.split(",");

      for (let i = 0; i < items.length; i++) {
        const spec = items[i].split(":")

        if (spec[1] && ["asc", "ASC", "1"].includes(spec[1])) {
          termArr.push(spec[0])
        } else {
          termArr.push("-".concat(spec[0]));
        }
      }
    }
    return termArr.join(" ");
  }

  static createFilterObject = (filterQueryParam: string) => {
    const termMap: Map<string, Object> = new Map<string, Object>();
    if (filterQueryParam && typeof filterQueryParam === 'string') {
      const items = filterQueryParam.split(",");
      let pattern;
      for (let i = 0; i < items.length; i++) {
        if (items[i].indexOf(':') >= 0) {
          const spec = items[i].split(":")
          if (spec[1].charAt(0) === '/') {
            const regexStr: string = spec[1].replaceAll(/\//g, '');
            pattern = { $regex: regexStr }
          } else {
            pattern = spec[1]
          }

          termMap.set(spec[0], pattern)
        } else {

        }
      }
    }
    let filterObj = Object.fromEntries(termMap);
    return filterObj;
  }
}

