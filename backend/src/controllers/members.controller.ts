import express from "express";
import membersService from "../services/members.service";
import debug from "debug";
import { RestErrorBody } from "../common/interface/RestErrorBody";
import util from "util";

const log: debug.IDebugger = debug('app:members-controller');

class MembersController {
  async listMembers(req: express.Request, res: express.Response) {
    const members = await membersService.list(100, 0);
    res.status(200).send(members);
  }

  async listMembersV1(req: express.Request, res: express.Response) {
    const limit = (req.query.limit && !Number.isNaN(req.query.limit))
      ? Number(req.query.limit) : 100;
    const page = (req.query.page && !Number.isNaN(req.query.page))
      ? (Number(req.query.page) - 1) : 0;
    const filter: Object = req.query.filter
      ? MembersController.createFilterObject(req.query.filter as string)
      : { isActive: true };
    // req.query.filter ? JSON.parse(req.query.filter as string) : "";
    const sort: string = req.query.sort !== undefined && req.query.sort !== ""
      ? MembersController.createSortObject(req.query.sort as string) : "lastName firstName";
    log(`listMembersV1 - limit: ${limit}, page: ${page}, filter:${JSON.stringify(filter)}, sort:${JSON.stringify(sort)}`)

    const count = await membersService.countV1(filter);
    const members = await membersService.listV1(limit, page, sort, filter);
    res.status(200).send({ data: members, page: page, limit: limit, count: count });
  }

  async listNewMembersV1(req: express.Request, res: express.Response) {
    const limit = (req.query.limit && !Number.isNaN(req.query.limit))
      ? Number(req.query.limit) : 100;
    const page = (req.query.page && !Number.isNaN(req.query.page))
      ? (Number(req.query.page) - 1) : 0;
    const filter: Object = req.query.filter
      ? MembersController.createFilterObject(req.query.filter as string)
      : { isNewMember: true };
    // req.query.filter ? JSON.parse(req.query.filter as string) : "";
    const sort: string = req.query.sort !== undefined && req.query.sort !== ""
      ? MembersController.createSortObject(req.query.sort as string) : "lastName firstName";
    log(`listMembersV1 - limit: ${limit}, page: ${page}, filter:${JSON.stringify(filter)}, sort:${JSON.stringify(sort)}`)

    const count = await membersService.countV1(filter);
    const members = await membersService.listV1(limit, page, sort, filter);
    res.status(200).send({ data: members, page: page, limit: limit, count: count });
  }

  async getMemberById(req: express.Request, res: express.Response) {
    log(`getMemberByID(${req.body.id})`)
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
    log(`put request\n     ${util.inspect(req)}`);
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
    log(`createSortObject: sortQueryParam: ${sortQueryParam}`)
    if (sortQueryParam && typeof sortQueryParam === 'string') {
      const items = sortQueryParam.split(",");
      log(`createSortObject: items: ${items}`)
      for (let i = 0; i < items.length; i++) {
        const spec = items[i].split(":")
        log(`createSortObject: i ${i} spec: ${spec}`)
        if (spec[1] && ["asc", "ASC", "1"].includes(spec[1])) {
          termArr.push(spec[0])
        } else {
          termArr.push("-".concat(spec[0]));
        }
      }
    }
    return termArr.join(" ");
    // req.query.sort ? JSON.parse(req.query.sort as string) : {};

  }
  static createFilterObject = (filterQueryParam: string) => {
    const termMap: Map<string, Object> = new Map<string, Object>();
    log(`createFilterObject: filterQueryParam: ${filterQueryParam}`);
    if (filterQueryParam && typeof filterQueryParam === 'string') {
      const items = filterQueryParam.split(",");
      log(`createFilterObject: items: ${items}`)
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
          log(`createFilterObject: i ${i} spec: ${spec[0]},${spec[1]}`)
          termMap.set(spec[0], pattern)
        } else {
          log(`ingoring badly formed filter term ${items[i]}`)
        }
      }
    }
    let filterObj = Object.fromEntries(termMap)
    // {};
    // termMap.forEach((v, k) => {
    //   log(`createFilterObject: k ${k} v: ${v}`)
    //   const descriptor = Object.create(null);
    //   descriptor.value = v;
    //   Object.defineProperty(filterObj, k,
    //     descriptor
    //   );
    // });
    log(`createFilterObject: resulting filter: ${JSON.stringify(filterObj)}`)
    return filterObj;
    // return termArr.join(" ");
    // req.query.sort ? JSON.parse(req.query.sort as string) : {};

  }

}

export default new MembersController();